"use client";

import { fetchQuestionAnswers, uploadFileV2 } from "@/api/api";
import { createChatEvent } from "@/api/eventsource";
import PageContainer from "@/layouts/Webapp/PageContainer";
import { usePathname } from "@/navigation";
import { XIcon } from "@pro/icons";
import { useXTheme, XFlex, XOption } from "@pro/ui";
import {
    Answer,
    Attachment,
    AttachmentView,
    FileUploader,
    modelOptions,
    modeOptions,
    Prompt,
    promptChat,
    promptChatDocument,
    promptChatImage,
    Question,
    QuestionAnswer,
    Selector
} from "@pro/ui-pro";
import { Button, Input, Select, Space, Spin, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import PreChat from "./PreChat";
import QAList from "./QAList";
import Sessions from "./Sessions";
import IconFont from "@/components/Iconfont";
import Iconfont from "@/components/Iconfont";
import { usePasteImg } from "@pro/hooks";

export default function Chat() {
    const t = useTranslations("Default");

    const { token, custom } = useXTheme();
    const pathname = usePathname();

    const [attachments, setAttachments] = useState<Attachment[]>();

    const [sessionId, setSessionId] = useState(uuid());
    const [inputText, setInputText] = useState("");

    const modeOptions_ = modeOptions(token.colorPrimary!, (raw: string) => t(raw));
    const modelOptions_ = modelOptions(token.colorPrimary!);

    const [mode, setMode] = useState<XOption | undefined>(modeOptions_?.[0]);
    const [model, setModel] = useState<XOption | undefined>(modelOptions_?.[0]);

    const [qas, setQas] = useState<QuestionAnswer[]>([]);

    const [prompt, setPrompt] = useState<Prompt>();
    const [loading, setLoading] = useState(false);

    const reset = () => {
        setPrompt(undefined);
        setAttachments([]);
        setInputText("");
    };

    const onSend = async (question: Question) => {
        console.log("onSend", question);

        // if (loading) return;

        const answer: Answer = {
            // loading: true,
            text: "",
            status: "preparing"
        };

        let newQas: QuestionAnswer[] = qas;

        // todo 这里整个一块的空指针问题
        if (question.id) {
            const lastQa = newQas[newQas.length - 1];
            const newLastQa = {
                ...lastQa,
                answers: [...(lastQa?.answers || []), answer]
            };

            // @ts-ignore
            newQas = [...newQas.slice(0, newQas.length - 1), newLastQa];
        } else {
            newQas = [...newQas, { question, answers: [answer] }];
        }

        setQas(newQas);

        const { close } = await createChatEvent({
            params: {
                ...question,
                // id: question?.id || question?.questionId,
                prompt: {
                    ...question?.prompt,
                    key: question.prompt?.key || promptChat.key,
                    text: question.prompt?.text || inputText
                },
                attachments,
                sessionId,
                // questionId: 'questionId', // todo
                // attachments: [
                //     {
                //         category: 'text',
                //         content: question.text || inputText
                //     }
                // ],
                // text: question.text || inputText
                model: model?.key || ""
            },
            onStart: () => {
                reset();
            },
            onEvent: (content) => {
                setLoading(true);
                const messagesV3 = [...newQas];

                if (messagesV3.length > 0) {
                    const newItem = messagesV3[messagesV3.length - 1]!;

                    // todo 通过questionId取 对应的qa 而不是通过顺序 取最后一个
                    newItem!.answers![newItem!.answers!.length - 1]!.text =
                        `${newItem!.answers![newItem!.answers!.length - 1]!.text || ""}${content || ""}`;
                    newItem!.answers![newItem!.answers!.length - 1]!.status = "generating";

                    messagesV3.pop();
                    messagesV3.push(newItem);

                    setQas(messagesV3);
                }
            },
            onComplete: (summary) => {
                setLoading(false);

                const messagesV3 = [...newQas];
                const newItem = messagesV3[messagesV3.length - 1];

                messagesV3[messagesV3.length - 1]!.question = {
                    ...newItem!.question,
                    ...summary?.question
                };

                newItem!.answers![newItem!.answers!.length - 1]!.status = "";

                setQas(messagesV3);

                // refreshUser()
            },
            onError: (code, message) => {
                setLoading(false);
                const messagesV3 = [...newQas];
                const newItem = messagesV3[messagesV3.length - 1];
                newItem!.answers![newItem!.answers!.length - 1]!.status = "error";
                newItem!.answers![newItem!.answers!.length - 1]!.errorMessage = message;

                setQas(messagesV3);

                // refreshUser()
            }
        });
        // setClose(close)
    };

    const sendWithText = async () => {
        if (inputText) {
            setImgInfo(null);
            await onSend({
                prompt: {
                    ...prompt,
                    key: prompt?.key || promptChat.key,
                    text: inputText
                },
                attachments: attachments
            });
            // reset()
        }
    };

    const onNewChat = () => {
        reset();
        setSessionId(uuid());
        setQas([]);
    };

    const onSessionSelect = (session_id: string) => {
        fetchQuestionAnswers({ session_id }).then((rsp: any) => {
            if (rsp.question_answer_pairs && rsp.question_answer_pairs?.length > 0) {
                setQas(rsp.question_answer_pairs);
                setSessionId(session_id);
            }
        });
    };

    const onUploadedImageChange = (files: Attachment[]) => {
        // setAttachments(files);
        // setPrompt(promptChatImage);
        return true;
    };

    const onUploadedFileChange = (files: Attachment[]) => {
        setAttachments(files);
        setPrompt(promptChatDocument);
        return false;
    };

    const inputBox = useRef<any>(null);
    const [focus, setFocus] = useState(false);
    const { imgInfo, setImgInfo } = usePasteImg(inputBox.current!);
    const [imgLoading, setImgLoading] = useState<boolean>(false);
    useEffect(() => {
        if (imgInfo) {
            setImgLoading(true);
            const imgFile = imgInfo.file;
            onUpload(imgFile!).then((e) => {
                const files =
                    e.data.files?.map((x: any) => ({
                        category: imgFile?.type?.startsWith("image") ? "image" : ("text" as any),
                        content: x.content,
                        url: x.url,
                        name: x.name,
                        size: imgFile?.size,
                        status: "done",
                        file: imgFile
                    })) || [];

                const uploadedFiles = files.filter((x: any) => x.status === "done");
                setAttachments(uploadedFiles);
            });
        }
    }, [imgInfo, inputBox]);

    const onUpload = async (file: File) => {
        const result = await uploadFileV2(file);
        setImgLoading(false);
        return {
            data: {
                files: [
                    {
                        ...result.data?.files?.[0],
                        content: "contentcontentcontent"
                    }
                ]
            }
        };
    };

    return (
        <PageContainer
            headerLeft={t("chat")}
            headerMiddle={
                <XFlex align={"center"} justify={"end"} style={{ flex: 1 }}>
                    <XFlex align={"center"} gap={15}>
                        <Tooltip title={t("new_chat")}>
                            <div>
                                <Button shape="circle" type="primary">
                                    <IconFont
                                        color={"#fff"}
                                        style={{ cursor: "pointer" }}
                                        name="xinjianliaotian"
                                        size={20}
                                    />
                                </Button>
                            </div>
                        </Tooltip>
                        <Tooltip title={t("chat_history")}>
                            <div>
                                <Sessions onItemClick={onSessionSelect} current={sessionId}>
                                    <Button shape="circle" type="primary">
                                        <IconFont
                                            color={"#fff"}
                                            style={{ cursor: "pointer" }}
                                            name="lishixiao"
                                            size={20}
                                        />
                                    </Button>
                                </Sessions>
                            </div>
                        </Tooltip>
                    </XFlex>
                </XFlex>
            }
        >
            <XFlex vertical gap={5} style={{ padding: 20, height: "100%", boxSizing: "border-box" }}>
                <XFlex style={{ flex: 1, overflowY: "scroll" }}>
                    {qas && qas.length > 0 ? (
                        <QAList data={qas} onRegenerate={onSend} style={{ width: "100%" }} />
                    ) : (
                        <XFlex justify={"end"} style={{ width: "100%" }}>
                            <PreChat onSend={onSend} />
                        </XFlex>
                    )}
                </XFlex>
                <XFlex vertical gap={6}>
                    {/* <XFlex align={"center"} gap={10}>
                        <FileUploader
                            onUpload={uploadFileV2}
                            onUploadedFileChange={onUploadedImageChange}
                            accept={"image"}
                        >
                            <XIcon
                                name={"UploadLineFixed"}
                                style={{ cursor: "pointer" }}
                            />
                        </FileUploader>

                        <FileUploader
                            onUpload={uploadFileV2}
                            onUploadedFileChange={onUploadedFileChange}
                            accept={"file"}
                        >
                            <XIcon
                                name={"AttachLineFixed"}
                                style={{ cursor: "pointer" }}
                            />
                        </FileUploader>
                    </XFlex> */}

                    <XFlex
                        vertical
                        style={{
                            // padding: 10,
                            borderRadius: 8
                            // ...(focus ?
                            //     {border: '1px solid ' + token.colorPrimary} :
                            //     {
                            //         background: token.colorBgL1,
                            //         border: '1px solid ' + token.colorBgL1
                            //     })
                        }}
                    >
                        {!!attachments?.length && (
                            <XFlex style={{ padding: 5, flexWrap: "wrap" }} align={"center"}>
                                {attachments?.map((x: Attachment, index: number) => (
                                    <AttachmentView
                                        key={index}
                                        data={x}
                                        // onRemove={data =>
                                        //     setAttachments(attachments => attachments?.filter(x => x.name != data?.name))
                                        // }
                                    />
                                ))}
                            </XFlex>
                        )}
                        {/* 输入框编辑区 */}
                        <XFlex
                            gap={10}
                            vertical
                            style={{
                                border: `1px solid ${token.colorPrimary}`,
                                borderRadius: 5,
                                padding: "10px 0 0 0",
                                background: "#fff"
                            }}
                        >
                            {/* <PromptInput
                              style={{
                                  outlineStyle: "none",
                                  color: token.colorTextPrimary,
                                  background: token.colorBgPrimary,
                                  fontFamily: "Nunito-Bold"
                              }}
                              // ref={ref}
                              variant="borderless"
                              value={inputText}
                              onChange={(e) => {
                                  setInputText(e.target.value);
                              }}
                              autoFocus
                              // placeholder={textarea?.placeholder}
                              onPressEnter={(e) => {
                                  e.preventDefault();
                                  sendWithText();
                              }}
                          /> */}
                            <div
                                contentEditable
                                style={{
                                    minHeight: 180,
                                    outline: "none",
                                    position: "relative",
                                    padding: "0 10px",
                                    zIndex: 1
                                }}
                                suppressContentEditableWarning
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                                ref={inputBox}
                                onInput={(e: any) => {
                                    if (e.target.innerHTML.indexOf("<img") === -1) {
                                        setImgInfo(null);
                                        setAttachments([]);
                                    }
                                    setInputText(e.target.textContent);
                                }}
                            >
                                {imgInfo?.url && (
                                    <Spin spinning={imgLoading} delay={500}>
                                        <img alt="" width="95%" src={imgInfo?.url}></img>
                                    </Spin>
                                )}
                                <div></div>
                            </div>
                            <XFlex
                                align={"center"}
                                justify="space-between"
                                style={{ background: "#f1f5f9", padding: "8px", borderRadius: "0 0 5px 5px" }}
                            >
                                <XFlex align={"center"} style={{ padding: 8 }} gap={16}>
                                    {/* <Select
                                  value={mode?.value}
                                  onChange={(e) => {
                                    const res = modeOptions_.find(v => v.value == e)
                                    setMode(res)
                                  }}
                                  options={modeOptions_}
                                  optionRender={(option) => (
                                    <Space>
                                      <span role="img" aria-label={option.data.desc}>
                                        <XIcon
                                            name={option.data.icon}
                                            color={token.colorPrimary}
                                        />
                                      </span>
                                      {option.data.desc}
                                    </Space>
                                  )}
                                /> */}
                                    <Selector
                                        current={mode!}
                                        options={modeOptions_}
                                        onChange={(option: XOption) => setMode(option)}
                                    />

                                    <Selector
                                        current={model!}
                                        options={modelOptions_}
                                        onChange={(option: XOption) => setModel(option)}
                                    />
                                </XFlex>
                                <XFlex align="center" gap={10}>
                                    <FileUploader
                                        // onUpload={uploadFileV2}
                                        onUpload={async (file) => {}}
                                        onUploadedFileChange={onUploadedImageChange}
                                        accept={"image"}
                                        onbeforeUpload={(file) => {
                                            const reader = new FileReader();
                                            reader.readAsArrayBuffer(file);
                                            reader.onload = function (event: any) {
                                                const blob = new Blob([event.target.result], { type: file.type });
                                                // 处理Blob对象
                                                const source = URL.createObjectURL(blob!);
                                                setImgInfo({ url: source, file: file });
                                            };
                                        }}
                                    >
                                        <IconFont
                                            style={{ cursor: "pointer" }}
                                            name="img"
                                            size={25}
                                            color={token.colorPrimary}
                                        />
                                        {/* <XIcon
                                      name={"UploadLineFixed"}
                                      style={{ cursor: "pointer" }}
                                      /> */}
                                    </FileUploader>
                                    {/* <FileUploader
                                  onUpload={uploadFileV2}
                                  onUploadedFileChange={onUploadedFileChange}
                                  accept={"file"}
                              >
                                  <IconFont style={{cursor: 'pointer'}} name='window' size={20} color={token.colorPrimary} />
                              </FileUploader> */}
                                    <XFlex>
                                        <Iconfont
                                            onClick={() => {
                                                sendWithText();
                                            }}
                                            style={{ cursor: "pointer" }}
                                            name="send1"
                                            size={20}
                                            color={token.colorPrimary}
                                        />
                                    </XFlex>
                                </XFlex>
                            </XFlex>
                        </XFlex>
                    </XFlex>
                </XFlex>
            </XFlex>
        </PageContainer>
    );
}
