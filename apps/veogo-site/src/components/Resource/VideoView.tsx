import {useXTheme, XFlex} from "@pro/ui";
import React, {useState, useRef, useEffect, CSSProperties} from "react";
import {useTranslation} from "@/i18n/routing";

const VideoView = ({data, style}: { data: any, style?: CSSProperties }) => {
    const t = useTranslation();
    const {themeVars} = useXTheme();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isUserInfoHovered, setIsUserInfoHovered] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 768);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // 响应式布局检测
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 初始化检测

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // 处理视频播放/暂停
    const togglePlay = (): void => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(error => {
                    console.error("Video play error:", error);
                });
                setIsMuted(false);
            }
            setIsPlaying(!isPlaying);
        }
    };

    // 处理进度条点击
    const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        if (videoRef.current && progressBarRef.current) {
            const progressBar = progressBarRef.current;
            const rect = progressBar.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            const newTime = position * duration;
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    // 处理音量切换
    const toggleMute = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // 处理全屏切换
    const toggleFullscreen = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();

        const videoContainer = videoContainerRef.current;

        if (!videoContainer) return;

        if (!isFullscreen) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen().catch(err => {
                    console.error("Error attempting to enable fullscreen:", err);
                });
            } else if ((videoContainer as any).webkitRequestFullscreen) { /* Safari */
                (videoContainer as any).webkitRequestFullscreen();
            } else if ((videoContainer as any).msRequestFullscreen) { /* IE11 */
                (videoContainer as any).msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(err => {
                    console.error("Error attempting to exit fullscreen:", err);
                });
            } else if ((document as any).webkitExitFullscreen) { /* Safari */
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) { /* IE11 */
                (document as any).msExitFullscreen();
            }
        }
    };

    // 监听全屏变化
    useEffect(() => {
        const handleFullscreenChange = (): void => {
            setIsFullscreen(
                !!document.fullscreenElement ||
                !!(document as any).webkitFullscreenElement ||
                !!(document as any).mozFullScreenElement ||
                !!(document as any).msFullscreenElement
            );
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    // 观察元素可见性
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {threshold: 0.2}
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // 更新视频时间和进度
    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const timeUpdate = (): void => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        };

        const handleEnded = (): void => {
            setIsPlaying(false);
            video.currentTime = 0;
        };

        video.addEventListener('timeupdate', timeUpdate);
        video.addEventListener('loadedmetadata', timeUpdate);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', timeUpdate);
            video.removeEventListener('loadedmetadata', timeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, []);

    // 格式化时间
    const formatTime = (time: number): string => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // 提取标签 - 修正的标签提取函数
    const extractTags = (desc: string | undefined): string[] => {
        if (!desc) return [];

        // 更健壮的方式处理各种标签格式
        const cleanDesc = desc.replace(/\u0000/g, ''); // 移除空字符
        const matches = cleanDesc.match(/#[^\s#]+/g);

        return matches ? matches.map(tag => tag.replace('#', '')) : [];
    };

    // 使用新的标签提取函数
    const tags: string[] = extractTags(data?.desc);

    // 样式对象类型
    type CSSProperties = React.CSSProperties;

    // 主容器样式 - 响应式调整
    const containerStyle: CSSProperties = {
        maxWidth: isDesktop ? '100%' : '400px',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: themeVars.colorBgL2 || '#1e1e1e',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        ...style
    };

    // 视频容器样式 - 响应式调整
    const videoContainerStyle: CSSProperties = {
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: '#000',
    };

    // 视频样式
    const videoStyle: CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
        transform: isHovered && !isFullscreen ? 'scale(1.02)' : 'scale(1)',
    };

    // 视频控制层样式
    const videoControlsStyle: CSSProperties = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
        background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
        opacity: isHovered || isFullscreen ? 1 : 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 20,
    };

    // 进度条容器样式
    const progressContainerStyle: CSSProperties = {
        width: '100%',
        height: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '2px',
        cursor: 'pointer',
        overflow: 'hidden',
    };

    // 进度条样式
    const progressStyle: CSSProperties = {
        height: '100%',
        width: `${(currentTime / duration) * 100 || 0}%`,
        backgroundColor: themeVars.colorPrimary || '#29ffc6',
        borderRadius: '2px',
        transition: 'width 0.1s linear',
    };

    // 控制按钮样式
    const controlsStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
    };

    // 播放按钮覆盖层样式
    const playOverlayStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        opacity: isPlaying ? 0 : 1,
        transition: 'opacity 0.3s ease',
        zIndex: 10,
    };

    // 播放按钮样式
    const playButtonStyle: CSSProperties = {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        animation: !isPlaying ? 'pulse 2s infinite ease-in-out' : 'none',
        transition: 'transform 0.2s ease',
        transform: isHovered && !isPlaying ? 'scale(1.1)' : 'scale(1)',
    };

    // 信息容器样式 - 响应式调整
    const infoContainerStyle: CSSProperties = {
        padding: '20px',
        display: isFullscreen ? 'none' : 'block',
        height: isDesktop ? '100%' : 'auto',
        overflowY: isDesktop ? 'auto' : 'visible',
    };

    // 标题样式
    const titleStyle: CSSProperties = {
        fontSize: '20px',
        fontWeight: '600',
        color: themeVars.colorTextPrimary || '#fff',
        marginBottom: '12px',
    };

    // 用户信息容器样式
    const userInfoStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px',
        padding: '12px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: isUserInfoHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isUserInfoHovered ? '0 5px 15px rgba(0, 0, 0, 0.2)' : 'none',
    };

    // 头像样式
    const avatarStyle: CSSProperties = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: '12px',
        border: `2px solid ${themeVars.colorPrimary || '#29ffc6'}`,
    };

    // 用户名样式
    const usernameStyle: CSSProperties = {
        fontSize: '16px',
        fontWeight: '600',
        color: themeVars.colorTextPrimary || '#fff',
        marginBottom: '4px',
    };

    // 用户信息文本样式
    const userInfoTextStyle: CSSProperties = {
        fontSize: '12px',
        color: themeVars.colorTextL2 || 'rgba(255, 255, 255, 0.7)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    };

    // 说明文本样式
    const descStyle: CSSProperties = {
        fontSize: '14px',
        color: themeVars.colorTextL1 || 'rgba(255, 255, 255, 0.9)',
        lineHeight: '1.6',
        marginBottom: '16px',
    };

    // 标签容器样式
    const tagsContainerStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '12px',
    };

    // 控制按钮通用样式
    const controlButtonStyle: CSSProperties = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        transition: 'background-color 0.2s ease',
    };

    // 如果没有数据，显示加载状态
    if (!data) {
        return (
            <div style={{...containerStyle, padding: '20px', textAlign: 'center'}}>
                <p style={{color: themeVars.colorTextPrimary || '#fff'}}>加载中...</p>
            </div>
        );
    }

    return (
        <div style={containerStyle} ref={containerRef}>
            {/* 使用响应式布局容器 */}
            <div className={`video-info-container ${isDesktop ? 'desktop' : 'mobile'}`}>
                {/* 视频区域现在包裹在一个容器中，便于响应式布局 */}
                <div className="video-container-wrapper">
                    <div
                        ref={videoContainerRef}
                        style={videoContainerStyle}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={togglePlay}
                        className={isFullscreen ? 'video-container fullscreen' : 'video-container'}
                    >
                        <video
                            ref={videoRef}
                            style={videoStyle}
                            src={data.url}
                            muted={isMuted}
                            loop={false}
                            playsInline
                            preload="metadata"
                        />

                        {/* 播放按钮覆盖层 */}
                        <div style={playOverlayStyle}>
                            <div style={playButtonStyle}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 4L18 12L6 20V4Z" fill="white"/>
                                </svg>
                            </div>
                        </div>

                        {/* 视频控制栏 */}
                        <div style={videoControlsStyle}>
                            <div
                                style={progressContainerStyle}
                                onClick={handleProgressBarClick}
                                ref={progressBarRef}
                            >
                                <div style={progressStyle}></div>
                            </div>

                            <div style={controlsStyle}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            togglePlay();
                                        }}
                                        style={controlButtonStyle}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {isPlaying ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect x="6" y="4" width="4" height="16" fill="white"/>
                                                <rect x="14" y="4" width="4" height="16" fill="white"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 4L18 12L6 20V4Z" fill="white"/>
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        onClick={toggleMute}
                                        style={controlButtonStyle}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {isMuted ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
                                                <path d="M23 9L17 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M17 9L23 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white"/>
                                                <path
                                                    d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
                                                    stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                                <path
                                                    d="M19 5C21.0711 7.07111 22.2465 9.96313 22.2465 13C22.2465 16.0369 21.0711 18.9289 19 21"
                                                    stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                        )}
                                    </button>

                                    <span
                                        style={{fontSize: '12px'}}>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                                </div>

                                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                    <button
                                        onClick={toggleFullscreen}
                                        style={controlButtonStyle}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {isFullscreen ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 3V5H4V9H2V3H8Z" fill="white"/>
                                                <path d="M2 15H4V19H8V21H2V15Z" fill="white"/>
                                                <path d="M22 3H16V5H20V9H22V3Z" fill="white"/>
                                                <path d="M16 21H22V15H20V19H16V21Z" fill="white"/>
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8"
                                                    stroke="white" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 信息区域现在可以在大屏幕上显示在右侧 */}
                {data?.profile && (
                    <div className="info-container" style={infoContainerStyle}>
                        <h2 style={titleStyle}>{data.title}</h2>

                        <div
                            style={userInfoStyle}
                            onMouseEnter={() => setIsUserInfoHovered(true)}
                            onMouseLeave={() => setIsUserInfoHovered(false)}
                        >
                            <img src={data.profile.avatar} alt={data.profile.username}
                                 style={avatarStyle}/>
                            <div>
                                <div style={usernameStyle}>{data.profile.username}</div>
                                <div style={userInfoTextStyle}>
                                    <span>{data.profile.ipAddress}</span>
                                    <span>•</span>
                                    <span>{data.profile.followerCount} 粉丝</span>
                                    <span>•</span>
                                    <span>{data.profile.likedCount} 获赞</span>
                                </div>
                            </div>
                        </div>

                        <p style={descStyle}>{data.profile.sign}</p>

                        {/* 标签区域 */}
                        {tags && tags.length > 0 && (
                            <div style={tagsContainerStyle}>
                                {tags.map((tag, index) => (
                                    <span key={index} className="tag">#{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoView;
