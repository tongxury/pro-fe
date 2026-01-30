"use client";

import { XFlex, XText, useXTheme } from "@pro/ui";
import { useTranslations } from "next-intl";
import { CSSProperties, useState } from "react";
import ChatTextArea from "../_components/ChatTextArea";

const Guide = ({ style }: { style: CSSProperties }) => {
    const t = useTranslations("compose");
    const { token } = useXTheme();
    const [inputText, setInputText] = useState("");

    return (
        <XFlex vertical style={{ boxSizing: "border-box", paddingTop: 100, ...style }} align="center">
            <XText bold size={28} style={{ marginBottom: 80 }}>
                {t("What are you going to write?")}
            </XText>
            <ChatTextArea
                value={inputText}
                placeholder={t("You could type or paste your essay requirement here")}
                submitText={t("Start Writing")}
            />
        </XFlex>
    );
};
export default Guide;
