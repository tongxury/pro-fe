"use client";

import { createChatEvent } from "@/api/eventsource";
import PageContainer from "@/layouts/Webapp/PageContainer";
import { BallPulse } from "@alex_xu/react-loading";
import { LoadingButton } from "@mui/lab";
import { useXTheme, XFlex, XOption, XText } from "@pro/ui";
import { promptChat, promptWritingForCompose } from "@pro/ui-pro";
import { Button, Col, Flex, Row, theme, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { marked } from "marked";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const PromptPart = ({
    item,
    value,
    onChange
}: {
    item: XOption;
    value: string;
    onChange: (item: string, value: string) => void;
}) => {
    const t = useTranslations("Default");

    const { token } = theme.useToken();
    return (
        <XFlex vertical gap={10} style={{ padding: 20 }}>
            <XFlex align="center" gap={5}>
                {/*<Iconfont name={item.icon} size={20}/>*/}
                <Typography.Text style={{ fontSize: 16 }} strong>
                    {t(item.value)}
                </Typography.Text>
            </XFlex>
            <XFlex wrap="wrap" gap={10}>
                {item.children.map((x: XOption, k: number) => (
                    <Typography.Text
                        key={k}
                        onClick={() => onChange(item.value, x.value)}
                        style={{
                            padding: "5px 10px",
                            fontSize: 14,
                            fontWeight: value === x.value ? 500 : "normal",
                            borderRadius: 5,
                            color: value === x.value ? "#fff" : token.colorText,
                            background: value === x.value ? token.colorPrimary : token.colorFillSecondary,
                            cursor: "pointer"
                        }}
                    >
                        {x.label || t(x.value)}
                    </Typography.Text>
                ))}
            </XFlex>
        </XFlex>
    );
};

const Writing = () => {
    const t = useTranslations("Default");

    const tabs: XOption[] = [
        {
            value: "compose",
            label: "Compose",
            prompt: promptWritingForCompose
        }

        // {
        //     value: 'reply',
        //     label: 'Reply',
        //     prompt: promptWritingForReply
        // }
    ];

    // const {user, refreshUser, settings} = useGlobalState()

    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [tabActive, setTabActive] = useState<XOption | undefined>(tabs?.[0]);
    const { token } = useXTheme();
    const [sessionId, setSessionId] = useState(uuid());

    const [promptParams, setPromptParams] = useState(tabActive?.prompt?.defaults);

    const onValueChange = (name: string, value: string) => {
        const newValues = { ...promptParams };
        newValues[name] = value;
        setPromptParams(newValues);
    };

    const resend = () => {
        console.log("tabActive", tabActive, promptParams);

        createChatEvent({
            params: {
                sessionId: sessionId,
                prompt: {
                    key: promptChat.key,
                    params: promptParams,
                    text: `Write a ${promptParams?.format}, with ${promptParams?.tone} tone and ${promptParams?.length} length. The topic is: ${promptParams?.topic}, Output in ${promptParams?.lang}`
                }
            },
            onStart: () => {
                setLoading(true);
                setAnswer("");
            },
            onEvent: (content) => {
                setLoading(false);
                setAnswer((prevState) => prevState + content);
            },
            onComplete: () => {
                setLoading(false);
                // refreshUser()
            }
        }).then();
    };

    return (
        <PageContainer headerLeft={t("writingAssistant")}>
            <XFlex vertical gap={10} style={{ padding: 20, height: "100%", boxSizing: "border-box" }}>
                <Row gutter={[15, 15]} style={{ height: "100%", boxSizing: "border-box" }}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} style={{ height: "100%", paddingRight: 0 }}>
                        <XFlex
                            vertical
                            gap={20}
                            style={{
                                height: "90%",
                                overflow: "auto",
                                marginBottom: 20,
                                paddingRight: 7,
                                scrollbarColor: `#ddd #f1f5f9`,
                                scrollbarWidth: "thin"
                            }}
                        >
                            {/* tab */}
                            <XFlex gap={20} align="center">
                                {tabs.map((e) => (
                                    <Typography.Text
                                        key={e.id}
                                        onClick={() => setTabActive(e)}
                                        style={{
                                            fontSize: tabActive?.value === e.value ? 18 : 16,
                                            cursor: "pointer",
                                            color:
                                                tabActive?.value === e.value ? token.colorPrimary : token.colorBgPrimary
                                        }}
                                        strong
                                    >
                                        {t(e.value)}
                                    </Typography.Text>
                                ))}
                            </XFlex>
                            {/* 输入框 */}
                            {tabActive?.value === "compose" ? (
                                <TextArea
                                    placeholder={"Generate a draft for the topic you want to compose by pressing Enter"}
                                    value={promptParams["topic"]}
                                    style={{ background: token.colorBgBase }}
                                    onChange={(e) => onValueChange("topic", e.target.value)}
                                    autoSize={{ minRows: 5, maxRows: 5 }}
                                />
                            ) : (
                                <XFlex vertical gap={10}>
                                    <TextArea
                                        style={{ background: token.colorBgBase }}
                                        placeholder={t("The original text you want to reply to")}
                                        value={promptParams["originalText"]}
                                        onChange={(e) => onValueChange("originalText", e.target.value)}
                                        autoSize={{ minRows: 3, maxRows: 3 }}
                                    />
                                    <TextArea
                                        placeholder={t(
                                            "Generate a draft for the general content of your reply to the above text by pressing Enter"
                                        )}
                                        value={promptParams["keyPoints"]}
                                        onChange={(e) => onValueChange("keyPoints", e.target.value)}
                                        autoSize={{ minRows: 5, maxRows: 5 }}
                                    />
                                </XFlex>
                            )}
                            {/* 标签 */}
                            <XFlex vertical gap={20}>
                                {tabActive?.prompt?.options.map((e: XOption) => (
                                    <PromptPart
                                        item={e}
                                        key={e.value}
                                        value={promptParams[e.value]}
                                        onChange={onValueChange}
                                    />
                                ))}
                            </XFlex>
                            {/* 按钮 */}
                        </XFlex>
                        <XFlex justify="space-between" gap={20}>
                            <Button
                                type="primary"
                                style={{ width: "100%" }}
                                size="large"
                                disabled={!(promptParams?.topic || promptParams?.originalText)}
                                onClick={resend}
                                loading={loading}
                            >
                                {t("generate draft")}
                            </Button>
                        </XFlex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                        {/* 结果 */}
                        <XFlex style={{ flex: 1 }} vertical gap={20}>
                            <Typography.Text style={{ fontSize: 20 }} strong>
                                {t("Result")}:
                            </Typography.Text>
                            {/*<Typography.Text style={{fontSize: 14}}>{answer}</Typography.Text>*/}
                            {loading && (
                                <div
                                    style={{
                                        padding: 10,
                                        background: token.colorBgBase,
                                        borderRadius: 10,
                                        minHeight: 500
                                    }}
                                >
                                    <BallPulse style={{ maxWidth: 60 }} color={token.colorPrimary} size={10} />
                                </div>
                            )}
                            {answer && (
                                <div
                                    style={{
                                        padding: 10,
                                        background: token.colorBgBase,
                                        borderRadius: 10,
                                        minHeight: 500
                                    }}
                                    dangerouslySetInnerHTML={{
                                        // @ts-ignore
                                        __html: `<div style="width: 100%; overflow: scroll; font-size: 15px; color: ${token.colorTextPrimary}">${marked.parse(answer)}</div>`
                                    }}
                                />
                            )}
                            {!answer && !loading && (
                                <XFlex
                                    style={{
                                        padding: 10,
                                        background: token.colorBgBase,
                                        borderRadius: 10,
                                        minHeight: 500
                                    }}
                                >
                                    <XText size={15}>Generated content will display here.</XText>
                                </XFlex>
                            )}
                        </XFlex>
                    </Col>
                </Row>
            </XFlex>
        </PageContainer>
    );
};

export default Writing;
