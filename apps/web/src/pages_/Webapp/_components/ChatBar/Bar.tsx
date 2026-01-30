import logo from "@/assets/logo.png";
import { useGlobalState } from "@/providers/global";
import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, xPadding, xPosition, XText } from "@pro/ui";
import { useClickAway } from "ahooks";
import { Input } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties, useRef, useState } from "react";

function ChatBar({
    // sessionId,
    // selectedText,
    // position,
    style
}: {
    // sessionId: string;
    // selectedText: string;
    // position: { x: number; y: number };
    style?: CSSProperties;
}) {
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const [inputText, setInputText] = useState("");
    const {
        chatPanel: {
            open,
            openPanel,
            onInputTextChange,
            // sessionId,
            selectedText,
            barPosition,
            closeBar,
            barOpen
        }
    } = useGlobalState();

    const ref = useRef<any>(null);
    useClickAway(() => {
        closeBar?.();
        console.log("useClickAway 12121", ref, barOpen, !barPosition || open);
        // if (useRefEnable && barPosition) {
        //     setRefEnable(false);
        //     onClose();
        // }
    }, ref);

    const onSend = () => {
        openPanel?.(selectedText + inputText);
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
                    padding: 7,
                    borderRadius: 15,
                    background: token.colorBgPrimary,
                    border: "1px solid " + token.colorBorder,
                    // ...xBoxShadow({ color: token.colorBorder }),
                    width: 400,

                    ...style
                }}
            >
                <XText
                    ellipsis={{ maxWidth: 386 }}
                    color={token.colorTextL2}
                    style={{
                        background: token.colorBgL1,
                        borderRadius: 11,
                        ...xPadding(5, 8, 5, 8)
                    }}
                >
                    {t("selectedText")}: {selectedText}
                </XText>
                <XFlex align={"center"}>
                    <Image src={logo} style={{ width: 22, height: 22 }} alt="" />
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target?.value || "")}
                        placeholder={t("let ai generate anything")}
                        variant={"borderless"}
                        onPressEnter={onSend}
                    />
                    <XFlex
                        center
                        pointer
                        onClick={onSend}
                        style={{
                            width: 25,
                            height: 25,
                            background: inputText ? token.colorPrimary : token.colorTextL4,
                            borderRadius: 7
                        }}
                    >
                        <XIconFont size={12} name={"SendFilled"} color={token.colorBgPrimary} />
                    </XFlex>
                </XFlex>
            </XFlex>
        </div>
    );
}

export default ChatBar;
