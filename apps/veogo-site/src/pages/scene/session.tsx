import {addQuestion, retryQuestion, useFetchQuestions, useFetchSession} from "@/api/api";
import {useXTheme} from "@pro/ui";
import React, {useEffect, useMemo, useRef} from "react";
import {getLocale} from "@/utils";
import eventBus, {eventTypes} from "@/utils/eventBus";
import {Collapse, Skeleton, Tabs} from "antd";
import ResourceList from "@/components/ResourceV2";
import QuestionList from "@/components/Question//V2/List";
import {useGlobalState} from "@/hooks/global";
import {useParams, useSearchParams} from "react-router";
import QuickPrompt from "@/components/QuickPrompt";
import {getPrompt, getSubPrompts} from "@/constants/prompt.tsx";

const Session = () => {
    const {themeVars} = useXTheme();
    const ref = useRef<HTMLDivElement>(null);
    const {sessionId, scene} = useParams();

    const [session, {sessionLoading}] = useFetchSession({id: sessionId});
    const [searchParams, setSearchParams] = useSearchParams();
    const {selectedProfile} = useGlobalState();

    const [questions, {loading: questionLoading, mutate: mutateQuestions}] = useFetchQuestions({sessionId});
    const mainQuestion = useMemo(() => questions?.list?.[0], [questions]);
    console.log("mainQuestion", mainQuestion, questions);


    useEffect(() => {

        if (searchParams.get("promptId")) {
            setSearchParams((prev) => ({...prev, promptId: ""}));
            // remove('promptId');
            onSubmit({
                prompt: {id: searchParams.get("promptId")}
            }).then();
        }
    }, []);

    const onSubmit = async ({prompt, retry}: { prompt: any; retry?: boolean }) => {
        const q = await addQuestion({
            sessionId,
            prompt: {
                id: prompt.id,
                content: prompt.content,
                locale: getLocale()
            },
            profile: selectedProfile,
            scene: scene,
            retry
        });

        console.log("qq", q);

        // @ts-ignore
        if (q?.code === "exceeded") {
            eventBus.emit(eventTypes.OpenPricingModal);
            return;
        }

        await mutateQuestions();
        //
        // ref.current.scrollTo({
        //     top: 100000000,
        //     behavior: "smooth"
        // });
    };

    const tabItems = useMemo(() => {
        return questions?.list?.map((e) => ({
            key: e._id,
            label: e?.prompt?.id ? getPrompt(e?.prompt?.id)?.text : e?.prompt?.content,
            children: (
                <QuestionList
                    data={e}
                    onRetry={(question) =>
                        onRetry({
                            questionId: question._id
                        })
                    }
                    mutateQuestions={mutateQuestions}
                />
            )
        }));
    }, [questions]);


    const onRetry = async ({questionId}: { questionId: string }) => {
        const q = await retryQuestion({
            questionId
        });

        // @ts-ignore
        if (q?.code === "exceeded") {
            eventBus.emit(eventTypes.OpenPricingModal);
        }

        await mutateQuestions();
    };

    if (questionLoading || sessionLoading) {
        return (
            <div
                ref={ref}
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "scroll",
                    scrollbarWidth: "none",
                    marginInline: "auto",
                    maxWidth: 800,
                    gap: 15,
                    width: "100%"
                }}
            >
                <Skeleton.Node
                    style={{
                        width: "100%",
                        marginInline: "auto",
                        maxWidth: 800,
                        height: 1000
                    }}
                />
            </div>
        );
    }
    // const qs = concatIgnoreUndefined(questions?.list, [generatingQuestion]);

    return (
        <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "scroll",
                scrollbarWidth: "none",
                marginInline: "auto",
                maxWidth: 800,
                gap: 15,
                width: "100%"
            }}
        >
            <Collapse
                items={[
                    {
                        key: "1",
                        label: "这里是您上传的素材",
                        children: <ResourceList data={session?.resources}/>
                    }
                ]}
            />
            <div ref={ref} style={{overflowY: "scroll", flex: 1, scrollbarWidth: "none"}}>
                <Tabs
                    type={'card'}
                    // activeKey={''}
                    items={tabItems || []}
                    tabBarExtraContent={
                        <QuickPrompt
                            onSubmit={(prompt) => onSubmit({prompt})}
                            hide={mainQuestion?.status != "completed"}
                            prompts={getSubPrompts(mainQuestion?.prompt?.id)}
                        />
                    }
                />
            </div>
        </div>
    );
};

export default Session;
