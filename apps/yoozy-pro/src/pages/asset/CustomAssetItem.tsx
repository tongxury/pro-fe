import React, { useState } from "react";
import { Asset } from "@/types";
import { Modal } from "antd";
import VideoSegment from "@/components/VideoSegment";

import { useMediaCacheFn } from "@/hooks/useMediaCache";
import AssetRemark from "./components/AssetRemark";
import AssetDeleteAction from "./components/AssetDeleteAction";

const CustomAssetItem = ({ x, onUpdate }: { x: Asset, onUpdate?: (newItem?: any) => void }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cached = useMediaCacheFn();

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div onClick={handleOpen} className="group relative block w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-all">
                {x.coverUrl && (
                    <img
                        src={cached(x.coverUrl)}
                        alt="cover"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}
                {/* Simple hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <AssetRemark asset={x} onUpdate={onUpdate || (() => {})} isOverlay />
                <AssetDeleteAction asset={x} onUpdate={onUpdate || (() => {})} className="absolute top-3 right-3" />
            </div>

            <Modal
                title={null}
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                centered
                destroyOnClose
                closable={false}
                modalRender={(modal) => (
                    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
                        <div className="pointer-events-auto h-auto w-auto">
                            {modal}
                        </div>
                    </div>
                )}
                styles={{
                    mask: {
                        backdropFilter: 'blur(24px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    },
                    // @ts-ignore
                    content: {
                        background: 'transparent',
                        boxShadow: 'none',
                        padding: 0
                    }
                }}
            >
                <div className="relative flex flex-col items-center">
                    {/* Floating Close Button */}
                    <div
                        className="fixed top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/10 text-white z-50 group shadow-lg"
                        onClick={handleClose}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Video Container directly sized by height */}
                    <div
                        className="h-[80vh] aspect-[9/16] bg-black rounded-[24px] overflow-hidden shadow-2xl ring-1 ring-white/10 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {x.url ? (
                            <VideoSegment
                                url={x.url}
                                coverUrl={x.coverUrl}
                                className="w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/50 bg-[#0f0f11]">
                                <span>No video URL</span>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CustomAssetItem;
