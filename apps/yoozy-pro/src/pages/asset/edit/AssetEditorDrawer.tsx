import { favorateAsset, getAsset } from "@/api/asset";
import Favorite from "@/components/Favorite";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useInterval, useRequest } from "ahooks";
import { Button, Drawer, Skeleton, Tag, Tooltip } from "antd";
import { ReactNode, useEffect, useState } from "react";
import AssetCreator2 from "./Creator2";
import AssetUpdater from "./Updater";
import AssetView from "../views/AssetView";


interface AssetEditorProps {
    assetId: string;
    children?: ReactNode
    onSuccess?: (id: string) => void
    fetchImediatly?: boolean

}

const AssetEditorDrawer: React.FC<AssetEditorProps> = ({ assetId, children, onSuccess, fetchImediatly }) => {

    const [open, setOpen] = useState(false);

    const { data: d, run, loading } = useRequest(
        () => getAsset({ id: assetId }),
        {
            manual: !fetchImediatly,
            refreshDeps: [assetId]
        })
    const data = d?.data

    useInterval(() => {
        if (data?.status !== 'completed' && open) {
            run()
        }

    }, 10000)

    useEffect(() => {
        if (open) {
            run();
        }
    }, [open])

    const renderContent = () => {

        if (loading && !data) {
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

        if (!data) {
            return <></>
        }


        if (data?.status === 'completed')
            return <AssetUpdater
                data={data}
                onSuccess={(id) => { onSuccess?.(id); setOpen(false) }}
            />

        return <AssetCreator2
            data={data}
            onSuccess={(id) => { onSuccess?.(id); setOpen(false) }}
        />
    }

    const renderView = () => {
        if (loading && !d) return <Skeleton.Button active block
            style={{ width: '100%', height: '100%', aspectRatio: '1/1' }} />
        return children || <AssetView x={data} />
    }


    return (
        <>
            <div onClick={() => setOpen(true)}>
                {
                    renderView()
                }
            </div>
            <Drawer
                title={
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800">视频创作</span>
                        <Tag color="#7150ff"
                            className="rounded-full px-3 border-none bg-[#7150ff]/10 text-[#7150ff] font-normal">
                            创作模式
                        </Tag>
                    </div>
                }
                extra={data?._id && data.status === 'completed' && (
                    <Favorite
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

export default AssetEditorDrawer
