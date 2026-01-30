import {
    AbortMultipartUploadCommand,
    CompleteMultipartUploadCommand,
    CreateMultipartUploadCommand,
    PutObjectCommand,
    S3Client,
    S3ClientConfig, UploadPartCommand
} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import axios from "axios";
import {calculateMD5, getFileExtension} from "@pro/hooks";
import {UPLOAD_CONFIG} from "@/utils/upload/index.ts";


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


const s3Config: S3ClientConfig = {
    region: import.meta.env.VITE_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_ACCESSKEY!,
        secretAccessKey: import.meta.env.VITE_ACCESSSECRET!,
    },
    forcePathStyle: true
};

export const s3Client = new S3Client(s3Config);

export const S3_BUCKET = import.meta.env.VITE_BUCKET;
// export const S3_BASE_URL = `https://${S3_BUCKET}.s3.${import.meta.env.VITE_REGION}.amazonaws.com`;
export const S3_BASE_URL = import.meta.env.VITE_ENDPOINT;

const generateFileName = async (file: File): Promise<string> => {
    const md5 = await calculateMD5(file);
    const extension = getFileExtension(file.name);
    return `${md5}.${extension}`;
};


const readFile = async (file: File | Blob): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const buffer = Buffer.from(reader.result as ArrayBuffer);
            resolve(buffer);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
    });
};


const uploadChunk = async (
    chunk: UploadChunk,
    file: File,
    fileName: string,
    uploadId: string,
    parts: UploadPart[],
    completedChunks: number,
    totalChunks: number,
    onProgressChange: (p: number) => void
): Promise<number> => {
    try {
        const chunkData = file.slice(chunk.start, chunk.end);
        const buffer = await readFile(chunkData);

        const uploadPartCommand = new UploadPartCommand({
            Bucket: S3_BUCKET,
            Key: fileName,
            UploadId: uploadId,
            PartNumber: chunk.index + 1,
            Body: buffer,
        });

        const presignedUrl = await getSignedUrl(s3Client, uploadPartCommand, {
            expiresIn: 3600
        });

        const axiosInstance = axios.create();

        const response = await axiosInstance.put(presignedUrl, buffer, {
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            withCredentials: false,
            onUploadProgress: (progressEvent) => {
                const chunkProgress = progressEvent.progress || 0;
                // 计算总体进度：已完成的分片进度 + 当前分片的进度
                const overallProgress = ((completedChunks + chunkProgress) / totalChunks) * 100;
                onProgressChange(Math.floor(overallProgress) + 1);
            }
        });

        if (!response.headers.etag) {
            throw new Error(`Failed to upload part ${chunk.index + 1}`);
        }

        parts.push({
            PartNumber: chunk.index + 1,
            ETag: response.headers.etag.replace(/['"]/g, '')
        });

        return buffer.length;
    } catch (error) {
        if (chunk.retries < UPLOAD_CONFIG.MAX_RETRIES) {
            chunk.retries++;
            await new Promise(resolve => setTimeout(resolve, UPLOAD_CONFIG.RETRY_DELAY));
            return uploadChunk(chunk, file, fileName, uploadId, parts, completedChunks, totalChunks, onProgressChange);
        }
        throw error;
    }
};


export const performMultipartUpload = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    let uploadId: string | undefined;
    const parts: UploadPart[] = [];
    let completedChunks = 0;

    const fileName = await generateFileName(file);


    try {
        onProgressChange(1);

        const multipartUpload = await s3Client.send(new CreateMultipartUploadCommand({
            Bucket: S3_BUCKET,
            Key: fileName,
            ContentType: file.type,
            ACL: 'public-read',
        }));

        uploadId = multipartUpload.UploadId;
        if (!uploadId) throw new Error("Failed to initialize multipart upload");

        const totalChunks = Math.ceil(file.size / UPLOAD_CONFIG.CHUNK_SIZE);
        const uploadQueue: UploadChunk[] = Array.from({length: totalChunks}, (_, index) => ({
            index,
            start: index * UPLOAD_CONFIG.CHUNK_SIZE,
            end: Math.min((index + 1) * UPLOAD_CONFIG.CHUNK_SIZE, file.size),
            retries: 0
        }));

        for (let i = 0; i < totalChunks; i++) {

            const chunk = uploadQueue[i];

            // const chunkProgressStart = Math.floor(100/totalChunks * (i)) + 1
            // setProgress(chunkProgressStart)

            await uploadChunk(
                chunk,
                file,
                fileName,
                uploadId,
                parts,
                completedChunks,
                totalChunks,
                onProgressChange
            );
            completedChunks++;


            // 更新已完成分片的进度
            onProgressChange(Math.floor((completedChunks / totalChunks) * 100));
        }

        await s3Client.send(new CompleteMultipartUploadCommand({
            Bucket: S3_BUCKET,
            Key: fileName,
            UploadId: uploadId,
            MultipartUpload: {Parts: parts.sort((a, b) => a.PartNumber - b.PartNumber)},
        }));

        onProgressChange(100);
        return `${S3_BASE_URL}/${fileName}`
    } catch (error) {
        if (uploadId) {
            try {
                await s3Client.send(new AbortMultipartUploadCommand({
                    Bucket: S3_BUCKET,
                    Key: fileName,
                    UploadId: uploadId
                }));
            } catch (abortError) {
                console.log("中止分片上传失败", abortError);
            }
        }
        throw error;
    }
};


export const performSingleUpload = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    try {
        onProgressChange(1);

        const filename = await generateFileName(file);

        const putObjectCommand = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: filename,
            ContentType: file.type,
            ACL: 'public-read'
        });

        const presignedUrl = await getSignedUrl(s3Client, putObjectCommand, {
            expiresIn: 3600
        });

        const buffer = await file.arrayBuffer();
        const axiosInstance = axios.create();

        await axiosInstance.put(presignedUrl, buffer, {
            headers: {
                'Content-Type': file.type
            },
            withCredentials: false,
            onUploadProgress: (progressEvent) => {
                onProgressChange(Math.floor((progressEvent.progress) * 100) || 1);
            }
        });

        onProgressChange(100);
        return `${S3_BASE_URL}/${filename}`
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Upload failed: ${error.message}`);
        }
        throw error;
    }
};
