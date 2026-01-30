import { ReactNode } from "react";
import UserInfo from "@/components/UserInfo";
import useAuthUser from "@/hooks/useAuthUser";
import { Button, Skeleton } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";
import useCreditState from "@/hooks/useCreditState";
import Credit from "../Credit";
import OngoingIssues from "../OngoingIssues";
import { message, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { updateUserNickname } from "@/api/api";


const PageContainer = ({ title, left, children }: { title?: string, left?: ReactNode, children: ReactNode }) => {

    const { user, initialLoading, refreshUser } = useAuthUser({ fetch: true })
    const { creditState, initialLoading: creditStateLoading } = useCreditState({ fetch: true })

    const router = useRouter()

    const handleLogin = () => {
        router.push(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`)
    }

    const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
    const [nickname, setNickname] = useState("");
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        if (user && !user.nickname && !initialLoading) {
            setIsNicknameModalOpen(true);
        } else {
            setIsNicknameModalOpen(false);
        }
    }, [user, initialLoading]);

    const handleNicknameSubmit = async () => {
        if (!nickname.trim()) {
            message.error("请输入昵称");
            return;
        }
        setConfirmLoading(true);
        try {
            await updateUserNickname({ nickname });
            message.success("设置成功");
            setIsNicknameModalOpen(false);
            refreshUser();
        } catch (error) {
            console.error(error);
            message.error("设置失败，请重试");
        } finally {
            setConfirmLoading(false);
        }
    };

    return (
        <div className={"flex flex-col "}>
            <div className={'px-5 flex justify-between items-center h-[70px] border-b border-gray-100'}>
                <div className="flex flex-row gap-4 items-center">
                    {title && <div className={'text-main font-bold text-xl'}>{title}</div>}
                    {left}
                    {import.meta.env.VITE_ENV?.includes('test') && (
                        <div className="bg-orange-500/80 backdrop-blur-md text-white px-4 py-1 rounded-full shadow-2xl font-bold pointer-events-none border border-white/20">
                            🚧 测试环境
                        </div>
                    )}
                </div>

                {(initialLoading) || (creditStateLoading) ? (
                    <div className="flex items-center gap-6">
                        <Skeleton.Button active style={{ width: 60 }} className="h-9 !rounded-lg " />
                        <Skeleton.Avatar active size={36} />
                    </div>
                ) : user ? (
                    <div className="flex items-center gap-4">
                        {/* <OngoingIssues /> */}
                        <div className="w-[1px] h-4 bg-gray-200" />
                        <div className="flex items-center h-9 bg-[#F6F3FF] hover:bg-[#ECE9FF] transition-colors rounded-lg px-3 gap-3 cursor-pointer">
                            <Credit value={creditState?.balance || 0} />
                            {/* <div className="w-[1px] h-3.5 bg-[#7150ff]/20"></div> */}
                            {/* <div className="text-[#7150ff] font-medium text-sm leading-none pt-0.5">
                                免费试用
                            </div> */}
                        </div>
                        <UserInfo />
                    </div>
                ) : (
                    <Button
                        type="primary"
                        icon={<UserOutlined />}
                        onClick={handleLogin}
                        className="!h-10 !rounded-xl !font-medium !bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] hover:!from-[#7150ff]/90 hover:!to-[#5a3bc4]/90 border-none shadow-md shadow-[#7150ff]/20"
                    >
                        登录
                    </Button>
                )}

            </div>
            <div className='h-[calc(100vh-70px)] overflow-y-auto '>
                {
                    children
                }
            </div>

            <Modal
                open={isNicknameModalOpen}
                footer={null}
                closable={false}
                maskClosable={false}
                centered
                width={380}
                className="p-0"
            // styles={{ content: { padding: 0, borderRadius: 24, overflow: 'hidden' } }}
            >
                <div className="p-8 flex flex-col items-center text-center bg-white">
                    {/* Decorative Graphic/Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-indigo-50 text-[#7150ff] rounded-full flex items-center justify-center mb-6 shadow-inner border border-purple-100">
                        <UserOutlined style={{ fontSize: 40 }} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-mono">
                        欢迎加入 <span className="text-[#7150ff]">Yoozy</span> 👋
                    </h3>
                    <p className="text-gray-500 text-xs mb-8 max-w-[200px] leading-relaxed">
                        初次见面，请为自己取一个响亮的昵称，开启您的创作之旅
                    </p>

                    <div className="w-full space-y-4">
                        <Input
                            size="large"
                            placeholder="请输入您的昵称"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onPressEnter={handleNicknameSubmit}
                            maxLength={20}
                            className="!rounded-xl !bg-gray-50 !border-gray-200 hover:!bg-white focus:!bg-white focus:!border-[#7150ff] transition-all text-center !text-sm !h-11"
                            prefix={<SmileOutlined className="text-gray-400" />}
                        />

                        <Button
                            type="primary"
                            size="large"
                            block
                            onClick={handleNicknameSubmit}
                            loading={confirmLoading}
                            className="!rounded-xl !h-11 !bg-[#111] hover:!scale-105 active:!scale-95 transition-all !font-bold !shadow-xl !shadow-gray-200 !border-none"
                        >
                            开始体验
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PageContainer

