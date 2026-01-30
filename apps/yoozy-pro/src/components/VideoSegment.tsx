import React, { useMemo, useRef, useState } from "react";
import { Switch } from "antd";
import { PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";

import { twMerge } from "tailwind-merge";

interface VideoSegmentProps {
    url: string;
    coverUrl: string;
    startTime?: number;
    endTime?: number;

    className?: string;
    style?: React.CSSProperties;
    minimal?: boolean;
    hideDuration?: boolean;
}

const formatDuration = (seconds?: number) => {
    if (typeof seconds !== "number" || Number.isNaN(seconds)) return "00:00";
    return `${seconds.toFixed(1)}s`
};

const VideoSegment: React.FC<VideoSegmentProps> = ({
    url,
    coverUrl,
    startTime,
    endTime,
    className,
    style,
    minimal,
    hideDuration
}) => {
    const [playFullVideo, setPlayFullVideo] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Calculate time range
    // Allow startTime to be 0
    const timeStart = startTime ?? 0;
    const timeEnd = endTime;

    const duration = useMemo(() => {
        if (timeEnd !== undefined && timeEnd !== null) {
            return formatDuration(timeEnd - timeStart);
        }
        return '';
    }, [timeEnd, timeStart]);

    // Handle playback time range
    const handleTimeUpdate = () => {
        if (!videoRef.current || playFullVideo) return;

        const current = videoRef.current.currentTime;
        const end = Math.ceil(timeEnd);

        // If timeEnd is set and current time exceeds it, loop back to timeStart
        if (end && current > end) {
            videoRef.current.currentTime = Math.floor(timeStart);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current && !playFullVideo) {
            videoRef.current.currentTime = timeStart;
        }
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const containerClasses = minimal
        ? twMerge(`w-full h-full flex flex-col items-center justify-center relative`, className)
        : twMerge(`w-full max-w-[320px] mx-auto flex flex-col`, className);

    return (
        <div className={containerClasses} style={style}>
            <div className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 group shadow-sm ring-1 ring-black/5`}>
                {url ? (
                    <video
                        ref={videoRef}
                        controls={false} // Custom controls or just click to play
                        poster={coverUrl}
                        src={url}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onClick={togglePlay}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />
                ) : (
                    <img
                        src={coverUrl}
                        alt="cover"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Custom Play Button Overlay */}
                {url && !isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all cursor-pointer group-hover:opacity-100"
                        onClick={togglePlay}
                    >
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#7150ff] shadow-lg transform transition-transform group-hover:scale-110">
                            <PlayCircleFilled className="text-2xl" />
                        </div>
                    </div>
                )}

                {/* Duration Badge */}
                {!hideDuration && (
                    <div className="absolute left-3 bottom-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium rounded-full border border-white/10 select-none pointer-events-none">
                        {duration}
                    </div>
                )}
            </div>

            {/* Play Mode Switch - Only show if not minimal and has range */}
            {/* If minimal is true, we hide this switch to keep it clean for lists/previews */}
            {!minimal && timeEnd && (
                <div className={`mt-4 flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-100`}>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">完整播放</span>
                        <span className="text-[10px] text-gray-400">播放原始完整视频</span>
                    </div>
                    <Switch
                        size="small"
                        checked={playFullVideo}
                        onChange={(checked) => {
                            setPlayFullVideo(checked);
                            if (videoRef.current) {
                                videoRef.current.currentTime = checked ? 0 : timeStart;
                                if (isPlaying) videoRef.current.play();
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default VideoSegment;
