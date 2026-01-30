import { createContext, ReactNode, useContext, useEffect, useState } from "react";


export const useGlobalState = () => {
    return useContext(Ctx);
};

export const Ctx = createContext<any>({});
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [isMobile, setIsMobile] = useState<boolean>();
    const [user, setUser] = useState<any>(null);
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [creditState, setCreditState] = useState<any>(null);
    const [creditStateLoading, setCreditStateLoading] = useState<boolean>(false);

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
                user,
                setUser,
                userLoading,
                setUserLoading,
                refreshTaskList,
                setRefreshTaskList,
                creditState,
                setCreditState,
                creditStateLoading,
                setCreditStateLoading
            }}
        >
            {children}
        </Ctx.Provider>
    );
};
