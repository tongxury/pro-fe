import React, {useState, useEffect} from 'react';
import {useXTheme} from "@pro/ui";

const Install = () => {
    const {themeVars} = useXTheme();
    const [isIOS, setIsIOS] = useState(false);
    const [isInApp, setIsInApp] = useState(false);

    useEffect(() => {
        // 检测是否为iOS设备
        const userAgent = navigator.userAgent;
        const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
        setIsIOS(isIOSDevice);

        // 检测是否在App内浏览器中
        const isInAppBrowser = /FBAN|FBAV|Instagram|Line|Twitter|Pinterest|LinkedInApp|WhatsApp|Telegram|Snapchat|TikTok|WeChat|QQ|UCBrowser|Opera Mini|Opera Mobi|OPR|CriOS|FxiOS|EdgiOS|SamsungBrowser|MiuiBrowser|YaBrowser|Vivaldi|Brave|DuckDuckGo|Safari/.test(userAgent);
        setIsInApp(isInAppBrowser);
    }, []);

    const handleDownload = () => {
        if (isIOS) {
            // iOS设备直接跳转App Store
            window.open('https://apps.apple.com/cn/app/veogo-ai-短视频爆款分析-流量助手/id6747854090', '_blank');
        } else {
            // 非iOS设备显示提示
            alert('请使用iPhone或iPad访问此页面进行下载');
        }
    };

    const handleOpenInSafari = () => {
        // 引导用户在Safari中打开
        const currentUrl = window.location.href;
        const safariUrl = `x-web-search://?${encodeURIComponent(currentUrl)}`;
        window.location.href = safariUrl;
    };

    if (!isIOS) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0ad9a2 0%, #ffffff 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    Veogo AI
                </h1>

                <div style={{
                    width: '280px',
                    height: '280px',
                    background: 'white',
                    border: '2px solid #f0f0f0',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '30px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}>
                    <img
                        src="https://veogoresources.s3.cn-north-1.amazonaws.com.cn/app/httpsapps.apple.comcnappveogo-ai-%E7%9F%AD%E8%A7%86%E9%A2%91%E7%88%86%E6%AC%BE%E5%88%86%E6%9E%90-%E6%B5%81%E9%87%8F%E5%8A%A9%E6%89%8Bid6747854090.png"
                        alt="Veogo AI App Store QR Code"
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '12px'
                        }}
                    />
                </div>

                <p style={{
                    fontSize: '18px',
                    color: '#666',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                }}>
                    短视频爆款分析
                </p>
                <p style={{
                    fontSize: '18px',
                    color: '#666',
                    textAlign: 'center',
                    lineHeight: '1.6',
                    marginBottom: '40px'
                }}>
                    智能流量助手
                </p>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    color: '#333',
                    fontWeight: '500'
                }}>
                    <span style={{ fontSize: '20px' }}>📱</span>
                    <span>请使用iPhone或iPad扫码下载</span>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0ad9a2 0%, #ffffff 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* 标题 */}
            <h1 style={{
                fontSize: '32px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '40px',
                textAlign: 'center'
            }}>
                Veogo AI
            </h1>

            {/* 二维码区域 */}
            <div style={{
                width: '280px',
                height: '280px',
                background: 'white',
                border: '2px solid #f0f0f0',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '30px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
                <img
                    src="https://veogoresources.s3.cn-north-1.amazonaws.com.cn/app/httpsapps.apple.comcnappveogo-ai-%E7%9F%AD%E8%A7%86%E9%A2%91%E7%88%86%E6%AC%BE%E5%88%86%E6%9E%90-%E6%B5%81%E9%87%8F%E5%8A%A9%E6%89%8Bid6747854090.png"
                    alt="Veogo AI App Store QR Code"
                    style={{
                        width: '260px',
                        height: '260px',
                        borderRadius: '12px'
                    }}
                />
            </div>

            {/* 描述文字 */}
            <p style={{
                fontSize: '18px',
                color: '#666',
                textAlign: 'center',
                lineHeight: '1.6',
                marginBottom: '20px'
            }}>
                短视频爆款分析
            </p>
            <p style={{
                fontSize: '18px',
                color: '#666',
                textAlign: 'center',
                lineHeight: '1.6',
                marginBottom: '40px'
            }}>
                智能流量助手
            </p>

            {/* 下载按钮 */}
            <button
                onClick={handleDownload}
                style={{
                    background: 'linear-gradient(135deg, #0ad9a2, #ffffff)',
                    color: '#333',
                    border: '2px solid #0ad9a2',
                    borderRadius: '25px',
                    padding: '16px 32px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    boxShadow: '0 4px 15px rgba(10, 217, 162, 0.3)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 217, 162, 0.4)';
                    e.currentTarget.style.background = '#0ad9a2';
                    e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(10, 217, 162, 0.3)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #0ad9a2, #ffffff)';
                    e.currentTarget.style.color = '#333';
                }}
            >
                <span>📱</span>
                <span>在App Store中下载</span>
            </button>

            {/* 扫码下载提示 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                color: '#333',
                fontWeight: '500'
            }}>
                <span style={{ fontSize: '20px' }}>📷</span>
                <span>扫码下载</span>
            </div>

            {/* 如果在内置浏览器中，显示Safari打开提示 */}
            {isInApp && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #0ad9a2',
                    borderRadius: '12px',
                    padding: '16px',
                    marginTop: '30px',
                    maxWidth: '320px',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(10, 217, 162, 0.2)'
                }}>
                    <p style={{
                        fontSize: '14px',
                        color: '#333',
                        margin: '0 0 12px 0',
                        fontWeight: '500',
                        textAlign: 'center'
                    }}>
                        💡 下载提示
                    </p>
                    <p style={{
                        fontSize: '13px',
                        color: '#666',
                        margin: '0 0 12px 0',
                        lineHeight: '1.4',
                        textAlign: 'center'
                    }}>
                        如果下载按钮无法正常工作，请点击右上角菜单选择"在Safari中打开"
                    </p>
                    <button
                        onClick={handleOpenInSafari}
                        style={{
                            width: '100%',
                            background: 'transparent',
                            border: '1px solid #0ad9a2',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            color: '#0ad9a2',
                            cursor: 'pointer'
                        }}
                    >
                        在Safari中打开
                    </button>
                </div>
            )}

            {/* App功能特点 */}
            <div style={{
                marginTop: '40px',
                maxWidth: '320px',
                width: '100%'
            }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    核心功能
                </h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {[
                        { icon: '📊', text: '爆款视频分析' },
                        { icon: '🎯', text: '流量趋势预测' },
                        { icon: '💡', text: '内容创作建议' },
                        { icon: '📈', text: '数据可视化报告' }
                    ].map((feature, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '10px',
                            border: '1px solid rgba(10, 217, 162, 0.2)'
                        }}>
                            <span style={{ fontSize: '20px' }}>{feature.icon}</span>
                            <span style={{
                                fontSize: '14px',
                                color: '#666',
                                fontWeight: '500'
                            }}>{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Install;
