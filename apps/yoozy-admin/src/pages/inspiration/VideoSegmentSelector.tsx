import React, { useRef, useState, useEffect } from 'react';
import { Modal, Button, Slider, Space, Typography, List, message } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useMediaCacheFn } from "@/hooks/useMediaCache";

const { Text } = Typography;

interface Segment {
    start: number;
    end: number;
}

interface VideoSegmentSelectorProps {
    visible: boolean;
    videoUrl: string;
    onCancel: () => void;
    onConfirm: (segments: Segment[]) => void;
    initialSegments?: Segment[];
}

const VideoSegmentSelector: React.FC<VideoSegmentSelectorProps> = ({
    visible,
    videoUrl,
    onCancel,
    onConfirm,
    initialSegments = []
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const cached = useMediaCacheFn();
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(false);

    // Current selection range
    const [range, setRange] = useState<[number, number]>([0, 10]);

    // List of confirmed segments
    const [segments, setSegments] = useState<Segment[]>([]);

    useEffect(() => {
        if (visible) {
            const initSegs = initialSegments && initialSegments.length > 0 ? initialSegments : [];
            setSegments(initSegs);
            if (initSegs.length > 0) {
                setRange([initSegs[0].start, initSegs[0].end]);
                setCurrentTime(initSegs[0].start);
            } else {
                setRange([0, 10]);
                setCurrentTime(0);
            }
            setPlaying(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible, videoUrl]);

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            const vidDuration = videoRef.current.duration;
            setDuration(vidDuration);
            setRange([0, Math.min(10, vidDuration)]);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            setCurrentTime(time);

            // Auto-loop within range
            if (time >= range[1]) {
                videoRef.current.currentTime = range[0];
                // videoRef.current.play(); // Optional: keep playing from start
            }
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (playing) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const handleRangeChange = (value: number[]) => {
        const newRange = value as [number, number];
        setRange(newRange);
        if (videoRef.current) {
            videoRef.current.currentTime = newRange[0];
            // If dragging slider, maybe pause? 
        }
    };

    const addSegment = () => {
        setSegments([...segments, { start: range[0], end: range[1] }]);
    };

    const removeSegment = (index: number) => {
        const newSegments = [...segments];
        newSegments.splice(index, 1);
        setSegments(newSegments);
    };

    const handleConfirm = () => {
        if (segments.length === 0) {
            // If no segments manually added, but user clicks confirm, 
            // maybe they mean the current range? Or just the full video if unmodified?
            // Let's assume they must add at least one, OR we treat the current range as the one.
            // Better UX: if list is empty, add current range and confirm.
            onConfirm([{ start: range[0], end: range[1] }]);
        } else {
            onConfirm(segments);
        }
    };

    // Helper to format time (simple version if utils not available)
    const fmt = (t: number) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <Modal
            title="选择视频片段"
            open={visible}
            onCancel={onCancel}
            width={800}
            destroyOnHidden
            footer={[
                <Button key="cancel" onClick={onCancel}>取消</Button>,
                <Button key="confirm" type="primary" onClick={handleConfirm}>
                    确认 ({segments.length || 1})
                </Button>
            ]}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div className="relative bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                    <video
                        ref={videoRef}
                        src={cached(videoUrl)}
                        className="w-full h-full object-contain"
                        onLoadedMetadata={handleLoadedMetadata}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setPlaying(false)}
                    />
                    {!playing && (
                        <div
                            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                            onClick={togglePlay}
                        >
                            <PlayCircleOutlined style={{ fontSize: 48, color: 'white', opacity: 0.8 }} />
                        </div>
                    )}
                    {playing && (
                        <div
                            className="absolute inset-0 cursor-pointer"
                            onClick={togglePlay}
                        />
                    )}
                </div>

                {/* Controls */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <Text strong>截取片段 ({fmt(range[0])} - {fmt(range[1])})</Text>
                    </div>

                    <Slider
                        range
                        min={0}
                        max={duration}
                        step={0.1}
                        value={range}
                        onChange={handleRangeChange}
                        tooltip={{ formatter: (val) => fmt(val || 0) }}
                    />

                    <div className="flex justify-end mt-4">
                        <Button type="dashed" icon={<PlusOutlined />} onClick={addSegment}>
                            添加到列表
                        </Button>
                    </div>
                </div>

                {/* Segment List */}
                {segments.length > 0 && (
                    <List
                        size="small"
                        header={<Text strong>已选片段</Text>}
                        bordered
                        dataSource={segments}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeSegment(index)}
                                    />
                                ]}
                            >
                                <Space
                                    className="cursor-pointer hover:text-blue-500 transition-colors"
                                    onClick={() => {
                                        setRange([item.start, item.end]);
                                        if (videoRef.current) {
                                            videoRef.current.currentTime = item.start;
                                            videoRef.current.play();
                                            setPlaying(true);
                                        }
                                    }}
                                >
                                    <Text className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">
                                        片段 {index + 1}
                                    </Text>
                                    <Text>{fmt(item.start)} - {fmt(item.end)}</Text>
                                    <Text type="secondary" className="text-xs">
                                        (时长: {fmt(item.end - item.start)})
                                    </Text>
                                    <PlayCircleOutlined />
                                </Space>
                            </List.Item>
                        )}
                    />
                )}
            </Space>
        </Modal>
    );
};

export default VideoSegmentSelector;
