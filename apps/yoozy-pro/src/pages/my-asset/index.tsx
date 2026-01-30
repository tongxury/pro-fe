import React from 'react';
import { AppstoreOutlined, PieChartOutlined, VideoCameraOutlined, MoreOutlined } from '@ant-design/icons';
import useUrlState from '@ahooksjs/use-url-state';
import classNames from 'classnames';
import AssetList from '../asset/List';
import PageContainer from '@/components/PageContainer';
import SessionList from '../session/List';

export default function MyAsset() {
    const [activeTab, setActiveTab] = useUrlState({ tab: 'segmentReplication' });

    const tabs = [
        {
            key: 'templateReplication',
            icon: <PieChartOutlined />,
            label: '智能成片',
            component: (
                <SessionList
                />
            ),
        },
        {
            key: 'segmentReplication',
            icon: <VideoCameraOutlined />,
            label: '片段复刻',
            component: (
                <AssetList category="segmentReplication" />
            ),
        },
        {
            key: 'videoGeneration',
            icon: <VideoCameraOutlined />,
            label: '视频生成',
            component: (
                <AssetList category="videoGeneration" />
            ),
        },
        {
            key: 'custom',
            icon: <VideoCameraOutlined />,
            label: '原创',
            component: (
                <AssetList category="custom" />
            ),
        },
    ];

    return (
        <PageContainer title={'资产库'}>

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-[1600px] p-6  mx-auto flex flex-col gap-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold m-0 text-gray-800">灵感库</h1>
                            <div className="h-6 w-[1px] bg-gray-200"></div>
                            <span className="text-gray-500">发现和管理您的创意视频</span>
                        </div>
                        {/* Upload button removed as per "no new functionality" request, but layout is ready for it */}

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
