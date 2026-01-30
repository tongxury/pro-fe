import { fetchEventSource, type EventSourceMessage } from "@microsoft/fetch-event-source";
import { useEffect, useRef, useState } from "react";

import type { Answer, Attachment, Question, QuestionAnswer } from "..";

// todo 数据模拟, 后端开发完成后需要删除此段代码
const attachmentListMockData: Attachment[] = Array.from({ length: 5 }).map(() => ({
    category: "research_result",
    extra: {
        author: "Author Name",
        title: "The Impact of Climate Change on International Tourism The Impact of Evidence",
        url: "https://scholar.google.com.hk/?hl=zh-CN",
        citation: 1628,
        publishAt: "2024-3-12",
        keywords: "International Journal of Energy Economics and Policy",
        abstract:
            "The tourism industry is one of the most important sectors that contributes to global growth. Climate change can have a significant impact on tourism since it requires appropriate weather conditions and a clean environment. Given the close "
    }
}));

interface ChatEventParams {
    question: Question;
    onOpen?: () => void;
    onStart?: () => void;
    onEvent?: (content: string, code?: number) => void;
    onComplete?: (summary: any) => void;
    onError?: (code?: number, message?: any) => void;
}

const useChatEventSource = ({
    initialValue,
    options
}: {
    initialValue?: QuestionAnswer[];
    options: { url: string; authToken: () => string | undefined };
}) => {
    const { url, authToken } = options;

    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>(initialValue || []);

    const [generating, setGenerating] = useState(false);

    // const questionAnswersRef = useRef(questionAnswers);
    // useEffect(() => {
    //     questionAnswersRef.current = questionAnswers;
    // }, [questionAnswers]);

    const getCurrentQAIndex = (question_id?: string): number => {
        if (!questionAnswers.length || questionAnswers.length == 0) {
            return -1;
        }

        if (question_id) {
            for (let index = 0; index < questionAnswers.length; index++) {
                if (questionAnswers[index]?.question?.id === question_id) {
                    return index;
                }
            }

            return -1;
        }

        return -1;
    };

    // // 保存最后一问的问题， 方便实现 regenerate
    // const [lastestQuestion, setLastestQuestion] = useState<
    //      ChatEventParams | undefined
    // >();

    // const rerun = () => {
    //     lastestQuestion && run(lastestQuestion)
    // }

    // createChatEvent 二次封装
    const run = (params: ChatEventParams) => {
        if (generating) return;

        const { question, onStart, onOpen, onEvent, onComplete, onError } = params;

        // setLastestQuestion(params);

        createChatEvent({
            ...params,
            onStart: () => {
                const answer: Answer = {
                    sessionId: question.sessionId,
                    text: "",
                    status: "preparing"
                };

                const idx = getCurrentQAIndex(question.id);

                if (idx === -1) {
                    setQuestionAnswers((questionAnswers) => [
                        ...(questionAnswers || []),
                        { question, answers: [answer] }
                    ]);
                } else {
                    setQuestionAnswers((questionAnswers) => [
                        ...questionAnswers?.slice(0, idx),
                        {
                            ...questionAnswers[idx],
                            question,
                            answers: [...(questionAnswers[idx]?.answers || []), answer]
                        } as QuestionAnswer,
                        ...questionAnswers?.slice(idx + 1)
                    ]);
                }
                onStart?.();
            },
            onEvent: (content: string, code?: number) => {
                setGenerating(true);

                setQuestionAnswers((questionAnswers) => {
                    if (!questionAnswers?.length) return questionAnswers;

                    let idx = getCurrentQAIndex(params.question?.id);

                    // 最后一个
                    if (idx === -1) {
                        idx = questionAnswers.length - 1;
                    }

                    const answers = questionAnswers[idx]?.answers;

                    if (answers?.length) {
                        const last = answers.pop();

                        return [
                            ...questionAnswers?.slice(0, idx),
                            {
                                ...questionAnswers[idx],
                                // question,
                                answers: [
                                    ...(answers || []),
                                    {
                                        ...last,
                                        text: `${last?.text || ""}${content}`,
                                        status: "generating"
                                    }
                                ]
                            } as QuestionAnswer,
                            ...questionAnswers?.slice(idx + 1)
                        ];
                    }

                    return questionAnswers;
                });

                onEvent?.(content, code);
            },
            onComplete: (summary: any) => {
                onComplete?.(summary);

                setQuestionAnswers((questionAnswers) => {
                    let idx = getCurrentQAIndex(params.question?.id);

                    // 最后一个
                    if (idx === -1) {
                        idx = questionAnswers.length - 1;
                    }

                    return [
                        ...questionAnswers?.slice(0, idx),
                        {
                            ...questionAnswers[idx],
                            // todo 数据模拟
                            // answers: questionAnswers[idx]?.answers?.map(x => ({ ...x, status: '' })),
                            answers: questionAnswers[idx]?.answers?.map((x) => ({
                                ...x,
                                status: "",
                                attachments: attachmentListMockData
                            })),
                            question: {
                                ...questionAnswers[idx]?.question,
                                ...summary?.question
                            }
                        } as QuestionAnswer,
                        ...questionAnswers?.slice(idx + 1)
                    ];
                });

                setGenerating(false);
            }
        });
    };

    // 最基础的 eventsource封装
    const createChatEvent = async ({ question, onStart, onOpen, onEvent, onComplete, onError }: ChatEventParams) => {
        // const authToken = await getAuthToken()

        // const appLang = (await getAppSettings_AppLang()) || 'English'

        // const translateLang = (await getAppSettings_TranslateLang()) || 'Chinese'

        // const url = `${process.env.NEXT_PUBLIC_API_URL}/gpt-tool/api/chat_completion`
        const ctrl = new AbortController();

        onStart?.();

        const questionParams: Question = {
            ...question,
            // prompts: [{
            //     ...(params.prompt || {}),
            //     params: {
            //         lang: translateLang,
            //         ...(params.prompt?.params || {}),
            //         respondInLang: appLang,
            //     }
            // }],
            settings: {
                ...question.settings
                // lang: appLang
            }
        };

        await fetchEventSource(`${url}`, {
            method: "POST",
            body: JSON.stringify(questionParams),
            // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken() || ""
                // "Access-Control-Request-Method": "POST",
                // "Access-Control-Allow-Origin": process.env.PLASMO_PUBLIC_API_BASE_URL,
                // "Access-Control-Allow-Origin": "https://app.apifox.com",
                // "Origin": process.env.PLASMO_PUBLIC_API_BASE_URL,
                // Token: authToken?.value || '',
                // Location: await getLocation()
            },
            onopen: async (response) => {
                if (!response.ok) {
                    ctrl.abort();
                    onError?.(500, response.text());
                } else {
                    onOpen?.();
                }
            },
            onmessage: (ev: EventSourceMessage) => {
                const obj = JSON.parse(ev.data);
                if (obj) {
                    /** 800 - attachment; 1000 - 终止 */
                    if (obj.code && obj.code >= 1000) {
                        ctrl.abort();
                        if (obj.code === 1000) {
                            onComplete?.(obj.data);
                        }
                        if (obj.code === 1005) {
                            onError?.(obj.code, obj.message);
                        }
                    } else {
                        onEvent?.(obj.data || "", obj.code);
                    }
                }
            },
            onerror: (err) => {
                console.error("eventSource onerror", err);
                onError?.();
                ctrl.abort();
            },
            onclose: () => {
                ctrl.abort();
            },
            openWhenHidden: true,
            signal: ctrl.signal
        });

        return {
            close: () => {
                ctrl.abort();
            }
        };
    };

    return {
        questionAnswers,
        set: setQuestionAnswers,
        run
        // rerun
    };
};

export default useChatEventSource;
