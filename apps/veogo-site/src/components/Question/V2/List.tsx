import { useXTheme, XFlex, XText } from "@pro/ui";
import QuestionView from "@/components/Question/V2/View";
import GeneratingView from "@/components/Question/V2/GeneratingView";
import { Button } from "antd";
import eventBus, { eventTypes } from "@/utils/eventBus";
import { useFetchQuestions } from "@/api/api";
import { ReloadOutlined } from "@ant-design/icons";

const QuestionList = ({
    data,
    onRetry,
    mutateQuestions
}: {
    data: any;
    onRetry?: (question: any) => void;
    mutateQuestions: () => void;
}) => {
    const { themeVars } = useXTheme();

    // const [questions, {
    //     loading: questionLoading,
    //     mutate: mutateQuestions
    // }] = useFetchQuestions({sessionId: data.id});
    //
    //
    // if (questions?.list?.length) {
    //     return <></>
    // }

    function renderQuestion(data: any) {
        if (data.status === "created") {
            return (
                <Button
                    color={"red"}
                    onClick={
                        // () => eventBus.emit(eventTypes.OpenPricingModal)
                        () => onRetry?.(data)
                    }
                    type={"primary"}
                    block
                    size={"large"}
                >
                    请购买积分后重试
                </Button>
            );
        }

        if (data.status === "completed") {
            return <QuestionView key={data._id} data={data} />;
        }

        if (data.status === "prepared" || data.status === "generating" || data.status === "toRetry") {
            return <GeneratingView data={data} onComplete={mutateQuestions} />;
        }

        if (data.status === "failed") {
            return (
                <Button
                    icon={<ReloadOutlined />}
                    onClick={
                        // () => eventBus.emit(eventTypes.OpenPricingModal)
                        () => onRetry?.(data)
                    }
                    type={"primary"}
                    block
                    size={"large"}
                >
                    生成失败，请点击重试(失败后不会消耗您的积分)
                </Button>
            );
        }

        return <></>;
    }

    return <div style={{overflowY: 'scroll'}}>{renderQuestion(data)}</div>;
};

export default QuestionList;
