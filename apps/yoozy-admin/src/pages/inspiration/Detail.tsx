import { ReactNode, useMemo, useRef, useState } from "react";
import { Modal, Typography, Tag, Button, Space, Divider, Tooltip, Switch, message } from "antd";
import {
    ClockCircleOutlined,
    PictureOutlined,
    StarOutlined,
    StarFilled,
    PlayCircleOutlined, ReloadOutlined, DeleteOutlined, FileTextOutlined
} from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter.tsx";
import { deleteResourceSegment, refreshResourceSegment } from "@/api/resource.ts";
import { useMediaCacheFn } from "@/hooks/useMediaCache";
import Image from "@/components/Image";

const formatDuration = (seconds?: number) => {

    return `${seconds?.toFixed(2) || 0}s`;
    // if (typeof seconds !== "number" || Number.isNaN(seconds)) return "00:30";
    // const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    // const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    // return `${m}:${s}`;
};

const Detail = ({ data, onRefresh, children }: { data: any, onRefresh?: () => void, children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [scriptOpen, setScriptOpen] = useState(false);
    const cached = useMediaCacheFn();

    const router = useRouter()


    const [playFullVideo, setPlayFullVideo] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const root = data?.root || {};
    const coverUrl = root?.coverUrl;
    const videoUrl = root?.url;

    // 计算时间范围
    const timeStart = data?.timeStart || 0;
    const timeEnd = data?.timeEnd;
    const duration = useMemo(() => {
        // 如果有timeEnd就用timeEnd，否则用root.duration或默认30s
        if (timeEnd) {
            return formatDuration(timeEnd - timeStart);
        }
        return formatDuration(root?.duration ?? 30);
    }, [timeEnd, root?.duration]);

    // 处理播放时间范围
    const handleTimeUpdate = () => {
        if (!videoRef.current || playFullVideo) return;

        const current = videoRef.current.currentTime;
        const start = Math.floor(timeStart);
        const end = Math.ceil(timeEnd);

        // 如果设置了timeEnd且当前时间超过timeEnd，跳回timeStart
        if (end && current > end) {
            videoRef.current.currentTime = start;
        }
    };

    // 处理视频加载完成
    const handleLoadedMetadata = () => {
        if (!videoRef.current || playFullVideo) return;

        const start = timeStart;
        videoRef.current.currentTime = start;
    };

    const ratio = "9:16";

    const deleteSegment = () => {
        deleteResourceSegment({ id: data._id }).then(res => {
            void message.success('删除成功')

            setOpen(false);
            onRefresh?.()
        })
    }

    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Modal
                width={'72%'}
                centered
                open={open}
                closable={false}
                onCancel={() => setOpen(false)}
                destroyOnHidden
                footer={null}
                bodyStyle={{ padding: 0, borderRadius: 16 }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 24,
                    padding: 24
                }}>
                    {/* 左侧：9:16 预览 */}
                    <div
                        style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            background: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 24
                        }}
                    >
                        <div style={{ width: '300px' }}>
                            <div style={{
                                width: '100%',
                                aspectRatio: '9 / 16',
                                position: 'relative',
                                borderRadius: 14,
                                overflow: 'hidden',
                                background: '#eee'
                            }}>
                                {videoUrl ? (
                                    <video
                                        ref={videoRef}
                                        controls
                                        poster={cached(coverUrl)}
                                        src={cached(videoUrl)}
                                        onTimeUpdate={handleTimeUpdate}
                                        onLoadedMetadata={handleLoadedMetadata}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={coverUrl}
                                        alt="cover" // eslint-disable-next-line
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        preview={false}
                                    />
                                )}

                                {/* 左下角时长角标 */}
                                <div style={{
                                    position: 'absolute',
                                    left: 8,
                                    bottom: 8,
                                    padding: '2px 8px',
                                    background: 'rgba(0,0,0,.7)',
                                    color: '#fff',
                                    fontSize: 12,
                                    borderRadius: 8
                                }}>
                                    {duration}
                                </div>
                            </div>

                            {/* 播放模式切换开关 */}
                            {timeEnd && (
                                <Space className={'mt-3'}>
                                    <span style={{ fontSize: 14, color: '#6b7280' }}>完整播放：</span>
                                    <Switch
                                        checked={playFullVideo}
                                        onChange={(checked) => {
                                            setPlayFullVideo(checked);
                                            if (videoRef.current) {
                                                // 切换模式时重置播放位置
                                                videoRef.current.currentTime = checked ? 0 : timeStart;
                                            }
                                        }}
                                    />
                                </Space>
                            )}
                        </div>
                    </div>

                    {/* 右侧：信息区 */}
                    <div className={'flex-col flex gap-3'} style={{ minWidth: 0 }}>
                        <Typography.Title level={4} style={{ margin: 0, lineHeight: 1.25 }}>
                            {data?.description}
                        </Typography.Title>

                        {/*<div style={{marginTop: 8, color: '#111827', fontWeight: 500, fontSize: 14}}>*/}
                        {/*    {data?.contentStyle}*/}
                        {/*</div>*/}

                        <Space wrap className={'flex-row items-center gap-2'}>
                            {
                                data?.tags?.map((tag, index) => (
                                    <Tag key={index} color="purple">{tag}</Tag>
                                ))
                            }
                        </Space>

                        {/* 关键属性 */}
                        <div style={{ marginTop: 16 }}>
                            <Space size={20} direction="vertical">
                                <Space size={16} wrap>
                                    <Space>
                                        <ClockCircleOutlined />
                                        <span>{duration}</span>
                                    </Space>
                                    <Space>
                                        <PictureOutlined />
                                        <span>纵横比：{ratio}</span>
                                    </Space>
                                </Space>

                            </Space>
                        </div>

                        {/* 商品/内容摘要 */}
                        {(root?.commodity?.name || data?.description) && (
                            <>
                                <Divider style={{ margin: '16px 0' }} />
                                <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6 }}>
                                    {root?.commodity?.name || data?.description}
                                </div>
                            </>
                        )}

                        {/* 高光帧（可选） */}
                        {Array.isArray(data?.highlightFrames) && data.highlightFrames.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-[#7150ff] rounded-full" />
                                    关键帧序列
                                </h3>
                                <div
                                    className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                    {data.highlightFrames?.map((f: any, i: number) => (
                                        <Tooltip key={i} title={f.desc}>
                                            <div
                                                className="relative flex-shrink-0 w-32 aspect-[2/3] rounded-xl overflow-hidden group cursor-pointer border border-gray-100">
                                                <img
                                                    src={f.url}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 视频片段分析 */}
                        {Array.isArray(data?.segments) && data.segments.length > 0 && (
                            <>
                                <Divider style={{ margin: '16px 0' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>片段分析</div>
                                    <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                                        {data.segments.map((seg: any, i: number) => (
                                            <div key={i} style={{
                                                flex: '0 0 240px',
                                                border: '1px solid #eee',
                                                borderRadius: 8,
                                                overflow: 'hidden',
                                                background: '#f9fafb'
                                            }}>
                                                <div style={{ display: 'flex' }}>
                                                    <div style={{ flex: 1, position: 'relative', height: 135 }}>
                                                        <Image
                                                            src={seg.startFrame}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            alt="Start"
                                                            className={'!rounded-none'}
                                                        />
                                                        <div style={{ position: 'absolute', bottom: 0, left: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, padding: '0 4px', borderTopRightRadius: 4, zIndex: 1 }}>
                                                            {formatDuration(seg.timeStart)}
                                                        </div>
                                                    </div>
                                                    <div style={{ width: 1, background: '#fff' }} />
                                                    <div style={{ flex: 1, position: 'relative', height: 135 }}>
                                                        <Image
                                                            src={seg.endFrame}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            alt="End"
                                                            className={'!rounded-none'}
                                                        />
                                                        <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, padding: '0 4px', borderTopLeftRadius: 4, zIndex: 1 }}>
                                                            {formatDuration(seg.timeEnd)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ padding: 8 }}>
                                                    <div style={{ fontSize: 12, color: '#374151', lineHeight: 1.4, height: 50, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }} title={seg.description}>
                                                        {seg.cameraMovementDesc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* 操作区 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                            <Button
                                type="default"
                                icon={<FileTextOutlined />}
                                onClick={() => setScriptOpen(true)}
                                disabled={!data?.script}
                            >
                                查看脚本
                            </Button>
                            <Button
                                type="default"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={deleteSegment}
                            >
                                {'删除片段'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal
                title="文案脚本"
                centered
                open={scriptOpen}
                onCancel={() => setScriptOpen(false)}
                footer={null}
                width={600}
                bodyStyle={{ maxHeight: '60vh', overflowY: 'auto' }}
            >
                <div style={{ fontSize: 16, lineHeight: 1.6, whiteSpace: 'pre-wrap', padding: '12px 0' }}>
                    {data?.script || '暂无脚本'}
                </div>
            </Modal>
        </>
    );
};

export default Detail;
