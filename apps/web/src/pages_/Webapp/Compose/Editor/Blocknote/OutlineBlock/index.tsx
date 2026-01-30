/* eslint-disable react-hooks/rules-of-hooks */
//@ts-ignore
import { createReactBlockSpec } from "@blocknote/react";
import { XFlex, XNumberTabs, XText, useXTheme } from "@pro/ui";
import { Answer, Composition, Prompt, Question, promptChat, useChatEventSource } from "@pro/ui-pro";
import { Button } from "antd";
import { v4 as uuid } from "uuid";
import { useEffect, useRef, useState } from "react";
import { getAuthToken } from "@/utils";
import { Marked } from "marked";
import { useTranslations } from "next-intl";
import { BallPulse } from "@alex_xu/react-loading";
import ChatTextArea from "@/pages_/Webapp/_components/ChatTextArea";

/** 大纲区块 */
export const OutlineBlock = createReactBlockSpec(
    {
        type: "outlineBlock",
        propSchema: {
            // qaList 序列化字符串
            data: "{}",
            // 写作意图
            writingIntention: ""
        },
        content: "none"
    },
    {
        render: (props: any) => {
            console.log("props in render", props);

            const { token } = useXTheme();
            const t = useTranslations("compose");
            const [composition, setComposition] = useState<Composition>({
                title: "How Investors Affect Market Efficiency"
            });
            const [currentPage, setCurrentPage] = useState(1);
            const scrollELementRef = useRef<HTMLDivElement>(null);
            const [loading, setLoading] = useState(false);
            const [sessionId, setSessionId] = useState(uuid());

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
            // 写作意图(可编辑)
            const writingIntention = props.block.props.writingIntention;
            const [inputText, setInputText] = useState<string>(writingIntention);
            // 答案组
            const answers: Answer[] = questionAnswers?.reduce<Answer[]>((res, { answers = [] }) => {
                return [...res, ...answers];
            }, []);

            // 生成大纲
            const onSend = (text?: string) => {
                if (!text) return;
                const prompt: Prompt = {
                    // todo: 需要改key
                    key: promptChat.key,
                    text
                };
                const question: Question = { session_id: sessionId, prompt };
                runEventSource({
                    question,
                    onStart: () => {
                        setLoading(true);
                        setCurrentPage((answers || []).length + 1);
                    },
                    onComplete: () => setLoading(false)
                });
            };

            // 需要同步值到 editor 上
            useEffect(() => {
                try {
                    const data = JSON.stringify(questionAnswers);
                    // 更新块的值
                    props.editor.updateBlock(props.block, { props: { data: data } });
                    // console.log("questionAnswers changed: ", JSON.parse(data))
                } catch (error) {
                    console.error("throw in Outline block", error);
                }
            }, [questionAnswers]);

            // 滑动滚动条
            useEffect(() => {
                if (scrollELementRef.current) {
                    scrollELementRef.current.scrollTop = 100000000;
                }
            }, [answers]);

            const md = new Marked();

            // 接受
            const onAccept = () => {
                const { editor, block } = props;
                const answer = answers[currentPage - 1];
                // 将文本写入编辑器，todo：需要考虑 markdown 的情况
                editor.replaceBlocks(
                    [block],
                    [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    text: answer?.text,
                                    styles: {}
                                }
                            ]
                        }
                    ]
                );
            };

            return (
                <XFlex
                    style={{
                        width: "100%",
                        height: "100%",
                        userSelect: "none",
                        border: `1px solid ${token.colorBorder}`,
                        borderRadius: 10,
                        padding: 10,
                        boxSizing: "border-box"
                    }}
                    justify="center"
                    vertical
                    onClick={() => {
                        // fix：formattingToolbar 未知的原因自动弹出，这里主动关闭
                        setTimeout(() => {
                            props.editor.formattingToolbar.closeMenu();
                        });
                    }}
                    gap={10}
                >
                    <XText size={16} bold>
                        {t("Outline")}
                    </XText>
                    {questionAnswers.length === 0 && (
                        <XFlex style={{ width: "100%" }}>
                            <ChatTextArea
                                value={inputText}
                                onChange={(value) => setInputText(value || "")}
                                onSend={() => onSend(inputText)}
                                placeholder={t("You could type or paste your essay requirement here")}
                                submitText={t("Start Writing")}
                                style={{
                                    border: "none",
                                    background: token.colorBgPrimary
                                }}
                                textBgColor={token.colorBgL1}
                            />
                        </XFlex>
                    )}
                    {questionAnswers.length > 0 && (
                        <XFlex
                            vertical
                            style={{
                                background: token.colorBgPrimary,
                                borderRadius: 10,
                                padding: 10,
                                maxWidth: 600,
                                minWidth: 400
                            }}
                        >
                            <XFlex style={{ width: "100%" }}>
                                <ChatTextArea
                                    value={inputText}
                                    onChange={(value) => setInputText(value || "")}
                                    onSend={onSend}
                                    placeholder={t("You could type or paste your essay requirement here")}
                                    submitText={t("Start Writing")}
                                    style={{
                                        border: "none",
                                        background: token.colorBgPrimary
                                    }}
                                    textBgColor={token.colorBgL1}
                                    rows={4}
                                />
                            </XFlex>
                            <XText bold style={{ marginBottom: 10 }}>
                                {composition?.title}
                            </XText>
                            <div
                                style={{ overflowY: "scroll", maxHeight: 400, minHeight: 200, scrollbarWidth: "thin" }}
                                ref={scrollELementRef}
                            >
                                {answers.map((answer: Answer, index) => {
                                    return (
                                        <XFlex
                                            key={index}
                                            style={{
                                                paddingBlock: 10,
                                                borderRadius: 10,
                                                display: currentPage - 1 === index ? "flex" : "none"
                                            }}
                                        >
                                            <XFlex vertical gap={3}>
                                                {
                                                    /** 初始中 */
                                                    answer.status === "preparing" && (
                                                        <BallPulse
                                                            style={{ maxWidth: 60 }}
                                                            color={token.colorPrimary}
                                                            size={5}
                                                        />
                                                    )
                                                }
                                                {
                                                    /** 生成中 */
                                                    answer.status === "generating" && (
                                                        <>
                                                            <div
                                                                dangerouslySetInnerHTML={{
                                                                    // @ts-ignore
                                                                    __html: `<div style="width: 100%; overflow: scroll; font-size: 14px; line-height: 26px; color: ${token.colorTextPrimary}">${md.parse(answer.text)}</div>`
                                                                }}
                                                            />
                                                            <XFlex justify="flex-end" style={{ width: "100%" }}>
                                                                <BallPulse
                                                                    style={{ maxWidth: 60 }}
                                                                    color={token.colorPrimary}
                                                                    size={5}
                                                                />
                                                            </XFlex>
                                                        </>
                                                    )
                                                }
                                                {
                                                    /** 结束 */
                                                    !answer.status && (
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                // @ts-ignore
                                                                __html: `<div style="width: 100%; overflow: scroll; font-size: 14px; line-height: 26px; color: ${token.colorTextPrimary}">${md.parse(answer.text)}</div>`
                                                            }}
                                                        />
                                                    )
                                                }
                                            </XFlex>
                                        </XFlex>
                                    );
                                })}
                            </div>
                            <XFlex justify="flex-end" gap={10} style={{ paddingTop: 10 }}>
                                {answers.length > 1 && (
                                    <XNumberTabs
                                        value={currentPage}
                                        count={answers.length}
                                        onChange={(value) => setCurrentPage(value)}
                                    ></XNumberTabs>
                                )}
                                <Button type="primary" onClick={() => onSend(inputText)}>
                                    {t("Regen")}
                                </Button>
                                <Button type="primary" onClick={onAccept}>
                                    {t("Accept")}
                                </Button>
                            </XFlex>
                        </XFlex>
                    )}
                </XFlex>
            );
        }
    }
);
