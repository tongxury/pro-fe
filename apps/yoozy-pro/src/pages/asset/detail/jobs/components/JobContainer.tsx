import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { assetWorkflowJobConfig } from "@/consts";

// Job Components
import VideoGenerationsJob from "../VideoGenerationsJob";
import SegmentScriptJob from "../SegmentScriptJob";
import KeyFramesJob from "../KeyFramesJob";
import SegmentsRemixJob from "../SegmentsRemixJob";

interface JobContainerProps {
    job: any;
    asset: any;
    onRefresh: () => void;
    onConfirm?: (index: number) => void;
    onRetry?: (index: number) => void;
    onBack?: (index: number) => void;
}

const JobContainer: React.FC<JobContainerProps> = ({
    job,
    asset,
    onRefresh,
    onConfirm,
    onRetry,
    onBack,
}) => {
    const jobConfig = (assetWorkflowJobConfig as any)[job?.name] || {};
    const statusKey = (['completed', 'running', 'confirming', 'canceled'].includes(job?.status)) ? job.status : 'waiting';
    const statusConfig = jobConfig?.status?.[statusKey];

    const isCompleted = job.status === 'completed';
    const isRunning = job.status === 'running';
    const isConfirming = job.status === 'confirming';
    const isCanceled = job.status === 'canceled';

    // 根据 job.name 决定渲染哪个子组件
    const renderJobContent = () => {
        if (job.name === 'videoSegmentsGenerationJob' || job.name === 'videoGenerationJob') {
            return <VideoGenerationsJob job={job} data={job.dataBus?.videoGenerations || asset.workflow?.dataBus?.videoGenerations} asset={asset} onRefresh={onRefresh} editable={job.status === 'confirming' || job.status === 'running'} />;
        }
        if (job.name === 'segmentScriptJob') {
            return <SegmentScriptJob job={job} data={job.dataBus?.segmentScript || asset.workflow?.dataBus?.segmentScript} asset={asset} onRefresh={onRefresh} editable={isConfirming} />;
        }
        if (job.name === 'keyFramesGenerationJob') {
            return <KeyFramesJob job={job} data={job.dataBus?.keyFrames || asset.workflow?.dataBus?.keyFrames} asset={asset} onRefresh={onRefresh} editable={job.status === 'confirming' || job.status === 'running'} />;
        }
        if (job.name === 'videoSegmentsRemixJob') {
            return <SegmentsRemixJob job={job} data={job.dataBus?.remix || asset.workflow?.dataBus?.remix} asset={asset} onRefresh={onRefresh} editable={job.status !== 'completed'} />;
        }
        if (job.name === 'commodityAnalysisJob') {
            return <div>{JSON.stringify(job)}</div>;
        }
        return null;
    };

    const jobContent = renderJobContent();
    if (!jobContent) return null;

    // Fallbacks if config is missing
    const displayName = statusConfig?.name || job.status;
    const colorClass = statusConfig?.color || (isCompleted ? "text-green-600" : isRunning ? "text-blue-500" : isConfirming ? "text-yellow-600" : isCanceled ? "text-gray-400" : "text-gray-400");
    const bgClass = statusConfig?.bg || (isCompleted ? "bg-[#f6ffed]" : isRunning ? "bg-[#e6f7ff]" : isConfirming ? "bg-yellow-50" : isCanceled ? "bg-gray-50" : "bg-gray-50");
    const borderClass = isCompleted ? "border-[#b7eb8f]" : isRunning ? "border-[#91d5ff]" : isConfirming ? "border-yellow-200" : isCanceled ? "border-gray-100" : "border-gray-100";

    const handleConfirm = () => {
        onConfirm?.(job.index);
    }

    const handleRetry = () => {
        onRetry?.(job.index);
    }

    const handleBack = () => {
        onBack?.(job.index);
    }

    return (
        <div className={classNames(
            "p-3 rounded-lg border transition-all text-xs",
            bgClass,
            borderClass
        )}>
            {/* Common Job Header: Status & Time & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span className={classNames("font-bold text-xs leading-tight", colorClass)}>
                        {displayName}
                    </span>

                    {/* Timeline Info */}
                    <div className="flex items-center gap-2 ml-2 pl-4 border-l border-black/5 text-[10px] font-medium opacity-40">
                        {job.startedAt && (
                            <span>{dayjs.unix(job.startedAt).format('HH:mm:ss')}</span>
                        )}
                        {job.startedAt && job.completedAt && (
                            <span>-</span>
                        )}
                        {job.completedAt && (
                            <span>{dayjs.unix(job.completedAt).format('HH:mm:ss')}</span>
                        )}
                    </div>
                </div>

                {/* Actions Panel */}
                <div className="flex items-center gap-2 ">

                    {isConfirming && (
                        <>
                            <Button
                                type="primary"
                                className="bg-yellow-500 hover:bg-yellow-400 border-yellow-500 shadow-none text-[10px] font-bold h-6 px-3 rounded"
                                onClick={handleConfirm}
                            >
                                确认并下一步
                            </Button>
                            <Button
                                type="default"
                                className="bg-white hover:bg-gray-50 border-yellow-200 text-yellow-600 shadow-none text-[10px] font-bold h-6 px-2 rounded"
                                onClick={handleRetry}
                            >
                                重试
                            </Button>
                            {job.index > 0 && (
                                <Button
                                    type="default"
                                    className="bg-white hover:bg-gray-50 border-yellow-200 text-yellow-600 shadow-none text-[10px] font-bold h-6 px-2 rounded"
                                    onClick={handleBack}
                                >
                                    回到上一步
                                </Button>
                            )}

                        </>
                    )}
                </div>
            </div>

            {/* Job Specific Content */}
            <div className="relative">
                {jobContent}
            </div>
        </div>
    );
};

export default JobContainer;
