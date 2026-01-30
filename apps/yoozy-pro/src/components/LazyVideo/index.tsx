import { cn } from "@/utils/index.ts";
import Video from "../Video/index.tsx";
import { useInViewport } from "ahooks";
import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { FullscreenOutlined, DownloadOutlined, PlayCircleFilled } from "@ant-design/icons";

// 懒加载图片组件，带有延迟加载选项
const LazyVideo = forwardRef(({
    src,
    threshold = 0.01,
    className,
    showFullscreen = true,
    showDownload = false,
    showPlayIcon = true,
    onDownload,
    ...props
}: {
    src: string;
    threshold?: number;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    object?: "cover" | "contain";
    timeStart?: number;
    timeEnd?: number;
    playbackRate?: number;
    showFullscreen?: boolean;
    showDownload?: boolean;
    showPlayIcon?: boolean;
    onDownload?: () => void;
    [key: string]: any;
}, ref) => {
    const containerRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [inViewport] = useInViewport(containerRef, {
        threshold // 图片进入视口的阈值
    });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useImperativeHandle(ref, () => videoRef.current);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);
        
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (inViewport && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [inViewport, hasLoaded]);

    const handleFullscreen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const element = containerRef.current as any;
        if (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    };

    const handleDownloadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (onDownload) {
            onDownload();
        } else if (src) {
            const link = document.createElement('a');
            link.href = src;
            link.download = src.split('/').pop() || 'video.mp4';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div 
            ref={containerRef} 
            className={cn(`flex-shrink-0 relative group`, className)}
            style={isFullscreen ? { backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}}
        >
            {hasLoaded ? (
                <>
                    <Video 
                        ref={videoRef} 
                        src={src} 
                        {...props} 
                        object={isFullscreen ? "contain" : (props.object || "cover")}
                    />
                    
                    {/* Hover Controls */}
                    {!isFullscreen && (
                        <>
                            <div className="absolute top-2 right-2 flex flex-col gap-2 z-[100]">
                                {showDownload && (
                                    <div 
                                        onClick={handleDownloadClick}
                                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer text-white hover:bg-black/60 transition-all shadow-lg"
                                        title="下载视频"
                                    >
                                        <DownloadOutlined className="text-sm" />
                                    </div>
                                )}
                                {showFullscreen && (
                                    <div 
                                        onClick={handleFullscreen}
                                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer text-white hover:bg-black/60 transition-all shadow-lg"
                                        title="全屏预览"
                                    >
                                        <FullscreenOutlined className="text-sm" />
                                    </div>
                                )}
                            </div>

                            {/* Static Play Icon */}
                            {showPlayIcon && (
                                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center z-[100] transition-opacity group-hover:opacity-0">
                                    <PlayCircleFilled className="text-white text-[10px] opacity-80" />
                                </div>
                            )}
                        </>
                    )}
                </>
            ) : (
                <div
                    className={`absolute top-0 left-0 bg-(image:--img-bg-linear-gradient) w-[100%] h-[100%] rounded-md`}
                >
                    <div className="bg-(image:--img-bg) w-[100%] h-[100%] rounded-md"></div>
                </div>
            )}
        </div>
    );
});

LazyVideo.displayName = "LazyVideo";

export default LazyVideo;
