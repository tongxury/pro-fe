import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tag } from "antd";
import { useState } from "react";

export const TemplateOptionView = ({ x, defaultExpanded }: { x: any, defaultExpanded?: boolean }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return <div
        className={`p-5 flex flex-col gap-4`}
    >
        {/* 视频卡片头部 */}
        <div className="flex gap-4">
            {/* 视频信息 */}
            <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1 leading-tight">
                        {x?.commodity?.name || '未命名视频'}
                    </h3>
                    <Button
                        type="text"
                        size="small"
                        className={`
                            flex items-center gap-1 px-3 py-1 h-auto rounded-full transition-all duration-300
                            ${expanded
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : 'bg-[#7150ff]/5 text-[#7150ff] hover:bg-[#7150ff]/10'
                            }
                        `}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}
                    >
                        <span className="text-xs font-medium">{expanded ? '收起详情' : '查看详情'}</span>
                        {expanded ? <UpOutlined className="text-[10px]" /> : <DownOutlined className="text-[10px]" />}
                    </Button>
                </div>
                {/* 标签 */}
                {x?.commodity?.tags && x?.commodity.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {x?.commodity?.tags?.map((tag: string, idx: number) => (
                            <Tag
                                key={idx}
                                bordered={false}
                                className="mr-0 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-md"
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* 分段预览 - 横向滑动 */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${expanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
            <div className="">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-gray-700">
                        视频分段 ({x?.segments?.length || 0})
                    </h4>
                </div>
                <div className="overflow-x-auto scrollbar-hide pb-2">
                    <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
                        {x?.segments?.map((segment: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex-shrink-0 hover:border-gray-200 transition-colors"
                                style={{ width: '280px' }}
                            >
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span
                                        className="px-2.5 py-1 text-xs font-medium bg-[#7150ff]/10 text-[#7150ff] rounded-md">
                                        分段 {idx + 1}
                                    </span>
                                    {segment?.timeStart !== undefined && segment?.timeEnd !== undefined && (
                                        <span
                                            className="text-xs font-mono text-gray-400 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-gray-100">
                                            {segment?.timeStart}s - {segment?.timeEnd}s
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-bold text-gray-800 mb-1.5 line-clamp-1">
                                    {segment.subtitle || `分段 ${idx + 1}`}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed h-[32px]">
                                    {segment.description}
                                </p>
                                {segment.style && (
                                    <span className="text-xs text-gray-400 block mb-2">
                                        风格: {segment.style}
                                    </span>
                                )}

                                {/* highlightFrames 展示区域 - 紧凑版 */}
                                {segment?.highlightFrames && (
                                    <Row gutter={[8, 8]}>
                                        {segment?.highlightFrames?.slice(0, 3).map((frame: any, index: number) => (
                                            <Col key={index} span={8}>
                                                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-gray-200 relative group">
                                                    <img
                                                        className={'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'}
                                                        src={frame?.url}
                                                        alt={`frame-${index}`}
                                                    />
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    </div>
}
