import { addUserAttitude } from "@/api/chat";
import { Text } from "@/components/Text";
import AddTagModal from "@/pages_/Webapp/_components/AddTag";
import HoverTrigger from "@/pages_/Webapp/_components/ChatBar/HoverTrigger";
import FormatedText from "@/pages_/Webapp/_components/HoverPopup";
import ShareHomeworkQAModal from "@/pages_/Webapp/Homework/components/Share";
import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, XIconButton, XNumberTabs, XText } from "@pro/ui";
import { Answer, AnswerState, MarkdownText, promptChat, Question, QuestionAnswer, UserAction } from "@pro/ui-pro";
import { Button, Divider, Skeleton } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function AnswersView({
    data,
    onRegenerate,
    index
}: {
    data: QuestionAnswer;
    onRegenerate: (question: Question) => void;
    index: number;
    // generating?: boolean
}) {
    const { token } = useXTheme();

    const [current, setCurrent] = useState<number>(1);

    const [tmpState, setTmpState] = useState<{ [key: string]: AnswerState }>();

    // const contentRef = useRef<HTMLDivElement>(null);

    // const [currentAnswer, setCurrnetAnswer] = useState<Answer>()

    const t = useTranslations("Default");

    const promptKey = data.question?.prompt?.key || promptChat.key;

    const currentAnswer = data?.answers?.[current - 1];

    // const md = new Marked();

    const isLike = (current: Answer) => ({ ...current.answerState, ...tmpState?.[current.id!] }).like === "like";

    const isDisLike = (current: Answer) => ({ ...current.answerState, ...tmpState?.[current.id!] }).like === "dislike";

    // const isLikeNone = (current: Answer) =>
    //     ({ ...current.answer_state, ...tmpState?.[current.answer_id!] }).like === "none";

    const onLike = (current: Answer) => {
        addUserAttitude({ answer_id: current.id!, attitude: "like" });
    };

    const onDisLike = (current: Answer) => {
        addUserAttitude({ answer_id: current.id!, attitude: "dislike" });
    };

    const onCopy = (current: Answer) => {
        // const divText = contentRef.current?.innerText;

        onAction(current, "copy", {});
    };

    const onAction = (current: Answer, action: UserAction, stateDiff: AnswerState) => {
        setTmpState((state) => {
            const newState = { ...state };
            newState[current.id!] = {
                ...newState[current.id!],
                ...stateDiff
            };

            return newState;
        });

        // addUserAction({
        //     question_id: current.question_id!,
        //     answer_id: current.answer_id!,
        //     session_id: data.question.session_id!,
        //     action
        // }).then(() => {});
    };

    const regenerate = () => {
        onRegenerate(data.question!);
    };

    useEffect(() => {
        setCurrent(data?.answers?.length || 1);
    }, [data]);

    // const generating = data?.answers?.[data?.answers?.length - 1]?.status === "generating";

    return (
        <XFlex vertical>
            {index === 0 ? (
                <XFlex align={"center"} justify={"space-between"} padding={[8, 0, 8, 0]}>
                    <XFlex align={"center"} gap={15}>
                        <XText bold size={20}>
                            {t("solution")}
                        </XText>

                        {data?.answers?.length && data?.answers?.length > 1 && (
                            <XNumberTabs
                                renderTitle={() => (
                                    <XText color={token.colorTextL2}>
                                        {current} / {data?.answers?.length || 0}
                                    </XText>
                                )}
                                value={current}
                                size={22}
                                count={data?.answers?.length || 0}
                                onChange={(value) => setCurrent(value)}
                            />
                        )}
                    </XFlex>

                    {/* <Button shape={"round"} disabled={currentAnswer?.status === "generating"} onClick={regenerate}>
                        {t("get new answer")}
                    </Button> */}
                </XFlex>
            ) : null}

            {index !== 0 ? (
                <XFlex justify="flex-end">
                    <XFlex
                        style={{
                            background: token.colorPrimary,
                            color: token.colorBgBase,
                            maxWidth: "50%",
                            padding: "10px 15px",
                            borderRadius: "10px 0px 10px 10px"
                        }}
                    >
                        {data.question.prompt?.text}
                    </XFlex>
                </XFlex>
            ) : null}
            {currentAnswer?.status === "preparing" && <Skeleton active />}
            {(!currentAnswer?.status || currentAnswer?.status === "generating") && currentAnswer?.text && (
                <HoverTrigger
                // sessionId={`sub-chat-${data?.question?.question_id}-01`}
                >
                    {/* <div>{JSON.stringify(currentAnswer)}</div> */}
                    <MarkdownText text={currentAnswer?.text} />
                </HoverTrigger>
            )}

            {!currentAnswer?.status && index === 0 && (
                <XFlex justify={"space-between"} align={"center"}>
                    <XFlex align={"center"} gap={10}>
                        <XIconButton
                            size={35}
                            bordered
                            background={token.colorBgPrimary}
                            onClick={() => onLike(currentAnswer!)}
                        >
                            <XIconFont
                                name={"LikeLine"}
                                color={isLike(currentAnswer!) ? token.colorPrimary : token.colorTextL2}
                            />
                        </XIconButton>
                        <XIconButton
                            size={35}
                            bordered
                            background={token.colorBgPrimary}
                            onClick={() => onDisLike(currentAnswer!)}
                        >
                            <XIconFont
                                name={"UnlikeLine"}
                                color={isDisLike(currentAnswer!) ? token.colorPrimary : token.colorTextL2}
                            />
                        </XIconButton>

                        {/* <AddTagModal /> */}

                        {/* <ShareHomeworkQAModal
                                onCopy={() => onCopy(currentAnswer!)}
                                answer={currentAnswer!}
                                question={data.question}
                            /> */}
                    </XFlex>

                    <XFlex gap={5}>
                        <XIconButton size={35} bordered background={token.colorBgPrimary} onClick={regenerate}>
                            <XIconFont name={"RedoLine"} color={token.colorTextL2} />
                        </XIconButton>
                        <XIconButton
                            size={35}
                            bordered
                            background={token.colorBgPrimary}
                            onClick={() => onCopy(currentAnswer!)}
                        >
                            <XIconFont name={"CopyLine"} color={token.colorTextL2} />
                        </XIconButton>
                    </XFlex>
                </XFlex>
            )}
            {index === 0 ? (
                <XFlex align="center" style={{ height: 40, background: token.colorBgLayout, marginTop: 20 }}>
                    <i
                        style={{ display: "inline-block", width: 3, height: "100%", background: token.colorPrimary }}
                    ></i>
                    <Text ignoreIntl size={16} bold style={{ paddingLeft: 10 }}>
                        AI Tutor
                    </Text>
                </XFlex>
            ) : null}
        </XFlex>
    );
}

export default AnswersView;
