import { XLetterAvatar } from "@pro/ui";
import { useGlobalState } from "@/providers/GlobalData";
import { Dropdown, MenuProps } from "antd";
import { LogoutOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";
import { removeAuthToken } from "@/utils";
import useAuthUser from "@/hooks/useAuthUser";

const UserInfo = () => {

    const { user } = useAuthUser()
    const router = useRouter()

    if (!user) {
        return null
    }

    const handleLogout = () => {
        removeAuthToken()

        window.location.href = "/";
    };

    const items: MenuProps['items'] = [
        {
            key: 'info',
            label: (
                <div className="flex items-center gap-3 px-2 py-2 min-w-[200px] cursor-default" onClick={(e) => e.stopPropagation()}>
                    <div className="border-2 border-white rounded-full shadow-sm">
                        <XLetterAvatar size={48} name={user?.phone} />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold text-gray-900 text-base">{user.nickname || user.phone || '用户'}</div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full w-fit mt-1">
                            普通用户
                        </div>
                    </div>
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'assets',
            icon: <AppstoreOutlined />,
            label: '我的资产',
            onClick: () => router.push('/my-assets'),
        },
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: '个人中心',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: handleLogout,
            danger: true,
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
            trigger={['click']}
            overlayClassName="!pt-2"
        >
            <div className="cursor-pointer transition-all hover:opacity-80 hover:scale-105 active:scale-95">
                <div className="border-2 border-transparent hover:border-[#7150ff]/20 rounded-full p-0.5 transition-colors">
                    <XLetterAvatar size={35} name={user?.phone} />
                </div>
            </div>
        </Dropdown>
    )
}

export default UserInfo
