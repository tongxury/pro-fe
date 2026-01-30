import { Fab } from "@mui/material";
import { XIcon, XIconFont } from "@pro/icons";
import { useXTheme, XDivider, XFlex, XText } from "@pro/ui";
import { Attachment } from "@pro/ui-pro";
import { Divider, Input, Popover } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties, ReactNode, useState } from "react";

import ImageUploader from "../ImageUploader";
import { SendProps } from "./types";

interface IProps {
    // value: string
    onSend?: ({ text, attachments }: SendProps) => void;

    uploaderCategory?: "popup" | "normal" | "none";
    sendCategory?: "search" | "send" | "create";
    autoFocus?: boolean;
    placeholder?: string;
    leftIcon?: string;
    // onChange?: (inputText: string) => void,
    style?: CSSProperties;
    overlayStyle?: CSSProperties;
}

/** 输入框组件 */
const ChatInput = ({
    onSend,
    uploaderCategory = "none",
    sendCategory = "search",
    autoFocus,
    placeholder,
    leftIcon,
    style,
    overlayStyle
}: IProps) => {
    const Popup = () => {
        const [openUploader, setOpenUploader] = useState(false);

        return (
            <Popover
                open={openUploader}
                onOpenChange={setOpenUploader}
                trigger={"click"}
                placement="bottom"
                content={<ImageUploader onUploaded={(attachments) => onSend?.({ attachments })} />}
                arrow={false}
                overlayInnerStyle={{
                    borderRadius: 23
                }}
                overlayStyle={{
                    ...overlayStyle
                }}
            >
                <div>
                    <InputArea
                        onSend={onSend}
                        autoFocus={autoFocus}
                        placeholder={placeholder}
                        leftIcon={leftIcon}
                        sendCategory={sendCategory}
                        style={style}
                        onClick={() => {
                            setOpenUploader(true);
                        }}
                    />
                </div>
            </Popover>
        );
    };

    if (uploaderCategory === "none") {
        return (
            <InputArea
                onSend={onSend}
                autoFocus={autoFocus}
                placeholder={placeholder}
                leftIcon={leftIcon}
                sendCategory={sendCategory}
                style={style}
            />
        );
    }

    if (uploaderCategory === "normal") {
        return (
            <XFlex vertical gap={10}>
                <InputArea
                    onSend={onSend}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    leftIcon={leftIcon}
                    sendCategory={sendCategory}
                    style={style}
                />
                <ImageUploader onUploaded={(attachments) => onSend?.({ attachments })} />
            </XFlex>
        );
    }

    return <Popup />;
};

export default ChatInput;

export const InputArea = ({
    onClick,
    onSend,
    sendCategory = "search",
    autoFocus,
    placeholder,
    leftIcon,
    style
}: IProps & { onClick?: () => void }) => {
    const { token } = useXTheme();

    const t = useTranslations("Default");

    const [isInputActive, setIsInputActive] = useState(false);

    const [inputText, setInputText] = useState("");

    const active = isInputActive || !!inputText;
    const sendable = !!inputText;

    const Right = () => {
        const height = 34;

        switch (sendCategory) {
            case "search":
                return (
                    <XFlex
                        center
                        style={{
                            width: 34,
                            height,
                            borderRadius: 10,
                            background: sendable ? token.colorPrimary : token.colorTextL4
                        }}
                    >
                        <XIconFont
                            name={"ChatLine"}
                            style={{
                                cursor: sendable ? "pointer" : "not-allowed"
                            }}
                            onClick={() => {
                                sendable && onSend?.({ text: inputText });
                                setInputText("");
                            }}
                            color={
                                token.colorBgPrimary
                                // sendable ? token.colorPrimary : token.colorTextL3
                            }
                            size={18}
                        />
                    </XFlex>
                );
            case "send":
                return (
                    <XFlex
                        center
                        style={{
                            width: 34,
                            height,
                            borderRadius: 10,
                            background: sendable ? token.colorPrimary : token.colorTextL4
                        }}
                    >
                        <XIconFont
                            name={"SendFilled"}
                            style={{
                                cursor: sendable ? "pointer" : "not-allowed"
                            }}
                            onClick={() => {
                                sendable && onSend?.({ text: inputText });
                                setInputText("");
                            }}
                            color={
                                token.colorBgPrimary
                                // sendable ? token.colorPrimary : token.colorTextL3
                            }
                            size={18}
                        />
                    </XFlex>
                );
            case "create":
                return (
                    <XFlex
                        center
                        style={{
                            cursor: sendable ? "pointer" : "not-allowed",
                            height,
                            paddingInline: 10,
                            borderRadius: 8,
                            background: sendable ? token.colorPrimary : token.colorTextL3
                        }}
                    >
                        <XText size={14} color={"#fff"} weight={500}>
                            {t("nextQuestion")}
                        </XText>
                    </XFlex>
                );
        }
    };

    return (
        <XFlex
            style={{
                border: `1px solid ${active ? token.colorPrimary : token.colorBorder}`,
                borderRadius: 12,
                background: token.colorBgPrimary,
                paddingInline: 5,
                paddingLeft: 10,
                paddingBlock: 5,
                // height: 45,
                ...style
            }}
            align="center"
            // gap={10}
        >
            {leftIcon ? (
                <>
                    <XIconFont size={21} name={leftIcon} color={token.colorTextL3} />
                    <XDivider style={{ marginInline: 5 }} direction={"vertical"} color={token.colorTextL4} />
                </>
            ) : (
                <></>
            )}

            <Input
                style={{
                    flex: 1,
                    // border: '1px solid red',
                    paddingInline: 0,
                    // outlineStyle: 'none',
                    color: token.colorTextPrimary,
                    // borderStyle: 'none',
                    background: token.colorBgPrimary
                    // height: 46,
                    // borderRadius: 10
                }}
                // ref={ref}
                onClick={onClick}
                variant="borderless"
                placeholder={placeholder}
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                }}
                onFocus={() => {
                    // setOpenUploader(true);
                    setIsInputActive(true);
                }}
                onBlur={() => {
                    // setOpenUploader(false);
                }}
                onMouseEnter={() => {
                    setIsInputActive(true);
                }}
                onMouseLeave={() => {
                    setIsInputActive(false);
                }}
                onPressEnter={() => {
                    onSend?.({ text: inputText });
                    setInputText("");
                }}
                autoFocus={autoFocus}
            />
            <Right />
        </XFlex>
    );
};
