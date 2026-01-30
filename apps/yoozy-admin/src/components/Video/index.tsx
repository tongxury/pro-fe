import { cn } from "@/utils";
import { useState } from "react";

const VideoWithPlaceholder = ({
    src,
    className,
    autoPlay = true,
    muted = true,
    controls = false,
    loop = true,
    object = "cover"
}: {
    src: string;
    className?: string;
    autoPlay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    object?: "cover" | "contain";
}) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-[100%] h-[100%]">
            {isLoading && (
                <div className={`absolute bg-(image:--img-bg-linear-gradient) w-[100%] h-[100%] rounded-md z-1`}>
                    <div className="bg-(image:--img-bg) w-[100%] h-[100%] rounded-md"></div>
                </div>
            )}
            <video
                className={cn(`rounded-md w-[100%] h-[100%] object-${object}`, className)}
                onLoadedData={() => setIsLoading(false)}
                onCanPlay={() => setIsLoading(false)}
                autoPlay={autoPlay}
                muted={muted}
                playsInline
                loop={loop}
                controls={controls}
            >
                <source src={src} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoWithPlaceholder;
