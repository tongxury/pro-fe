import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useParams, useSearchParams } from "react-router";
import { useInterval, useRequest } from "ahooks";
import { getTask, updateTargetChance, updateTemplate } from "@/api/task.ts";
import { Col, Row, Typography, Button, Space, Steps, Spin } from "antd";
import Step1 from "./Step1.tsx";
import useUrlState from "@ahooksjs/use-url-state";
import Step2 from "./Step2/index.tsx";
import Step3 from "./Step3.tsx";

export default function Task() {

    const [params, setParams] = useUrlState()

    const { taskId } = useParams();
    const currentStep = useMemo(() => parseInt(params.currentStep || '0'), [params]);

    const { data: d, loading, run, mutate } = useRequest(
        () => getTask({
            id: taskId,
            returnFields: getFields(currentStep)
        }),
        {
            refreshDeps: [taskId, currentStep], // Refetch when step changes
        });

    const [tmpTask, setTmpTask] = useState<any>({});

    const task = useMemo(() => ({ ...d?.data, ...tmpTask, }), [d, tmpTask]);

    const step = useMemo(() => {
        if (task?.status === 'chanceSelecting') {
            return 0;
        }
        if (task?.status === 'templateSelecting') {
            return 1;
        }
        if (task?.status === 'generating') {
            return 2;
        }
        return 2;

    }, [task?.status]);

    const silentReload = async () => {
        const res = await getTask({
            id: taskId,
            returnFields: getFields(currentStep)
        })
        mutate(res);
    }

    useInterval(async () => {
        if (task?.status === 'textGenerating' || task?.status === 'generating') {
            silentReload();
        }

    }, 2000)

    function getFields(currentStep: number) {
        const fields = []; // Always fetch status
        if (currentStep === 0) {
            // Step 1: Select Selling Point
            fields.push(
                'status',
                'targetChance',
                'commodity.title',
                'commodity.brand',
                'commodity.images',
                'commodity.medias',
                'commodity.description',
                'commodity.tags',
                'commodity.chances'
            );
        } else if (currentStep === 1) {
            // Step 2: Select Template
            fields.push(
                'status',
                'template',
                'commodity.tags',
                'targetChance'
            );
        } else if (currentStep === 2) {
            // Step 3: Generate Video
            fields.push(
                // 此处的字段需要传递 不能只看用到了哪些字段
                'status',
                'mode',
                // 'segments', // Fetches full segments array including 'segment' details and 'subtitle'
                'subtitle',
                'assetId',
                'commodity',
                'segment._id',
                'segment.description',
                'segment.highlightFrames',
                'segment.root',
                'segment.typedTags',
                'segment.subtitle',
                'segment.timeStart',
                'segment.timeEnd',
                'generatedResult',
                // asset
                'url',
                "coverUrl",
                "commodity.medias",
                "createdAt",
            );
        }
        return fields.join(',');
    }

    const onChange = (value: any) => {
        setTmpTask(value)
        // mutate(prev => ({ ...prev, data: { ...prev?.data, ...value } }));
    };

    const updateCurrentStep = (current: number) => setParams((prev) => ({ ...prev, currentStep: current }))


    if (loading && !d) {
        return (
            <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-50 via-white to-[#7150ff]/5">
                {/* Animated background orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7150ff]/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#a18aff]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Loading content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Logo/Icon area with animated ring */}
                    <div className="relative">
                        {/* Spinning ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 border-4 border-transparent border-t-[#7150ff] border-r-[#a18aff] rounded-full animate-spin"></div>
                        </div>

                        {/* Center icon */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7150ff] to-[#a18aff] flex items-center justify-center shadow-lg shadow-[#7150ff]/20">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Loading text with dots animation */}
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-semibold text-gray-700">加载中</p>
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-[#7150ff] rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-[#7150ff] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                            <span className="w-2 h-2 bg-[#7150ff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }




    const steps = [
        {
            title: '选择卖点',
            disabled: false,
            component: <Step1 data={task} onChange={onChange} enable={task?.status === 'chanceSelecting'} />,
            action: <Button
                disabled={!(step === 0 && task.targetChance)}
                type="primary"
                onClick={() => {
                    updateTargetChance({ id: task._id, index: task?.chanceIndex }).then(res => {
                        silentReload();
                        updateCurrentStep(currentStep + 1)
                    })
                }}
            >
                确认卖点
            </Button>
        },
        {
            title: '选择模板',
            component: <Step2 data={task} onChange={onChange} enable={task?.status === 'templateSelecting'} />,

            disabled: ['chanceSelecting'].includes(task?.status),
            action: <Button
                disabled={!(step === 1 && task?.template)}
                type="primary"
                onClick={() => {
                    updateTemplate({ id: task._id, templateId: task?.template?._id }).then(res => {
                        silentReload();
                        updateCurrentStep(currentStep + 1)
                    })
                }}
            >
                确认模板
            </Button>
        },
        {
            title: '生成视频',
            component: <Step3 data={task} onChange={onChange} reload={silentReload} />,
            disabled: step !== 2,
        },
    ]

    return (
        <div className="h-full flex flex-col ">
            {/* 主内容区域 - 可滚动，底部留出操作栏空间 */}
            <div className="flex-1 overflow-y-auto p-6">
                {
                    loading ? (
                        <div className="w-full h-full flex items-center justify-center min-h-[400px]">
                            <Spin size="large" tip="Loading..." />
                        </div>
                    ) : (
                        steps[currentStep]?.component
                    )
                }
            </div>
            <div className="sticky bottom-0 py-1 bg-white border-t border-gray-200 z-10">
                <div className="px-4">
                    <div className="flex items-center gap-4">
                        <Steps
                            // type="dot"
                            type="navigation"
                            orientation="horizontal"
                            // size="small"
                            current={currentStep}
                            onChange={updateCurrentStep}
                            className="flex-1"
                            items={steps.map((x, i) => (
                                {
                                    title: x.title,
                                    status: i === step ? 'process' : (step > i ? 'finish' : 'wait'),
                                    disabled: x.disabled
                                } as any
                            ))}
                        />
                        {steps[currentStep]?.action}
                    </div>
                </div>
            </div>
        </div>
    );
}
