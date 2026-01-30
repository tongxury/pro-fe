import IconFont from "@/components/Iconfont";
import { useXTheme, XFlex } from "@pro/ui";
import { Attachment, FileUploader } from "@pro/ui-pro";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { SendProps } from "../ChatInput/types";
import { uploadFileV2 } from "@/api/api";
import { Button, Spin } from "antd";
import { usePasteImg } from "@pro/hooks";
import { AttachmentCategory } from "../../../../../../../packages/ui-pro/src/types";
import { useTranslations } from "next-intl";

const CharTextareaGroup = ({ onSend }: { onSend: ({ text, attachments }: SendProps) => void }) => {
    const { token } = useXTheme();
    const t = useTranslations("Default");
    const style: { [key in string]: CSSProperties } = {
        container: {
            border: "2px dashed #dcdce4",
            backgroundColor: "#f8f8f8",
            borderRadius: "10px",
            position: "relative",
            padding: "20px"
        },
        input: {
            // padding: '16px 30px',
            minHeight: 180,
            outline: "none",
            position: "relative",
            zIndex: 1
        },
        containerFocus: {
            border: `2px dashed ${token.colorPrimary}`,
            backgroundColor: token.colorBgLayout
        },
        placeholder: {
            position: "absolute",
            left: 23,
            top: 5,
            color: "#b0b0cd",
            zIndex: 0
        }
    };

    const [val, setInput] = useState("");
    const [focus, setFocus] = useState(false);
    const inputBox = useRef(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { imgInfo, setImgInfo } = usePasteImg(inputBox.current!);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    useEffect(() => {
        if (imgInfo) {
            setLoading(true);
            const imgFile = imgInfo.file;
            onUpload(imgFile!).then((e) => {
                const files =
                    e.data.files?.map((x: any) => ({
                        category: imgFile?.type?.startsWith("image") ? "image" : ("text" as AttachmentCategory),
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
        setLoading(false);
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
        <div>
            <div style={focus ? { ...style.container, ...style.containerFocus } : style.container}>
                <div
                    contentEditable
                    style={style.input}
                    suppressContentEditableWarning
                    ref={inputBox}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    onInput={(e: any) => {
                        if (e.target.innerHTML.indexOf("<img") === -1) {
                            setImgInfo(null);
                            setAttachments([]);
                        }
                        setInput(e.target.textContent);
                    }}
                >
                    {imgInfo?.url && (
                        <Spin spinning={loading} delay={500}>
                            <img alt="" width="95%" src={imgInfo?.url}></img>
                        </Spin>
                    )}
                    <div></div>
                </div>
                {!val ? <p style={style.placeholder}>Ask anything in any subject...</p> : null}
                <XFlex justify="flex-end">
                    <FileUploader
                        drag
                        accept={"image"}
                        onUpload={async (file) => {}}
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
                        onUploadedFileChange={() => {
                            return true;
                        }}
                    >
                        <IconFont name="img" style={{ cursor: "pointer" }} size={30} color={"#888"} />
                    </FileUploader>
                </XFlex>
            </div>
            <XFlex justify="center">
                <Button
                    disabled={(!val && attachments.length === 0) || loading}
                    onClick={() => {
                        if (val || attachments) {
                            onSend({ text: val, attachments });
                        }
                    }}
                    type="primary"
                    size="large"
                    style={{ width: 300, marginTop: 30 }}
                >
                    {t("Get answer")}
                </Button>
            </XFlex>
        </div>
    );
};

export default CharTextareaGroup;
