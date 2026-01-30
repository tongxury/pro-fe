import { text } from "stream/consumers";
import { fetchSettings, fetchUserDetail as fetchUser } from "@/api/api";
import { Position } from "@pro/ui-pro";
import { useDebounce, useRequest } from "ahooks";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface GlobalCtx {
    user?: any;
    userLoading?: boolean;
    refreshUser?: () => void;
    refreshUserAsync?: () => Promise<any>;
    settings?: any;
    refreshSettings?: () => void;
    refreshSettingsAsync?: () => Promise<any>;

    // 为防止 多处 Provider嵌套影响代码可读性，采用在全局state内设置命名空间的形式实现
    chatPanel: {
        chatToolBarText?: string;
        setchatToolBarText?: Dispatch<SetStateAction<string>>;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
        inputText?: string;
        onInputTextChange?: (text: string) => void;
        selectedText?: string;
        onSelectedTextChange?: (text: string) => void;
        // sessionId?: string;
        // onSessionIdChange?: (sessionId: string) => void;
        openPanel?: (text: string) => void;
        closePanel?: () => void;

        barOpen?: boolean;
        barPosition?: Position;
        openBar?: (position: Position) => void;
        closeBar?: () => void;
    };
    // homework: {
    //     panelOpen?: boolean;
    //     setPanelOpen?: (open: boolean) => void;
    //     barOpen?: boolean;
    //     setBarOpen?: (open: boolean) => void;
    //     reset?: () => void;
    // };
}

export const useGlobalState = () => {
    return useContext(Ctx);
};

export const Ctx = createContext<GlobalCtx>({ chatPanel: {} });
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const {
        data: userResult,
        loading: userLoading,
        run: refreshUser,
        runAsync: refreshUserAsync
    } = useRequest(fetchUser);

    const { data: settingsResult, run: refreshSettings } = useRequest(fetchSettings, { manual: true });

    const [panelOpen, setPanelOpen] = useState(false);
    const [barOpen, setBarOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [selectedText, setSelectedText] = useState("");
    const [sessionId, setSessionId] = useState(uuid());

    const [barPosition, setBarPosition] = useState<Position | undefined>();
    const debouncedValue = useDebounce(barPosition, { wait: 300 });

    const [chatToolBarText, setchatToolBarText] = useState("");

    useEffect(() => {
        setBarOpen(!!barPosition && !panelOpen);

        // panel打开后 全部重置
        if (panelOpen) {
            setBarPosition(undefined);
        }
    }, [barPosition, panelOpen]);

    return (
        <Ctx.Provider
            value={{
                user: userResult?.data,
                userLoading: !userResult?.data && userLoading,
                refreshUser: refreshUser,
                chatPanel: {
                    open: panelOpen,
                    onOpenChange: (open) => setPanelOpen(open),
                    inputText,
                    onInputTextChange: (text) => setInputText(text),
                    selectedText,
                    onSelectedTextChange: (text) => setSelectedText(text),
                    // sessionId,
                    // onSessionIdChange: setSessionId,
                    openPanel: (text) => {
                        setSessionId(sessionId);
                        setInputText(text);
                        setPanelOpen(true);
                    },
                    closePanel: () => {
                        setInputText("");
                        setSessionId("");
                        setPanelOpen(false);
                    },

                    barPosition: debouncedValue,
                    openBar: (position: Position) => {
                        setBarPosition(position);
                    },
                    closeBar: () => {
                        setBarPosition(undefined);
                    },
                    barOpen,
                    chatToolBarText,
                    setchatToolBarText
                }
                // homework: {
                //     panelOpen,
                //     setPanelOpen,
                //     barOpen,
                //     setBarOpen,
                //     reset: () => {
                //         setPanelOpen(false);
                //         setBarOpen(true);
                //     }
                // }
            }}
        >
            {children}
        </Ctx.Provider>
    );
};
