import React, { useState } from "react";
import PageContainer from "@/components/PageContainer";
import { Typography, Button, Skeleton, message, Modal, Avatar, Select } from "antd";
import { VideoCameraOutlined, ShoppingOutlined, ArrowRightOutlined, PlusOutlined, ThunderboltFilled, PlayCircleFilled, DownOutlined, LayoutOutlined } from "@ant-design/icons";
import useUrlState from "@ahooksjs/use-url-state";
import { useRequest } from "ahooks";
import { getTemplate } from "@/api/template";
import { getCommodity } from "@/api/task";
import { createAssetV2 } from "@/api/asset";
import ProductSelector from "@/pages/product/Selector";
import ChanceSelector from "@/pages/create/template-replication/components/ChanceSelector";
import classNames from "classnames";
import { useRouter } from "@/hooks/useRouter";
import Image from "@/components/Image";
import { createSessionV2 } from "@/api/session";
import TemplateSelector from "@/pages/templates/Selector";



const TemplateReplication = () => {
    const router = useRouter();
    const [urlState, setUrlState] = useUrlState({ templateId: undefined, productId: undefined, chanceIndex: undefined });
    const [showTemplateSelector, setShowTemplateSelector] = useState(false);
    const [showProductSelector, setShowProductSelector] = useState(false);
    const [showChanceSelector, setShowChanceSelector] = useState(false);
    const [workflowName, setWorkflowName] = useState("TemplateReplication");

    // Fetch Template Details
    const { data: templateData, loading: templateLoading, mutate: mutateTemplate } = useRequest(
        () => getTemplate({ id: urlState.templateId! }),
        {
            ready: !!urlState.templateId,
            refreshDeps: [urlState.templateId],
        }
    );

    // Fetch Product Details
    const { data: productData, loading: productLoading, mutate: mutateProduct } = useRequest(
        () => getCommodity({ id: urlState.productId! }),
        {
            ready: !!urlState.productId,
            refreshDeps: [urlState.productId],
        }
    );

    const template = templateData?.data;
    const product = productData?.data;

    // Auto-select first chance if product has chances and no chance is selected
    React.useEffect(() => {
        if (product?.chances?.length > 0 && urlState.chanceIndex === undefined) {
            setUrlState({ chanceIndex: 0 });
        }
    }, [product, urlState.chanceIndex]);

    // Get chance from product data based on chanceIndex
    const chance = (product?.chances && urlState.chanceIndex !== undefined) ? product.chances[Number(urlState.chanceIndex)] : undefined;

    const handleSelectTemplate = (item: any) => {
        setUrlState({ templateId: item._id });
        setShowTemplateSelector(false);
    };

    const handleSelectProduct = (item: any) => {
        // Reset chance when product changes, default to 0 if chances exist
        const defaultChanceIndex = item?.chances?.length > 0 ? 0 : undefined;
        setUrlState({ productId: item._id, chanceIndex: defaultChanceIndex });
        setShowProductSelector(false);
    };

    const handleSelectChance = (item: any, index: number) => {
        setUrlState({ chanceIndex: index });
        setShowChanceSelector(false);
    }

    const { run: runCreate, loading: createLoading } = useRequest(createSessionV2, {
        manual: true,
        onSuccess: (res) => {
            if (res.data) {
                message.success("任务创建成功");
                router.push(`/sessions/${res.data._id}`);
            }
        },
        onError: () => {
            message.error("创建任务失败，请重试");
        }
    });

    const reset = () => {
        setUrlState({ templateId: undefined, productId: undefined, chanceIndex: undefined });
        mutateTemplate();
        mutateProduct();
    }

    const handleCreate = () => {
        if (!template || !product) {
            message.warning("请完整选择视频模板和商品");
            return;
        }
        runCreate({
            commodityId: urlState?.productId!,
            templateId: urlState?.templateId!,
            targetChance: urlState?.chanceIndex !== undefined ? Number(urlState?.chanceIndex) : 0,
        });
    };

    const SelectionCard = ({
        title,
        icon: Icon,
        data,
        loading,
        onClick,
        type,
        placeholder,
        disabled = false,
        extraData
    }: {
        title: string;
        icon: any;
        data: any;
        loading: boolean;
        onClick: () => void;
        type: 'template' | 'product';
        placeholder: string;
        disabled?: boolean;
        extraData?: any;
    }) => {
        const isSelected = !!data;

        return (
            <div
                onClick={!disabled ? onClick : undefined}
                className={classNames(
                    "group relative w-full md:w-[400px] h-[520px] rounded-[32px] transition-all duration-500",
                    "border border-white/60 bg-white/40 shadow-xl backdrop-blur-md",
                    {
                        "cursor-pointer hover:-translate-y-2 hover:shadow-2xl": !disabled,
                        "cursor-not-allowed opacity-50 grayscale": disabled,
                        "ring-2 ring-purple-500/20 border-purple-500/30 bg-white/60": isSelected && !disabled,
                        "hover:border-purple-500/40 hover:bg-white/60": !isSelected && !disabled
                    }
                )}
            >
                <div className="h-full flex flex-col p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className={classNames(
                                "w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 shadow-sm",
                                isSelected ? "bg-gray-900 text-white" : "bg-white text-gray-400 group-hover:text-purple-600 group-hover:bg-purple-50"
                            )}>
                                <Icon />
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</span>
                                <span className={classNames("text-lg font-bold transition-colors", isSelected ? "text-gray-900" : "text-gray-500")}>
                                    {isSelected
                                        ? (type === 'template' ? '已选模板' : '已选商品')
                                        : '待选择'}
                                </span>
                            </div>
                        </div>
                        {isSelected && !disabled && (
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center animate-scale-in">
                                <PlusOutlined className="rotate-45" />
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 relative rounded-[24px] overflow-hidden bg-white border border-gray-100 group-hover:border-purple-100 transition-colors">
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                <Skeleton active paragraph={{ rows: 2 }} title={false} />
                            </div>
                        ) : isSelected ? (
                            <div className="w-full h-full relative group/image">
                                <Image
                                    src={type === 'template'
                                        ? (data.coverUrl || data.root?.coverUrl)
                                        : (data.coverUrl || data.images?.[0])
                                    }
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                                    wrapperClassName="w-full h-full"
                                />

                                {/* Info Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-300">
                                    <div className="text-xl font-bold mb-2 line-clamp-2 leading-tight">
                                        {type === 'template' ? (data.name || 'Video Template') : data.title}
                                    </div>

                                    {type === 'product' && (
                                        <div className="flex flex-col gap-2 mb-3">
                                            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                                                <ShoppingOutlined />
                                                <span>{data.brand || 'Brand'}</span>
                                            </div>

                                            {extraData && (
                                                <div
                                                    className="absolute inset-x-6 bottom-[80px] bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 cursor-pointer shadow-lg hover:bg-white/30 transition-all duration-300 group/chance animate-fade-in-up"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowChanceSelector(true);
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                                            <span className="text-[11px] uppercase font-bold text-purple-200 tracking-wider">切入机会</span>
                                                        </div>
                                                        <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full text-white font-medium group-hover/chance:bg-purple-500 transition-colors">更换</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-sm mb-1">
                                                        {extraData.targetAudience?.description}
                                                    </div>
                                                    {extraData.sellingPoints?.[0]?.description && (
                                                        <div className="text-xs text-white/80 line-clamp-1 leading-relaxed">
                                                            {extraData.sellingPoints?.[0]?.description}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-white/20 flex items-center gap-2 text-sm font-medium text-white/90 opacity-0 group-hover/image:opacity-100 transition-opacity delay-100">
                                        <span>点击更换{type === 'product' ? '商品' : ''}</span>
                                        <ArrowRightOutlined className="text-xs" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
                                <div className={classNames(
                                    "w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 transition-all duration-500",
                                    disabled ? "text-gray-200" : "shadow-purple-500/5 group-hover:scale-110 group-hover:shadow-purple-500/10 text-gray-300 group-hover:text-purple-500"
                                )}>
                                    <PlusOutlined className="text-3xl" />
                                </div>
                                <h3 className={classNames("text-lg font-bold mb-2", disabled ? "text-gray-400" : "text-gray-900")}>
                                    {placeholder}
                                </h3>
                                {!disabled && (
                                    <p className="text-gray-400 text-sm">
                                        点击打开选择器
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <PageContainer title="模板克隆">
            <div className="min-h-screen bg-[#f8f9ff] text-gray-900 overflow-hidden relative">
                {/* Ambient Background - Light Mode */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#7150ff]/5 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#00d2ff]/5 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/3" />

                <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col min-h-screen">

                    {/* Stage Area */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative animate-fade-in-up">
                            {/* Connection Line & Orb */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden md:flex items-center justify-center w-[600px]">
                                <div className={classNames(
                                    "h-[2px] w-full bg-gradient-to-r from-transparent via-[#7150ff]/20 to-transparent transition-opacity duration-500",
                                    (template && product) ? "opacity-100" : "opacity-0"
                                )} />
                            </div>

                            {/* Central Orb */}
                            <div
                                onClick={reset}
                                className={classNames(
                                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border-4 border-[#f8f9ff]",
                                    (template && product)
                                        ? "pointer-cursor bg-gradient-to-br from-[#7150ff] to-[#5b3adb] text-white shadow-xl shadow-[#7150ff]/30 scale-110"
                                        : "bg-white text-gray-200 shadow-sm"
                                )}>
                                <PlusOutlined className={classNames("text-2xl transition-transform duration-500", { "rotate-45": template && product })} />
                            </div>
                            <SelectionCard
                                title="核心商品"
                                icon={ShoppingOutlined}
                                data={product}
                                loading={productLoading}
                                onClick={() => setShowProductSelector(true)}
                                type="product"
                                placeholder="选择商品"
                                extraData={chance}
                            />
                            <SelectionCard
                                title="视频模板"
                                icon={LayoutOutlined}
                                data={template}
                                loading={templateLoading}
                                onClick={() => setShowTemplateSelector(true)}
                                type="template"
                                placeholder="选择模板"
                            />


                        </div>
                    </div>

                    {/* Bottom Action Bar - Light Mode */}
                    <div className="py-12 flex justify-center sticky bottom-8 z-50">
                        <div className={classNames(
                            "bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl rounded-full p-2 pr-8 flex items-center gap-4 transition-all duration-500 transform",
                            (template && product) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                        )}>
                            <Button
                                type="primary"
                                size="large"
                                shape="circle"
                                icon={<ArrowRightOutlined />}
                                onClick={handleCreate}
                                loading={createLoading}
                                className="w-14 h-14 !bg-gray-900 !text-white !border-none hover:!bg-black !shadow-lg flex items-center justify-center"
                            />
                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-gray-900 leading-none">
                                        开始生成
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400 mt-1">
                                    创建合成任务
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <Modal
                    title={<span className="text-lg font-bold">选择视频模板</span>}
                    open={showTemplateSelector}
                    onCancel={() => setShowTemplateSelector(false)}
                    width={1200}
                    footer={null}
                    destroyOnClose
                    centered
                    bodyStyle={{ height: 650, overflow: 'hidden', padding: 0 }}
                >
                    <div className="h-full bg-gray-50 flex flex-col">
                        <div className="flex-1 p-6 overflow-hidden">
                            <TemplateSelector onChange={handleSelectTemplate} value={template} />
                        </div>
                    </div>
                </Modal>

                <Modal
                    title={<span className="text-lg font-bold">选择核心商品</span>}
                    open={showProductSelector}
                    onCancel={() => setShowProductSelector(false)}
                    width={1200}
                    footer={null}
                    destroyOnClose
                    centered
                    bodyStyle={{ height: 650, overflow: 'hidden', padding: 0 }}
                >
                    <div className="h-full bg-gray-50 flex flex-col">
                        <div className="flex-1 p-6 overflow-hidden">
                            <ProductSelector onChange={handleSelectProduct} value={product} />
                        </div>
                    </div>
                </Modal>

                <Modal
                    title={<span className="text-lg font-bold">选择切入机会</span>}
                    open={showChanceSelector}
                    onCancel={() => setShowChanceSelector(false)}
                    width={1200}
                    footer={null}
                    destroyOnClose
                    centered
                    bodyStyle={{ height: 650, overflow: 'hidden', padding: 0 }}
                >
                    <div className="h-full bg-gray-50 flex flex-col">
                        <div className="flex-1 p-6 overflow-hidden">
                            <ChanceSelector
                                chances={product?.chances || []}
                                onChange={handleSelectChance}
                                value={chance}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        </PageContainer>
    );
};

export default TemplateReplication;
