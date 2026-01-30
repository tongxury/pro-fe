import { listAssets, listQualityAssets } from "@/api/asset"
import { useInfiniteScroll } from "ahooks"
import { Skeleton, Spin } from "antd"
import { PlayCircleFilled, LoadingOutlined } from "@ant-design/icons"
import { useRef, useState, useEffect } from "react"
import Detail from "./Detail"
import { useMediaCacheFn } from "@/hooks/useMediaCache"

export default function QualityAssetList() {

    const cached = useMediaCacheFn();

    const scrollRef = useRef<HTMLDivElement>(null)

    // Responsive Column Logic
    const [columns, setColumns] = useState<any[][]>([[], [], [], []]);
    const [columnCount, setColumnCount] = useState(4);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            let count = 1;
            if (width >= 1280) count = 4;
            else if (width >= 1024) count = 3;
            else if (width >= 768) count = 2;

            setColumnCount(count);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const getLoadMore = async (d: any) => {
        const currentPage = d ? Math.floor(d.list.length / 20) + 1 : 1

        const result = await listQualityAssets({
            page: currentPage,
            size: 20,
            returnFields: [
                'url',
                'coverUrl',
                'status',
                "commodity.medias",
                "commodity.title",
                "duration",
            ].join(",")
        })

        const newList = result?.data?.list || []
        const total = result?.data?.total || 0

        return {
            list: d ? [...d.list, ...newList] : newList,
            total,
        }
    }

    const { data, loading, loadingMore, noMore } = useInfiniteScroll(
        getLoadMore,
        {
            target: scrollRef,
            isNoMore: (d) => {
                if (!d) return false
                return d.list.length >= d.total
            },
            threshold: 300,
        }
    )

    const formatDuration = (s?: number) => {
        if (!s && s !== 0) return "00:00";
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const ss = Math.floor(s % 60).toString().padStart(2, "0");
        return `${m}:${ss}`;
    };

    const allAssets = data?.list || []

    useEffect(() => {
        if (!allAssets.length) return;

        const validAssets = allAssets.filter((asset: any) => {
            const coverUrl = asset?.coverUrl || asset.commodity?.medias?.[0]?.url || asset.commodity?.images?.[0]
            return !!coverUrl
        });

        const newColumns: any[][] = Array.from({ length: columnCount }, () => []);
        validAssets.forEach((asset: any, index: number) => {
            newColumns[index % columnCount].push(asset);
        });
        setColumns(newColumns);
    }, [allAssets, columnCount]);

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#7150ff]/5">
                <div className="max-w-[2000px] mx-auto p-4 md:p-8">
                    <div className="mb-8">
                        <Skeleton.Input active style={{ width: 200, height: 56, borderRadius: 16 }} />
                    </div>
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="mb-4 break-inside-avoid">
                                <Skeleton.Button
                                    active
                                    block
                                    style={{
                                        width: '100%',
                                        height: `${280 + (i % 3) * 120}px`,
                                        borderRadius: 20
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div ref={scrollRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#7150ff]/5 overflow-auto">
            <div className="max-w-[1600px] mx-auto p-4 md:p-8">

                {/* Homepage Hero Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] mb-6 tracking-tight">
                        精选作品
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        探索 AI 创作的精彩视频
                    </p>
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#7150ff]/50"></div>
                        <div className="w-2 h-2 rounded-full bg-[#7150ff] animate-pulse"></div>
                        <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#7150ff]/50"></div>
                    </div>
                </div>

                {/* Manual Masonry Layout */}
                <div className="flex gap-6 items-start">
                    {columns.map((columnAssets, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-6 flex-1 min-w-0">
                            {columnAssets.map((asset: any, itemIndex: number) => {
                                const index = colIndex + itemIndex * columnCount; // Reconstruct original index for consistent styling
                                const coverUrl = asset?.coverUrl || asset.commodity?.medias?.[0]?.url || asset.commodity?.images?.[0]
                                const title = asset.commodity?.title || asset.commodity?.brand || "Untitled"

                                // Generate unique color for each card
                                const hue = 251 + (index * 5) % 20 // Slight variation around #7150ff

                                // Create deterministic random height for masonry effect
                                // Range: 280px - 480px
                                const height = 280 + ((index * 137) % 200)

                                return (
                                    <Detail key={asset._id || index} id={asset._id}>
                                        <div
                                            className="group cursor-pointer break-inside-avoid w-full"
                                            style={{
                                                animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards',
                                                animationDelay: `${(index % 20) * 0.05}s`
                                            }}
                                        >
                                            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-2"
                                                style={{
                                                    boxShadow: `0 10px 40px -10px hsla(${hue}, 70%, 60%, 0.3)`
                                                }}
                                            >
                                                {/* Image Container - Variable Height */}
                                                <div className="relative overflow-hidden w-full" style={{ height: `${height}px` }}>
                                                    <img
                                                        src={cached(coverUrl)}
                                                        alt={title}
                                                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                                    />

                                                    {/* Gradient Overlay */}
                                                    <div
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                        style={{
                                                            background: `linear-gradient(to top, hsla(${hue}, 70%, 50%, 0.9) 0%, hsla(${hue}, 70%, 50%, 0.3) 50%, transparent 100%)`
                                                        }}
                                                    />

                                                    {/* Play Icon */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                        <div className="bg-white/20 backdrop-blur-2xl rounded-full p-6 transform scale-75 group-hover:scale-100 transition-all duration-500">
                                                            <PlayCircleFilled className="text-white text-5xl drop-shadow-2xl" />
                                                        </div>
                                                    </div>

                                                    {/* Premium Badge */}
                                                    <div className="absolute top-4 right-4">
                                                        <div
                                                            className="relative bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"
                                                            style={{
                                                                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)'
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                <span>精选</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Duration Badge */}
                                                    {asset?.duration && (
                                                        <div className="absolute bottom-4 left-4">
                                                            <div className="bg-black/60 backdrop-blur-xl text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                                </svg>
                                                                {formatDuration(asset.duration)}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info Section */}
                                                <div className="p-5">
                                                    <h3 className="font-bold text-lg text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#7150ff] group-hover:to-[#5a3bc4] transition-all duration-300">
                                                        {title}
                                                    </h3>

                                                    {/* Bottom Accent Line */}
                                                    <div
                                                        className="h-1 rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                                                        style={{
                                                            background: `linear-gradient(to right, hsla(${hue}, 70%, 60%, 1), hsla(${(hue + 60) % 360}, 70%, 60%, 1))`
                                                        }}
                                                    />
                                                </div>

                                                {/* Shine Effect on Hover */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                                </div>
                                            </div>
                                        </div>
                                    </Detail>
                                )
                            })}
                        </div>
                    ))}
                </div>

                {/* Loading More Indicator */}
                {loadingMore && (
                    <div className="flex justify-center items-center py-16">
                        <div className="flex items-center gap-4 bg-white rounded-2xl px-8 py-4 shadow-xl">
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#7150ff' }} spin />} />
                            <span className="text-gray-700 font-semibold text-lg">加载更多精彩作品...</span>
                        </div>
                    </div>
                )}

                {/* No More Data */}
                {noMore && allAssets.length > 0 && (
                    <div className="flex justify-center items-center py-16">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 text-gray-400 text-sm bg-white px-6 py-3 rounded-full shadow-lg">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                已加载全部 {allAssets.filter((asset: any) => {
                                    const coverUrl = asset?.url || asset.commodity?.medias?.[0]?.url || asset.commodity?.images?.[0]
                                    return !!coverUrl
                                }).length} 个作品
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && allAssets.length === 0 && (
                    <div className="text-center py-32">
                        <div className="inline-block p-16 bg-white rounded-3xl shadow-2xl">
                            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#7150ff]/10 to-[#7150ff]/20 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-[#7150ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-3">暂无作品</h3>
                            <p className="text-gray-500 text-lg">敬请期待更多精彩内容</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .columns-1 > div,
                .columns-2 > div,
                .columns-3 > div,
                .columns-4 > div {
                    animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
                }
            `}} />
        </div>
    )
}