import React, { useEffect, useRef } from 'react';
import {useXTheme} from "@pro/ui";

const SpaceGridBackground = ({ children }: {children: any}) => {
    const canvasRef = useRef(null);

    const {themeVars} =useXTheme()

    useEffect(() => {
        const canvas = canvasRef.current ;
        // @ts-ignore
        const ctx = canvas.getContext('2d');
        // @ts-ignore
        let animationFrameId;

        // 设置canvas尺寸
        const setCanvasSize = () => {
            // @ts-ignore
            canvas.width = window.innerWidth;
            // @ts-ignore
            canvas.height = window.innerHeight;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // 创建3D网格点
        const pointCount = 200;
        // @ts-ignore
        const points = [];

        for (let i = 0; i < pointCount; i++) {
            points.push({
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                z: Math.random() * 1000,
                size: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.5 ? themeVars.colorPrimary : themeVars.colorL1,
                opacity: Math.random() * 0.8 + 0.2
            });
        }

        const render = () => {
            // @ts-ignore
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 绘制黑色背景
            ctx.fillStyle = 'rgb(8, 8, 12)';
            // @ts-ignore
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 计算中心点和透视
            // @ts-ignore
            const centerX = canvas.width / 2;
            // @ts-ignore
            const centerY = canvas.height / 2;
            const perspective = 200;
            const depth = 400;
            const time = Date.now() * 0.0001;

            // 绘制网格点
            // @ts-ignore
            points.forEach(point => {
                // 使点移动并旋转
                const rotationZ = time * 0.3;

                // 3D旋转计算
                const cosZ = Math.cos(rotationZ);
                const sinZ = Math.sin(rotationZ);

                const nx = point.x * cosZ - point.y * sinZ;
                const ny = point.x * sinZ + point.y * cosZ;
                const nz = point.z - depth;

                // 透视投影
                if (nz > 0) {
                    const scale = perspective / nz;
                    const projectedX = nx * scale + centerX;
                    const projectedY = ny * scale + centerY;
                    const projectedSize = point.size * scale;

                    // 根据深度计算透明度
                    const opacity = point.opacity * (1 - nz / 1000);

                    ctx.beginPath();
                    ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
                    ctx.fillStyle = point.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
                    ctx.fill();

                    // 如果点足够近，绘制光晕
                    if (nz < 400) {
                        const glowSize = projectedSize * (6 - nz / 100);
                        const gradient = ctx.createRadialGradient(
                            projectedX, projectedY, projectedSize,
                            projectedX, projectedY, glowSize
                        );
                        gradient.addColorStop(0, point.color + '40');
                        gradient.addColorStop(1, point.color + '00');

                        ctx.beginPath();
                        ctx.arc(projectedX, projectedY, glowSize, 0, Math.PI * 2);
                        ctx.fillStyle = gradient;
                        ctx.fill();
                    }

                    // 连接近距离点
                    // @ts-ignore
                    points.forEach(otherPoint => {
                        if (point !== otherPoint) {
                            const distance3D = Math.sqrt(
                                Math.pow(point.x - otherPoint.x, 2) +
                                Math.pow(point.y - otherPoint.y, 2) +
                                Math.pow(point.z - otherPoint.z, 2)
                            );

                            if (distance3D < 200) {
                                const otherX = otherPoint.x * cosZ - otherPoint.y * sinZ;
                                const otherY = otherPoint.x * sinZ + otherPoint.y * cosZ;
                                const otherZ = otherPoint.z - depth;

                                if (otherZ > 0) {
                                    const otherScale = perspective / otherZ;
                                    const otherProjectedX = otherX * otherScale + centerX;
                                    const otherProjectedY = otherY * otherScale + centerY;

                                    const lineOpacity = (1 - distance3D / 200) * 0.15 * (1 - nz / 1000) * (1 - otherZ / 1000);

                                    ctx.beginPath();
                                    ctx.moveTo(projectedX, projectedY);
                                    ctx.lineTo(otherProjectedX, otherProjectedY);
                                    ctx.strokeStyle = point.color + Math.floor(lineOpacity * 255).toString(16).padStart(2, '0');
                                    ctx.lineWidth = 0.5;
                                    ctx.stroke();
                                }
                            }
                        }
                    });
                }

                // 如果点移出视野，重置到远处
                if (nz <= 0 || nz > 1000) {
                    point.z = 1000;
                    point.x = Math.random() * 1000 - 500;
                    point.y = Math.random() * 1000 - 500;
                }

                // 移动点
                point.z -= 0.5;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            // @ts-ignore
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}
            />

            {/* 辅助渐变覆盖 */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, transparent 30%, rgba(8, 8, 12, 0.7) 80%)',
                zIndex: -1,
            }}></div>

            {children}
        </div>
    );
};

export default SpaceGridBackground;
