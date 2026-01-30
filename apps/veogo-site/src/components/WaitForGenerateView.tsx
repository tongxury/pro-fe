import {useXTheme, XFlex, XText} from '@pro/ui';
import React, {useState, useEffect} from 'react';
import ReactSeamlessScroll from 'react-seamless-scroll';
import GradientOverlay from "@/components/GradientOverlay";
import {Modal, Typography, Progress} from "antd";
import MinimalLoading from "@/components/Loading";
import {useTranslation} from "@/i18n/routing";
import { RocketFilled, StarFilled, FireFilled, ThunderboltFilled, BulbFilled } from '@ant-design/icons';

const DataCarousel = () => {
    const {themeVars} = useXTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [waitingMessageIndex, setWaitingMessageIndex] = useState(0);
    const [tipIndex, setTipIndex] = useState(0);
    const [loadingDots, setLoadingDots] = useState("");
    const t = useTranslation();

    // 卡片数据 - 使用简化的翻译键
    const CARD_DATA = [
        {
            id: 1,
            titleKey: 'analysisCard1Title',
            contentKeys: [
                'analysisCard1Content1',
                'analysisCard1Content2',
                'analysisCard1Content3'
            ],
            footerKey: 'analysisCard1Footer',
            color: '#FF6B6B',
            bgColor: 'rgba(255, 107, 107, 0.08)',
            icon: <ThunderboltFilled style={{fontSize: 18}} />
        },
        {
            id: 2,
            titleKey: 'analysisCard2Title',
            contentKeys: [
                'analysisCard2Content1',
                'analysisCard2Content2',
                'analysisCard2Content3'
            ],
            footerKey: 'analysisCard2Footer',
            color: '#4ECDC4',
            bgColor: 'rgba(78, 205, 196, 0.08)',
            icon: <FireFilled style={{fontSize: 18}} />
        },
        {
            id: 3,
            titleKey: 'analysisCard3Title',
            contentKeys: [
                'analysisCard3Content1',
                'analysisCard3Content2',
                'analysisCard3Content3'
            ],
            footerKey: '',
            color: '#FFD166',
            bgColor: 'rgba(255, 209, 102, 0.08)',
            icon: <StarFilled style={{fontSize: 18}} />
        },
        {
            id: 4,
            titleKey: 'analysisCard4Title',
            contentKeys: [
                'analysisCard4Content1',
                'analysisCard4Content2'
            ],
            footerKey: '',
            color: '#6A0572',
            bgColor: 'rgba(106, 5, 114, 0.08)',
            icon: <BulbFilled style={{fontSize: 18}} />
        },
        {
            id: 5,
            titleKey: 'analysisCard5Title',
            contentKeys: [
                'analysisCard5Content1',
                'analysisCard5Content2',
                'analysisCard5Content3'
            ],
            footerKey: '',
            color: '#1A8FE3',
            bgColor: 'rgba(26, 143, 227, 0.08)',
            icon: <RocketFilled style={{fontSize: 18}} />
        }
    ];

    // 等待消息键
    const WAITING_MESSAGE_KEYS = [
        'analysisWaitingMessage1',
        'analysisWaitingMessage2',
        'analysisWaitingMessage3',
        'analysisWaitingMessage4',
        'analysisWaitingMessage5'
    ];

    // 小贴士键
    const CONTENT_TIP_KEYS = [
        'analysisTip1',
        'analysisTip2',
        'analysisTip3',
        'analysisTip4',
        'analysisTip5'
    ];

    // 模拟进度增加
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                const increment = Math.random() + 0.25;
                const newProgress = prev + increment;
                return newProgress > 95 ? 95 : newProgress;
            });
        }, 800);

        return () => clearInterval(timer);
    }, []);

    // 循环显示不同的等待消息
    useEffect(() => {
        const messageTimer = setInterval(() => {
            setWaitingMessageIndex(prev =>
                (prev + 1) % WAITING_MESSAGE_KEYS.length
            );
        }, 4000);

        return () => clearInterval(messageTimer);
    }, []);

    // 循环显示内容小贴士
    useEffect(() => {
        const tipTimer = setInterval(() => {
            setTipIndex(prev =>
                (prev + 1) % CONTENT_TIP_KEYS.length
            );
        }, 5000);

        return () => clearInterval(tipTimer);
    }, []);

    // 动态加载点
    useEffect(() => {
        const dotsTimer = setInterval(() => {
            setLoadingDots(prev => {
                if (prev.length >= 3) return "";
                return prev + ".";
            });
        }, 500);

        return () => clearInterval(dotsTimer);
    }, []);

    return (
        <Modal
            closable={false}
            footer={null}
            centered
            open={true}
            styles={{
                body: {
                    padding: 0,
                    borderRadius: 16,
                    overflow: 'hidden'
                },
                mask: {
                    backgroundColor: 'rgba(0, 0, 0, 0.65)'
                },
                root: {
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    borderRadius: 16,
                    backgroundColor: themeVars.colorBgLayout
                }
            }}
            width={640}
        >
            <XFlex vertical align={'center'} block style={{
                padding: '24px 20px',
                background: `linear-gradient(180deg, ${themeVars.colorBgLayout} 0%, ${themeVars.colorBgLayout} 100%)`,
                minHeight: 420
            }}>
                {/* 标题和加载指示 */}
                <XFlex vertical align={'center'} gap={4}>
                    <XText style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: themeVars.colorTextPrimary,
                        marginBottom: 8
                    }}>
                        {t('analysisTitle')}
                        <span style={{ marginLeft: 2, opacity: 0.8 }}>{loadingDots}</span>
                    </XText>

                    <XFlex align={'center'} gap={12}>
                        {/*<MinimalLoading size={'default'} />*/}
                        <XText style={{
                            fontSize: 15,
                            color: themeVars.colorPrimary,
                            fontWeight: 500
                        }}>
                            {t(WAITING_MESSAGE_KEYS[waitingMessageIndex])}
                        </XText>
                    </XFlex>
                </XFlex>

                {/* 进度条 */}
                <XFlex block style={{padding: '0 20px', marginTop: 16, marginBottom: 16}}>
                    <Progress
                        percent={progress}
                        strokeColor={{
                            '0%': '#4ECDC4',
                            '100%': '#1A8FE3',
                        }}
                        trailColor={themeVars.colorBgLayout}
                        size={['100%', 8]}
                        format={(percent) => `${Math.round(percent || 0)}%`}
                    />
                </XFlex>

                {/* 内容小贴士 */}
                <XFlex align="center" style={{
                    marginBottom: 20,
                    backgroundColor: 'rgba(26, 143, 227, 0.06)',
                    borderRadius: 8,
                    padding: '8px 16px',
                    width: '90%'
                }}>
                    <div style={{
                        backgroundColor: '#1A8FE3',
                        // color: 'white',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 600,
                        marginRight: 10
                    }}>
                        {t('analysisTipLabel')}
                    </div>
                    <Typography.Text style={{
                        fontSize: 13,
                        color: themeVars.colorTextL1
                    }}>
                        {t(CONTENT_TIP_KEYS[tipIndex])}
                    </Typography.Text>
                </XFlex>

                <GradientOverlay
                    // @ts-ignore
                    startColor={`${themeVars.colorBgL3}00`}
                    endColor={`${themeVars.colorBgL3}FF`}
                    direction="horizontal"
                >
                    <ReactSeamlessScroll
                        speed={isPaused ? 0 : 15}
                        mode={'horizontal'}
                        style={{
                            height: 220,
                            width: '100%',
                            position: 'relative'
                        }}
                    >
                        <XFlex align={'center'} style={{padding: '8px 10px'}}>
                            {CARD_DATA.map((card, i) => (
                                <XFlex
                                    key={i}
                                    vertical
                                    style={{
                                        marginInline: 12,
                                        width: 240,
                                        height: 190,
                                        borderRadius: 16,
                                        backgroundColor: card.bgColor,
                                        border: `1px solid ${card.color}20`,
                                        boxShadow: hoveredIndex === i
                                            ? `0 8px 20px rgba(0, 0, 0, 0.15)`
                                            : `0 4px 12px rgba(0, 0, 0, 0.08)`,
                                        padding: '16px 18px',
                                        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        transform: hoveredIndex === i ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(i as any);
                                        setIsPaused(true);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredIndex(null);
                                        setIsPaused(false);
                                    }}
                                >
                                    {/* 卡片标题 */}
                                    <XFlex justify="space-between" align="center" style={{
                                        marginBottom: 12,
                                        zIndex: 2
                                    }}>
                                        <XFlex gap={8} align="center">
                                            <XFlex
                                                justify="center"
                                                align="center"
                                                style={{
                                                    color: card.color,
                                                    transform: hoveredIndex === i ? 'scale(1.1)' : 'scale(1)',
                                                    transition: 'transform 0.3s ease'
                                                }}
                                            >
                                                {card.icon}
                                            </XFlex>
                                            <XText style={{
                                                fontSize: 16,
                                                fontWeight: 600,
                                                color: card.color,
                                            }}>
                                                {t(card.titleKey)}
                                            </XText>
                                        </XFlex>

                                        {/* 卡片序号 */}
                                        <div style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: '50%',
                                            backgroundColor: card.color,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            fontSize: 13,
                                            fontWeight: 600,
                                            boxShadow: `0 2px 6px ${card.color}40`
                                        }}>
                                            {card.id}
                                        </div>
                                    </XFlex>

                                    {/* 卡片内容 */}
                                    <XFlex vertical gap={8} style={{zIndex: 2}}>
                                        {card.contentKeys.map((contentKey, idx) => (
                                            <Typography.Paragraph
                                                key={idx}
                                                style={{
                                                    fontSize: 13,
                                                    lineHeight: 1.5,
                                                    color: themeVars.colorTextL3,
                                                    margin: 0,
                                                    overflow: 'hidden',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}
                                            >
                                                {t(contentKey)}
                                            </Typography.Paragraph>
                                        ))}
                                    </XFlex>

                                    {/* 页脚数据来源 */}
                                    {card.footerKey && (
                                        <XText style={{
                                            fontSize: 10,
                                            color: themeVars.colorTextL2,
                                            marginTop: 'auto',
                                            paddingTop: 8,
                                            zIndex: 2,
                                            opacity: 0.8
                                        }}>
                                            {t(card.footerKey)}
                                        </XText>
                                    )}

                                    {/* 装饰元素 */}
                                    <div style={{
                                        position: 'absolute',
                                        top: -20,
                                        right: -20,
                                        width: 100,
                                        height: 100,
                                        borderRadius: '50%',
                                        backgroundColor: card.color,
                                        opacity: 0.06,
                                        zIndex: 1,
                                        transition: 'all 0.5s ease',
                                        transform: hoveredIndex === i ? 'scale(1.2)' : 'scale(1)'
                                    }}/>

                                    <div style={{
                                        position: 'absolute',
                                        bottom: -30,
                                        left: -30,
                                        width: 120,
                                        height: 120,
                                        borderRadius: '50%',
                                        backgroundColor: card.color,
                                        opacity: 0.04,
                                        zIndex: 1,
                                        transition: 'all 0.5s ease',
                                        transform: hoveredIndex === i ? 'scale(1.2)' : 'scale(1)'
                                    }}/>
                                </XFlex>
                            ))}
                        </XFlex>
                    </ReactSeamlessScroll>
                </GradientOverlay>

                {/* 底部鼓励文字 */}
                <XText style={{
                    fontSize: 13,
                    color: themeVars.colorTextL2,
                    marginTop: 16,
                    textAlign: 'center'
                }}>
                    {t('analysisFooter')}
                </XText>
            </XFlex>
        </Modal>
    );
};

export default DataCarousel;
