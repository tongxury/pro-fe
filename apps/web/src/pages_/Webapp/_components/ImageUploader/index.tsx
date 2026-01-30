import { uploadFileV2 } from "@/api/api";
import { extractText } from "@/api/chat";
import { useRouter } from "@/navigation";
import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { Attachment, AttachmentView, FileUploader } from "@pro/ui-pro";
import { Progress } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const ImageUploader = ({ onUploaded }: { onUploaded: (attachments: Attachment[]) => void }) => {
    const { token } = useXTheme();

    const t = useTranslations("Default");

    const [attachments, setAttachments] = useState<Attachment[]>([]);

    const [progress, setProgress] = useState<number>(0);

    const onUpload = async (file: File) => {
        setProgress(20);

        setInterval(() => {
            setProgress((p) => (p <= 90 ? p + 10 : p));
        }, 1000);

        const result = await uploadFileV2(file);
        // const res = (await extractText(result?.data?.files?.[0]?.url)) as any;

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
        <FileUploader
            drag
            style={{
                width: "100%",
                // border: "1px solid red",
                // padding: 0,
                background: token.colorBgPrimary,
                borderRadius: 20
            }}
            accept={"image"}
            onUpload={onUpload}
            onFileChange={setAttachments}
            onUploadedFileChange={(attachments) => {
                // setAttachments(attachments);
                onUploaded(attachments);

                setProgress(100);
                return true;
            }}
        >
            {/* <XFlex
                vertical
                style={{
                    background: token.colorBgPrimary,
                    //  border: "1px solid red",
                    margin: -10,
                    minHeight: 200
                }}
                gap={20}
            >
                <XFlex vertical center style={{ flex: 1 }}>
                    {JSON.stringify(attachments)}
                    <XIconFont color={token.colorTextL4} name={"AddImageFilled"} size={50} />
                    <XText color={token.colorTextL3}>{t("uploadingProgress", { progress: progress + "%" })}</XText>
                </XFlex>
                <Progress percent={progress} />
            </XFlex> */}
            {progress > 0 ? (
                <XFlex vertical style={{ minHeight: 200, background: token.colorBgPrimary }} gap={20}>
                    <XFlex vertical center style={{ flex: 1 }}>
                        {/* {JSON.stringify(attachments)} */}
                        <XIconFont color={token.colorTextL4} name={"AddImageFilled"} size={50} />
                        <XText color={token.colorTextL3}>{t("uploadingProgress", { progress: progress + "%" })}</XText>
                    </XFlex>
                    <Progress percent={progress} />
                </XFlex>
            ) : (
                <XFlex vertical style={{ minHeight: 200, background: token.colorBgPrimary }} center gap={20}>
                    {/* {JSON.stringify(attachments)} */}
                    <XIconFont color={token.colorTextL4} name={"AddImageFilled"} size={50} />
                    <XText color={token.colorTextL3}>drag image or click here to upload</XText>
                </XFlex>
            )}
        </FileUploader>
    );
};

export default ImageUploader;
