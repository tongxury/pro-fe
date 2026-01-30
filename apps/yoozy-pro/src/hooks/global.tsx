import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { getUser } from "@/api/api.ts";

export const useGlobalState = () => {
    return useContext(Ctx);
};

export const Ctx = createContext<any>({});
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [isMobile, setIsMobile] = useState<boolean>();

    const { data: ur, loading: userLoading, mutate: refreshUser } = useRequest(getUser)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();

        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    // 添加刷新TaskList的回调函数
    const [refreshTaskList, setRefreshTaskList] = useState<(() => void) | null>(null);

    return (
        <Ctx.Provider
            value={{
                isMobile,
                user: ur?.data,
                userLoading,
                refreshUser,
                refreshTaskList,
                setRefreshTaskList
            }}
        >
            {children}
        </Ctx.Provider>
    );
};
