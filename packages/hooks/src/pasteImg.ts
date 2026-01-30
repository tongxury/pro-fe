import { useEffect, useState } from "react";

export function usePasteImg(node: HTMLElement) {
    const [imgInfo, setImgInfo] = useState<{ url: string; file: File } | null>();
    useEffect(() => {
        const eventHandle = (event: ClipboardEvent) => {
            // 阻止默认行为，防止图片被粘贴到粘贴区域
            const clipboardData = event.clipboardData || ((window as any).clipboardData as DataTransfer);
            const items: any = clipboardData.items;

            if (items?.[0]?.type?.indexOf("image") !== -1) {
                event.preventDefault();
            }
            // 获取剪贴板数据
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    const blob = items[i].getAsFile();
                    const URL = window.URL || window.webkitURL;
                    const source = URL.createObjectURL(blob!);
                    setImgInfo({ url: source, file: blob });
                }
            }
        };
        if (node) node.addEventListener("paste", eventHandle);

        return () => {
            if (node) node.removeEventListener("paste", eventHandle);
        };
    }, [node]);

    return { imgInfo, setImgInfo };
}
