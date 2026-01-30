import { cn } from "@/utils/index.ts";
import Video from "../Video/index.tsx";
import { useInViewport } from "ahooks";
import { useRef, useState, useEffect } from "react";
// 懒加载图片组件，带有延迟加载选项
const LazyVideo = ({
    src,
    threshold = 0.01,
    className,
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
}) => {
    const ref = useRef(null);
    const [inViewport] = useInViewport(ref, {
        threshold // 图片进入视口的阈值
    });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (inViewport && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [inViewport, hasLoaded]);

    return (
        <div ref={ref} className={cn(`flex-shrink-0 relative`, className)}>
            {hasLoaded ? (
                <Video src={src} {...props} />
            ) : (
                <div
                    className={`absolute top-0 left-0 bg-(image:--img-bg-linear-gradient) w-[100%] h-[100%] rounded-md`}
                >
                    <div className="bg-(image:--img-bg) w-[100%] h-[100%] rounded-md"></div>
                </div>
            )}
        </div>
    );
};

export default LazyVideo;
