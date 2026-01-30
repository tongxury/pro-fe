import axios from 'axios';
import { fetchUploadToken } from "@/api/api";
import { v4 } from "uuid";
import { getFileExtension } from '@pro/hooks';

// 生成文件名
const generateFileName = async (file: File): Promise<string> => {
    // const md5 = await calculateMD5(file);
    const extension = getFileExtension(file.name);
    return `${v4()}.${extension}`;
};

// 使用 axios 直传七牛
export const performSingleUploadQiniu = async (
    file: File,
    onProgressChange: (p: number) => void
): Promise<string> => {
    try {
        onProgressChange(0);
        const fileKey = await generateFileName(file);

        const tr = await fetchUploadToken({ bucket: import.meta.env.VITE_QINIU_BUCKET });
        const token = tr.data?.data?.token;

        // 构造 FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('token', token);
        formData.append('key', fileKey);

        // 七牛上传地址（华东区域，其他区域请更换）
        const uploadUrl = 'https://upload.qiniup.com';

        const inst = axios.create()
        const res = await inst.post(uploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                console.log('progressEvent', progressEvent);

                if (progressEvent.total) {
                    const percent = progressEvent.loaded / progressEvent.total;
                    onProgressChange(percent);
                }
            },
        });

        console.log('res', res);
        // 返回文件在七牛的 key 或完整 url
        return `${import.meta.env.VITE_QINIU_ENDPOINT}/${fileKey}`;
    } catch (error) {
        console.error('Upload Error:', error);
        throw error;
    }
};
