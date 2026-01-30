import {CSSProperties, useEffect, useState} from "react";

const useBreathingStyle = (): CSSProperties => {

    const [scale, setScale] = useState(1);

    useEffect(() => {
        // 简化的呼吸效果
        const breatheAnimation = () => {
            const interval = setInterval(() => {
                setScale(prev => prev === 1 ? 1.1 : 1);
            }, 1500); // 每3秒完成一次呼吸周期

            return () => clearInterval(interval);
        };

        breatheAnimation();
    }, []);

    return {
        transform: `scale(${scale})`,
        transition: 'transform 1.5s ease-in-out',
        // boxShadow: scale === 1.05 ? '0 0 15px rgba(24, 144, 255, 0.5)' : 'none',
    } as CSSProperties
}

export default useBreathingStyle;
