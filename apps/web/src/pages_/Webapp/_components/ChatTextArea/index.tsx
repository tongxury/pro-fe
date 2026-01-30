import { EditOutlined } from "@mui/icons-material";
import { XFlex, XText, useXTheme } from "@pro/ui";
import { Button, Input } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties, useState } from "react";

interface IProps {
    onSend?: (text?: string) => void;
    onChange?: (text?: string) => void;
    value?: string;
    autoFocus?: boolean;
    placeholder: string;
    style?: CSSProperties;
    submitText?: string;
    textBgColor?: string;
    rows?: number;
}

const ChatTextArea = (props: IProps) => {
    const t = useTranslations("Default");
    const { token } = useXTheme();
    const [inputText, setInputText] = useState(props.value || "");
    const [isFouse, setIsFouse] = useState(false);
    return (
        <XFlex
            style={{
                maxWidth: 700,
                width: "100%",
                border: `2px solid ${isFouse ? token.colorPrimary : token.colorBorder}`,
                borderRadius: 8,
                ...props?.style
            }}
            vertical
            gap={10}
        >
            <Input.TextArea
                rows={props.rows || 8}
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                    props.onChange?.(e.target.value);
                }}
                style={{
                    width: "100%",
                    resize: "none",
                    outline: "none",
                    border: "none",
                    boxShadow: "none",
                    background: props.textBgColor
                }}
                autoSize={false}
                autoFocus={props.autoFocus}
                placeholder={props.placeholder}
                onFocus={() => setIsFouse(true)}
            ></Input.TextArea>
            <XFlex justify="flex-end" align="center">
                <Button
                    type="primary"
                    icon={<EditOutlined style={{ fontSize: 15 }} />}
                    iconPosition="end"
                    onClick={() => props.onSend?.(inputText)}
                >
                    {props.submitText}
                </Button>
            </XFlex>
        </XFlex>
    );
};

export default ChatTextArea;
