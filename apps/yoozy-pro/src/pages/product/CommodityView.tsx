import { Commodity } from "@/types.ts";
import { ShoppingOutlined, PictureOutlined, ProfileOutlined, BulbOutlined } from "@ant-design/icons";
import { useMediaCacheFn } from "@/hooks/useMediaCache";

interface CommodityViewProps {
    data: Commodity;
    expanded?: boolean;
}

const CommodityView = ({ data }: CommodityViewProps) => {
    const cached = useMediaCacheFn();

    if (!data) {
        return null;
    }

    return (
        <div className="bg-white min-h-full pb-10">
            {/* Hero Section - Header & Basic Info */}
            <div className="relative border-b border-gray-100 bg-gray-50/30 p-8 space-y-6">
                <div className="flex items-start justify-between gap-6">
                    <div className="space-y-2 flex-1">
                        <h4 className="text-2xl font-extrabold  leading-tight tracking-tight">
                            {data.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {data.brand && (
                                <span className="px-3 py-1 bg-white border border-gray-100 rounded-full text-xs font-bold text-[#7150ff] shadow-sm">
                                    {data.brand}
                                </span>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-12 max-w-4xl mx-auto">
                {/* description Area */}
                {data.description && (
                    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center">
                                <BulbOutlined className="text-purple-500" />
                            </div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">核心特征</h3>
                        </div>
                        <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 leading-relaxed text-gray-700 text-lg font-medium selection:bg-[#7150ff]/10">
                            {data.description}
                        </div>
                    </section>
                )}

                {/* Media Gallery */}
                {data?.images && data.images.length > 0 && (
                    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <PictureOutlined className="text-blue-500" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                                    素材图库 ({data.images.length})
                                </h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {data.images.map((image: string, index: number) => (
                                <div
                                    key={index}
                                    className="aspect-square relative group rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-zoom-in group"
                                >
                                    <img
                                        src={cached(image)}
                                        alt={`Product Image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default CommodityView;
