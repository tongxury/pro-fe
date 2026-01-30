import { ReactNode } from "react";
import { Typography } from "antd";


import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "@/hooks/useRouter";

const PageContainer = ({ title, extra, children, showBack }: { title?: string, extra?: ReactNode, children: ReactNode, showBack?: boolean }) => {
    const { back } = useRouter();
    return (
        <div className={"flex flex-col "}>
            <div className={'px-5 flex justify-between items-center h-[70px] border-b border-gray-100'}>
                <div className="flex items-center gap-4">
                    {showBack && (
                        <div onClick={back} className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors flex items-center justify-center">
                            <ArrowLeftOutlined className="text-lg text-gray-600" />
                        </div>
                    )}
                    {title && <div className={'text-main font-bold text-xl'}>{title}</div>}
                    {import.meta.env.VITE_ENV?.includes('test') && (
                        <div className="bg-orange-500/80 backdrop-blur-md text-white px-4 py-1 rounded-full shadow-2xl font-bold pointer-events-none border border-white/20 text-sm">
                            🚧 测试环境
                        </div>
                    )}
                </div>
                {extra && <div>{extra}</div>}
            </div>
            <div className='h-[calc(100vh-70px)] overflow-y-auto '>
                {
                    children
                }
            </div>
        </div>
    )
}

export default PageContainer
