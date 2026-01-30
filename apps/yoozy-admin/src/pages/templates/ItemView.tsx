import React, { useState } from "react";
import { Card, Button, Popconfirm, message, Tag, Tooltip, Space, Typography, Badge } from "antd";
import { DeleteOutlined, PlayCircleOutlined, EyeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Detail from "./Detail";
import { ReloadOutlined } from "@ant-design/icons";
import { useXTheme } from "@pro/ui";

const { Text } = Typography;

const ItemView = ({ data, onDelete, onRefresh }: {
    data: any,
    onDelete: (id: string) => void,
    onRefresh: (id: string) => void
}) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const { themeVars } = useXTheme()

    if (!data) {
        return null
    }

    const hasVideo = data.url;

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            onDelete(data._id);
            message.success('删除成功');
        } catch (error) {
            message.error('删除失败，请重试');
        }
    };

    const handleRefresh = async (e: React.MouseEvent) => {
        e.stopPropagation();
        onRefresh(data._id);
    };

    return (
        <Detail itemId={data?._id}>
            <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer">
                {/* Media Section */}
                <div
                    className="relative aspect-square bg-gray-100 overflow-hidden"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoPlaying(true);
                    }}
                >
                    {isVideoPlaying ? (
                        <video
                            controls
                            autoPlay
                            className="w-full h-full object-contain bg-black"
                            onEnded={() => setIsVideoPlaying(false)}
                            onError={() => setIsVideoPlaying(false)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <source src={hasVideo} type="video/mp4" />
                            您的浏览器不支持视频播放
                        </video>
                    ) : (
                        <>
                            <img
                                alt={data.title}
                                src={data.coverUrl || data?.segments?.[0]?.highlightFrames?.[0]?.url}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors">
                                    <PlayCircleOutlined className="text-white text-2xl" />
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                {data.status !== 'completed' ? (
                                    <span className="px-2 py-1 rounded-md bg-blue-500/80 backdrop-blur-sm text-white text-xs font-medium border border-blue-400/30">
                                        处理中
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 rounded-md bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-medium border border-emerald-400/30">
                                        已完成
                                    </span>
                                )}
                            </div>

                            {/* Date - Bottom Left */}
                            <div className="absolute bottom-3 left-3 text-white/90 text-xs font-medium backdrop-blur-sm px-2 py-1 rounded bg-black/20">
                                {data.createdAt && new Date(data.createdAt * 1000).toLocaleDateString('zh-CN')}
                            </div>
                        </>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1 gap-3">
                    <div className="flex-1 min-h-0">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1" title={data.commodity?.name}>
                            {data.commodity?.name || '未命名商品'}
                        </h3>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
                        <Button type="link" size="small" className="p-0 text-primary hover:text-primary-hover flex items-center gap-1">
                            查看详情 <EyeOutlined />
                        </Button>

                        <Space size={4}>
                            <Tooltip title="重新分析">
                                <Button
                                    onClick={handleRefresh}
                                    size="small"
                                    icon={<ReloadOutlined className="text-gray-400 group-hover:text-blue-500 transition-colors" />}
                                    type="text"
                                    className="hover:bg-blue-50"
                                />
                            </Tooltip>
                            <Popconfirm
                                title="确认删除"
                                description="确定要删除这个项目吗？"
                                onConfirm={handleDelete}
                                okText="确定"
                                cancelText="取消"
                                okButtonProps={{ danger: true }}
                            >
                                <Tooltip title="删除">
                                    <Button
                                        onClick={(e) => e.stopPropagation()}
                                        size="small"
                                        icon={<DeleteOutlined className="text-gray-400 group-hover:text-red-500 transition-colors" />}
                                        type="text"
                                        className="hover:bg-red-50"
                                    />
                                </Tooltip>
                            </Popconfirm>
                        </Space>
                    </div>
                </div>
            </div>
        </Detail>
    )
}

export default ItemView;
