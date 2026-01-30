import { useMediaCacheFn } from "@/hooks/useMediaCache";
import dayjs from "dayjs";

const SessionView = ({ x }: { x: any }) => {
    const cached = useMediaCacheFn();

    // 封面图（如果存在）
    const coverUrl = x?.coverUrl || x?.commodity?.coverUrl || x?.commodity?.medias?.[0]?.url;

    return (
        <div className="group relative cursor-pointer">
            <div className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-sm hover:shadow-md transition-all duration-300">
                {/* 图片 */}
                {coverUrl ? (
                    <img
                        src={cached(coverUrl)}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                        No Cover
                    </div>
                )}

                {/* 渐变遮罩 */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />

                {/* 底部信息栏 */}
                <div className="absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300 flex items-center justify-between">
                    {/* 创建时间 */}
                    {x?.createdAt && (
                        <div className="flex flex-col gap-1">
                            <div className="text-white/80 text-xs font-medium font-mono">
                                {dayjs(x.createdAt * 1000).format('MM-DD HH:mm')}
                            </div>
                        </div>
                    )}

                    {/* 商品缩略图 */}
                    {x.commodity && (
                        <div className="flex items-center gap-2 group/commodity z-20">
                            <div className="w-8 h-8 rounded-md overflow-hidden border border-white/20 bg-white/10 shadow-sm backdrop-blur-sm">
                                <img
                                    src={cached(x.commodity.coverUrl || x.commodity.images?.[0] || x.commodity.medias?.[0]?.url)}
                                    alt="commodity"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SessionView;
