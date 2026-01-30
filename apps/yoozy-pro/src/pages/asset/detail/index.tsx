import { useState, useMemo, useEffect, useCallback, Fragment } from "react";
import { getAsset, cancelAssetWorkflow, deleteAsset } from "@/api/asset";
import { useRequestData } from "@/hooks/useRequestData";
import { useParams, useNavigate } from "react-router";
import PageContainer from "@/components/PageContainer";
import { Steps, Card, Tag, Typography, Spin, Empty, Button, Modal, message, Image as AntdImage, Input } from "antd";
import {
    CheckCircleFilled,
    LoadingOutlined,
    ClockCircleOutlined,
    VideoCameraOutlined,
    ShoppingOutlined,
    PlayCircleFilled,
    PlayCircleOutlined,
    ExclamationCircleFilled,
    StopOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import dayjs from "dayjs";
import { aspectRatioConfig, assetWorkflowJobConfig, workflowConfig } from "@/consts";
import Image from "@/components/Image";
import { backWorkflowJob, cancelWorkflow, confirmWorkflowJob, retryWorkflowJob, updateWorkflowSettings, resumeWorkflow } from "@/api/workflow";

import ProductDetail from "@/pages/product/Detail";
import InspirationDetail from "@/pages/inspiration/DetailV2";
import { ArrowRightOutlined } from "@ant-design/icons";
import JobContainer from "./jobs/components/JobContainer";

const { Title } = Typography;

const InputCard = ({ title, icon: Icon, data, type }: any) => {
    if (!data) return null;

    const content = (
        <div className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 items-center cursor-pointer h-full">
            <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 relative group-hover:scale-[1.02] transition-transform duration-500 border border-gray-100/50">
                {type === 'video' ? (
                    <>
                        <Image
                            src={data?.root?.coverUrl || data?.coverUrl}
                            preview={false}
                            className="w-full h-full object-cover"
                            rootClassName="w-full h-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                            <PlayCircleFilled className="text-white text-2xl drop-shadow-lg" />
                        </div>
                    </>
                ) : (
                    <Image
                        src={data?.images?.[0] || data?.root?.coverUrl || data?.coverUrl}
                        preview={false}
                        className="w-full h-full object-cover"
                        rootClassName="w-full h-full"
                    />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 text-primary text-[10px] font-extrabold uppercase tracking-widest opacity-80 line-clamp-1">
                    <Icon className="text-xs" /> {title}
                </div>
                <div
                    className="font-extrabold text-gray-900 text-base line-clamp-1 mb-1 group-hover:text-primary transition-colors"
                    title={type === 'video' ? (data?.commodity?.name || data?.title) : data?.title}
                >
                    {type === 'video'
                        ? (data?.commodity?.name || data?.title || data?.description || "参考视频")
                        : (data?.title || "关联商品")}
                </div>
                <div className="text-xs text-gray-400 line-clamp-1 mb-2">{data?.description || "暂无描述"}</div>
                {/* <div className="flex gap-2">
                    {type === 'product' && data?.brand && (
                        <span className="px-2 py-0.5 bg-primary/5 text-primary rounded-md text-[10px] font-bold border border-primary/10 line-clamp-1">
                            {data.brand}
                        </span>
                    )}
                    {type === 'video' && data?.style && (
                        <span className="px-2 py-0.5 bg-blue-50 text-primary rounded-md text-[10px] font-bold border border-blue-100 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]" title={data.style}>{data.style}</span>
                    )}
                </div> */}
            </div>
            <div className="text-gray-300 group-hover:text-primary transition-colors pr-1">
                <ArrowRightOutlined />
            </div>
        </div>
    );

    if (type === 'product') {
        return <ProductDetail id={data._id}>{content}</ProductDetail>;
    }

    if (type === 'video') {
        return <InspirationDetail id={data._id}>{content}</InspirationDetail>;
    }

    return content;
};

const AssetEditorPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [pollingInterval, setPollingInterval] = useState<number | undefined>(2000);

    const { data: asset, loading, run, refresh } = useRequestData(
        () => getAsset({ id }),
        {
            ready: !!id,
            pollingInterval,
        }
    );

    // Update polling interval based on job status
    useEffect(() => {
        if (!asset) return;

        const hasConfirmingJob = asset?.workflow?.jobs?.some((job: any) => job.status === 'confirming');
        const hasRunningJob = asset?.workflow?.jobs?.some((job: any) => job.status === 'running' || job.status === 'waiting');
      
        const nextInterval = (hasRunningJob && !hasConfirmingJob) ? 3000 : undefined;

        if (nextInterval !== pollingInterval) {
            setPollingInterval(nextInterval);
            // If we just enabled polling, refresh once to ensure ahooks picks up the new interval
            if (nextInterval) {
                refresh();
            }
        }
    }, [asset?.workflow?.jobs, pollingInterval]);

    // Hooks MUST be at the top level and called in the same order
    const workflow = asset?.workflow;
    const dataBus = workflow?.dataBus;

    const commodity = useMemo(() => dataBus?.commodity, [dataBus]);
    const inspiration = useMemo(() => dataBus?.segment, [dataBus]);
    const generations = useMemo(() => dataBus?.videoGenerations || [], [dataBus]);
    const jobs = useMemo(() => workflow?.jobs || [], [workflow]);
    const currentStepIndex = useMemo(() => workflow?.current || 0, [workflow]);

    const handleConfirm = useCallback((index: number) => {
        Modal.confirm({
            title: '确认结果',
            icon: <ExclamationCircleFilled />,
            content: '确认当前生成结果并继续下一步吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    await confirmWorkflowJob({
                        id: asset.workflow._id,
                        index,
                    });
                    run();
                    message.success('已确认');
                } catch (e) {
                    message.error('提交失败，请重试');
                }
            }
        });
    }, [asset?.workflow?._id, run]);

    const handleRetry = useCallback((index: number, dataKeys?: string[]) => {
        Modal.confirm({
            title: '确认重新执行当前任务？',
            icon: <ExclamationCircleFilled />,
            content: '当前步骤以及后续步骤的所有任务数据将被清除，重新执行将生成新的数据。',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    await retryWorkflowJob({
                        id: asset?.workflow?._id,
                        index,
                    });
                    run();
                    message.success('重新执行成功');
                } catch (e) {
                    message.error('重新执行失败，请重试');
                }
            }
        });
    }, [asset?.workflow?._id, run]);

    const handleBack = useCallback((index: number) => {
        Modal.confirm({
            title: '确认回到上一步吗？',
            icon: <ExclamationCircleFilled />,
            content: '当前步骤的所有任务数据将被清除',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    await backWorkflowJob({
                        id: asset?.workflow?._id,
                        index,
                    });
                    run();
                    message.success('回到上一步成功');
                } catch (e) {
                    message.error('回到上一步失败，请重试');
                }
            }
        });
    }, [asset?.workflow?._id, run]);

    const handleCancelWorkflow = () => {
        Modal.confirm({
            title: '取消任务',
            icon: <ExclamationCircleFilled className="text-red-500" />,
            content: '确定要取消当前任务吗？取消后将停止所有未完成的步骤。',
            okText: '确认取消',
            okButtonProps: { danger: true },
            cancelText: '暂不取消',
            onOk: async () => {
                try {
                    await cancelWorkflow({ id: asset.workflow?._id });
                    run();
                    message.success('任务已取消');
                } catch (e) {
                    message.error('取消失败，请重试');
                }
            }
        });
    }

    const handleDeleteAsset = () => {
        Modal.confirm({
            title: '删除素材',
            icon: <ExclamationCircleFilled className="text-red-500" />,
            content: '确定要删除这个素材吗？删除后将无法恢复。',
            okText: '确认删除',
            okButtonProps: { danger: true },
            cancelText: '取消',
            onOk: async () => {
                try {
                    await deleteAsset({ id: asset._id });
                    message.success('素材已删除');
                    navigate('/my-assets');
                } catch (e) {
                    message.error('删除失败，请重试');
                }
            }
        });
    }

    const handleResumeWorkflow = useCallback(async (silent: boolean | any = false) => {
        const isSilent = silent === true;
        try {
            await resumeWorkflow({ id: asset.workflow?._id });
            run();
            if (!isSilent) message.success('任务已恢复');
        } catch (e) {
            if (!isSilent) message.error('恢复失败，请重试');
        }
    }, [asset?.workflow?._id, run]);

    // 自动恢复暂停的任务
    useEffect(() => {
        if (asset?.workflow?.status === 'paused') {
            handleResumeWorkflow(true);
        }
    }, [asset?.workflow?.status, handleResumeWorkflow]);

    const handleUpdateGlobalAspectRatio = async (ratio: string) => {
        try {
            await updateWorkflowSettings({
                id: asset.workflow?._id,
                data: {
                    settings: {
                        ...asset.workflow?.dataBus?.settings,
                        aspectRatio: ratio
                    },
                }
            });
            message.success(`全局比例已更新为 ${ratio}`);
            run();
        } catch (e) {
            message.error('更新失败');
        }
    }

    const renderJobStatus = useCallback((index: number, job: any) => {
        return (
            <JobContainer
                key={index}
                job={job}
                asset={asset}
                onRefresh={run}
                onConfirm={handleConfirm}
                onRetry={handleRetry}
                onBack={handleBack}
            />
        );
    }, [asset, run, handleConfirm, handleRetry]);

    const stepItems = useMemo(() => {
        return jobs.map((job: any, index: number) => {
            const jobConfig = assetWorkflowJobConfig[job.name as keyof typeof assetWorkflowJobConfig];
            return {
                title: <span className="font-semibold">{jobConfig?.label || job.name}</span>,
                status: job.status === 'completed' ? 'finish' : job.status === 'running' ? 'process' : 'wait',
                icon: job.status === 'completed' ? <CheckCircleFilled /> : job.status === 'running' ? <LoadingOutlined /> : job.status === 'canceled' ? <StopOutlined className="text-gray-400" /> : <ClockCircleOutlined />,
                description: renderJobStatus(index, job)
            }
        });
    }, [jobs, renderJobStatus]);

    if (loading && !asset) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Spin size="large" tip="Loading Asset Details..." />
            </div>
        );
    }

    if (!asset) return <Empty description="Asset not found" className="pt-20" />;


    return (
        <PageContainer title="任务详情">
            <div className="max-w-full mx-auto px-6 py-8 relative">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Tag color={workflowConfig?.status?.[workflow?.status]?.color} className="mr-0 px-3 py-0.5 text-sm rounded-full border-none font-semibold">
                                {workflowConfig?.status?.[workflow?.status]?.name}
                            </Tag>
                        </div>
                        <Title level={3} className="!mb-0 text-gray-800">
                            {commodity?.title ? `项目: ${commodity.title}` : "视频生成项目"}
                        </Title>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {workflow?.status !== 'completed' && workflow?.status !== 'canceled' && (
                            <Button
                                danger
                                icon={<StopOutlined />}
                                onClick={handleCancelWorkflow}
                                className="rounded-lg"
                            >
                                取消任务
                            </Button>
                        )}
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteAsset}
                            className="rounded-lg"
                        >
                            删除素材
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Workflow Timeline */}
                    <div className="lg:col-span-12 space-y-8">
                        {/* Inputs Display - Moved to Top */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {inspiration ? (
                                <InputCard title="参考视频" icon={VideoCameraOutlined} data={inspiration} type="video" />
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm opacity-60">
                                    <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100/50 flex-shrink-0">
                                        <VideoCameraOutlined className="text-2xl text-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-gray-400 text-xs font-extrabold uppercase tracking-widest mb-1">参考视频</div>
                                        <div className="text-gray-300 text-sm">未关联参考视频</div>
                                    </div>
                                </div>
                            )}
                            {commodity ? (
                                <InputCard title="关联商品" icon={ShoppingOutlined} data={commodity} type="product" />
                            ) : (
                                <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center shadow-sm opacity-60">
                                    <div className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100/50 flex-shrink-0">
                                        <ShoppingOutlined className="text-2xl text-gray-300" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-gray-400 text-xs font-extrabold uppercase tracking-widest mb-1">关联商品</div>
                                        <div className="text-gray-300 text-sm">未关联商品</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Card 
                            title="执行流程" 
                            extra={
                                <div className="flex items-center gap-2 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">全局比例:</span>
                                    <div className="flex gap-1">
                                        {Object.values(aspectRatioConfig).map(ratio => (
                                            <div
                                                key={ratio}
                                                onClick={() => handleUpdateGlobalAspectRatio(ratio)}
                                                className={classNames(
                                                    "px-2 py-0.5 rounded-md text-[9px] font-black cursor-pointer transition-all border relative",
                                                    dataBus?.settings?.aspectRatio === ratio
                                                        ? "bg-primary border-primary text-white shadow-[0_2px_8px_-1px_rgba(113,80,255,0.4)] scale-110 z-10"
                                                        : "bg-white border-gray-100 text-gray-400 hover:bg-gray-100"
                                                )}
                                            >
                                                {ratio}
                                                {dataBus?.settings?.aspectRatio === ratio && (
                                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center shadow-sm ring-1 ring-primary/10">
                                                        <CheckCircleFilled className="text-primary text-[8px]" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            className="shadow-sm border-gray-100 rounded-2xl bg-white" 
                            headStyle={{ borderBottom: '1px solid #f0f0f0' }}
                        >
                            <Steps
                                direction="vertical"
                                current={currentStepIndex}
                                size="small"
                                className="px-2"
                                items={stepItems}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default AssetEditorPage;
