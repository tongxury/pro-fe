import React from 'react';
import { cn } from "@/utils";
import { Image, ImageProps, Space } from "antd";
import { DownloadOutlined, EyeOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";
import { useMediaCacheFn } from "@/hooks/useMediaCache";

interface XImageProps extends ImageProps {
    className?: string;
    download?: boolean;
    wrapperClassName?: string;
}

const XImage = ({
    src,
    width,
    className,
    wrapperClassName,
    preview = true,
    download = true,
    ...props
}: XImageProps) => {
    const cached = useMediaCacheFn();
    const finalSrc = src ? cached(src) : src;

    const onDownload = () => {
        if (!finalSrc) return;
        const link = document.createElement('a');
        link.href = finalSrc;
        // Try to extract filename from URL or use default
        let filename = 'image.png';
        try {
            if (src) {
                const urlObj = new URL(src);
                const pathParts = urlObj.pathname.split('/');
                const name = pathParts[pathParts.length - 1];
                if (name) filename = name;
            }
        } catch (e) {
            // ignore
        }

        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Image
            {...props}
            src={finalSrc}
            width={width}
            className={`${cn("rounded-md bg-white/10", className)}`}
            style={{ objectFit: 'cover' }}
            rootClassName={wrapperClassName}
            preview={
                preview === false ? false : {
                    ...(typeof preview === 'object' ? preview : {}),
                    src: finalSrc,
                    toolbarRender: (
                        _,
                        {
                            transform: { scale },
                            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                        },
                    ) => (
                        <Space size={12} className="toolbar-wrapper">
                            {download && (
                                <DownloadOutlined onClick={onDownload} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                            )}
                            <SwapOutlined rotate={90} onClick={onFlipY} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                            <SwapOutlined onClick={onFlipX} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                            <RotateLeftOutlined onClick={onRotateLeft} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                            <RotateRightOutlined onClick={onRotateRight} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
                        </Space>
                    ),
                }
            }
            fallback="data:image/png;base64,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"
            placeholder={
                <div className={`bg-gray-200 animate-pulse rounded-md`} style={{ width: width || '100%', height: '100%', minHeight: 100 }}></div>
            }
        />
    );
};


export default XImage;