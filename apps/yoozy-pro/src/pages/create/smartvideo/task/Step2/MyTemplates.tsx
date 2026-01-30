import { listTemplates } from "@/api/template";
import CompositionInput from "@/components/CompositionInput";
import useUrlState from "@ahooksjs/use-url-state";
import { useRequest } from "ahooks";
import { Empty, Skeleton, Button } from "antd";
import { useEffect } from "react";
import { TemplateOptionView } from "./TemplateOptionView";

export const MyTemplates = ({ data, onChange }: {
    data: any,
    onChange: (data: any) => void,
}) => {
    const [params, setParams] = useUrlState({
        keyword: [].concat(
            data?.commodity?.tags || [],
            data?.targetChance?.sellingPoints?.[0]?.tags || [],
            data?.targetChance?.targetAudience?.tags || [],
        ).join(" "),
    });

    const { data: dr, loading } = useRequest(() => listTemplates({
        keyword: params?.keyword,
        returnFields: 'coverUrl,status,commodity.name',
        size: 6
    }), {
        refreshDeps: [params?.keyword],
        // debounceWait: 500
    })

    useEffect(() => {
        if (dr?.data?.list?.length > 0 && !data?.template) {
            onChange({
                template: dr?.data?.list?.[0]
            })
        }
    }, [dr])

    const handleSelect = (item: any) => {
        onChange({
            template: item
        })
    };

    const videoList = dr?.data?.list || [];

    return (
        <div className="flex flex-col gap-6 animate-fade-in">
            {/* 搜索框区域 */}
            <div className="w-full">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7150ff] to-[#a18aff] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative">
                        <CompositionInput
                            textarea
                            rows={2}
                            size={'large'}
                            value={params?.keyword}
                            onChangeText={text => setParams(prevState => ({ ...prevState, keyword: text }))}
                        />
                    </div>
                </div>
            </div>

            {/* 搜索结果区域 */}
            <div className="w-full">
                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                <div className="flex gap-4 mb-4">
                                    <Skeleton.Avatar active shape="square" size={64} />
                                    <div className="flex-1">
                                        <Skeleton active paragraph={{ rows: 1 }} title={{ width: '80%' }} />
                                    </div>
                                </div>
                                <Skeleton.Node active style={{ width: '100%', height: 120, borderRadius: 12 }} />
                            </div>
                        ))}
                    </div>
                ) : videoList.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <Empty description="暂无相关视频模板">
                            <Button type="primary" href="/templates" target="_blank">
                                去创建模板
                            </Button>
                        </Empty>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {videoList.map((item: any) => {
                            const isSelected = data?.template?._id === item._id;
                            return (
                                <div
                                    key={item._id}
                                    onClick={() => handleSelect(item)}
                                    className={`
                                        relative bg-white rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
                                        ${isSelected
                                            ? 'ring-2 ring-[#7150ff] ring-offset-2 shadow-xl translate-y-[-2px]'
                                            : 'border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 hover:-translate-y-1'
                                        }
                                    `}
                                >
                                    {/* 选中标记 */}
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

                                    <TemplateOptionView x={item} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
