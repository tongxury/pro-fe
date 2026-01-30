import React, { useState, ReactNode, useMemo } from 'react';
import PageContainer from '@/components/PageContainer';
import { Input, message, Spin, Typography, Radio, Segmented, Button, Modal, Form, Popconfirm } from 'antd';
import { useRequest, useDebounceEffect } from 'ahooks';
import { getPrompt, savePrompt, getPromptKeys } from '@/api/prompt';
import {
    CheckCircleFilled,
    LoadingOutlined,
    SyncOutlined,
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import useUrlState from "@ahooksjs/use-url-state";


import classNames from 'classnames';
import CompositionInput from "@/components/CompositionInput.tsx";

const { Title, Text } = Typography;

interface PromptEditorProps {
    type: string;
    title: string;
    description?: string;
    isActive: boolean;
    models: string[];
}

const PromptEditor = ({ type, title, description, isActive, models }: PromptEditorProps) => {

    const [content, setContent] = useState('');
    const [model, setModel] = useState<string>();
    const [isSaving, setIsSaving] = useState(false);

    const { data, loading, run: fetchPrompt, runAsync: fetchPromptAsync, mutate } = useRequest(() => getPrompt(type), {
        refreshDeps: [type],
    });


    const prompt = useMemo(() => {
        const d = data?.data?.prompts?.[type]

        return {
            ...d,
            content: content || d?.content,
            model: model || d?.model,
        }
    }, [data?.data, type, content, model]);


    // Auto-save effect
    useDebounceEffect(
        () => {
            // Skip if no user input (initial mount or cleared state)
            if (!content && !model) return;

            const u = async () => {
                setIsSaving(true);
                const newPrompt = await savePrompt({
                    // id: data?.data?._id,
                    prompts: {
                        [type]:
                        {
                            ...prompt,
                            content: prompt?.content,
                            //  model: prompt?.model ,
                            updatedAt: Math.floor(Date.now() / 1000)
                        }
                    }
                });

                mutate(newPrompt);
                setIsSaving(false);

            }
            if (prompt) {
                void u()
            }

        },
        [content, model],
        { wait: 1000 }
    );

    return (
        <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden transition-shadow hover:shadow-md h-full">
            {/* Toolbar */}
            <div
                className="h-16 px-6 border-b border-gray-100 flex items-center justify-between bg-white/50 backdrop-blur-sm z-10">
                {/* Left: Title */}
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold text-gray-900">{title}</div>
                        {description && <div className="text-xs text-gray-400 hidden sm:block">{description}</div>}
                    </div>


                    <div className="w-px h-4 bg-gray-200 hidden sm:block" />

                    <div className="flex items-center gap-2 min-w-[100px] justify-end">
                        {isSaving ? (
                            <>
                                <SyncOutlined spin className="text-purple-500 text-xs" />
                                <span className="text-xs text-gray-400">保存中...</span>
                            </>
                        ) : (
                            prompt?.updatedAt * 1000 ?
                                <>
                                    <CheckCircleFilled style={{ color: 'lightgreen' }} />
                                    <span
                                        className="text-xs text-gray-400">已保存 {dayjs(prompt?.updatedAt * 1000)?.fromNow()}</span>
                                </> :
                                <></>
                        )}
                    </div>
                </div>

                {/* Right: Model Selector & Status */}
                {/* <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span
                            className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:inline">选用模型</span>
                        <Radio.Group
                            value={prompt?.model}
                            onChange={(e) => setModel(e.target.value)}
                            className="flex bg-gray-50 p-0.5 rounded-lg border border-gray-200"
                            optionType="button"
                            buttonStyle="solid"
                        >
                            {
                                models?.map((x, i) => (
                                    <Radio.Button
                                        key={i}
                                        value={x}
                                        className={classNames(
                                            "!border-none !rounded-md !px-3 !h-7 !leading-[28px] !text-xs !font-medium transition-all",
                                            prompt?.model === x ? "!bg-white !text-purple-600 !shadow-sm" : "!bg-transparent !text-gray-500 hover:!text-gray-700"
                                        )}
                                    >
                                        {x}
                                    </Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </div>

                </div> */}
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative bg-gray-50/30">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                ) : (
                    <CompositionInput
                        value={prompt?.content}
                        onChangeText={(e) => setContent(e)}
                        placeholder={`在此输入 ${title} 的 AI 提示词内容...`}
                        textarea
                        variant={'borderless'}
                        style={{
                            height: '100%',
                            padding: 15,
                            // resize: 'none',
                            // fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                            // fontSize: '14px',
                            // lineHeight: '1.6',
                            // padding: '32px',
                            // backgroundColor: 'transparent',
                            // border: 'none',
                            // outline: 'none',
                            // boxShadow: 'none'
                        }}
                        className="text-gray-700 placeholder:text-gray-300 focus:ring-0"
                        allowClear={false}
                    />
                )}
            </div>
        </div>
    );
};

