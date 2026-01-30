import SparkMD5 from 'spark-md5';

export const calculateMD5 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const chunkSize = 2097152; // 2MB
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        const spark = new SparkMD5.ArrayBuffer();
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            spark.append(e.target?.result as ArrayBuffer);
            currentChunk++;

            if (currentChunk < chunks) {
                loadNext();
            } else {
                resolve(spark.end());
            }
        };

        fileReader.onerror = (e) => {
            reject(e);
        };

        function loadNext() {
            const start = currentChunk * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            fileReader.readAsArrayBuffer(file.slice(start, end));
        }

        loadNext();
    });
};

export const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

export const convertToBuffer = async (chunk: Blob): Promise<Buffer> => {
    const arrayBuffer = await chunk.arrayBuffer();
    return Buffer.from(arrayBuffer);
};

export const validateFileType = (file: File, acceptedTypes: string[]): boolean => {
    const fileName = file.name.toLowerCase();
    const fileType = file.type;

    const commonVideoExts = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.mkv', '.webm', '.m4v', '.3gp', '.ogg'];
    const isCommonVideoExt = commonVideoExts.some(ext => fileName.endsWith(ext));
    const isAcceptedType = acceptedTypes.includes(fileType) || fileType === 'application/octet-stream';

    return isAcceptedType || isCommonVideoExt;
};
