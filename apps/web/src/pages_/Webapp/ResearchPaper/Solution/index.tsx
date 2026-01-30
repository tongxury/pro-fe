"use client";

import { fetchQuestionAnswers } from "@/api/api";
import { createChatEvent } from "@/api/eventsource";
import PageContainer from "@/layouts/Webapp/PageContainer";
import ChatInput from "@/pages_/Webapp/_components/ChatInput";
import { getAuthToken } from "@/utils";
import { parseUrlParamsPairs } from "@pro/hooks";
import { useXTheme, XFlex, XLayout, xPadding, XText } from "@pro/ui";
import { Answer, Attachment, Prompt, promptChat, Question, QuestionAnswer, useChatEventSource } from "@pro/ui-pro";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import QAList from "../components/QAList";
import RelatedQuestionList from "../components/RelatedQuestionList";

// todo 数据模拟
const relatedQuestionMockData: Question[] = [
    {
        prompt: {
            text: "How do institutional investors contribute to the informational efficiency of stock markets?",
            key: ""
        }
    },
    {
        prompt: {
            text: "What is the impact of institutional investor ownership on the speed of price adjustment to new information?",
            key: ""
        }
    }
];

// todo 数据模拟
const referenceListMockData: Attachment[] = [
    {
        name: "The Impact of Climate Change on International Tourism The Impact of Evidence",
        size: 345,
        category: "text"
    },
    {
        name: "The Impact of Climate Chang",
        size: 345,
        category: "text"
    },
    {
        name: "The Impact of Climate Change",
        size: 345,
        category: "text"
    },
    {
        name: "The Impact of Climate Change on International Tourism The Impact of Evidence",
        size: 345,
        category: "text"
    }
];

const ResearchPaperSolution = ({ sessionId }: { sessionId: string }) => {
    // todo:需要整理国际化
    const t = useTranslations("Default");
    const { token } = useXTheme();

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

    const [qas, setQas] = useState<QuestionAnswer[]>([]);
    const [relationQuestions, setRelationQuestions] = useState<Question[]>(relatedQuestionMockData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const params = parseUrlParamsPairs(window.location.search.substring(1));
        if (params?.text) {
            onSend({ text: params?.text });
        }
        // fetchQuestionAnswers({ session_id: sessionId }).then((rsp: any) => {
        //     if (rsp.question_answer_pairs && rsp.question_answer_pairs?.length > 0) {
        //         setQas(rsp.question_answer_pairs)
        //         const questionAnswer = rsp.question_answer_pairs[0]
        //         if (!(questionAnswer?.answers?.length > 0)) {
        //             if (params?.text) {
        //                 onSend(params?.text)
        //             }
        //         }
        //     }
        // })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSend = ({ text }: { text?: string }) => {
        if (!text) return;
        const prompt: Prompt = {
            // todo: 需要改key
            key: promptChat.key,
            text
        };
        const question: Question = { session_id: sessionId, prompt };
        runEventSource({
            question,
            onStart: () => setLoading(true),
            onComplete: () => setLoading(false)
        });
    };

    const onRegenerate = (question?: Question) => {
        if (!question) return;
        if (loading) return;
        runEventSource({
            question,
            onStart: () => setLoading(true),
            onComplete: () => setLoading(false)
        });
    };

    return (
        <PageContainer headerLeft={t("ScholarSearch")}>
            <XFlex
                style={{
                    height: "100%",
                    width: "100%",
                    maxWidth: 1100,
                    marginInline: "auto",
                    padding: 20
                }}
            >
                <XFlex vertical style={{ flex: 2 }} gap={10}>
                    {/* 问答区块 */}
                    <QAList
                        data={questionAnswers}
                        onRegenerate={(question?: Question) => onRegenerate(question)}
                        style={{ flex: 1 }}
                    ></QAList>
                    {/* 底部输入框组件 */}
                    <XFlex style={{ ...xPadding(0, 20, 20, 20) }}>
                        <ChatInput
                            placeholder="Ask a new research question, get a answer with citations"
                            onSend={onSend}
                            style={{ width: "100%" }}
                        ></ChatInput>
                    </XFlex>
                </XFlex>
                <RelatedQuestionList
                    data={relationQuestions}
                    style={{ flex: 1, maxHeight: 380, overflowY: "scroll" }}
                />
            </XFlex>
        </PageContainer>
    );
};

export default ResearchPaperSolution;
