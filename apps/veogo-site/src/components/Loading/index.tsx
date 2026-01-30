import React from 'react';
import { useXTheme } from "@pro/ui";

interface MinimalLoadingProps {
    size?: 'small' | 'medium' | 'large' | number;
    message?: string;
    variant?: 'ring' | 'dots' | 'line';
    inline?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const MinimalLoading: React.FC<MinimalLoadingProps> = ({
                                                           size = 'medium',
                                                           message,
                                                           variant = 'dots',
                                                           inline = false,
                                                           style = {},
                                                           className = '',
                                                       }) => {
    const { themeVars } = useXTheme();

    // 检测是否为移动设备
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // 计算尺寸
    const getPixelSize = (): number => {
        if (typeof size === 'number') return size;

        const baseSize = isMobile ? 0.8 : 1;
        switch (size) {
            case 'small': return 32 * baseSize;
            case 'large': return 64 * baseSize;
            default: return 48 * baseSize;
        }
    };

    const pixelSize = getPixelSize();

    // 主要颜色
    const primaryColor = themeVars.colorPrimary || '#29ffc6';
    const secondaryColor = themeVars.colorL2 || '#38bdf8';

    // 渲染不同的加载变体
    const renderLoadingVariant = () => {
        switch (variant) {
            case 'dots':
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: `${pixelSize * 0.25}px`,
                            height: `${pixelSize}px`,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: `${pixelSize * 0.18}px`,
                                    height: `${pixelSize * 0.18}px`,
                                    borderRadius: '50%',
                                    backgroundColor: i === 1 ? secondaryColor : primaryColor,
                                    opacity: 0.7,
                                    animation: `minimalDotPulse 1.4s infinite ease-in-out ${i * 0.16}s`,
                                }}
                            />
                        ))}
                    </div>
                );

            case 'line':
                return (
                    <div
                        style={{
                            width: `${pixelSize * 1.5}px`,
                            height: `${pixelSize * 0.1}px`,
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: `${pixelSize * 0.05}px`,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '30%',
                                backgroundColor: primaryColor,
                                borderRadius: `${pixelSize * 0.05}px`,
                                animation: 'minimalLineProgress 1.5s infinite ease-in-out',
                                opacity: 0.8,
                            }}
                        />
                    </div>
                );

            case 'ring':
            default:
                return (
                    <div
                        style={{
                            position: 'relative',
                            width: `${pixelSize}px`,
                            height: `${pixelSize}px`,
                        }}
                    >
                        {/* 外环 */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                border: `${Math.max(2, pixelSize * 0.05)}px solid rgba(255, 255, 255, 0.1)`,
                                borderTopColor: primaryColor,
                                animation: 'minimalRotate 1s linear infinite',
                            }}
                        />

                        {/* 内环 - 可选 */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '25%',
                                left: '25%',
                                width: '50%',
                                height: '50%',
                                borderRadius: '50%',
                                border: `${Math.max(1, pixelSize * 0.03)}px solid rgba(255, 255, 255, 0.05)`,
                                borderLeftColor: secondaryColor,
                                animation: 'minimalRotate 0.8s linear infinite reverse',
                            }}
                        />
                    </div>
                );
        }
    };

    return (
        <div
            className={`minimal-loading ${className}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: inline ? '0' : '12px',
                ...style,
            }}
        >
            {renderLoadingVariant()}

            {message && (
                <div
                    style={{
                        marginTop: `${pixelSize * 0.3}px`,
                        color: themeVars.colorTextPrimary || '#ffffff',
                        fontSize: `${Math.max(12, pixelSize * 0.25)}px`,
                        fontWeight: 400,
                        opacity: 0.8,
                    }}
                >
                    {message}
                </div>
            )}

            <style>
                {`
          @keyframes minimalRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes minimalDotPulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.3); opacity: 1; }
          }
          
          @keyframes minimalLineProgress {
            0% { left: -30%; }
            50% { left: 100%; }
            100% { left: -30%; }
          }
        `}
            </style>
        </div>
    );
};

export default MinimalLoading;
