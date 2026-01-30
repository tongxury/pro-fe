import { Asset } from "@/types";
import AssetView from "./views/AssetView";
import { ExportOutlined, ShoppingOutlined } from "@ant-design/icons";
import ProductDetail from "../product/Detail";


const AssetItem = ({ x, onUpdate }: { x: Asset, onUpdate?: (newItem?: any) => void }) => {
    return (
        <div>
            {
                x?.status?.endsWith("ing") ? (
                    <div className="block h-full relative">
                        <AssetView x={x} onUpdate={onUpdate} />
                    </div>
                ) : (
                    <a href={`/my-assets/${x._id}`} className="block h-full group relative">
                        <AssetView x={x} onUpdate={onUpdate} />
                        {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                            <div className="flex items-center gap-3 pointer-events-auto">
                                <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/20 shadow-lg cursor-pointer hover:bg-black/60 transition-all text-white">
                                    <ExportOutlined className="text-xl" />
                                </div>
                                {x?.commodity && (
                                    <div onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
                                        <ProductDetail id={x.commodity._id}>
                                            <div className="bg-black/40 backdrop-blur-sm p-3 rounded-full border border-white/20 shadow-lg cursor-pointer hover:bg-black/60 transition-all text-white">
                                                <ShoppingOutlined className="text-xl" />
                                            </div>
                                        </ProductDetail>
                                    </div>
                                )}
                            </div>
                        </div> */}
                    </a>
                )
            }

        </div>
    )
}

export default AssetItem