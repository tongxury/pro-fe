"use client";

import { fetchQuestionAnswers } from "@/api/chat";
import PageContainer from "@/layouts/Webapp/PageContainer";
import { usePathname, useRouter } from "@/navigation";
import ChatInput, { InputArea } from "@/pages_/Webapp/_components/ChatInput";
import RelatedQuestions from "@/pages_/Webapp/Homework/components/RelatedQuestions";
import { useGlobalState } from "@/providers/global";
import { getAuthToken } from "@/utils";
import { useXTheme, XDivider, XFlex, XText } from "@pro/ui";
import { Attachment, promptChat, Question, useChatEventSource } from "@pro/ui-pro";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import React, { CSSProperties, useEffect, useRef, useState } from "react";

import SelectTrigger from "../../_components/ChatBar/SelectTrigger";
// import SelectTrigger from "../../_components/ChatTrigger/SelectTrigger";
import useSession from "../../_hooks/session";
import QAList from "../components/QAList";
import { Input, Modal } from "antd";
import { XIconFont } from "@pro/icons";
import CharTextareaGroup from "../../_components/CharTextareaGroup";

function HomeworkHelpSolution({ session }: { session: string }) {
    const t = useTranslations("Default");
    const { token } = useXTheme();

    const router = useRouter();
    const pathname = usePathname();
    const sessionId = pathname?.split("/").pop();

    const {
        questionAnswers,
        run: runEventSource,
        set: setQuestionAnswers
    } = useChatEventSource({
        options: {
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/v2/chat/completions`,
            authToken: getAuthToken
        }
    });
    const {
        chatPanel: {
            open: chatPanelOpen,
            onOpenChange,
            onInputTextChange,
            openPanel,
            closePanel,
            chatToolBarText,
            closeBar
        }
    } = useGlobalState();

    const { create } = useSession({ scenario: "homework" });

    const { runAsync, loading } = useRequest<any, any>(() => fetchQuestionAnswers({ sessionId: session }), {
        manual: true
    });

    // const [subChatOpen, setSubChatOpen] = useState(false);
    const scroll = useRef<any>(null);

    useEffect(() => {
        if (chatToolBarText) {
            runEventSource({
                question: {
                    sessionId: sessionId,
                    prompt: { text: chatToolBarText }
                }
            });
            closeBar?.();
        }
    }, [chatToolBarText]);

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollTo({
                top: scroll.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [questionAnswers]);

    useEffect(() => {
        runAsync().then((result) => {
            const pairs = result.data?.list;

            if (
                // sessoin中只存在1个question, 并且没有answer
                pairs?.length == 1 &&
                pairs?.[0]?.question &&
                !(pairs?.[0]?.answers?.length || 0)
            ) {
                runEventSource({ question: pairs?.[0]?.question });
            } else {
                setQuestionAnswers(result.data?.list || []);
            }
        });

        closePanel?.();
    }, []);

    const onRegenerate = (question: Question) => {
        runEventSource({ question });
    };

    const onNewQuestion = ({ text, attachments }: { text?: string; attachments?: Attachment[] }) => {
        create({ prompt: { key: promptChat.key, text }, attachments });
    };

    const leftStyle: CSSProperties = {
        width: "100%",
        maxWidth: 650,
        minWidth: 400
    };

    const rightStyle: CSSProperties = {
        width: "100%",
        maxWidth: 350,
        minWidth: 250,
        flex: 1
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <PageContainer
                // contentStyle={{ border: '1px solid red' }}
                // headerStyle={{
                //     width: '100%',
                //     // maxWidth: 1100,
                //     marginInline: 'auto',

                // }}
                renderHeader={({ height }) => (
                    <XFlex center style={{ height, paddingInline: 20 }} gap={20}>
                        <InputArea
                            onClick={() => setIsModalOpen(true)}
                            style={{ ...leftStyle }}
                            leftIcon={"SearchLine"}
                            placeholder={t("Ask a new research question, get a answer with citations")}
                            onSend={onNewQuestion}
                            sendCategory="create"
                        />
                        {/* <ChatInput
                        style={{ ...leftStyle }}
                        overlayStyle={{ ...leftStyle }}
                        uploaderCategory={"popup"}
                        leftIcon={"SearchLine"}
                        placeholder={t("Ask a new research question, get a answer with citations")}
                        onSend={onNewQuestion}
                        sendCategory="create"
                    /> */}
                        <div style={{ ...rightStyle }}></div>
                    </XFlex>
                )}
            >
                <XFlex
                    gap={20}
                    style={{
                        boxSizing: "border-box",
                        // border: '1px solid red',
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        // marginInline: 'auto',
                        // maxWidth: 1100,
                        padding: 20
                    }}
                >
                    <XFlex vertical style={{ ...leftStyle }} gap={10}>
                        <div
                            id="scroll"
                            style={{
                                flex: 1,
                                overflowY: "scroll",
                                // flex: 1,
                                scrollbarWidth: "none"
                            }}
                            ref={scroll}
                        >
                            {/* 以第一个question的id作为生成session_id的依据 */}

                            {/* <SelectTrigger > */}
                            <QAList loading={loading} data={questionAnswers} onRegenerate={onRegenerate} />
                            {/* </SelectTrigger> */}
                        </div>
                        {/* todo 骨架屏 */}
                        {!chatPanelOpen && (
                            <ChatInput
                                onSend={({ text }) => {
                                    runEventSource({
                                        question: {
                                            sessionId: sessionId,
                                            prompt: { text: text }
                                        }
                                    });
                                    // openPanel?.(
                                    //     text!
                                    // );
                                    // onInputTextChange?.(text!);
                                    // onOpenChange?.(true);
                                }}
                                sendCategory="send"
                                leftIcon={"ChatLine"}
                                placeholder={t("askFollowUp")}
                            />
                        )}
                    </XFlex>
                    <div style={{ ...rightStyle }}>
                        <XFlex
                            vertical
                            padding={[10, 15, 10, 15]}
                            gap={10}
                            style={{
                                width: "100%",
                                // maxHeight: 520,
                                borderRadius: 10,
                                // background: token.colorBgL1,
                                border: "1px solid " + token.colorBorder,
                                background: token.colorBgPrimary
                            }}
                        >
                            <XFlex align={"center"} justify={"space-between"} padding={[8, 0, 8, 0]}>
                                <XText bold size={18}>
                                    {t("similarQuestions")}
                                </XText>
                            </XFlex>
                            {/* <Divider style={{ marginBlock: 0 }} /> */}
                            <RelatedQuestions question={questionAnswers?.[0]?.question?.prompt?.text} />
                        </XFlex>
                    </div>
                </XFlex>
            </PageContainer>
            <Modal
                width={1000}
                height={500}
                title={t("your ai homework helper")}
                footer={null}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
            >
                <div style={{ marginTop: 20 }}>
                    <CharTextareaGroup onSend={onNewQuestion} />
                </div>
            </Modal>
        </>
    );
}

export default HomeworkHelpSolution;
