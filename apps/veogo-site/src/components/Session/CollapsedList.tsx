import {useFetchSessions} from "@/api/api";
import {useXTheme, XFlex, XHoverable, XList, XText} from "@pro/ui";
import {Avatar, Button, Empty, Skeleton, Space, Tooltip, Typography} from "antd";
import {CSSProperties, useState} from "react";
import {useRouter, useTranslation} from "@/i18n/routing";
import {
    ClockCircleOutlined,
    PlayCircleOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HistoryOutlined, AppstoreAddOutlined, AppstoreOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";
import {useLocalStorageState} from "ahooks";
import {useParams, useSearchParams} from "react-router";
import {formatTimeFromNow} from "@pro/hooks";

const CollapsedSessionList = ({scene, onSelect, style}: {
    scene?: string,
    onSelect?: (session: any) => void,
    style?: CSSProperties
}) => {
    const {themeVars} = useXTheme();
    const params = useParams();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useLocalStorageState('sessionListCollapsed');

    const [sessions, {loading, mutate}] = useFetchSessions({scene});
    const t = useTranslation()

    const getThumbnailV2 = (resources: any[]) => {
        const mimeType = resources?.filter((x: any) => !x.category)?.[0]?.mimeType;
        return <div style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            backgroundColor: `${themeVars.colorPrimary}15`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            {mimeType?.includes("video") ?
                <PlayCircleOutlined style={{fontSize: 20, color: themeVars.colorPrimary}}/>
                :
                <AppstoreOutlined style={{fontSize: 20, color: themeVars.colorPrimary}}/>
            }

        </div>

    }

    // 格式化时间
    const formatTime = (timestamp: number) => {
        if (!timestamp) return '';
        return dayjs(timestamp * 1000).format('MM-DD HH:mm');
    };


    const getTitle = (session: any) => {
        const resource = session?.resources?.[0];

        return session?.resources?.filter((x: any) => x.category === "interactionMetrics")?.[0]?.meta?.title ||
            session?.resources?.filter((x: any) => x.category === "title")?.[0]?.content ||
            session?.resources?.filter((x: any) => !x.category)?.[0]?.name ||
            resource?.title || resource?.name || resource?.profile?.username || '未命名会话'
    };


    const getAuthorName = (session: any) => {
        return session?.resources?.filter((x: any) => x.category === "authorProfile")?.[0]?.meta?.username
    };

    const isSelected = (id: string) => params.sessionId === id;

    // 切换折叠状态
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    // 主要内容渲染
    const renderMainContent = () => (
        <XFlex vertical gap={8} style={{height: '100%'}}>
            <XFlex justify="space-between" align="center" style={{padding: '12px 8px'}}>
                <Typography.Title level={5} style={{margin: 0}}>{t('history')}</Typography.Title>
                <div
                    onClick={toggleCollapse}
                    style={{
                        cursor: 'pointer',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        color: themeVars.colorTextL2,
                    }}
                >
                    <MenuFoldOutlined style={{fontSize: 16}}/>
                </div>
            </XFlex>

            {loading ? (
                <XFlex vertical gap={12} style={{padding: '0 8px'}}>
                    {Array(10).fill(0).map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            active
                            block
                            style={{height: 70, borderRadius: 8}}
                        />
                    ))}
                </XFlex>
            ) : (
                sessions?.list?.length > 0 ? (
                    <XList
                        style={{
                            overflow: 'auto',
                            scrollbarWidth: 'none',
                            height: '100%'
                        }}
                        dataSource={sessions.list}
                        renderItem={(session, index) => {
                            const resource = session?.resources?.[0];
                            const isItemSelected = isSelected(session._id);
                            const isHovered = hoveredId === session._id;

                            const authorName = getAuthorName(session)

                            return (
                                <div
                                    onClick={() => {
                                        onSelect?.(session);
                                    }}
                                    onMouseEnter={() => setHoveredId(session._id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        cursor: 'pointer',
                                        borderRadius: 8,
                                        padding: '12px 10px',
                                        backgroundColor: isItemSelected
                                            ? `${themeVars.colorPrimary}15`
                                            : isHovered
                                                ? themeVars.colorBgLayout
                                                : 'transparent',
                                        marginBottom: 8,
                                        border: isItemSelected
                                            ? `1px solid ${themeVars.colorPrimary}40`
                                            : '1px solid transparent',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {isItemSelected && (
                                        <div style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: 3,
                                            backgroundColor: themeVars.colorPrimary,
                                            borderTopLeftRadius: 8,
                                            borderBottomLeftRadius: 8
                                        }}/>
                                    )}

                                    <XFlex gap={12} align="flex-start">
                                        {getThumbnailV2(session?.resources)}

                                        <XFlex vertical gap={4} style={{flex: 1, overflow: 'hidden'}}>
                                            <Tooltip title={resource?.desc || getTitle(session)}>
                                                <Typography.Text
                                                    strong={isItemSelected}
                                                    style={{
                                                        fontSize: 14,
                                                        lineHeight: '20px',
                                                        color: isItemSelected ? themeVars.colorPrimary : themeVars.colorTextPrimary,
                                                        display: 'block',
                                                        width: '100%',
                                                    }}
                                                    // @ts-ignore
                                                    ellipsis={{rows: 1}}
                                                >
                                                    {getTitle(session)}
                                                </Typography.Text>
                                            </Tooltip>

                                            {
                                                authorName &&
                                                <Typography.Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: themeVars.colorTextL2,
                                                        display: 'block',
                                                        width: '100%',
                                                    }}
                                                    // @ts-ignore
                                                    ellipsis={{rows: 1}}
                                                >
                                                    {authorName}
                                                </Typography.Text>
                                            }


                                            <XFlex align="center" gap={4} style={{marginTop: 2}}>
                                                <ClockCircleOutlined
                                                    style={{fontSize: 12, color: themeVars.colorTextL3}}/>
                                                <Typography.Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: themeVars.colorTextL3,
                                                    }}
                                                >
                                                    {formatTime(session.createdAt)}
                                                </Typography.Text>
                                            </XFlex>
                                        </XFlex>
                                    </XFlex>
                                </div>
                            );
                        }}
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="暂无历史记录"
                        style={{margin: '40px 0'}}
                    />
                )
            )}
        </XFlex>
    );

    // 折叠状态内容 - 仅显示图标
    const renderCollapsedContent = () => (

        <div
            onClick={toggleCollapse}
            style={{
                margin: 10,
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                background: themeVars.colorBgLayout,
                color: themeVars.colorTextL2,
            }}
        >
            <HistoryOutlined style={{fontSize: 16}}/>
        </div>
    );

    return (
        <div style={{
            width: collapsed ? 40 : 230,
            // ...collapsed ? {
            //     width: 40,
            // } : {
            //     width: '100%',
            // },
            padding: 0,
            height: '100%',
            transition: 'width 0.3s ease',
            overflow: 'hidden',
            ...style
        }}>
            {collapsed ? renderCollapsedContent() : (
                <div style={{padding: '0 10px', height: '100%'}}>
                    {renderMainContent()}
                </div>
            )}
        </div>
    );
};

export default CollapsedSessionList;
