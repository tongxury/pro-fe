import logo from "@/assets/logo.png";
import IconFont from "@/components/Iconfont";
import { usePathname } from "@/navigation";
import { useGlobalState } from "@/providers/global";
import { getAuthToken } from "@/utils";
import { useXTheme, XFlex, xPosition } from "@pro/ui";
import { useChatEventSource } from "@pro/ui-pro";
import { useClickAway } from "ahooks";
import { Tooltip } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties, useRef, useState } from "react";

function ChatBar({ style }: { style?: CSSProperties }) {
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const [inputText, setInputText] = useState("");
    const {
        chatPanel: { open, openPanel, selectedText, barPosition, closeBar, setchatToolBarText }
    } = useGlobalState();

    const ref = useRef<any>(null);
    useClickAway(() => {
        closeBar?.();
    }, ref);

    const onSend = () => {
        setchatToolBarText?.(selectedText!);
        // openPanel?.(selectedText + inputText);
    };

    if (!barPosition || open) return;

    return (
        <div
            ref={ref}
            style={{
                zIndex: 2147483647,
                ...xPosition({ left: barPosition?.x, top: barPosition?.y })
            }}
        >
            <XFlex
                vertical
                gap={6}
                style={{
                    padding: 3,
                    borderRadius: 15,
                    background: token.colorBgPrimary,
                    border: "1px solid " + token.colorBorder,
                    ...style
                }}
            >
                <XFlex align={"center"}>
                    {/* <Image
                        src={logo}
                        style={{ width: 22, height: 22 }}
                        alt=""
                    /> */}
                    <XFlex
                        center
                        pointer
                        onClick={onSend}
                        style={{
                            width: 25,
                            height: 25
                        }}
                    >
                        <Tooltip title="追问">
                            <div>
                                <IconFont size={20} name={"navigation-32"} color={token.colorPrimary} />
                            </div>
                        </Tooltip>
                    </XFlex>
                </XFlex>
            </XFlex>
        </div>
    );
}

export default ChatBar;
