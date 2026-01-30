import React from 'react';
import {useXTheme, XImage} from "@pro/ui";
import {Avatar, Button} from "antd";

const ItemView = ({data, onViewReport, reportLoadingItemId}: {
    data: any,
    onViewReport: () => void,
    reportLoadingItemId?: string,
}) => {
    // 使用主题变量
    const {themeVars} = useXTheme();

    return (
        <div style={{
            width: '100%',
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#222',
        }}>
            {/* 图片容器 - 使用固定宽高比容器 */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%', // 这会创建一个1:1宽高比的容器
                    borderRadius: '12px 12px 0 0',
                    overflow: 'hidden',
                    backgroundColor: '#000', // 确保背景色一致
                }}
            >
                {/* 图片元素 */}
                <XImage
                    // placeholder="blur"
                    // loading={"lazy"}
                    // priority={true}
                    src={data.cover}
                    // alt={data.title}
                    // width={200}
                    // height={200}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

                {/* 分类标签 */}
                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: 4,
                    fontSize: 12,
                    zIndex: 2
                }}>
                    {data.category}
                </div>
            </div>

            {/* 内容区域 */}
            <div style={{padding: 10, gap: 8, display: 'flex', flexDirection: 'column'}}>
                {/* 标题 */}
                <div style={{
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: '#fff',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>{data.title}</div>

                {/* 用户信息 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 3}}>
                        <Avatar
                            size={18}
                            style={{
                                backgroundColor: '#444'
                            }}
                        >
                            {data.profile?.username?.charAt(0)}
                        </Avatar>
                        <div style={{
                            color: 'rgba(255,255,255,0.8)',
                            fontSize: 10,
                            maxWidth: '70px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {data.profile?.username}
                        </div>
                    </div>

                    {/* 点赞信息 */}
                    <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <div style={{
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 10
                        }}>
                            {data.interactInfo?.likedCount}
                        </div>
                    </div>
                </div>

                {/* 查看报告按钮 */}
                <Button
                    style={{
                        height: 32,
                        borderRadius: 16,
                        border: 'none',
                        background: 'rgba(255,255,255,0.9)',
                        color: '#111',
                        fontWeight: 500
                    }}
                    block
                    disabled={!!(reportLoadingItemId && reportLoadingItemId !== data._id)}
                    loading={!!(reportLoadingItemId && reportLoadingItemId === data._id)}
                    onClick={onViewReport}
                >
                    查看报告
                </Button>
            </div>
        </div>
    );
}

export default ItemView;
