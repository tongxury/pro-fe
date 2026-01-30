import { getCommodity } from "@/api/task";
import { useRequestData } from "@/hooks/useRequestData";
import { Drawer } from "antd";
import { useState } from "react";
import CommodityView from "./CommodityView";

const Detail = ({ id, children }: { id: string, children: React.ReactNode }) => {

    const [open, setOpen] = useState(false);

    const { data, loading } = useRequestData(
        () => getCommodity({ id }),
        {
            ready: open
        }
    );

    return (
        <div className="inline-block w-full h-full">
            <div onClick={() => setOpen(true)} className="w-full h-full cursor-pointer">{children}</div>
            <Drawer
                width={800}
                open={open}
                onClose={() => setOpen(false)}
                title={<span className="font-bold text-gray-800">商品详情</span>}
                styles={{ body: { padding: 0 } }}
            >
                {loading ? (
                    <div className="p-20 text-center">
                        <div className="animate-spin text-2xl text-[#7150ff] mb-4 inline-block">⏳</div>
                        <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">加载商品数据...</div>
                    </div>
                ) : (
                    <CommodityView data={data} expanded />
                )}
            </Drawer>
        </div>
    );
};

export default Detail;