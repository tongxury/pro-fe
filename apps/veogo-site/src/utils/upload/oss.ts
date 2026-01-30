import OSS from 'ali-oss';
import axios from 'axios';
import {calculateMD5, getFileExtension} from "@pro/hooks";
import {UPLOAD_CONFIG, UPLOAD_CONSTANTS} from "@/utils/upload/index.ts";

export interface UploadPart {
    PartNumber: number;
    ETag: string;
}

interface UploadChunk {
    index: number;
    start: number;
    end: number;
    retries: number;
}


const ossConfig = {
    region: import.meta.env.VITE_OSS_REGION,
    accessKeyId: import.meta.env.VITE_OSS_ACCESSKEY!,
    accessKeySecret: import.meta.env.VITE_OSS_ACCESSSECRET!,
    bucket: import.meta.env.VITE_OSS_BUCKET,
    secure: true, // 使用 HTTPS
};

export const ossClient = new OSS(ossConfig);

export const OSS_BUCKET = import.meta.env.VITE_OSS_BUCKET;
export const OSS_BASE_URL = `https://${OSS_BUCKET}.${import.meta.env.VITE_OSS_REGION}.aliyuncs.com`;


const generateFileName = async (file: File): Promise<string> => {
    const md5 = await calculateMD5(file);
    const extension = getFileExtension(file.name);
    return `${md5}.${extension}`;
};

/**
 * 使用 axios 进行单文件上传
 * 关键点: 签名时包含了 Content-Type，因此 axios 请求时也必须精确匹配此 header
 */
export const performSingleUpload = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    try {
        onProgressChange(0);
        const filename = await generateFileName(file);

        // 1. 生成预签名URL，必须包含 'Content-Type'
        const signedUrl = ossClient.signatureUrl(filename, {
            method: 'PUT',
            expires: 3600,
            'Content-Type': file.type,
        });

        // 2. 使用axios上传，headers 必须和签名时完全一致
        await axios.put(signedUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
            timeout: UPLOAD_CONSTANTS.UPLOAD_TIMEOUT,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgressChange(progress);
                }
            }
        });

        onProgressChange(100);
        return `${OSS_BASE_URL}/${filename}`;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios Error:', error.message);
            console.error('Response Data:', error.response?.data);
        } else {
            console.error('Upload Error:', error);
        }
        throw error;
    }
};

/**
 * 使用 axios 上传分片
 * 关键点: 签名时不包含 Content-Type，因此 axios 请求时必须移除此 header
 */
const uploadChunkWithAxios = async (
    chunk: UploadChunk,
    file: File,
    fileName: string,
    uploadId: string,
    parts: UploadPart[],
    onChunkProgress: (chunkIndex: number, progress: number) => void
): Promise<void> => {
    try {
        const chunkData = file.slice(chunk.start, chunk.end);

        // 1. 为分片生成预签名URL，注意这里没有 Content-Type
        const signedUrl = ossClient.signatureUrl(fileName, {
            method: 'PUT',
            expires: 3600,
            subResource: {
                partNumber: chunk.index + 1,
                uploadId: uploadId,
            },
        });

        // 2. 使用axios上传
        const response = await axios.put(signedUrl, chunkData, {
            timeout: UPLOAD_CONSTANTS.UPLOAD_TIMEOUT,
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onChunkProgress(chunk.index, progress);
                }
            },
            // 3. 这是解决403的关键：
            // transformRequest 允许我们在请求发送前修改它。
            // 我们在这里删除了 axios 可能会默认添加的 'Content-Type' 头，
            // 确保请求头与签名时完全一致。
            transformRequest: (data, headers) => {
                if (headers) {
                    delete headers.put['Content-Type'];
                }
                return data;
            },
        });

        const etag = response.headers.etag?.replace(/"/g, '');
        if (!etag) {
            throw new Error(`No ETag returned for part ${chunk.index + 1}`);
        }

        parts.push({PartNumber: chunk.index + 1, ETag: etag});

    } catch (error) {
        if (chunk.retries < UPLOAD_CONFIG.MAX_RETRIES) {
            chunk.retries++;
            await new Promise(resolve => setTimeout(resolve, UPLOAD_CONFIG.RETRY_DELAY));
            await uploadChunkWithAxios(chunk, file, fileName, uploadId, parts, onChunkProgress);
        } else {
            throw error;
        }
    }
};

export const performMultipartUpload = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    let uploadId: string | undefined;
    const parts: UploadPart[] = [];
    const fileName = await generateFileName(file);
    const totalChunks = Math.ceil(file.size / UPLOAD_CONFIG.CHUNK_SIZE);
    const chunkProgresses = new Array(totalChunks).fill(0);

    const calculateOverallProgress = () => {
        const totalProgress = chunkProgresses.reduce((sum, p) => sum + p, 0);
        onProgressChange(Math.floor(totalProgress / totalChunks));
    };

    try {
        onProgressChange(1);

        const multipartUpload = await ossClient.initMultipartUpload(fileName);
        uploadId = multipartUpload.uploadId;

        const uploadQueue: UploadChunk[] = Array.from({length: totalChunks}, (_, i) => ({
            index: i,
            start: i * UPLOAD_CONFIG.CHUNK_SIZE,
            end: Math.min((i + 1) * UPLOAD_CONFIG.CHUNK_SIZE, file.size),
            retries: 0,
        }));

        const concurrency = 4; // 并发数
        for (let i = 0; i < totalChunks; i += concurrency) {
            const batch = uploadQueue.slice(i, i + concurrency);
            await Promise.all(batch.map(chunk =>
                uploadChunkWithAxios(
                    chunk,
                    file,
                    fileName,
                    uploadId!,
                    parts,
                    (chunkIndex, progress) => {
                        chunkProgresses[chunkIndex] = progress;
                        calculateOverallProgress();
                    }
                )
            ));
        }

        // @ts-ignore
        await ossClient.completeMultipartUpload(fileName, uploadId, parts.sort((a, b) => a.PartNumber - b.PartNumber));

        onProgressChange(100);
        return `${OSS_BASE_URL}/${fileName}`;
    } catch (error) {
        if (uploadId) {
            await ossClient.abortMultipartUpload(fileName, uploadId);
        }
        throw error;
    }
};

// 主上传函数
export const uploadFile = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    if (file.size >= UPLOAD_CONFIG.MIN_MULTIPART_SIZE) {
        return performMultipartUpload(file, onProgressChange);
    } else {
        return performSingleUpload(file, onProgressChange);
    }
};

// 批量上传函数
export const uploadMultipleFiles = async (
    files: File[],
    onProgressChange?: (fileIndex: number, progress: number, fileName: string) => void
): Promise<Array<{ success: boolean, url?: string, error?: string, fileName: string }>> => {
    const results = [];
    for (let i = 0; i < files.length; i++) {
        try {
            const url = await uploadFile(files[i], (progress) => {
                onProgressChange?.(i, progress, files[i].name);
            });
            results.push({success: true, url, fileName: files[i].name});
        } catch (error) {
            results.push({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                fileName: files[i].name
            });
        }
    }
    return results;
};
