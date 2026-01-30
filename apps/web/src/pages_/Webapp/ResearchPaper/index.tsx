"use client";

import PageContainer from "@/layouts/Webapp/PageContainer";
import { useRouter } from "@/navigation.ts";
import ChatInput from "@/pages_/Webapp/_components/ChatInput";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { promptChat } from "@pro/ui-pro";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

import useSession from "../_hooks/session";

function ResearchPaper() {
    const t = useTranslations("Default");
    const { token } = useXTheme();
    const router = useRouter();

    const { create } = useSession({});

    // const onSend = ({text} : {text: string}) => {
    //     router.push(`${window.location.pathname}/${uuid()}?text=${text}`)
    // }

    return (
        <PageContainer headerLeft={t("ScholarSearch")} contentStyle={{}}>
            <XFlex
                vertical
                align="center"
                style={{
                    width: "100%",
                    height: "100%",
                    background: token.colorL1,
                    paddingTop: 50
                }}
                gap={60}
            >
                <XText
                    size={46}
                    bold
                    style={{
                        marginInline: "auto",
                        marginBlock: "60px 50px",
                        fontFamily: "SFUIDisplay-Bold",
                        lineHeight: 1.2
                    }}
                >
                    Scholar Search
                </XText>
                <ChatInput
                    autoFocus
                    placeholder="Ask a new research question, get a answer with citations"
                    onSend={({ text, attachments }) =>
                        create({
                            prompt: { key: promptChat.key, text },
                            attachments
                        })
                    }
                    style={{ maxWidth: 760, width: "100%" }}
                ></ChatInput>
            </XFlex>
        </PageContainer>
    );
}

export default ResearchPaper;
