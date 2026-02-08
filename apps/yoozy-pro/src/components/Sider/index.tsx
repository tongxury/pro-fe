import { useLocation } from "react-router";
import { useRouter } from "@/hooks/useRouter.tsx";
import { useLocalStorageState } from "ahooks";
import classNames from "classnames";
import {
    HomeOutlined, HomeFilled,
    VideoCameraOutlined, VideoCameraFilled,
    BulbOutlined, BulbFilled,
    ClockCircleOutlined,
    HddOutlined, HddFilled,
    ShoppingOutlined, ShoppingFilled,
    LeftOutlined,
    RightOutlined,
    AppstoreOutlined, AppstoreFilled,
    PlusOutlined
} from "@ant-design/icons";
import { Tooltip, Dropdown, type MenuProps, Popover } from "antd";
import Logo from "@/components/Logo";

const Sider = () => {
    const [collapsed, setCollapsed] = useLocalStorageState('siderCollapsed', { defaultValue: false });

    const routers = [
        {
            group: '',
            children: [
                {
                    icon: <HomeOutlined />,
                    activeIcon: <HomeFilled />,
                    path: '/',
                    name: '首页',
                },
            ],
        },
        {
            group: '创作中心',
            children: [
                {
                    icon: <VideoCameraOutlined />,
                    activeIcon: <VideoCameraFilled />,
                    path: '/create',
                    name: 'AI创作',
                    routes: [
                        // {
                        //     path: '/create/template-replication',
                        //     name: '智能成片',
                        // },
                        {
                            path: '/create/segment-replication',
                            name: '片段复刻',
                        },
                        {
                            path: '/create/video-generation',
                            name: '视频生成',
                        }
                    ]
                },
                {
                    icon: <BulbOutlined />,
                    activeIcon: <BulbFilled />,
                    path: '/inspiration',
                    name: '灵感库',
                },
                // {
                //     icon: <ClockCircleOutlined />,
                //     activeIcon: <ClockCircleOutlined />,
                //     path: '/my-workflows',
                //     name: '任务中心',
                // },

            ],
        },
        {
            group: '资产管理',
            children: [
                {
                    icon: <AppstoreOutlined />,
                    activeIcon: <AppstoreFilled />,
                    path: '/templates',
                    name: '模板库',
                },
                {
                    icon: <HddOutlined />,
                    activeIcon: <HddFilled />,
                    path: '/my-assets',
                    name: '资产库',
                },
                {
                    icon: <ShoppingOutlined />,
                    activeIcon: <ShoppingFilled />,
                    path: '/products',
                    name: '商品库',
                },
            ],
        },
    ];

    const { pathname } = useLocation();
    const { push } = useRouter();


    return (
        <div
            className={classNames(
                "h-screen flex flex-col transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] relative z-50",
                "bg-white/80 backdrop-blur-xl border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
                collapsed ? 'w-[88px]' : 'w-[220px]'
            )}>

            {/* Logo Section */}
            <div className={classNames(
                "h-[88px] flex items-center transition-all duration-500",
                collapsed ? 'justify-center px-0' : 'px-8'
            )}>
                <div className={classNames(
                    "flex items-center overflow-hidden cursor-pointer group",
                    collapsed ? '' : 'gap-3'
                )} onClick={() => push('/')}>
                    <div className={classNames(
                        "transition-all duration-500 relative z-10",
                        "scale-100"
                    )}>
                        <Logo size={42} />
                    </div>
                    <div className={classNames(
                        "transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] flex flex-col overflow-hidden whitespace-nowrap",
                        collapsed ? 'opacity-0 w-0 -translate-x-4' : 'opacity-100 w-auto translate-x-0'
                    )}>
                        <span className="text-[#7150ff] font-bold text-[28px] tracking-tight font-sans leading-none">Yoozy</span>
                        {/* <span className="text-[#7150ff] text-[10px] font-bold tracking-[0.15em] uppercase leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7150ff] to-[#5a3bc4]">Pro Studio</span> */}
                    </div>
                </div>
            </div>



            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2 space-y-8 scrollbar-hide px-4">
                {routers.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {group.group && (
                            <div className={classNames(
                                "text-gray-400 text-[10px] font-bold mb-3 px-4 uppercase tracking-wider transition-all duration-300",
                                collapsed ? 'opacity-0 h-0 mb-0 overflow-hidden' : 'opacity-100'
                            )}>
                                {group.group}
                            </div>
                        )}
                        <div className="space-y-2">
                            {group.children?.map((child, childIndex) => {
                                const isActive = child.path === '/' ? pathname === child.path : pathname?.startsWith(child.path);

                                const content = (
                                    <div
                                        onClick={() => push(child.path)}
                                        className={classNames(
                                            "group flex items-center cursor-pointer rounded-xl transition-all duration-300 relative overflow-hidden",
                                            collapsed ? 'justify-center w-12 h-12 mx-auto' : 'px-4 py-3.5 gap-3.5',
                                            isActive
                                                ? 'bg-[#7150ff]/5 text-[#7150ff]'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                        )}
                                    >
                                        {/* Active Indicator & Background Glow */}
                                        {isActive && (
                                            <>
                                                {!collapsed && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#7150ff] rounded-r-full shadow-[0_0_12px_#7150ff]"></div>}
                                            </>
                                        )}

                                        <span className={classNames(
                                            "text-xl transition-all duration-300 relative z-10 flex-shrink-0",
                                            isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-110'
                                        )}>
                                            {isActive ? child.activeIcon : child.icon}
                                        </span>

                                        <span className={classNames(
                                            "text-[14px] font-medium transition-all duration-500 whitespace-nowrap relative z-10 overflow-hidden flex-1",
                                            collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto',
                                            isActive ? 'font-bold' : ''
                                        )}>
                                            {child.name}
                                        </span>

                                        {/* Arrow for submenu - Removed */}
                                        {/* {child.routes && !collapsed && (
                                            <RightOutlined
                                                style={{ strokeWidth: 80 }}
                                                className={classNames(
                                                    "text-[10px] transition-colors duration-300",
                                                    isActive ? "text-[#7150ff]" : "text-gray-300 group-hover:text-gray-400"
                                                )}
                                            />
                                        )} */}
                                    </div>
                                );

                                if (child.routes) {
                                    return (
                                        <Popover
                                            key={childIndex}
                                            placement="rightTop"
                                            trigger={['hover']}
                                            overlayInnerStyle={{ padding: 4, borderRadius: 12 }}
                                            content={
                                                <div className="w-32 flex flex-col gap-1">
                                                    {child.routes.map((route: any) => (
                                                        <div
                                                            key={route.path}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                push(route.path);
                                                            }}
                                                            className={classNames(
                                                                "px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm",
                                                                pathname?.startsWith(route.path)
                                                                    ? "bg-[#7150ff]/5 text-[#7150ff] font-medium"
                                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                            )}
                                                        >
                                                            {route.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        >
                                            {content}
                                        </Popover>
                                    );
                                }

                                return (
                                    <Tooltip
                                        key={childIndex}
                                        title={collapsed ? child.name : ''}
                                        placement="right"
                                        mouseEnterDelay={0.1}
                                    >
                                        {content}
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* User / Collapse Section */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/30">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className={classNames(
                        "w-full flex items-center cursor-pointer rounded-xl transition-all duration-300 group hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100",
                        collapsed ? 'justify-center h-12' : 'px-4 py-3 gap-3'
                    )}
                >
                    <div className={classNames(
                        "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7150ff]/10 group-hover:text-[#7150ff] flex-shrink-0",
                        !collapsed && "rotate-180"
                    )}>
                        <RightOutlined className="text-xs" />
                    </div>

                    <div className={classNames(
                        "flex flex-col items-start transition-all duration-500 overflow-hidden whitespace-nowrap",
                        collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                    )}>
                        <span className="text-sm font-bold text-gray-700">收起菜单</span>
                    </div>
                </button>

                {/* ICP Filing Info */}
                <div className={classNames(
                    "transition-all duration-500 overflow-hidden whitespace-nowrap flex justify-center",
                    collapsed ? 'h-0 opacity-0 mt-0' : 'h-auto opacity-100 mt-4'
                )}>
                    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer"
                        className="text-[10px] text-gray-300 hover:text-gray-500 transition-colors scale-90 origin-center block">
                        粤ICP备2022084962号-3
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sider;
