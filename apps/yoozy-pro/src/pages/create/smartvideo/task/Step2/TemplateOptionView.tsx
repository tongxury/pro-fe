import Detail from "@/pages/templates/Detail";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tag } from "antd";
import { useState } from "react";

export const TemplateOptionView = ({ x, defaultExpanded }: { x: any, defaultExpanded?: boolean }) => {

    return <div
        className={`p-5 flex flex-col gap-2`}
    >
        {/* 视频卡片头部 */}
        <div className="flex gap-4">
            {/* 视频信息 */}
            <div className="flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 flex-1 leading-tight">
                        {x?.commodity?.name || '未命名视频'}
                    </h3>
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
        <Detail itemId={x?._id}>
            <Button
                type="text"
                size="small"
                className={`
                            flex items-center gap-1 px-3 py-1 h-auto rounded-full transition-all duration-300
                            bg-[#7150ff]/5 text-[#7150ff] hover:bg-[#7150ff]/10
                        `}

            >
                <span className="text-xs font-medium">查看详情</span>
            </Button>
        </Detail>
    </div>
}
