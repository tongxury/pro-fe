import { performSingleUpload as performSingleUploadOss, performMultipartUpload as performMultipartUploadOss } from "./oss"
import { performSingleUploadQiniu } from "./qiniu";
import { upload as performSingleUploadTos } from "./tos";
import { performSingleUpload as performSingleUploadS3, performMultipartUpload as performMultipartUploadS3 } from "./s3"
import { isZh } from "@/utils";


export const UPLOAD_CONFIG = {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000,
    CHUNK_SIZE: 5 * 1024 * 1024, // 5MB分片
    MIN_MULTIPART_SIZE: 20 * 1024 * 1024, // 20MB以下使用普通上传
};


export const UPLOAD_CONSTANTS = {
    CHUNK_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_FILE_SIZE: 1024 * 1024 * 1000, // 1000MB
    UPLOAD_TIMEOUT: 300000, // 5 minutes
};


export const performSingleUpload = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    // if (isZh) {
    //     return performSingleUploadOss(file, onProgressChange);
    // } else {
    //     return performSingleUploadS3(file, onProgressChange);
    // }

    return performSingleUploadTos(file, onProgressChange);

}

// 分片上传会出现上传失败的情况 慎用
export const performMultipartUpload = async (file: File, onProgressChange: (p: number) => void): Promise<string> => {
    // if (isZh) {
    //     return performSingleUploadOss(file, onProgressChange);
    // } else {
    //     return performSingleUploadS3(file, onProgressChange);
    // }

    return performSingleUploadTos(file, onProgressChange);
}


