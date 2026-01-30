import { Badge, Card, Col, Divider, Drawer, Image, Row, Select, Space, Statistic, Tag, Timeline, Typography } from "antd";

import { cloneElement, ReactElement, useEffect, useState } from "react";

import {
    BarChartOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    InfoCircleOutlined,
    PlayCircleOutlined,
    ShoppingOutlined,
    SoundOutlined,
    TagOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";

import { getTemplate } from "@/api/template";
import { useRequest } from "ahooks";
import { XFlex } from "@pro/ui";
import { useRequestData } from "@/hooks/useRequestData";
import DetailSkeleton from "./DetailSkeleton";
import { useMediaCacheFn } from "@/hooks/useMediaCache";
import { typedTagsConfig } from "@/consts";
import VideoSegment from "@/components/VideoSegment";

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

const Detail = ({ itemId, children }: { itemId: any; children: ReactElement }) => {
    const [open, setOpen] = useState(false);
    const cached = useMediaCacheFn();
    const { data, run, loading } = useRequestData(() => getTemplate({ id: itemId }), { ready: open });


    // 渲染分析概览
    const renderAnalysisOverview = () => {
        if (!data.analysis) return null;

        return (
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <BarChartOutlined />
                        <span>分析概览</span>
                    </div>
                }
                className="mb-4"
            >
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Statistic
                            title="镜头数量"
                            value={data.analysis.segments?.length || 0}
                            prefix={<VideoCameraOutlined />}
                            valueStyle={{ color: "#1890ff" }}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="总时长"
                            value={data.analysis.segments?.[data.analysis.segments.length - 1]?.timeEnd || 0}
                            suffix="秒"
                            prefix={<ClockCircleOutlined />}
                            valueStyle={{ color: "#52c41a" }}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="标签总数"
                            value={
                                data.analysis.segments?.reduce(
                                    (total: number, seg: any) => total + (seg.tags?.length || 0),
                                    0
                                ) || 0
                            }
                            prefix={<TagOutlined />}
                            valueStyle={{ color: "#faad14" }}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="分析状态"
                            value={data.analysis.status || "未知"}
                            prefix={<InfoCircleOutlined />}
                            valueStyle={{ color: "#722ed1" }}
                        />
                    </Col>
                </Row>

                {data.analysis.highlight && (
                    <div className="mt-4">
                        <Text strong className="text-sm">
                            分析亮点：
                        </Text>
                        <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                            <Text className="text-gray-700">{data.analysis.highlight}</Text>
                        </div>
                    </div>
                )}
            </Card>
        );
    };

    // 渲染分镜头详情
    const renderSegments = () => {
        if (!data?.segments) return null;

        return (
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <VideoCameraOutlined />
                        <span>分镜头详情</span>
                        <Badge count={data?.segments?.length || 0} style={{ backgroundColor: "#1890ff" }} />
                    </div>
                }
                className="mb-4"
            >
                <Timeline
                    items={data.segments.map((segment: any, index: number) => ({
                        children: (
                            <Card
                                size="small"
                                className="mb-3 bg-white border border-gray-200 rounded-lg"
                            >
                                {/* 镜头基本信息 */}
                                <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Text strong className="text-sm">
                                            镜头 {index + 1}
                                        </Text>
                                        {segment?.timeEnd !== undefined && (
                                            <Tag color="blue">
                                                {segment?.timeStart || 0}s - {segment.timeEnd}s
                                            </Tag>
                                        )}
                                        {segment.duration && <Tag color="green">时长: {segment.duration}s</Tag>}
                                    </div>
                                    <div className="flex gap-1">
                                        {segment?.category && <Tag color="default">{segment.category}</Tag>}
                                        {segment?.stage?.name && <Tag color="orange">{segment.stage?.name}</Tag>}
                                    </div>
                                </div>

                                {/* 镜头描述 */}
                                <div className="mb-3">
                                    <Text type="secondary" className="text-xs">
                                        描述：
                                    </Text>
                                    <Paragraph
                                        className="mt-1 text-sm leading-relaxed text-gray-700"
                                        style={{ margin: 0 }}
                                    >
                                        {segment.description}
                                    </Paragraph>
                                </div>

                                {/* 配音文案 */}
                                {segment.subtitle && (
                                    <div className="mb-3 p-2 bg-gray-50 rounded-md border border-gray-200">
                                        <div className="flex items-center gap-1 mb-1">
                                            <SoundOutlined className="text-blue-500" />
                                            <Text strong className="text-xs text-gray-500">
                                                配音文案
                                            </Text>
                                        </div>
                                        <div className="text-sm text-gray-700">
                                            {segment.subtitle}
                                        </div>
                                    </div>
                                )}

                                {/* 分类标签 */}
                                {segment.typedTags && (
                                    <div className="mb-3">
                                        <Text type="secondary" className="text-xs">
                                            分类标签：
                                        </Text>


                                        <div className="mt-2">
                                            {Object.entries(segment.typedTags).map(([category, tags]) => (
                                                <div key={category} className="mb-2">
                                                    <Text
                                                        className="text-xs text-gray-500 mr-2 inline-block min-w-[60px]">
                                                        {typedTagsConfig[category]?.name || category}
                                                        :
                                                    </Text>
                                                    <Space wrap size={[4, 4]}>
                                                        {Array.isArray(tags) &&
                                                            tags.map((tag: string, tagIndex: number) => (
                                                                <Tag key={tagIndex} color="cyan">
                                                                    {tag}
                                                                </Tag>
                                                            ))}
                                                    </Space>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* 关键帧展示 */}
                                {segment.highlightFrames?.length && (
                                    <XFlex gap={10}>
                                        {segment.highlightFrames?.map((x, i) => (
                                            <img
                                                key={i}
                                                src={cached(x.url)}
                                                className="rounded-lg w-24 object-contain"
                                                alt={`关键帧 ${i + 1}`}
                                            />
                                        ))}
                                    </XFlex>
                                )}
                            </Card>
                        )
                    }))}
                />
            </Card>
        );
    };

    // 渲染商品信息
    const renderCommodityInfo = () => {
        if (!data?.commodity) return null;

        return (
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <ShoppingOutlined />
                        <span>商品信息</span>
                    </div>
                }
                className="mb-4"
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <div className="mb-3">
                            <Text strong className="text-lg text-blue-500">
                                {data?.commodity?.name}
                            </Text>
                        </div>
                    </Col>
                </Row>

                {/* 商品标签 */}
                {data?.commodity?.tags && data?.commodity?.tags?.length > 0 && (
                    <>
                        <Divider className="my-4">商品标签</Divider>
                        <div>
                            <Space wrap size={[4, 4]}>
                                {data?.commodity?.tags?.map((tag: string, index: number) => (
                                    <Tag key={index} color="default">
                                        {tag}
                                    </Tag>
                                ))}
                            </Space>
                        </div>
                    </>
                )}
            </Card>
        );
    };

    // 渲染基本信息
    const renderBasicInfo = () => {
        return (
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <FileTextOutlined />
                        <span>基本信息</span>
                    </div>
                }
                className="mb-4"
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <div>
                            <Text type="secondary" className="text-xs">
                                ID
                            </Text>
                            <div className="mt-1">
                                <Text code className="text-xs">
                                    {data?._id}
                                </Text>
                            </div>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <Text type="secondary" className="text-xs text-gray-500">
                                状态
                            </Text>
                            <div className="mt-1">
                                <Badge
                                    status={data.status === "created" ? "processing" : "success"}
                                    text={data.status === "created" ? "处理中" : "已完成"}
                                />
                            </div>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <Text type="secondary" className="text-xs text-gray-500">
                                创建时间
                            </Text>
                            <div className="mt-1 text-sm text-gray-700">
                                {new Date(data.createdAt * 1000).toLocaleString("zh-CN")}
                            </div>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <Text type="secondary" className="text-xs text-gray-500">
                                更新时间
                            </Text>
                            <div className="mt-1 text-sm text-gray-700">
                                {data.updatedAt ? new Date(data.updatedAt * 1000).toLocaleString("zh-CN") : "未知"}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    };

    // 渲染媒体信息
    const renderMediaInfo = () => {
        return (
            <Card
                title={
                    <div className="flex items-center gap-2">
                        <PlayCircleOutlined />
                        <span>媒体信息</span>
                    </div>
                }
                className="mb-4"
            >
                <VideoSegment
                    className="w-50"
                    url={data?.url}
                    coverUrl={data?.coverUrl}
                />
            </Card>
        );
    };

    return (
        <>
            {cloneElement(children, {
                // @ts-ignore
                ...children?.props,
                onClick: () => {
                    setOpen(true);
                }
            })}

            <Drawer
                placement="right"
                destroyOnHidden
                width="70%"
                open={open}
                onClose={() => setOpen(false)}
                title={
                    <div className="flex items-center gap-2">
                        <TagOutlined />
                        <span>视频模板详情</span>
                    </div>
                }
            >
                <div className="px-4 flex flex-col gap-4">
                    {loading && !data ? (
                        <DetailSkeleton />
                    ) : (
                        <>
                            {renderMediaInfo()}
                            {renderCommodityInfo()}
                            {renderSegments()}
                        </>
                    )}
                </div>
            </Drawer>
        </>
    );
};

export default Detail;
