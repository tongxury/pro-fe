import {useXTheme, XFlex, XHoverable} from "@pro/ui";
import {
    FileTextOutlined,
    LineChartOutlined,
    PictureOutlined,
    RiseOutlined,
    SecurityScanOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "@/hooks/useRouter";
import {useTranslation} from "@/hooks/useTranslation";
import {useParams} from "react-router";

const MenuList = ({collapsed}: { collapsed?: boolean }) => {
    const router = useRouter();
    const {themeVars} = useXTheme();
    // const params = useParams();

    // 用于处理动画过渡的状态
    const [textVisible, setTextVisible] = useState(!collapsed);
    const [textWidth, setTextWidth] = useState<Record<number, number>>({});
    const textRefs = useRef<Array<HTMLDivElement | null>>([]);

    // 为了防止看起来卡顿
    const [activeMenuKey, setActiveMenuKey] = useState<string>('leaderboard');

    const t = useTranslation()

    // 监听 collapsed 变化，添加平滑过渡
    useEffect(() => {
        if (collapsed) {
            // 先隐藏文本，再收缩宽度
            setTextVisible(false);
        } else {
            // 先扩展宽度，再显示文本
            setTextVisible(true);
        }
    }, [collapsed]);

    // 初始化时测量文本宽度
    useEffect(() => {
        const newWidths: Record<number, number> = {};
        textRefs.current.forEach((ref, index) => {
            if (ref) {
                newWidths[index] = ref.offsetWidth;
            }
        });
        setTextWidth(newWidths);
    }, []);


    const routes = [
        {
            path: "/scenes/leaderboard",
            key: "leaderboard",
            name: t("leaderboard"),
            icon: <RiseOutlined/>  // 使用折线图图标表示分析功能
        },
        {
            path: "/scenes/coverAnalysis",
            key: "coverAnalysis",
            name: t("coverPrediction"),
            icon: <PictureOutlined/>  // 使用图片图标表示封面相关功能
        },
        {
            path: "/scenes/analysis",
            key: "analysis",
            name: t("trendingAnalysis"),
            icon: <LineChartOutlined/>  // 使用折线图图标表示分析功能
        },
        {
            path: "/scenes/duplicateScript",
            key: "duplicateScript",
            name: t("scriptReplication"),
            icon: <FileTextOutlined/>  // 使用文件图标表示脚本功能
        },
        {
            path: "/scenes/preAnalysis",
            key: "preAnalysis",
            name: t("videoPrediction"),
            icon: <VideoCameraOutlined/>  // 使用图片图标表示封面相关功能
        },
        {
            path: "/scenes/limitAnalysis",
            key: "limitAnalysis",
            name: t("restrictionPrediction"),
            icon: <SecurityScanOutlined/>  // 使用图片图标表示封面相关功能
        },


        // {
        //     path: "/boarding/limitAnalysis",
        //     name: "限流分析",
        //     icon: <WarningOutlined/>  // 使用警告图标表示限流功能
        // }, {
        //     path: "/boarding/hotTopic",
        //     name: "热点选题",
        //     icon: <FireOutlined/>  // 使用火焰图标表示热点内容
        // }, {
        //     path: "/boarding/tracing",
        //     name: "发布跟踪",
        //     icon: <RadarChartOutlined/>  // 使用雷达图表示跟踪功能
        // }, {
        //     path: "/boarding/search",
        //     name: "深度搜索",
        //     icon: <SearchOutlined/>  // 使用搜索图标表示搜索功能
        // }, {
        //     path: "/boarding/dataAnalysis",
        //     name: "数据分析",
        //     icon: <BarChartOutlined/>  // 使用柱状图图标表示数据分析
        // },
        // {
        //     path: "/boarding/helper",
        //     name: "发布助手",
        //     icon: <RocketOutlined/>  // 使用火箭图标表示助手功能，表达快速发布的概念
        // }
    ];
    const onChange = (x: any) => {
        setActiveMenuKey(x.key);
        router.push(x.path);
    };

    return (
        <XFlex
            vertical
            gap={10}
            style={{
                width: '100%',
                transition: 'width 0.3s ease',
                overflowY: 'scroll',
                scrollbarWidth: 'none',
            }}
        >
            {routes.map((x: any, i: number) => {
                const isActive = activeMenuKey === x.key;
                const activeColor = themeVars.colorPrimary;
                const normalColor = themeVars.colorTextPrimary;

                return (
                    <XHoverable key={i} color={themeVars.colorPrimary + "30"}>
                        <XFlex
                            key={i} align={'center'}
                            onClick={() => onChange(x)}
                            style={{
                                // border: '1px solid red',
                                cursor: 'pointer',
                                padding: '12px 16px',
                                background: isActive ? themeVars.colorPrimary + "30" : undefined,
                                borderRadius: 8,
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden', // 防止内容溢出
                                height: '44px', // 固定高度防止闪烁
                                boxSizing: 'border-box',
                                // 激活状态的左边框指示
                                // borderLeft: isActive ? `3px solid ${activeColor}` : '3px solid transparent',
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                transition: 'transform 0.3s ease',
                            }}>
                                {/* 图标部分 */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 16,
                                    color: isActive ? activeColor : normalColor,
                                    marginRight: textVisible ? '7px' : '0',
                                    transition: 'margin 0.3s ease',
                                    flexShrink: 0,
                                }}>
                                    {x.icon}
                                </div>

                                {/* 文本容器 - 使用固定宽度并控制可见性 */}
                                {/* @ts-ignore*/}
                                <div ref={(el) => textRefs.current[i] = el}
                                     style={{
                                         opacity: textVisible ? 1 : 0,
                                         maxWidth: textVisible ? '160px' : '0',
                                         transition: 'opacity 0.3s ease, max-width 0.3s ease',
                                         whiteSpace: 'nowrap',
                                         overflow: 'hidden',
                                         textOverflow: 'ellipsis',
                                         flexShrink: 0,
                                     }}
                                >
                                    <div style={{
                                        fontSize: '14px',
                                        fontWeight: isActive ? 500 : 400,
                                        color: isActive ? activeColor : normalColor,
                                    }}>
                                        {x.name}
                                    </div>
                                </div>
                            </div>
                        </XFlex>
                    </XHoverable>

                );
            })}
        </XFlex>
    );
};

export default MenuList;
