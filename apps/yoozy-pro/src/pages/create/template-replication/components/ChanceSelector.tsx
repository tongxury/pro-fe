import React from "react";
import { Empty } from "antd";
import { ThunderboltFilled } from "@ant-design/icons";

interface ChanceSelectorProps {
    chances: any[];
    value?: any;
    onChange: (item: any, index: number) => void;
}

const ChanceSelector: React.FC<ChanceSelectorProps> = ({ chances, value, onChange }) => {

    if (!chances || chances.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                <Empty description="该商品暂无通过分析生成的机会点" />
            </div>
        )
    }

    return (
        <div className="p-6 overflow-y-auto h-full animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chances.map((x: any, index: number) => {
                    // Check if selected by comparing description or some unique ID if available
                    // Assuming value is the chance object itself
                    const isSelected = value?.targetAudience?.description === x.targetAudience?.description;

                    return (
                        <div
                            key={index}
                            onClick={() => onChange(x, index)}
                            className={`
                                relative flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 overflow-hidden bg-white
                                ${isSelected
                                    ? 'ring-2 ring-[#7150ff] ring-offset-2 shadow-xl translate-y-[-2px]'
                                    : 'border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 hover:-translate-y-1 cursor-pointer'
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

                            {/* Target Audience */}
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

                            {/* Selling Points */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#7150ff]/10 text-[#7150ff]' : 'bg-gray-100 text-gray-500'}`}>
                                        <ThunderboltFilled />
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
    );
};

export default ChanceSelector;
