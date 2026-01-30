import React from 'react';
import { VideoCameraOutlined, ClockCircleOutlined, CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import useUrlState from '@ahooksjs/use-url-state';
import classNames from 'classnames';
import WorkflowList from './List';
import PageContainer from '@/components/PageContainer';

export default function MyWorkflow() {
    const [activeTab, setActiveTab] = useUrlState({ tab: 'all' });

    const tabs = [
        {
            key: 'all',
            icon: <VideoCameraOutlined />,
            label: '全部任务',
            component: (
                <WorkflowList status="" />
            ),
        },
        {
            key: 'processing',
            icon: <LoadingOutlined />,
            label: '正在运行',
            component: (
                <WorkflowList status="processing" />
            ),
        },
        {
            key: 'completed',
            icon: <CheckCircleOutlined />,
            label: '已完成',
            component: (
                <WorkflowList status="completed" />
            ),
        },
    ];

    return (
        <PageContainer title={'任务中心'}>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-[1600px] p-6  mx-auto flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold m-0 text-gray-800">任务中心</h1>
                            <div className="h-6 w-[1px] bg-gray-200"></div>
                            <span className="text-gray-500">监控和管理您的创意视频生成任务</span>
                        </div>

                        <div className="inline-flex bg-gray-100/80 p-1.5 rounded-xl border border-gray-100">
                            {tabs.map(tab => {
                                const isActive = activeTab.tab === tab.key;
                                return (
                                    <div
                                        key={tab.key}
                                        onClick={() => setActiveTab({ tab: tab.key })}
                                        className={classNames(
                                            "px-6 py-2 rounded-lg text-sm font-bold cursor-pointer transition-all duration-300 flex items-center gap-2 select-none",
                                            {
                                                "bg-white text-primary shadow-sm ring-1 ring-black/5": isActive,
                                                "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50": !isActive
                                            }
                                        )}
                                    >
                                        {tab.icon}
                                        {tab.label}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        {tabs.find(t => t.key === activeTab.tab)?.component}
                    </div>


                </div>

            </div>


        </PageContainer >
    );
}
