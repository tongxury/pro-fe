import React, { ReactNode, useState } from "react";
import { Drawer, Tag } from "antd";
import { Commodity, Prompts, Segment } from "@/types.ts";
import AssetCreator from "@/pages/asset/create/Creator.tsx";


interface ContentProps {
    baseAssetId?: string;
    segment?: Segment;
    commodity?: Commodity;
    prompts?: Prompts;
    onOpen?: () => void;
    onSuccess?: (id: string) => void;
    onCreated?: (id: string) => void;
    children: ReactNode;
}

const AssetCreatorDrawer: React.FC<ContentProps> = ({ baseAssetId, segment, commodity, prompts, onOpen, onSuccess, onCreated, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="h-full w-full" onClick={() => {
                setOpen(true);
                onOpen()
            }}>{children}</div>
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
                width="80%"
                open={open}
                onClose={() => setOpen(false)}
                destroyOnHidden
                styles={{
                    body: { padding: 0, overflow: 'hidden' },
                    header: { borderBottom: 'none', padding: '16px 24px', background: '#fff' }
                }}
            >
                <AssetCreator
                    baseAssetId={baseAssetId}
                    prompts={prompts}
                    segment={segment}
                    commodity={commodity}
                    onSuccess={(id) => { onSuccess?.(id); setOpen(false) }}
                    onCreated={onCreated}
                />
            </Drawer>
        </>
    );
};

export default AssetCreatorDrawer;
