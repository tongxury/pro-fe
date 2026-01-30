
// 获取视频第一帧
const getVideoFirstFrame = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('无法创建canvas上下文'));
            return;
        }

        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.currentTime = 0;
        };

        video.onseeked = () => {
            try {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const coverFile = new File([blob], 'cover.jpg', {
                            type: 'image/jpeg'
                        });
                        resolve(URL.createObjectURL(coverFile));
                    } else {
                        reject(new Error('无法生成封面图片'));
                    }
                }, 'image/jpeg', 0.8);
            } catch (error) {
                reject(error);
            }
        };

        video.onerror = () => {
            reject(new Error('视频加载失败'));
        };

        video.src = URL.createObjectURL(file);
        video.load();
    });
};




const getVideoCover = async (file: File): Promise<File> => {

    const coverDataUrl = await getVideoFirstFrame(file);
    const response = await fetch(coverDataUrl);
    const coverBlob = await response.blob();
    const coverFile = new File([coverBlob], 'cover.jpg', {
        type: 'image/jpeg'
    });
    return coverFile
}

export default getVideoCover

