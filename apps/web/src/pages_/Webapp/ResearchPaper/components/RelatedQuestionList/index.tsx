import { useXTheme, XFlex, xPadding, XText } from "@pro/ui";
import { Question } from "@pro/ui-pro";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

interface IProps {
    data?: Question[];
    style?: CSSProperties;
}

const RelatedQuestionList = (props: IProps) => {
    const { data, style } = props;
    const { token } = useXTheme();
    // todo 待处理语言国际化
    const t = useTranslations();
    const onClick = (id?: string) => {
        // [todo] 点击跳转事件
        console.log(id);
    };

    return (
        <>
            {!!data?.length && (
                <XFlex
                    vertical
                    style={{
                        border: `1px solid ${token.colorBorder}`,
                        borderRadius: 14,
                        ...xPadding(16, 20, 20, 20),
                        ...style
                    }}
                >
                    <XFlex>
                        <XText
                            bold
                            size={18}
                            style={{
                                fontFamily: "SFProDisplay-Bold",
                                marginBottom: 4
                            }}
                        >
                            {t("Related Questions")}
                        </XText>
                    </XFlex>
                    {data?.map((item, index) => {
                        return (
                            <XFlex
                                key={index}
                                style={{
                                    paddingBlock: 10,
                                    borderBottom:
                                        data?.length - 1 === index ? undefined : `1px solid ${token.colorBorder}`,
                                    cursor: "pointer"
                                }}
                                onClick={() => onClick(item.question_id)}
                            >
                                <XText
                                    size={14}
                                    color={token.colorTextL2}
                                    style={{
                                        lineHeight: "22px",
                                        fontFamily: "SFProDisplay-Regular"
                                    }}
                                >
                                    {item.prompt?.text}
                                </XText>
                            </XFlex>
                        );
                    })}
                </XFlex>
            )}
        </>
    );
};

export default RelatedQuestionList;
