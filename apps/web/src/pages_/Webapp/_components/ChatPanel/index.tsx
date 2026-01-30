import { fetchQuestionAnswers } from "@/api/api";
import logo from "@/assets/logo.svg";
import { usePathname, useRouter } from "@/navigation";
import { useGlobalState } from "@/providers/global";
import { getAuthToken } from "@/utils";
import { XIconFont } from "@pro/icons";
import { useXTheme, xBorderRadius, xBoxShadow, XFlex, XImage, xPadding, xPosition, XText } from "@pro/ui";
import { MarkdownText, promptChat, PromptView, QuestionAnswer, useChatEventSource } from "@pro/ui-pro";
import { Input, Skeleton } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

function ChatPanel({ style }: { style?: CSSProperties }) {
    const t = useTranslations("Default");

    const {
        chatPanel: {
            open,
            onOpenChange,
            // sessionId,
            // onSessionIdChange,
            inputText,
            onInputTextChange
        }
    } = useGlobalState();

    const pathname = usePathname();

    const scollViewId = "studygpt-trigger-panel";

    const sessionId = "sub-" + pathname?.split("/").pop();

    const { token } = useXTheme();

    // const [inputText, setInputText] = useState<string>();
    // const [sessionId, setSessionId] = useState("");

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

    const scrollToBottom = () => {
        const listContainer = document.getElementById(scollViewId);

        if (listContainer) {
            listContainer.scrollTop = 100000000;
        }
    };

    // useEffect(() => {
    //     // 划选文本替换输入文本
    //     setInputText(selectedText);
    // }, [selectedText]);

    useEffect(() => {
        fetchQuestionAnswers({ session_id: sessionId! }).then((result: any) => {
            setQuestionAnswers(result?.question_answer_pairs || []);

            // send(selectedText + inputTextFromBar);

            // runEventSource({
            //     question: {
            //         session_id: sessionId,
            //         prompt: { text: inputText, key: promptChat.key }
            //     },
            //     onStart: () => {
            //         scrollToBottom();
            //     },
            //     onEvent: () => {
            //         scrollToBottom();
            //     }
            // });
        });

        // const newSession = uuid();
        // setSessionId(newSession);
    }, []);

    useEffect(() => {
        if (open) {
            fetchQuestionAnswers({ session_id: sessionId! }).then((result: any) => {
                setQuestionAnswers(result?.question_answer_pairs || []);

                // send(selectedText + inputTextFromBar);

                // runEventSource({
                //     question: {
                //         session_id: sessionId,
                //         prompt: { text: inputText, key: promptChat.key }
                //     },
                //     onStart: () => {
                //         scrollToBottom();
                //     },
                //     onEvent: () => {
                //         scrollToBottom();
                //     }
                // });
                send?.();
            });
        } else {
            setQuestionAnswers([]);
        }
    }, [open]);

    const send = (text?: string) => {
        if (!inputText && !text) return;

        scrollToBottom();

        runEventSource({
            question: {
                id: sessionId,
                prompt: { text: text || inputText, key: promptChat.key }
            },
            onStart: () => {
                onInputTextChange?.("");
                scrollToBottom();
            },
            onEvent: () => {
                scrollToBottom();
            }
        });
    };

    if (!open) return;

    return (
        <XFlex
            vertical
            gap={10}
            style={{
                padding: 15,
                borderRadius: 6,
                background: token.colorBgPrimary,
                ...xBoxShadow({ color: token.colorBorder }),
                width: 400,
                height: 600,
                // border: "1px solid red",
                ...xPosition({ right: 20, bottom: 20 }),
                ...style
            }}
            justify={"space-between"}
        >
            <XFlex align={"center"} justify={"end"}>
                <XIconFont
                    style={{ cursor: "pointer" }}
                    onClick={() => onOpenChange?.(false)}
                    name={"CloseLine"}
                    color={token.colorTextL3}
                />
            </XFlex>

            {/* <div>{sessionId}</div> */}
            <XFlex vertical gap={15} id={scollViewId} style={{ flex: 1, overflowY: "scroll", scrollbarWidth: "none" }}>
                {questionAnswers?.map((x: QuestionAnswer, i: number) => {
                    return (
                        <XFlex key={i} vertical align={"normal"} gap={10} style={{ marginInline: 15 }}>
                            <XFlex vertical gap={3} align={"end"}>
                                <XFlex
                                    vertical
                                    style={{
                                        background: token.colorPrimary,
                                        color: token.colorBgPrimary,
                                        ...xPadding(10, 15, 10, 15),
                                        ...xBorderRadius(10, 0, 10, 10)
                                    }}
                                    gap={10}
                                >
                                    {x.question.prompt?.text && (
                                        <XText color={token.colorBgPrimary}>{x.question.prompt?.text}</XText>
                                    )}
                                </XFlex>
                            </XFlex>
                            {x.answers?.map((ax: any, i) => {
                                const promptKey = x.question.prompt?.key || promptChat.key;

                                return (
                                    <XFlex key={i} vertical gap={10}>
                                        <PromptView key={promptKey!} title={t(promptKey)} />
                                        <XFlex
                                            vertical
                                            gap={3}
                                            style={{
                                                padding: 15,
                                                background: token.colorBgL1,
                                                ...xBorderRadius(0, 10, 10, 10)
                                            }}
                                        >
                                            {/* loading状态 */}
                                            {ax.status === "preparing" && <Skeleton active />}

                                            {(!ax.status || ax.status === "generating") && (
                                                <MarkdownText text={ax.text} />
                                            )}
                                        </XFlex>
                                    </XFlex>
                                );
                            })}
                        </XFlex>
                    );
                })}
            </XFlex>
            <div
                style={{
                    border: "1.5px solid " + token.colorPrimary,
                    borderRadius: 8
                }}
            >
                <Input.TextArea
                    style={{
                        outlineStyle: "none",
                        color: token.colorTextPrimary,
                        borderStyle: "none",
                        background: token.colorBgPrimary,
                        fontFamily: "Nunito-Bold"
                        // fontFamily: 'Nunito-ExtraBoldItalic'
                        // ...xFont({family: "Nunito-Regular",})
                    }}
                    // ref={ref}
                    value={inputText}
                    onChange={(e) => {
                        onInputTextChange?.(e.target.value);
                    }}
                    // onFocus={() => setEditorFocus(true)}
                    // onBlur={() => setEditorFocus(false)}
                    autoFocus
                    variant="borderless"
                    // placeholder={inputTextFromBar}
                    autoSize={{ minRows: 2, maxRows: 2 }}
                    onPressEnter={(e) => {
                        e.preventDefault();
                        send();
                    }}
                />
            </div>
        </XFlex>
    );
}

export default ChatPanel;
