import { cn } from "@/utils";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";

const VideoWithPlaceholder = forwardRef(({
    src,
    className,
    autoPlay = true,
    muted = true,
    controls = false,
    loop = true,
    object = "cover",
    timeStart,
    timeEnd,
    playbackRate = 1,
    ...props
}: {
    src: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    object?: "cover" | "contain";
    timeStart?: number;
    timeEnd?: number;
    playbackRate?: number;
    [key: string]: any;
}, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => videoRef.current);

    const start = Number(timeStart || 0);
    const end = timeEnd !== undefined ? Number(timeEnd) : undefined;

    // Reset loading state when src changes
    useEffect(() => {
        setIsLoading(true);
    }, [src]);

    // Handle initial seek and autoplay and playbackRate
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const setupVideo = () => {
            if (timeStart !== undefined) {
                video.currentTime = start;
            }
            // HTML5 video playbackRate typically supports 0.0625 to 16
            video.playbackRate = Math.min(Math.max(playbackRate, 0.0625), 16);
            if (autoPlay) {
                video.play().catch(() => {});
            }
        };

        if (video.readyState >= 1) {
            setupVideo();
        } else {
            video.addEventListener('loadedmetadata', setupVideo);
            return () => video.removeEventListener('loadedmetadata', setupVideo);
        }
    }, [src, start, autoPlay, playbackRate]);

    // Update playbackRate when it changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = Math.min(Math.max(playbackRate, 0.0625), 16);
        }
    }, [playbackRate]);

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        
        // Loop check for custom range
        if (end !== undefined && video.currentTime >= end) {
            if (loop) {
                video.currentTime = start;
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }

        // Clamp to start time
        if (video.currentTime < start - 0.2) {
            video.currentTime = start;
        }

        if (props.onTimeUpdate) props.onTimeUpdate(e);
    };

    const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (loop) {
            video.currentTime = start;
            video.play().catch(() => {});
        }
        if (props.onEnded) props.onEnded(e);
    };

    return (
        <div className="relative w-[100%] h-[100%]">
            {isLoading && (
                <div className={`absolute bg-(image:--img-bg-linear-gradient) w-[100%] h-[100%] rounded-md z-1`}>
                    <div className="bg-(image:--img-bg) w-[100%] h-[100%] rounded-md"></div>
                </div>
            )}
            <video
                key={src} // Force re-mount when src changes to ensure video reloads correctly
                ref={videoRef}
                className={cn(`rounded-md w-[100%] h-[100%] object-${object}`, className)}
                onLoadedData={() => setIsLoading(false)}
                onCanPlay={() => setIsLoading(false)}
                autoPlay={autoPlay}
                muted={muted}
                playsInline
                // Disable native loop when we have a custom end time to use our manual loop logic
                loop={loop && end === undefined}
                controls={controls}
                {...props}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            >
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
});

VideoWithPlaceholder.displayName = "VideoWithPlaceholder";

export default VideoWithPlaceholder;
