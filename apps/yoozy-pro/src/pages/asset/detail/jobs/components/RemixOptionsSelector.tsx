import React from "react";
import { Modal, Tabs } from "antd";
import { 
    CustomerServiceOutlined, 
    PictureOutlined, 
    FontSizeOutlined,
} from "@ant-design/icons";
import { FlowerSelector, FontSelector, ToneSelector } from "@/components/remix";
import Video from "@/components/Video";

interface RemixOptionsSelectorProps {
    open: boolean;
    onClose: () => void;
    onSelect: (type: 'flower' | 'font' | 'tone', item: any) => void;
    currentValues?: {
        flower?: string;
        font?: string;
        tone?: string;
    };
    videoUrl?: string;
    coverUrl?: string;
}

const RemixOptionsSelector: React.FC<RemixOptionsSelectorProps> = ({ 
    open, 
    onClose, 
    onSelect,
    currentValues,
    videoUrl,
    coverUrl
}) => {
    return (
        <Modal
            title={<div className="font-bold text-gray-800">定制混剪参数</div>}
            open={open}
            onCancel={onClose}
            footer={null}
            width={1000}
            centered
            bodyStyle={{ padding: '24px' }}
        >
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Video Preview */}
                <div className="w-full lg:w-[320px] aspect-[9/16] bg-black rounded-[32px] overflow-hidden shadow-2xl shrink-0 ring-8 ring-gray-50">
                    {videoUrl ? (
                        <Video 
                            src={videoUrl} 
                            poster={coverUrl} 
                            controls 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center gap-4 text-gray-500">
                            {coverUrl ? (
                                <img src={coverUrl} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                            ) : (
                                <PictureOutlined className="text-4xl opacity-20" />
                            )}
                            <span className="text-xs font-bold tracking-widest uppercase opacity-40 relative z-10">视频预览加载中</span>
                        </div>
                    )}
                </div>

                {/* Right Side: Options Tabs */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="bg-gray-50/50 rounded-[24px] border border-gray-100 p-2 flex-1">
                        <Tabs
                            defaultActiveKey="flower"
                            className="remix-options-tabs"
                            items={[
                                {
                                    key: 'flower',
                                    label: (
                                        <span className="flex items-center gap-2">
                                            <PictureOutlined /> 花字模板
                                        </span>
                                    ),
                                    children: (
                                        <div className="max-h-[550px] overflow-y-auto pr-2 custom-scrollbar pt-2 px-2">
                                            <FlowerSelector 
                                                value={currentValues?.flower} 
                                                onChange={(item) => onSelect('flower', item)} 
                                            />
                                        </div>
                                    )
                                },
                                {
                                    key: 'font',
                                    label: (
                                        <span className="flex items-center gap-2">
                                            <FontSizeOutlined /> 字体选择
                                        </span>
                                    ),
                                    children: (
                                        <div className="max-h-[550px] overflow-y-auto pr-2 custom-scrollbar pt-2 px-2">
                                            <FontSelector 
                                                value={currentValues?.font} 
                                                onChange={(item) => onSelect('font', item)} 
                                            />
                                        </div>
                                    )
                                },
                                {
                                    key: 'tone',
                                    label: (
                                        <span className="flex items-center gap-2">
                                            <CustomerServiceOutlined /> 配音音色
                                        </span>
                                    ),
                                    children: (
                                        <div className="max-h-[550px] overflow-y-auto pr-2 custom-scrollbar pt-2 px-2">
                                            <ToneSelector 
                                                value={currentValues?.tone} 
                                                onChange={(item) => onSelect('tone', item)} 
                                            />
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .remix-options-tabs .ant-tabs-nav {
                    padding: 0 16px;
                    margin-bottom: 16px;
                }
                .remix-options-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: var(--ant-primary-color);
                    font-weight: bold;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
            `}</style>
        </Modal>
    );
};

export default RemixOptionsSelector;
