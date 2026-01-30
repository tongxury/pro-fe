import Image from "../Image/index.tsx";
import { useInViewport } from "ahooks";
import { useRef, useState, useEffect } from "react";
// 懒加载图片组件，带有延迟加载选项
const LazyImage = ({
    src,
    width,
    threshold = 0.01,
    className,
    preview
}: {
    src: string;
    width?: number;
    threshold?: number;
    className?: string;
    preview?: boolean;
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
        <div ref={ref} className="h-[100%]">
            {hasLoaded ? (
                <Image src={src} width={width} className={className} preview={preview} />
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

export default LazyImage;
