"use client";

import PageContainer from "@/layouts/Webapp/PageContainer";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { Attachment, promptChat } from "@pro/ui-pro";
import { useTranslations } from "next-intl";
import React, { FC, useState } from "react";

import useQuestion from "../_hooks/session";
import CharTextareaGroup from "../_components/CharTextareaGroup";
import { Col, Row } from "antd";

function HomeworkHelp() {
    const t = useTranslations("Default");
    const { token, custom } = useXTheme();

    const { create } = useQuestion({ scenario: "homework" });

    const onSend = ({ text, attachments }: { text?: string; attachments?: Attachment[] }) => {
        create({ prompt: { key: promptChat.key, text }, attachments });
        // router.push(`${window.location.pathname}/${uuid()}?text=${questionText || ''}&attachments=${JSON.stringify(attachments || [])}`)
    };

    return (
        <PageContainer
            // headerLeft={t("homeworkHelp")}
            style={{
                background: custom?.colorBgPagerContainer
            }}
        >
            <XFlex
                vertical
                style={{
                    marginInline: "auto",
                    maxWidth: "90%",
                    width: "100%",
                    height: "100%"
                }}
                gap={30}
            >
                <XText
                    size={46}
                    bold
                    style={{
                        marginInline: "auto",
                        fontFamily: "SFUIDisplay-Bold",
                        lineHeight: 1.2
                    }}
                >
                    {t("your ai homework helper")}
                </XText>

                <XFlex
                    vertical
                    gap={20}
                    style={{
                        background: token.colorBgBase,
                        padding: 30,
                        borderRadius: 15,
                        border: `1px solid ${token.colorBorder}`
                    }}
                >
                    {/* <Extras /> */}
                    <CharTextareaGroup onSend={onSend} />
                    {/* <ChatInput
                        autoFocus
                        uploaderCategory={"normal"}
                        placeholder="Ask a new research question, get a answer with citations"
                        onSend={onSend}
                        overlayStyle={{ maxWidth: 760, width: "100%" }}
                    /> */}
                    {/* 
                    <ImageUploader
                        onUploaded={(attachments) => onSend({ attachments })}
                    /> */}
                </XFlex>
                <Row gutter={[15, 15]}>
                    <Col span={12}>
                        <div
                            style={{
                                background: token.colorBgBase,
                                border: `1px solid ${token.colorBorder}`,
                                padding: 20,
                                borderRadius: 10,
                                cursor: "pointer"
                            }}
                        >
                            123123
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            style={{
                                background: token.colorBgBase,
                                border: `1px solid ${token.colorBorder}`,
                                padding: 20,
                                borderRadius: 10,
                                cursor: "pointer"
                            }}
                        >
                            123123
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            style={{
                                background: token.colorBgBase,
                                border: `1px solid ${token.colorBorder}`,
                                padding: 20,
                                borderRadius: 10,
                                cursor: "pointer"
                            }}
                        >
                            123123
                        </div>
                    </Col>
                    <Col span={12}>
                        <div
                            style={{
                                background: token.colorBgBase,
                                border: `1px solid ${token.colorBorder}`,
                                padding: 20,
                                borderRadius: 10,
                                cursor: "pointer"
                            }}
                        >
                            123123
                        </div>
                    </Col>
                </Row>
            </XFlex>
        </PageContainer>
    );
}

export default HomeworkHelp;
