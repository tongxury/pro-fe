import { BallPulse } from "@alex_xu/react-loading";
import { XIcon } from "@pro/icons";
import { useXTheme, xBorderRadius, XFlex, xMargin, XNumberTabs, xPadding, XText } from "@pro/ui";
import { Answer, Attachment, promptChat, Question, QuestionAnswer } from "@pro/ui-pro";
import { Carousel, Divider } from "antd";
import { Marked } from "marked";
import { useTranslations } from "next-intl";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

import IconMenuList from "../IconMenuList";
import ReferenceList from "../ReferenceList";
import RelatedQuestionList from "../RelatedQuestionList";

const QAList = ({
    data,
    style,
    onRegenerate
}: {
    data?: QuestionAnswer[];
    style?: CSSProperties;
    onRegenerate: (question?: Question) => void;
}) => {
    // todo:需要整理国际化
    const t = useTranslations("Default");

    useEffect(() => {
        // id 为 ResearchPaperQAList 的元素在父级组件 ResearchPaper
        const listContainer = document.getElementById("ResearchPaperQAList");
        if (listContainer) {
            listContainer.scrollTop = 100000000;
        }
    }, [data]);

    const { token } = useXTheme();

    const md = new Marked();

    /** 设置答案切换 */
    const [activeValues, setActiveValues] = useState<number[]>([]);
    const onTabsChange = (qaIndex: number) => {
        return (value: number) => {
            activeValues[qaIndex] = value;
            setActiveValues([...activeValues]);
        };
    };

    /** 处理重新生成 */
    const onRegenerateHandle = (question: Question, qaIndex: number, answerIndex: number) => {
        const tabsSwitch = onTabsChange(qaIndex);
        // Ttodo: 异步需要讨论下
        setTimeout(() => {
            tabsSwitch(answerIndex);
        });
        onRegenerate(question);
    };

    return (
        <XFlex
            style={{
                width: "100%",
                height: "100%",
                overflowY: "scroll",
                scrollbarWidth: "none",
                ...style
            }}
            id="ResearchPaperQAList"
        >
            <XFlex vertical style={{ padding: 20, width: "100%" }}>
                {data?.map((x: QuestionAnswer, qaIndex: number) => {
                    const isLast = data.length - 1 === qaIndex;
                    return (
                        <XFlex key={qaIndex} align={"flex-start"} style={{ width: "100%" }}>
                            <XFlex
                                vertical
                                align={"normal"}
                                style={{
                                    width: "100%"
                                }}
                            >
                                {/* 渲染问题 */}
                                <XFlex
                                    gap={10}
                                    style={{
                                        ...xPadding(14, 16, 14, 16),
                                        borderRadius: 14,
                                        background: token.colorBgL1,
                                        alignItems: "stretch",
                                        width: "100%"
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 3,
                                            background: "#1886F2",
                                            flex: "0 0 auto"
                                        }}
                                    />
                                    <XFlex vertical justify="space-between">
                                        <XText
                                            bold
                                            size={18}
                                            color={"#000"}
                                            style={{
                                                fontFamily: "SFProDisplay-Bold"
                                            }}
                                        >
                                            {t("Research Question")}
                                        </XText>
                                        {x.question?.prompt?.text && (
                                            <XText
                                                color={token.colorTextL2}
                                                style={{
                                                    fontFamily: "SFProDisplay-Regular"
                                                }}
                                            >
                                                {x.question.prompt?.text}
                                            </XText>
                                        )}
                                    </XFlex>
                                </XFlex>
                                <XFlex align="center" justify="space-between">
                                    <XText
                                        bold
                                        size={18}
                                        style={{
                                            fontFamily: "SFProDisplay-Bold",
                                            ...xMargin(20, 0, 20, 0)
                                        }}
                                    >
                                        {t("Academic Arguments")}
                                    </XText>
                                    <XNumberTabs
                                        style={{ marginLeft: 20 }}
                                        value={activeValues[qaIndex] || 1}
                                        count={x.answers?.length || 0}
                                        onChange={onTabsChange(qaIndex)}
                                    ></XNumberTabs>
                                </XFlex>
                                {// 渲染答案
                                x.answers?.map((answer: Answer, answerIndex) => {
                                    return (
                                        <XFlex
                                            key={answerIndex}
                                            vertical
                                            gap={10}
                                            style={{
                                                display:
                                                    (activeValues[qaIndex] || 1) - 1 === answerIndex ? "flex" : "none"
                                            }}
                                        >
                                            <XFlex vertical gap={3}>
                                                {/* loading状态 */}
                                                {answer.status === "preparing" && (
                                                    <BallPulse
                                                        style={{
                                                            maxWidth: 60
                                                        }}
                                                        color={token.colorPrimary}
                                                        size={5}
                                                    />
                                                )}
                                                {(!answer.status || answer.status === "generating") && (
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            // @ts-ignore
                                                            __html: `<div style="width: 100%; overflow: scroll; font-size: 14px; line-height: 26px; color: ${token.colorTextPrimary}">${md.parse(answer.text)}</div>`
                                                        }}
                                                    />
                                                )}
                                            </XFlex>
                                            {/* 复制、收藏、重新生成、有用、没用 */}
                                            {!answer.status && (
                                                <IconMenuList
                                                    style={{
                                                        marginTop: 20
                                                    }}
                                                    id="1"
                                                    isCollected={answer?.answer_state?.copy}
                                                    attitude={answer?.answer_state?.like}
                                                    onCopy={() => {
                                                        console.log("copy event");
                                                    }}
                                                    onChangeCollect={(isCollected) => {
                                                        console.log(`changeCollect event: ${isCollected}`);
                                                    }}
                                                    onChangeAttitude={(attitude) => {
                                                        console.log(`changeCollect event: ${attitude}`);
                                                    }}
                                                    onRegenerate={() => {
                                                        onRegenerateHandle(
                                                            x.question,
                                                            qaIndex,
                                                            (x.answers || []).length + 1
                                                        );
                                                    }}
                                                ></IconMenuList>
                                            )}
                                            <ReferenceList data={answer?.attachments}></ReferenceList>
                                        </XFlex>
                                    );
                                })}
                                {!isLast && <Divider style={{ marginBlock: 30 }} />}
                            </XFlex>
                        </XFlex>
                    );
                })}
            </XFlex>
        </XFlex>
    );
};

export default QAList;