const PromptManagement = () => {
    const { data: keysData, loading: keysLoading, refresh: refreshKeys } = useRequest(getPromptKeys);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isCreating, setIsCreating] = useState(false);

    const tabs = useMemo(() => {
        const prompts = keysData?.data?.prompts || {};
        return Object.keys(prompts).map(key => {
            const apiPromptData = prompts[key] || {};

            return {
                value: key,
                label: apiPromptData.title || key,
                description: apiPromptData.description,
                models: ['gemini', 'seed']
            };
        });
    }, [keysData]);

    const [activeTab, setActiveTab] = useUrlState({ tab: 'videoTemplate' });

    const currentTab = useMemo(() => {
        if (!tabs.length) return null;
        return tabs.find(tab => tab.value === activeTab?.tab) || tabs[0];
    }, [activeTab, tabs]);

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            setIsCreating(true);
            await savePrompt({
                prompts: {
                    [values.key]: {
                        title: values.title,
                        description: values.description,
                        content: '',
                        updatedAt: Math.floor(Date.now() / 1000)
                    }
                }
            });
            message.success('创建成功');
            setIsModalOpen(false);
            form.resetFields();
            refreshKeys();
        } catch (error) {
            console.error('Failed to create prompt:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (key: string) => {
        try {
            await savePrompt({
                deletePrompts: [key]
            });
            message.success('删除成功');
            refreshKeys();
        } catch (error) {
            console.error('Failed to delete prompt:', error);
            message.error('删除失败'); // Actually the interface might succeed even if it looks like failure, but let's be positive or fix the message
        }
    };

    if (keysLoading) {
        return (
            <PageContainer title={'AI 提示词管理'}>
                <div className="flex items-center justify-center h-[calc(100vh-140px)]">
                    <Spin size="large" />
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer title={'AI 提示词管理'}>
            <div className="max-w-[1400px] mx-auto w-full py-6 px-8 flex flex-col h-[calc(100vh-70px)]">

                <div className="flex-1 flex gap-4 min-h-0">
                    {/* Left Sidebar: Tab List */}
                    <aside className="w-52 flex flex-col min-h-0">
                        {/* Add Button at Top */}
                        <div className="pb-4 border-b border-gray-100 mb-2">
                            <Button
                                type="dashed"
                                icon={<PlusOutlined />}
                                block
                                onClick={() => setIsModalOpen(true)}
                                className="!rounded-xl !h-10 border-gray-200 text-gray-500 hover:!text-purple-600 hover:!border-purple-200"
                            >
                                添加共用
                            </Button>
                        </div>

                        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar pt-2">
                            {tabs.map(tab => {
                                const isActive = currentTab?.value === tab.value;
                                return (
                                    <div
                                        key={tab.value}
                                        onClick={() => setActiveTab({ tab: tab.value })}
                                        className={classNames(
                                            "group relative flex flex-col gap-0.5 px-4 py-3 rounded-xl cursor-pointer transition-all border shrink-0",
                                            isActive
                                                ? "bg-purple-50 border-purple-100 text-purple-600 shadow-sm"
                                                : "bg-white border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-100"
                                        )}
                                    >
                                        <div className="font-bold text-[13px] pr-6">{tab.label}</div>
                                        {/* <div className="text-[9px] opacity-60 truncate font-medium uppercase tracking-wider">
                                            {tab.value}
                                        </div> */}

                                        <Popconfirm
                                            title="确定要删除这个提示词吗？"
                                            onConfirm={(e) => {
                                                e?.stopPropagation();
                                                handleDelete(tab.value);
                                            }}
                                            onCancel={(e) => e?.stopPropagation()}
                                            okText="确定"
                                            cancelText="取消"
                                            okButtonProps={{ danger: true }}
                                        >
                                            <div
                                                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <DeleteOutlined style={{ fontSize: '14px' }} />
                                            </div>
                                        </Popconfirm>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Right Content Area: Editor */}
                    <div className="flex-1 min-h-0 pb-6">
                        {currentTab && (
                            <PromptEditor
                                key={currentTab.value}
                                type={currentTab.value}
                                title={currentTab.label}
                                models={currentTab.models}
                                description={currentTab.description}
                                isActive={true}
                            />
                        )}
                        {!currentTab && !keysLoading && (
                            <div className="flex items-center justify-center h-full bg-white rounded-2xl border border-dashed border-gray-200">
                                <Text type="secondary">请选择一个提示词模板进行配置</Text>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                title="添加共用提示词"
                open={isModalOpen}
                onOk={handleCreate}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={isCreating}
                okText="确认创建"
                cancelText="取消"
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="mt-4"
                >
                    <Form.Item
                        name="key"
                        label="唯一标识 (Key)"
                        rules={[{ required: true, message: '请输入唯一标识' }]}
                        extra="例如: common_v1"
                    >
                        <Input placeholder="输入英文标识..." />
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="显示标题"
                        rules={[{ required: true, message: '请输入显示标题' }]}
                    >
                        <Input placeholder="例如: 通用文案生成" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="描述"
                    >
                        <Input.TextArea placeholder="可选: 输入该提示词的用途说明..." />
                    </Form.Item>
                </Form>
            </Modal>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}</style>
        </PageContainer>
    );
};

export default PromptManagement;

