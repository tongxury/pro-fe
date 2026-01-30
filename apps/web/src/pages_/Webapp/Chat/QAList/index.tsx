import { BallPulse } from "@alex_xu/react-loading";
import { XIcon } from "@pro/icons";
import { useXTheme, xBorderRadius, XFlex, XImage, xPadding, XText } from "@pro/ui";
import {
    Attachment,
    AttachmentView,
    promptChat,
    promptOptionsMap,
    PromptView,
    Question,
    QuestionAnswer
} from "@pro/ui-pro";
import { Marked } from "marked";
import { useTranslations } from "next-intl";
import React, { ReactNode, useEffect, type CSSProperties } from "react";

import Regenerate from "./Regenerate";

const QAList = ({
    data,
    onRegenerate,
    style
}: {
    data?: QuestionAnswer[];
    onRegenerate: (question: Question) => void;
    style?: CSSProperties;
}) => {
    const t = useTranslations("Default");

    useEffect(() => {
        const listContainer = document.getElementById("studygptListContainer");

        if (listContainer) {
            listContainer.scrollTop = 100000000;
        }
    }, [data]);

    const { token } = useXTheme();

    const HeadInfo = ({ name, avatar }: { name: string; avatar?: ReactNode }) => {
        return (
            <XFlex align={"center"} gap={5}>
                <>{avatar}</>
                <XText bold size={15}>
                    {name}
                </XText>
            </XFlex>
        );
    };

    const md = new Marked();
    // markedHighlight({
    //     // langPrefix: 'hljs language-',
    //     highlight(code, lang, info) {
    //         const language = hljs.getLanguage(lang) ? lang : 'golang';
    //         return hljs.highlight(code, {language}).value;
    //     }
    // }),

    return (
        <XFlex vertical gap={15} id={"studygptListContainer"} style={style}>
            {data?.map((x: QuestionAnswer, i: number) => {
                const isLast = data.length - 1 === i;
                return (
                    <XFlex key={i} vertical align={"normal"} gap={10} style={{ marginInline: 15 }}>
                        <XFlex vertical gap={3} align={"end"}>
                            <XFlex
                                vertical
                                style={{
                                    background: token.colorPrimary,
                                    color: token.colorBgPrimary,
                                    ...xPadding(10, 15, 10, 15),
                                    ...xBorderRadius(10, 0, 10, 10)
                                }}
                                gap={10}
                            >
                                {x.question.prompt?.text && (
                                    <XText color={token.colorBgPrimary}>{x.question.prompt?.text}</XText>
                                )}
                                {/* 附件 */}
                                {x.question.attachments?.map((ax: Attachment, i: number) => (
                                    <AttachmentView key={i} data={ax} />
                                ))}
                            </XFlex>
                        </XFlex>
                        {x.answers?.map((ax: any, i) => {
                            const promptKey = x.question.prompt?.key || promptChat.key!;

                            return (
                                <XFlex key={i} vertical gap={10}>
                                    <PromptView key={promptKey} title={t(promptKey)} />
                                    <XFlex
                                        vertical
                                        gap={3}
                                        style={{
                                            padding: 15,
                                            background: token.colorBgL1,
                                            ...xBorderRadius(0, 10, 10, 10)
                                        }}
                                    >
                                        {/* loading状态 */}
                                        {ax.status === "preparing" && (
                                            <BallPulse style={{ maxWidth: 60 }} color={token.colorPrimary} size={5} />
                                        )}
                                        {/*{ax.status === 'error' &&*/}
                                        {/*    <XFlex vertical gap={10}>*/}
                                        {/*        <Typography.Text style={{color: token.colorError}}>*/}
                                        {/*            /!*{ax.errorMessage}*!/*/}
                                        {/*        </Typography.Text>*/}
                                        {/*        <Button onClick={openPricingPage} size={'small'}*/}
                                        {/*                variant={'contained'}>{$t({id: 'upgrade'})}</Button>*/}
                                        {/*    </XFlex>*/}
                                        {/*}*/}
                                        {(!ax.status || ax.status === "loading") &&
                                            (ax?.renderByRaw ? (
                                                <XText>{ax.text}</XText>
                                            ) : (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        // @ts-ignore
                                                        __html: `<div style="width: 100%; overflow: scroll; font-size: 15px; color: ${token.colorTextPrimary}">${md.parse(ax.text)}</div>`
                                                    }}
                                                />
                                            ))}
                                    </XFlex>
                                    {/* 操作按钮 */}
                                    {!ax.status && isLast && (
                                        // !ax.quote && // 引用的消息 不做复杂逻辑
                                        <XFlex align={"center"} gap={1}>
                                            <Regenerate data={x} onSend={onRegenerate} />
                                            {/*<Tooltip title={$t({id: 'copy'})}>*/}
                                            {/*    <IconButton size={'small'} onClick={() => copy(ax.text)}>*/}
                                            {/*        <IconFont name='copy' color={token.colorTextL1}*/}
                                            {/*                  size={13}/>*/}
                                            {/*    </IconButton>*/}
                                            {/*</Tooltip>*/}
                                            {/*/!*<Tooltip title={$t({id: 'quote'})}>*!/*/}
                                            {/*/!*    <IconButton onClick={() => onQuote(message)}>*!/*/}
                                            {/*/!*        <IconFont name='quote' color={token.colorTextSecondary}*!/*/}
                                            {/*/!*                  size={13}/>*!/*/}
                                            {/*/!*    </IconButton>*!/*/}
                                            {/*/!*</Tooltip>*!/*/}
                                            {/*/!*{*!/*/}
                                            {/*<Tooltip title={$t({id: 're_edit'})}>*/}
                                            {/*    <IconButton size={'small'}*/}
                                            {/*                onClick={() => onReedit(x.question)}>*/}
                                            {/*        <IconFont name='edit'*/}
                                            {/*                  color={token.colorTextL1}*/}
                                            {/*                  size={13}/>*/}
                                            {/*    </IconButton>*/}
                                            {/*</Tooltip>*/}
                                            {/*{*/}
                                            {/*    isLast &&*/}
                                            {/*    <Tooltip title={$t({id: 'regenerate'})}>*/}
                                            {/*        <IconButton size={'small'}*/}
                                            {/*                    onClick={() => onRegenerate(x.question)}>*/}
                                            {/*            <IconFont name='redo'*/}
                                            {/*                      color={token.colorTextL1}*/}
                                            {/*                      size={13}/>*/}
                                            {/*        </IconButton>*/}
                                            {/*    </Tooltip>*/}
                                            {/*}*/}
                                        </XFlex>
                                    )}
                                </XFlex>
                            );
                        })}
                    </XFlex>
                );
            })}
            {/*<List*/}
            {/*    dataSource={data || []}*/}
            {/*    split={false}*/}
            {/*    renderItem={(x: QuestionAnswerView, i: number) => {*/}
            {/*        const isLast = data.length - 1 === i*/}

            {/*        return (*/}
            {/*            <XFlex key={i} vertical gap={10}>*/}
            {/*                <XFlex key={i} vertical gap={3}>*/}
            {/*                    /!*<HeadInfo name={$t({id: 'you'})} avatar={user?.avatar}/>*!/*/}
            {/*                    <XFlex vertical align={'end'}*/}
            {/*                           style={{*/}
            {/*                               marginLeft: 90,*/}
            {/*                               background: token.colorPrimary,*/}
            {/*                               color: token.colorBgPrimary,*/}
            {/*                               ...xPadding(10, 15, 10, 15),*/}
            {/*                               ...xBorderRadius(10, 0, 10, 10)*/}
            {/*                           }}*/}
            {/*                           gap={10}*/}
            {/*                    >*/}
            {/*                        /!* 提示词 *!/*/}
            {/*                        {x.question.prompt &&*/}
            {/*                            <XFlex>*/}
            {/*                                {*/}
            {/*                                    x.question.prompt.key && <XTag*/}
            {/*                                        icon={x.question.prompt.icon}*/}
            {/*                                    >*/}
            {/*                                        {$t({id: x.question.prompt.key})}*/}
            {/*                                    </XTag>*/}
            {/*                                }*/}
            {/*                                {*/}
            {/*                                    !x.question.prompt.key && x.question.prompt.text &&*/}
            {/*                                    <Tag.tsx bordered={false}*/}
            {/*                                         style={{color: token.colorPrimary}}*/}
            {/*                                        // icon={x.question.prompt.icon}*/}
            {/*                                    >*/}
            {/*                                        {x.question.prompt.text}*/}
            {/*                                    </Tag.tsx>*/}
            {/*                                }*/}

            {/*                            </XFlex>}*/}
            {/*                        /!* 引用 *!/*/}
            {/*                        {x.question.quote && <Typography.Text*/}
            {/*                            style={{*/}
            {/*                                background: token.colorBgL1, borderRadius: 8, padding: 5,*/}
            {/*                                color: token.colorTextL2*/}
            {/*                            }}>{x.question.quote.text}</Typography.Text>}*/}
            {/*                        /!* 输入 *!/*/}
            {/*                        {x.question.text && <Typography.Text>{x.question.text}</Typography.Text>}*/}
            {/*                        /!* 附件 *!/*/}
            {/*                        {x.question.attachment && <AttachmentView data={x.question.attachment}/>}*/}
            {/*                    </XFlex>*/}
            {/*                </XFlex>*/}
            {/*                {*/}
            {/*                    x.answers?.map((ax, i) => {*/}
            {/*                        return <XFlex key={i} vertical gap={2} style={{background: token.colorBgL1}}>*/}
            {/*                            <HeadInfo name={appName} avatar={logo}/>*/}
            {/*                            <XFlex vertical style={{marginLeft: 30}} gap={3}>*/}
            {/*                                /!* loading状态 *!/*/}
            {/*                                {ax.status === 'preparing' &&*/}
            {/*                                    <XFlex><BallPulse style={{maxWidth: 60}} color={token.colorPrimary}*/}
            {/*                                                      size={5}/></XFlex>}*/}
            {/*                                {ax.status === 'error' &&*/}
            {/*                                    <XFlex vertical gap={10}>*/}
            {/*                                        <Typography.Text style={{color: token.colorError}}>*/}
            {/*                                            /!*{ax.errorMessage}*!/*/}
            {/*                                        </Typography.Text>*/}
            {/*                                        <Button onClick={openPricingPage} size={'small'}*/}
            {/*                                                variant={'contained'}>{$t({id: 'upgrade'})}</Button>*/}
            {/*                                    </XFlex>*/}
            {/*                                }*/}
            {/*                                {(!ax.status || ax.status === 'loading') &&*/}
            {/*                                    <div style={{margin: 0}}*/}
            {/*                                         dangerouslySetInnerHTML={{*/}
            {/*                                             __html: md.parse(*/}
            {/*                                                 ax.text*/}
            {/*                                             )*/}
            {/*                                         }}/>*/}

            {/*                                }*/}
            {/*                                /!* 操作按钮 *!/*/}
            {/*                                {*/}
            {/*                                    !ax.status &&*/}
            {/*                                    // !ax.quote && // 引用的消息 不做复杂逻辑*/}
            {/*                                    <XFlex align={'center'} gap={1}>*/}
            {/*                                        <Tooltip title={$t({id: 'copy'})}>*/}
            {/*                                            <IconButton size={'small'} onClick={() => copy(ax.text)}>*/}
            {/*                                                <IconFont name='copy' color={token.colorTextL1}*/}
            {/*                                                          size={13}/>*/}
            {/*                                            </IconButton>*/}
            {/*                                        </Tooltip>*/}
            {/*                                        /!*<Tooltip title={$t({id: 'quote'})}>*!/*/}
            {/*                                        /!*    <IconButton onClick={() => onQuote(message)}>*!/*/}
            {/*                                        /!*        <IconFont name='quote' color={token.colorTextSecondary}*!/*/}
            {/*                                        /!*                  size={13}/>*!/*/}
            {/*                                        /!*    </IconButton>*!/*/}
            {/*                                        /!*</Tooltip>*!/*/}
            {/*                                        /!*{*!/*/}
            {/*                                        <Tooltip title={$t({id: 're_edit'})}>*/}
            {/*                                            <IconButton size={'small'}*/}
            {/*                                                        onClick={() => onReedit(x.question)}>*/}
            {/*                                                <IconFont name='edit'*/}
            {/*                                                          color={token.colorTextL1}*/}
            {/*                                                          size={13}/>*/}
            {/*                                            </IconButton>*/}
            {/*                                        </Tooltip>*/}
            {/*                                        {*/}
            {/*                                            isLast &&*/}
            {/*                                            <Tooltip title={$t({id: 'regenerate'})}>*/}
            {/*                                                <IconButton size={'small'}*/}
            {/*                                                            onClick={() => onRegenerate(x.question)}>*/}
            {/*                                                    <IconFont name='redo'*/}
            {/*                                                              color={token.colorTextL1}*/}
            {/*                                                              size={13}/>*/}
            {/*                                                </IconButton>*/}
            {/*                                            </Tooltip>*/}
            {/*                                        }*/}
            {/*                                    </XFlex>*/}
            {/*                                }*/}

            {/*                            </XFlex>*/}

            {/*                        </XFlex>*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </XFlex>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*/>*/}
        </XFlex>
    );
};

export default QAList;
