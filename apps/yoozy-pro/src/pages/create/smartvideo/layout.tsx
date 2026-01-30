import React, { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router";

import { MenuUnfoldOutlined, MenuFoldOutlined, PlusOutlined } from "@ant-design/icons";

import PageContainer from "@/components/PageContainer";

import TaskList from "./task/List";

import { Button, Typography } from "antd";
import { useRouter } from "@/hooks/useRouter";


const HomeLayout = () => {

    const { pathname } = useLocation()
    const router = useRouter()

    const [collapsed, setCollapsed] = useState(pathname === '/create/smart-video/starter');


    return (

        <PageContainer title={'智能成片'}>

            <div className="flex h-[calc(100vh-70px)] ">

                {/* 左侧卡片 */}

                {collapsed ? (
                    // 折叠状态：只显示一个按钮
                    <div className="flex flex-col items-center py-4 px-2 border-r border-gray-100 bg-white">
                        <Button
                            type="text"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setCollapsed(false)}
                            title="展开历史记录"
                            className="flex items-center justify-center text-gray-500 hover:text-[#7150ff]"
                        />
                        <div className="mt-4 w-8 h-[1px] bg-gray-100"></div>
                        <Button
                            type="text"
                            icon={<PlusOutlined />}
                            onClick={() => router.push('/create')}
                            title="新建任务"
                            className="mt-4 flex items-center justify-center text-gray-500 hover:text-[#7150ff]"
                        />
                    </div>
                ) : (
                    // 展开状态：显示完整内容
                    <div className="flex flex-col w-[220px] border-r border-gray-100 bg-white transition-all duration-300">
                        <div className={'flex flex-row gap-2 px-4 py-4 items-center justify-between border-b border-gray-50'}>
                            <div className="flex flex-row gap-2 items-center">
                                <div className={'font-bold text-base text-gray-800'}>历史记录</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<PlusOutlined />}
                                    onClick={() => router.push('/create/smart-video/starter')}
                                    title="新建任务"
                                    className="text-gray-500 hover:text-[#7150ff] hover:bg-[#7150ff]/10"
                                />
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<MenuFoldOutlined />}
                                    onClick={() => setCollapsed(true)}
                                    title="折叠"
                                    className="text-gray-500 hover:text-[#7150ff] hover:bg-[#7150ff]/10"
                                />
                            </div>
                        </div>
                        {/* 任务列表 */}
                        <div className="flex-1 overflow-y-auto">
                            <TaskList />
                        </div>
                    </div>
                )}

                {/* 主内容区 */}

                <div className="flex-1 overflow-x-auto ">

                    <Outlet />

                </div>

            </div>

        </PageContainer>

    );

};


export default HomeLayout;
