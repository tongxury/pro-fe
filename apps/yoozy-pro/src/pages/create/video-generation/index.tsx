import React, { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Button, Input, message } from "antd";
import { ArrowRightOutlined, PictureOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { createAsset, createAssetV3 } from "@/api/asset";
import Uploader from "@/components/UploaderV6";
import { useRouter } from "@/hooks/useRouter";
import classNames from "classnames";

const VideoGeneration = () => {
    const router = useRouter();
    const [image, setImage] = useState<string>("");
    const [prompt, setPrompt] = useState<string>("");

    const { run: runCreate, loading: createLoading } = useRequest(createAssetV3, {
        manual: true,
        onSuccess: (res: any) => {
            if (res.data) {
                message.success("任务创建成功");
                router.push(`/asset-detail/${res.data._id}`);
            }
        },
        onError: () => {
            message.error("创建任务失败，请重试");
        }
    });

    const handleCreate = () => {
        if (!prompt) {
            message.warning("请输入提示词");
            return;
        }

        runCreate({
            prompt,
            images: image ? [image] : [],
        });
    };

    const isReady = !!prompt;

    return (
        <PageContainer title="视频生成">
            <div className="min-h-screen bg-[#f8f9ff] text-gray-900 overflow-hidden relative">
                {/* Ambient Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#7150ff]/5 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#00d2ff]/5 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/3" />

                <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col min-h-screen">
                    <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative max-w-5xl mx-auto w-full">

                        {/* Connector - Desktop */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden md:flex items-center justify-center w-[400px]">
                            <div className={classNames(
                                "h-[2px] w-full bg-gradient-to-r from-transparent via-[#7150ff]/20 to-transparent transition-opacity duration-500",
                                isReady ? "opacity-100" : "opacity-0"
                            )} />
                        </div>

                        {/* Central Orb */}
                        <div className={classNames(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-[#f8f9ff]",
                            isReady
                                ? "bg-gradient-to-br from-[#7150ff] to-[#5b3adb] text-white shadow-xl shadow-[#7150ff]/30 scale-110"
                                : "bg-white text-gray-200 shadow-sm"
                        )}>
                            <PlusOutlined className={classNames("text-lg transition-transform duration-500", { "rotate-45": isReady })} />
                        </div>


                        {/* Image Upload Card */}
                        <div className={classNames(
                            "group relative w-full md:w-[400px] h-[520px] rounded-[32px] transition-all duration-500 flex flex-col",
                            "border border-white/60 bg-white/40 shadow-xl backdrop-blur-md hover:-translate-y-2 hover:shadow-2xl",
                            { "ring-2 ring-purple-500/20 border-purple-500/30 bg-white/60": !!image }
                        )}>
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={classNames(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 shadow-sm",
                                        !!image ? "bg-gray-900 text-white" : "bg-white text-gray-400 group-hover:text-purple-600 group-hover:bg-purple-50"
                                    )}>
                                        <PictureOutlined />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">参考图片</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {image ? '已上传' : '上传图片'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-[24px] border border-gray-100 overflow-hidden relative">
                                    {image ? (
                                        <div className="w-full h-full relative group/img">
                                            <img src={image} className="w-full h-full object-cover" alt="reference" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button type="primary" onClick={() => setImage("")} className="bg-white/20 backdrop-blur border-white/40 text-white hover:bg-white/30">重新上传</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-8">
                                            <div className="w-full">
                                                <Uploader
                                                    max={1}
                                                    accept={'.jpg, .png'}
                                                    onUploaded={(data) => {
                                                        if (data?.[0]?.url) setImage(data[0].url);
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-4 text-gray-400 text-xs text-center">
                                                支持 JPG, PNG 格式<br />首图将作为视频生成的参考基准
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Text Prompt Card */}
                        <div className={classNames(
                            "group relative w-full md:w-[400px] h-[520px] rounded-[32px] transition-all duration-500 flex flex-col",
                            "border border-white/60 bg-white/40 shadow-xl backdrop-blur-md hover:-translate-y-2 hover:shadow-2xl",
                            { "ring-2 ring-purple-500/20 border-purple-500/30 bg-white/60": !!prompt }
                        )}>
                            <div className="p-6 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={classNames(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 shadow-sm",
                                        !!prompt ? "bg-gray-900 text-white" : "bg-white text-gray-400 group-hover:text-purple-600 group-hover:bg-purple-50"
                                    )}>
                                        <FileTextOutlined />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">提示词</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {prompt ? '已输入' : '输入描述'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-[24px] border border-gray-100 p-4 relative">
                                    <Input.TextArea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="描述您想要生成的视频内容..."
                                        className="!border-0 !shadow-none !p-0 !text-base !bg-transparent h-full !resize-none !text-gray-700 placeholder:text-gray-300 focus:!ring-0 leading-relaxed custom-scrollbar"
                                        style={{ height: '100%' }}
                                    />
                                    <div className="absolute bottom-4 right-4 text-xs text-gray-300 font-mono pointer-events-none">
                                        {prompt.length} chars
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Action */}
                    <div className="py-12 flex justify-center sticky bottom-8 z-50">
                        <div className={classNames(
                            "bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl rounded-full p-2 pr-8 flex items-center gap-6 transition-all duration-500 transform",
                            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                        )}>
                            <Button
                                type="primary"
                                size="large"
                                shape="circle"
                                icon={<ArrowRightOutlined />}
                                onClick={handleCreate}
                                loading={createLoading}
                                className="w-14 h-14 !bg-gray-900 !text-white !border-none hover:!bg-black !shadow-lg flex items-center justify-center"
                            />
                            <div className="flex flex-col text-left">
                                <span className="text-base font-bold text-gray-900 leading-none">开始生成</span>
                                <span className="text-xs text-gray-500 mt-1">视频生成预计消耗 10 积分</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageContainer>
    )
}

export default VideoGeneration  