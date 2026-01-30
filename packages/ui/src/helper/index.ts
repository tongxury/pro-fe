export const base64toFile = (base64Value: string, filename: string): File => {
    const arr = base64Value.split(",");
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    // @ts-ignore
    const bstr = atob(arr[arr.length - 1]);

    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

export const fileToBase64 = async (file: File) => {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
};
