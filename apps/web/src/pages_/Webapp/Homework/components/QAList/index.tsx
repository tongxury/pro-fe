import { useXTheme, xBorderRadius, XDivider, XFlex, xPadding, XParagraph, XText } from "@pro/ui";
import { Attachment, AttachmentView, promptChat, Question, type QuestionAnswer } from "@pro/ui-pro";
import { Divider, Skeleton, Typography } from "antd";
import { Marked } from "marked";
import { useTranslations } from "next-intl";
import { CSSProperties, ReactNode, useEffect } from "react";

import AnswersView from "./AnswersView";
import QuestionView from "./QuestionView";

const QAList = ({
    data,
    loading,
    onRegenerate,
    style
}: {
    loading: boolean;
    onRegenerate: (question: Question) => void;
    data?: QuestionAnswer[];
    style?: CSSProperties;
}) => {
    const t = useTranslations("Default");

    // useEffect(() => {
    //     // id 为 HomeworkHelpQAList 的元素在父级组件 HomeworkHelp
    //     const listContainer = document.getElementById("HomeworkHelpQAList");
    //     if (listContainer) {
    //         listContainer.scrollTop = 100000000;
    //     }
    // }, [data]);

    const { token } = useXTheme();

    if (loading) {
        return (
            <XFlex vertical gap={25} style={style}>
                <XFlex vertical align={"normal"} gap={15}>
                    <XFlex
                        vertical
                        padding={[10, 15, 10, 15]}
                        gap={20}
                        style={{
                            borderRadius: 10,
                            border: "1px solid " + token.colorBorder
                        }}
                    >
                        <Skeleton active />
                    </XFlex>
                    <XFlex
                        vertical
                        padding={[10, 15, 10, 15]}
                        gap={20}
                        style={{
                            borderRadius: 10,
                            border: "1px solid " + token.colorBorder
                        }}
                    >
                        <Skeleton active />
                    </XFlex>
                </XFlex>
            </XFlex>
        );
    }

    return (
        <XFlex vertical gap={25} style={style}>
            {data?.length ? <QuestionView style={{ marginBottom: 20 }} x={data![0].question} /> : null}
            <XFlex vertical align={"normal"} gap={10}>
                <XFlex vertical>
                    <XFlex
                        vertical
                        gap={20}
                        style={{
                            padding: 15,
                            // border: "1px solid " + token.colorBorder,
                            // background: token.colorBgL1,
                            borderRadius: 10,
                            background: token.colorBgPrimary
                        }}
                    >
                        {data?.map((x: QuestionAnswer, i: number) => (
                            <AnswersView key={i} data={x} index={i} onRegenerate={onRegenerate} />
                        ))}
                    </XFlex>
                </XFlex>
            </XFlex>
        </XFlex>
    );
};

export default QAList;
