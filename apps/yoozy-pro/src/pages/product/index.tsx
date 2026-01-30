import React from "react";
import { List, Skeleton, message, Modal } from "antd";
import { ShoppingOutlined, DeleteOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteCommodity, listCommodities } from "@/api/task";
import PageContainer from "@/components/PageContainer";
import Create from "@/pages/product/Create.tsx";
import Detail from "@/pages/product/Detail.tsx";
import useQueryListWithPolling from "@/hooks/useQueryListWithPolling.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import classNames from 'classnames';

const Commodity = () => {
    const [params, setParams] = useUrlState<{ page: number; size: number; status?: string }>({ page: 1, size: 20 });

    const { list, total, initialLoading, reload } = useQueryListWithPolling<any, any>({
        service: listCommodities,
        params: {
            ...params,
            returnFields: [
                "status",
                "images",
                "title",
                "brand"
            ].join(",")
        },
        key: (item: any) => item._id,
        pollingFilter: (item: any) => item.status !== "completed",
    })

    const onDelete = (product: any, e: React.MouseEvent) => {
        e.stopPropagation();

        Modal.confirm({
            title: '确认删除',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <p>确定要删除商品 <strong>{product.title || '未命名商品'}</strong> 吗？</p>
                    <p className="text-gray-500 text-sm">此操作不可恢复</p>
                </div>
            ),
            okText: '确认删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                return deleteCommodity({ id: product._id }).then((res) => {
                    reload()
                    message.success('删除成功')
                });
            }
        });
    }

    return (
        <PageContainer title={'商品库'}>
            <div className="p-6 min-h-screen bg-gray-50">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold m-0 text-gray-800">商品库</h1>
                            <div className="h-6 w-[1px] bg-gray-200"></div>
                            <span className="text-gray-500">管理您的商品素材</span>
                        </div>

                        {/* Filter Tabs - Removed */}
                        <div className="flex items-center gap-4">
                            <Create onComplete={() => reload()} />
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-6">
                        {
                            initialLoading ? (
                                <List
                                    grid={{
                                        gutter: 24,
                                        xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5,
                                    }}
                                    dataSource={Array.from({ length: 12 }).map((_, index) => (index))}
                                    renderItem={(x: any) => (
                                        <List.Item>
                                            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                                <Skeleton.Button active block style={{ width: '100%', height: '200px' }} />
                                                <div className="p-4 space-y-3">
                                                    <Skeleton active paragraph={{ rows: 1 }} title={{ width: '60%' }} />
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            ) : !list?.length ? (
                                <div className="text-center py-20">
                                    <div className="text-6xl mb-4">📦</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">暂无商品</h3>
                                    <p className="text-gray-500">点击右上角"添加商品"开始创建</p>
                                </div>
                            ) : (
                                <List
                                    grid={{
                                        gutter: 24,
                                        xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 5,
                                    }}
                                    pagination={{
                                        onChange: (page, size) => {
                                            setParams((prev) => ({ ...prev, page, size }));
                                        },
                                        current: params.page,
                                        pageSize: params.size,
                                        total: total,
                                        showSizeChanger: true,
                                        showQuickJumper: true,
                                        pageSizeOptions: ['20', '50', '100'],
                                        align: 'center',
                                        className: 'mt-8'
                                    }}
                                    dataSource={list}
                                    renderItem={(product: any) => {
                                        const coverImage = product.images?.[0] || product.medias?.[0]?.url;
                                        const title = product.title || '未命名商品';
                                        const brand = product.brand || '未知品牌';
                                        const status = product.status;

                                        // State flags
                                        const isProcessing = status !== 'completed' && status !== 'failed';

                                        return (
                                            <List.Item>
                                                <Detail id={product._id}>
                                                    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative">
                                                        {/* Image Section - 4:3 Aspect Ratio */}
                                                        <div className="aspect-[4/3] w-full bg-gray-50 relative overflow-hidden">
                                                            {coverImage ? (
                                                                <img
                                                                    src={coverImage}
                                                                    alt={title}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                                    <ShoppingOutlined className="text-4xl text-gray-300" />
                                                                </div>
                                                            )}

                                                            {/* Status Badge - Floating on Image */}
                                                            {isProcessing && (
                                                                <div className="absolute top-3 left-3">
                                                                    <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#7150ff]/20 shadow-sm flex items-center gap-1.5">
                                                                        <SyncOutlined spin className="text-[#7150ff] text-xs" />
                                                                        <span className="text-[#7150ff] text-xs font-medium">处理中, 预计5分钟</span>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Delete Button - Top Right (Hover Only) */}
                                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        onDelete(product, e);
                                                                    }}
                                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition-colors border border-red-100"
                                                                >
                                                                    <DeleteOutlined />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Info Section - Always Visible */}
                                                        <div className="p-4">
                                                            <div className="mb-3">
                                                                <h3 className="font-bold text-gray-800 text-base line-clamp-1 mb-1 group-hover:text-[#7150ff] transition-colors" title={title}>
                                                                    {title}
                                                                </h3>
                                                                <div className="flex items-center gap-1.5">
                                                                    <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 text-xs font-medium inline-block">
                                                                        {brand}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#7150ff]/10 group-hover:text-[#7150ff] transition-colors">
                                                                    <ShoppingOutlined className="text-xs text-gray-400 group-hover:text-[#7150ff]" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Detail>
                                            </List.Item>
                                        );
                                    }}
                                />
                            )}
                    </div>
                </div>
            </div>

            {/* Custom Animations */}
            < style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}} />
        </PageContainer >
    );
};

export default Commodity;
