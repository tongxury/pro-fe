import { useXTheme, xBorderRadius, XFlex, xPadding, XTextButton } from "@pro/ui";
import { Prompt, promptChat, Question } from "@pro/ui-pro";
import { useRequest } from "ahooks";
import { useTranslations } from "next-intl";
import React, { type CSSProperties } from "react";

const PreChat = ({ onSend, style }: { onSend: (question: Question) => void; style?: CSSProperties }) => {
    const t = useTranslations("Default");

    // const {data: preQuestions} = useRequest<any, any>(fetchPreQuestions)

    const preQuestions = {
        message: "",
        code: 0,
        guides: [
            {
                question: "What can I do if I find that my request failed to send?",
                answer: ""
            },
            {
                question: "How to use StudyGPT to answer academic questions?",
                answer: ""
            },
            {
                question: "What are the causes of financial crisis?",
                answer: ""
            }
        ]
    };

    // const {data: preQuestions} = useFetchPreQuestions({refreshDeps: [appLang]})

    // const preQuestions: Question = [
    //     {}
    // ]

    const { token, custom } = useXTheme();

    return (
        <XFlex vertical justify={"space-between"} style={{ height: "100%", ...style }} gap={25}>
            {/*<XFlex vertical style={{width: '100%'}} gap={20}>*/}
            {/*    <XFlex justify={'center'} gap={20} align={'center'}>*/}
            {/*        <XFlex*/}
            {/*            style={{position: "relative"}}>*/}
            {/*            <XImage*/}
            {/*                style={{*/}
            {/*                    margin: 'auto',*/}
            {/*                    borderRadius: '8%',*/}
            {/*                    ...xBoxShadow({color: token.colorShadow, width: 10})*/}
            {/*                }}*/}
            {/*                src={answer_img} w="100%" mw={200}/>*/}
            {/*            <XText size={20} weight={900} style={{*/}
            {/*                fontFamily: 'Nunito-Black',*/}
            {/*                ...xPosition({position: "absolute", bottom: 10, left: 28}),*/}
            {/*                width: 137,*/}
            {/*            }}*/}
            {/*                   color={{*/}
            {/*                       //direction:custom.answerDeg,*/}
            {/*                       //colorStops: [custom.answerLiner1, custom.answerLiner2]*/}
            {/*                       //@ts-ignore*/}
            {/*                       direction: '233deg',*/}
            {/*                       colorStops: ['#04FFF0 -15.7%', '#0075FF 90.25%']*/}
            {/*                   }}*/}
            {/*            >{$t({id: "getAnswer"})}*/}
            {/*            </XText>*/}
            {/*        </XFlex>*/}
            {/*        <XFlex*/}
            {/*            style={{position: "relative"}}>*/}
            {/*            <XImage*/}
            {/*                style={{*/}
            {/*                    margin: 'auto',*/}
            {/*                    borderRadius: '8%',*/}
            {/*                    ...xBoxShadow({*/}
            {/*                        color: token.colorShadow, width: 20*/}
            {/*                    })*/}
            {/*                }}*/}
            {/*                src={document_img} w="100%" mw={200}/>*/}
            {/*            <XText size={20} weight={900} style={{*/}
            {/*                ...xPosition({*/}
            {/*                    position: 'absolute', bottom: 10, left: 28*/}
            {/*                }),*/}
            {/*                width: 107,*/}
            {/*                ...xFont({*/}
            {/*                    family:"Nunito-Black"*/}
            {/*                }),*/}
            {/*            }}*/}
            {/*                   color={{*/}
            {/*                       //@ts-ignore*/}
            {/*                       direction: '21deg',*/}
            {/*                       colorStops: ['#042CFF 20.25%', '#00D1FF 89.83%']*/}
            {/*                   }}*/}
            {/*            >*/}
            {/*                {$t({id: "uploadDoc"})}*/}
            {/*            </XText>*/}
            {/*        </XFlex>*/}
            {/*    </XFlex>*/}

            {/*    <XFlex gap={5} align={'center'} justify={'center'} style={{fontFamily: 'Nunito-SemiBold',}}>*/}
            {/*        <XImage src={GuideSvg} size={15} style={{marginBottom: 7}}/>*/}
            {/*        <XText bold color={token.colorTextPrimary}>{$t({id: 'try'})}</XText>*/}
            {/*        <XFlex align={'center'}>*/}
            {/*            <XText bold color={token.colorTextPrimary}*/}
            {/*                   style={{background: token.colorPrimary + "33"}}>{$t({id: 'selecting'})}</XText>*/}
            {/*            <XImage style={{marginBottom: 8}} src={WebsitesSvg} w={5}/>*/}
            {/*        </XFlex>*/}
            {/*        <XText bold color={token.colorTextPrimary}>{$t({id: 'any text on websites'})}</XText>*/}
            {/*    </XFlex>*/}
            {/*</XFlex>*/}
            {/*<div></div>*/}

            <XFlex vertical gap={10} style={{ paddingInline: 15 }}>
                <XFlex gap={15} vertical align={"end"}>
                    {preQuestions?.guides?.map((x: Question, i: number) => {
                        return (
                            <XTextButton
                                key={i}
                                style={{
                                    ...xPadding(9, 12, 9, 12),
                                    ...xBorderRadius(20, 20, 0, 20),
                                    border: "1px solid " + token?.colorPrimary,
                                    color: token?.colorPrimary,
                                    fontFamily: "Nunito-Regular"
                                }}
                                onClick={() =>
                                    onSend({
                                        prompt: {
                                            key: promptChat.key,
                                            text: x.question
                                        }
                                    })
                                }
                            >
                                {x.question}
                                {/*{x.attachment && <AttachmentView data={x.attachment} preview={false}/>}*/}
                            </XTextButton>
                        );
                    })}
                </XFlex>
            </XFlex>
        </XFlex>
    );
};

export default PreChat;
