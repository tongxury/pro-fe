import React, {useState, useEffect} from 'react';
import {Button} from 'antd';

const BreathingButton = ({children, type, onClick,  ...rest}: {children: any, type: string, onClick: () => void}) => {
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

    return (
        <Button onClick={onClick}
            type={type as any}
                style={{
            // display: 'inline-block',
            transform: `scale(${scale})`,
            transition: 'transform 1.5s ease-in-out',
            boxShadow: scale === 1.05 ? '0 0 15px rgba(24, 144, 255, 0.5)' : 'none',
            // borderRadius: '2px'
        }} {...rest}>
            {children}
        </Button>
    );
};

export default BreathingButton;
