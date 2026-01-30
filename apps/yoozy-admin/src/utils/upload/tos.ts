import { TosClient } from '@volcengine/tos-sdk';
import { calculateMD5, getFileExtension } from "@pro/hooks";
import axios from "axios";
import { UPLOAD_CONSTANTS } from "@/utils/upload/index.ts";
import { OSS_BASE_URL } from "@/utils/upload/oss.ts";


// 修改：适配 React Native 文件类型
const generateFileName = async (file: File): Promise<string> => {
    const md5 = await calculateMD5(file);
    const extension = getFileExtension(file.name);
    return `${md5}.${extension}`;
};

/**
 * 修改：使用 FileSystem.uploadAsync 替代 axios 进行单文件上传
 * 保持原有的逻辑结构不变
 */
export const upload = async (file: File, onProgressChange?: (p: number) => void): Promise<string> => {
    try {
        onProgressChange?.(0);
        const filename = await generateFileName(file);

        const client = new TosClient({
            accessKeyId: import.meta.env.VITE_TOS_ACCESS_KEY_ID,
            accessKeySecret: import.meta.env.VITE_TOS_ACCESS_KEY_SECRET,
            region: import.meta.env.VITE_TOS_REGION,
            endpoint: import.meta.env.VITE_TOS_ENDPOINT,
            bucket: import.meta.env.VITE_TOS_BUCKET,
        });

        const signedUrl = client.getPreSignedUrl({
            key: filename,
            method: 'PUT',
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

        return `https://${import.meta.env.VITE_TOS_BUCKET}.${import.meta.env.VITE_TOS_ENDPOINT}/${filename}`;
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
};
