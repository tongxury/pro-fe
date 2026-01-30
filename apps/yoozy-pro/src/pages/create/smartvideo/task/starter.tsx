import PageContainer from "@/components/PageContainer";
import { Button, Input, Typography } from "antd";
import SelectorModal from "@/components/product/SelectorModal.tsx";
import React, { useState } from "react";
import { createTask } from "@/api/task.ts";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useGlobalState } from "@/providers/GlobalData";


const Page = () => {

    const router = useRouter();

    const [commodity, setCommodity] = useState<any>();
    const { refreshTaskList } = useGlobalState();

    const [creating, setCreating] = useState(false);

    const onCommodityConfirm = (item: any) => {
        setCommodity(item);
    }

    const onCreate = () => {
        setCreating(true);
        createTask({ commodityId: commodity._id }).then(res => {
            router.push("/create/smart-video/tasks/" + res.data._id);

            setCreating(false);

            refreshTaskList()
            // window.open(window.location.host + "/smart-video/tasks/" + res.data._id, '_blank');
        })
    }

    return (
        <div className="flex flex-col gap-8 items-center justify-center min-h-[80vh] py-12 px-4 animate-fade-in">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7150ff] to-[#5a3bc4]">
                    智能成片
                </h1>
                <p className="text-gray-500 text-lg">
                    选择商品，一键生成精彩视频
                </p>
            </div>

            <div className="w-full max-w-2xl">
                {!commodity ? (
                    <SelectorModal onConfirm={onCommodityConfirm}>
                        <div className="group relative w-full aspect-video bg-white rounded-3xl border-2 border-dashed border-gray-200 hover:border-[#7150ff]/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#7150ff]/0 to-[#7150ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:bg-[#7150ff]/10">
                                <svg className="w-8 h-8 text-gray-400 group-hover:text-[#7150ff] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="text-center relative z-10">
                                <h3 className="text-xl font-bold text-gray-700 group-hover:text-[#7150ff] transition-colors duration-300">添加商品</h3>
                                <p className="text-gray-400 text-sm mt-1">点击选择要推广的商品</p>
                            </div>
                        </div>
                    </SelectorModal>
                ) : (
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 animate-fade-in-up">
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Product Image */}
                            <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative overflow-hidden group">
                                {commodity.images && commodity.images.length > 0 ? (
                                    <img
                                        src={commodity.images[0]}
                                        alt={commodity.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl">
                                        📦
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Product Details */}
                            <div className="w-full md:w-3/5 p-8 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-[#7150ff]/10 text-[#7150ff] text-xs font-bold px-2.5 py-1 rounded-full">
                                            已选择
                                        </span>
                                        {commodity.brand && (
                                            <span className="text-gray-400 text-xs font-semibold px-2 py-1 rounded-full border border-gray-100">
                                                {commodity.brand}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 leading-tight">
                                        {commodity.title}
                                    </h2>
                                    {/* <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                                        {commodity.description || "暂无描述"}
                                    </p> */}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {/* Social proof or other elements if needed */}
                                    </div>
                                    <div className="flex gap-3 w-full">
                                        <SelectorModal onConfirm={onCommodityConfirm}>
                                            <Button size="large" className="bg-white border-gray-200 text-gray-600 hover:text-[#7150ff] hover:border-[#7150ff]">
                                                更换
                                            </Button>
                                        </SelectorModal>
                                        <Button
                                            type="primary"
                                            size="large"
                                            onClick={onCreate}
                                            loading={creating}
                                            className="flex-1 bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] border-none shadow-lg shadow-[#7150ff]/30 hover:shadow-[#7150ff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 h-11"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <span>立即生成</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
