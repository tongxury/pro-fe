import { fetchSimilarQuestions } from "@/api/chat";
import { useRouter } from "@/navigation";
import { groupArray } from "@pro/hooks";
import { useXTheme, XDivider, XFlex, XHoverable, XList, XNumberTabs, XText } from "@pro/ui";
import { promptChat, Question, QuestionAnswer } from "@pro/ui-pro";
import { useRequest } from "ahooks";
import { List, Popover, Skeleton, Typography } from "antd";
import { useTranslations } from "next-intl";
import { CSSProperties, ReactNode, useEffect, useState } from "react";

import QuestionView from "../QAList/QuestionView";

function RelatedQuestions({ question, style }: { question?: string; style?: CSSProperties }) {
    const { token } = useXTheme();
    const router = useRouter();
    const t = useTranslations("Default");

    const scenario = "homework";

    const pageSize = 5;

    const { data, run, loading } = useRequest(fetchSimilarQuestions, { manual: true });
    const group = groupArray(data?.data?.list, pageSize) || [];

    useEffect(() => {
        if (question) {
            run({ scenario, similarWith: question, limit: 15 });
        }
    }, [question]);

    const onRoute = (data: any) => {
        router.push(`/webapp/${scenario}/${data.sessionId}`);
    };

    // const questionAnswers: QuestionAnswer[] = [...Array(10).keys()].map(() => ({
    //     question: {
    //         prompt: {
    //             key: promptChat.key,
    //             text: "Institutional investors have a significant influence on financial markets. How does this impact the markets?"
    //         }
    //     }
    // }));

    const [tab, setTab] = useState<number>(1);

    // if (loading || !question) {
    //     return (
    //         <XFlex vertical style={style} gap={10}>
    //             {[...Array(10).keys()].map((x) => (
    //                 <Skeleton key={x} active />
    //             ))}
    //         </XFlex>
    //     );
    // }

    return (
        <XFlex vertical gap={10} style={style}>
            <XList
                // style={{ overflow: "scroll", height: 400 }}
                // style={{border: '1px solid red'}}
                dataSource={group[tab - 1] || []}
                loading={loading || !question}
                renderItem={(x: any, i: number) => {
                    return (
                        <Popover placement={"leftTop"} content={() => <QuestionView x={x} style={{ maxWidth: 500 }} />}>
                            <div style={{ display: "inline-block" }}>
                                <XHoverable
                                    onClick={() => onRoute(x)}
                                    key={i}
                                    color={token.colorBgLayout}
                                    style={{ borderRadius: 8 }}
                                >
                                    <XFlex padding={10} vertical style={{ cursor: "pointer" }}>
                                        {/* <XText ellipsis={{ maxLines: 2, maxWidth: "100%" }}> {x?.prompt?.text}</XText> */}
                                        <XText ellipsis={{ maxLines: 2 }}>{x?.prompt?.text}</XText>
                                    </XFlex>
                                </XHoverable>
                            </div>
                        </Popover>
                    );
                }}
                renderEmpty={() => (
                    <XFlex center style={{ height: 300 }}>
                        {t("noData")}
                    </XFlex>
                )}
                renderSkeleton={(index: number) => {
                    return <Skeleton.Button key={index} active style={{ width: "100%", height: 60 }} />;
                }}
                split={<XDivider style={{ marginBlock: 3 }} />}
                // split={<div> split</div>}
                skeletonCount={pageSize}
            />
            {group.length > 1 && <XNumberTabs onChange={(value) => setTab(value)} value={tab} count={group.length} />}
        </XFlex>
    );
}

export default RelatedQuestions;
