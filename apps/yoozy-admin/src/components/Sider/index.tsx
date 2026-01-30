import { useLocation } from "react-router";
import { useRouter } from "@/hooks/useRouter.tsx";

const Sider = () => {
    const routers = [

        {
            group: '视频库',
            children: [
                {
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    path: '/templates',
                    name: '视频库',
                    active: true,
                },
                // {

                {
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    ),
                    path: '/inspiration',
                    name: '灵感库',
                    active: true,
                },
            ],
        },
        {
            group: '提示词管理',
            children: [
                {
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    path: '/prompts',
                    name: '提示词',
                    active: true,
                },

            ],
        },
        {
            group: '用户管理',
            children: [
                {
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ),
                    path: '/users',
                    name: '用户列表',
                    active: true,
                },
                {
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    ),
                    path: '/feedbacks',
                    name: '用户反馈',
                    active: true,
                },
            ],
        },
        {
            group: '资产管理',
            children: [
                {
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    ),
                    path: '/user-assets',
                    name: '资产列表',
                    active: true,
                },
            ],
        }
    ];

    const { pathname } = useLocation();
    const { push } = useRouter();

    return (
        <div className="w-50 bg-white h-screen flex flex-col border-r border-0.5 border-gray-200">
            {/* Logo Section */}
            <div className="p-6 pb-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-black font-bold text-lg">Yoozy</span>
                </div>
            </div>

            {/* Menu Items */}
            {routers.map((router, routerIndex) => (
                <div key={routerIndex} className={router.group ? 'px-6 mb-4' : 'px-6 mb-2'}>
                    {router.group && (
                        <div className="text-gray-500 text-xs font-medium mb-2 px-3">{router.group}</div>
                    )}
                    <div className={router.group ? 'space-y-1' : ''}>
                        {router.children?.map((child, childIndex) => (
                            <div
                                key={childIndex}
                                onClick={() => push(child.path)}
                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 ${(child.path === '/' ? pathname === child.path : pathname?.startsWith(child.path)) ? 'bg-gray-100 rounded' : ''
                                    }`}
                            >
                                {child.icon}
                                <span className="text-sm">{child.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sider;
