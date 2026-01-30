import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {useFetchSessions, useUser} from "@/api/api";
import {useLocalStorageState, useResponsive} from "ahooks";

export const useGlobalState = () => {
    return useContext(Ctx);
};

export const Ctx = createContext<any>({});
export const GlobalStateProvider = ({children}: { children: ReactNode }) => {

    const [isMobile, setIsMobile] = useState<boolean>();

    const [selectedProfile, setSelectedProfile] = useLocalStorageState<any>("selectedProfile")
    const [selectedXhsProfile, setSelectedXhsProfile] = useLocalStorageState<any>("selectedProfile_xhs")
    const [user, {loading: userLoading, mutate: mutateUser}] = useUser()

    // const [sessions, {loading, mutate}] = useFetchSessions({})

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);


    // const {} =  useResponsive()

    return (
        <Ctx.Provider
            value={{
                isMobile,
                // sessions,
                // mutateSessions: mutate,
                selectedProfile,
                setSelectedProfile,
                selectedXhsProfile,
                setSelectedXhsProfile,
                user,
                userLoading,
                mutateUser,
            }}
        >
            {children}
        </Ctx.Provider>
    );
};
