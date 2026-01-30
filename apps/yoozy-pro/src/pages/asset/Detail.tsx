import React, { ReactNode, useEffect, useState } from "react";

import { useRequest } from "ahooks";
import { getAsset, favorateAsset } from "@/api/asset.ts";
import { Drawer, Skeleton, Tag } from "antd";
import FavoriteButton from "@/components/Favorite";
import AssetCreator2 from "./edit/Creator2";
import AssetUpdater from "./edit/Updater";

const Detail = ({ id, reloadList, children }: { id: string, reloadList?: () => void, children: ReactNode }) => {
    const [open, setOpen] = useState(false);

    const { data: d, run, loading } = useRequest(() => getAsset({ id: id }), { manual: true })
    const data = d?.data

    useEffect(() => {
        if (open) {
            run()
        }
    }, [open])


    const renderContent = () => {
        if (loading || !d) {
            return <div className="h-full flex">
                {/* Left Panel: Video Studio (Light Theme) */}
                <div
                    className="w-[400px] xl:w-[480px] flex-shrink-0 bg-gray-50 flex flex-col z-20 relative h-full border-r border-gray-200">

                    {/* Generated Video Section */}
                    <div className="flex-1 flex flex-col min-h-0 relative">
                        <div
                            className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">

                            <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                                <Skeleton.Button active style={{ width: 320, height: 568, borderRadius: 16 }} />
                                <div className="w-full max-w-[320px] grid grid-cols-2 gap-3">
                                    <Skeleton.Button active block style={{ height: 40, borderRadius: 12 }} />
                                    <Skeleton.Button active block style={{ height: 40, borderRadius: 12 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Create Form */}
                <div className="flex-1 bg-white overflow-hidden relative">
                    <div className="flex flex-col h-full bg-white">
                        {/* 主内容区 */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="mx-auto p-7">
                                <div className="space-y-8 animate-fade-in">
                                    <div className="space-y-6">
                                        <Skeleton.Button active block style={{ height: 160, borderRadius: 16 }} />
                                        <Skeleton.Button active block style={{ height: 120, borderRadius: 16 }} />
                                        <Skeleton.Button active block style={{ height: 200, borderRadius: 16 }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }

        if (data?.status === "completed") {
            return <AssetUpdater
                data={data}
                onSuccess={() => {
                    setOpen(false);
                    reloadList()
                }} />;
        }

        return <AssetCreator2
            data={data}
            onSuccess={() => {
                setOpen(false);
                reloadList()
            }} />
    }



    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Drawer
                title={
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800">创作视频</span>
                        <Tag color="#7150ff"
                            className="rounded-full px-3 border-none bg-[#7150ff]/10 text-[#7150ff] font-normal">
                            AI 创作模式
                        </Tag>
                    </div>
                }
                extra={data?._id && (
                    <FavoriteButton
                        value={data.favorite}
                        onChange={async (newValue) => {
                            await favorateAsset({ id: data._id });
                            run(); // 刷新数据
                        }}
                    />
                )}
                width="80%"
                open={open}
                onClose={() => setOpen(false)}
                destroyOnHidden
                styles={{
                    body: { padding: 0, overflow: 'hidden' },
                    header: { borderBottom: 'none', padding: '16px 24px', background: '#fff' }
                }}
            >
                {renderContent()}
            </Drawer>
        </>
    );
};

export default Detail;
