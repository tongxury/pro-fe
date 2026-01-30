import React, {CSSProperties, ReactElement, ReactNode, useState} from 'react';

function EnhancedGlowingWorkButton({onClick, style, children}: {
    onClick?: () => void,
    style?: CSSProperties,
    children: ReactNode | string
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // 按钮基础样式
    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '12px 30px',
        minWidth: '120px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'white',
        background: 'linear-gradient(90deg, #4ade80 0%, #38bdf8 100%)',
        border: 'none',
        borderRadius: '9999px', // 圆角形状
        cursor: 'pointer',
        boxShadow: isPressed
            ? '0 0 10px rgba(74, 222, 128, 0.5), 0 0 15px rgba(56, 189, 248, 0.5)'
            : isHovered
                ? '0 0 15px rgba(74, 222, 128, 0.7), 0 0 30px rgba(56, 189, 248, 0.7), 0 0 45px rgba(56, 189, 248, 0.4)'
                : '0 0 10px rgba(74, 222, 128, 0.6), 0 0 20px rgba(56, 189, 248, 0.6)',
        transform: isPressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
    } as CSSProperties;

    // 扳手图标样式
    const iconStyle = {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))',
    } as CSSProperties;

    // 内部高光/光晕效果
    const glowStyle = {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        right: '-50%',
        bottom: '-50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
        opacity: isHovered ? 0.8 : 0.5,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
    } as CSSProperties;

    // 脉冲光效果
    const pulseStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '9999px',
        animation: isHovered ? 'pulse 2s infinite' : 'none',
        boxShadow: '0 0 20px rgba(74, 222, 128, 0.7), 0 0 40px rgba(56, 189, 248, 0.7)',
        opacity: 0,
        pointerEvents: 'none',
    } as CSSProperties;

    // 边缘光晕效果
    const edgeGlowStyle = {
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        borderRadius: '9999px',
        background: 'transparent',
        boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
        opacity: isHovered ? 0.8 : 0.5,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
    } as CSSProperties;

    // 扳手SVG图标 - 更简化的版本，像图片中的样式
    const WrenchIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={iconStyle}
        >
            <path
                d="M10.5,6.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S9.4,6.5,10.5,6.5z M4,7c0.8,0,1.5-0.7,1.5-1.5S4.8,4,4,4S2.5,4.7,2.5,5.5S3.2,7,4,7z M15,18c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S16.7,18,15,18z M5,16.3l2.8-2.8l1.4,1.4L6.4,17.7L5,16.3z M19,5h-3v3h3V5z M11,11H8v3h3V11z"/>
        </svg>
    );

    // 在组件的CSS中添加脉冲动画
    const keyframes = `
    @keyframes pulse {
      0% {
        opacity: 0.7;
        transform: scale(1);
      }
      50% {
        opacity: 0;
        transform: scale(1.1);
      }
      100% {
        opacity: 0;
        transform: scale(1);
      }
    }
  `;

    // 背景样式 - 用于黑色背景展示
    const containerStyle = {
        display: 'inline-flex',
        padding: '50px',
        backgroundColor: 'black',
        borderRadius: '10px',
    } as CSSProperties;

    return (
        <div style={containerStyle}>
            <style>{keyframes}</style>
            <button
                onClick={onClick}
                style={{...buttonStyle, ...style}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsPressed(false);
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
            >
                <div style={glowStyle}></div>
                <div style={edgeGlowStyle}></div>
                <div style={pulseStyle}></div>
                <WrenchIcon/>
                {children}
            </button>
        </div>
    );
}

export default EnhancedGlowingWorkButton;
