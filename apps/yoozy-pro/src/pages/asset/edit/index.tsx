import { getAsset } from "@/api/asset";
import { useRouter } from "@/hooks/useRouter";
import { useInterval, useRequest } from "ahooks";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AssetCreator2 from "./Creator2";
import AssetUpdater from "./Updater";
import { useRequestData } from "@/hooks/useRequestData";

const AssetEditorPage = () => {
    const { id } = useParams<{ id: string }>();
    const assetId = id || "";

    const { data, run, loading } = useRequestData(
        () => getAsset({ id: assetId }),
        {
            ready: !!assetId,
        })

    useInterval(() => {
        if (data?.status !== 'completed') {
            run()
        }

    }, 10000)

    if (loading && !data) {
        return <div className="h-screen w-full flex bg-gray-50">
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

    if (!data) {
        return <></>
    }


    if (data?.status === 'completed')
        return <div className="h-screen w-full bg-white relative">
            <AssetUpdater
                data={data}
                onSuccess={(id) => {
                    // onSuccess?.(id); 
                }}
                onReload={() => {
                    run();
                }}
            />
        </div>

    return <div className="h-screen w-full bg-white relative">
        <AssetCreator2
            data={data}
            onSuccess={(id) => {
                // onSuccess?.(id);
            }}
        />
    </div>
};

export default AssetEditorPage;
