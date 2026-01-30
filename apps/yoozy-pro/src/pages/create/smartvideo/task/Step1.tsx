import React from "react";
import { Col, Row, Typography, Skeleton, Card, Tag } from "antd";

export default function Step1({ data, onChange, enable }: { data: any, onChange: (data: any) => void, enable?: boolean }) {

    if (!data) {
        return (
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                    <Skeleton active paragraph={{ rows: 4 }} />
                </div>
                <div className="flex flex-col gap-4">
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                    <Row gutter={[16, 16]}>
                        {[1, 2, 3].map(i => (
                            <Col span={8} key={i}>
                                <Skeleton.Node active style={{ width: '100%', height: 200 }} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 animate-fade-in">
            {/* 商品信息区域 */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-[#7150ff] to-[#a18aff] rounded-full"></div>
                    <p className="text-lg font-bold text-gray-800 tracking-tight">商品信息</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* 商品图片 - 左侧 */}
                        {data?.commodity?.images && data.commodity.images.length > 0 && (
                            <div className="w-full md:w-[200px] flex-shrink-0">
                                <div className="aspect-square rounded-xl overflow-hidden border border-gray-100 relative group">
                                    <img
                                        src={data.commodity.images[0]}
                                        alt={data?.commodity?.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {data.commodity.images.length > 1 && (
                                        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                                            +{data.commodity.images.length - 1}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 商品详情 - 右侧 */}
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                    {data?.commodity?.title}
                                </h3>
                                {data?.commodity?.brand && (
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full whitespace-nowrap">
                                        {data?.commodity?.brand}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                                {data?.commodity?.description}
                            </p>

                            <div className="mt-auto">
                                {data?.commodity?.tags && data.commodity.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data?.commodity?.tags?.map((tag: string, i: number) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>{enable ? 'true' : 'false'} {JSON.stringify(data?.targetChance)}</div> */}

            {/* 目标机会区域 */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-gradient-to-b from-[#7150ff] to-[#a18aff] rounded-full"></div>
                    <p className="text-lg font-bold text-gray-800 tracking-tight">选择目标机会</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.commodity?.chances?.map((x: any, index: number) => {
                        const isSelected = data?.targetChance?.targetAudience?.description === x.targetAudience?.description;

                        return (
                            <div
                                key={index}
                                onClick={() => enable ? onChange({
                                    targetChance: x,
                                    chanceIndex: index
                                }) : undefined}
                                className={`
                                    relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 overflow-hidden bg-white
                                    ${isSelected
                                        ? 'ring-2 ring-[#7150ff] ring-offset-2 shadow-xl translate-y-[-2px]'
                                        : `border border-gray-100 shadow-sm ${enable ? 'hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 cursor-pointer' : 'cursor-not-allowed'}`
                                    }
                                `}
                            >
                                {isSelected && (
                                    <div className="absolute top-0 right-0 z-10">
                                        <div className="bg-[#7150ff] text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-sm flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            已选择
                                        </div>
                                    </div>
                                )}

                                {/* 目标受众 */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#7150ff]/10 text-[#7150ff]' : 'bg-gray-100 text-gray-500'}`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-gray-800">目标受众</p>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2 min-h-[40px]">
                                        {x?.targetAudience?.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {x.targetAudience?.tags?.map((tag: string, idx: number) => (
                                            <span
                                                key={idx}
                                                className={`px-2 py-0.5 text-[11px] font-medium rounded-md border ${isSelected
                                                    ? 'border-[#7150ff]/20 text-[#7150ff] bg-[#7150ff]/5'
                                                    : 'border-gray-100 text-gray-500 bg-gray-50'
                                                    }`}
                                            >{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px w-full bg-gray-100/80"></div>

                                {/* 卖点 */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#7150ff]/10 text-[#7150ff]' : 'bg-gray-100 text-gray-500'}`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-gray-800">卖点策略</p>
                                    </div>
                                    {x.sellingPoints?.map((point: any, pointIndex: number) => (
                                        <div key={pointIndex} className="flex flex-col gap-2 mb-3 last:mb-0">
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                                {point?.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {point?.tags?.map((tag: string, tagIndex: number) => (
                                                    <span
                                                        key={tagIndex}
                                                        className={`px-2 py-0.5 text-[11px] font-medium rounded-md border ${isSelected
                                                            ? 'border-[#7150ff]/20 text-[#7150ff] bg-[#7150ff]/5'
                                                            : 'border-gray-100 text-gray-500 bg-gray-50'
                                                            }`}
                                                    >{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
