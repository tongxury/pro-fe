import { copyToClipboard } from "@/utils/textOperation";
import { XIconFont } from "@pro/icons";
import { useXTheme, XDivider, XFlex, XIconButton, XText } from "@pro/ui";
import { Answer, MarkdownText, Question } from "@pro/ui-pro";
import { Button, Modal } from "antd";
import html2canvas from "html2canvas-pro";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

interface IShareHomeworkQAModalProps {
    answer: Answer;
    question: Question;
    onCopy: () => void;
}

export default function ShareHomeworkQAModal(props: IShareHomeworkQAModalProps) {
    const { answer, question, onCopy } = props;
    const [open, setOpen] = useState(false);
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const qaRef = useRef<HTMLDivElement>(null);

    const handleCopy = () => {
        copyToClipboard(answer.text);
        onCopy();
    };

    const handleCopyImg = async () => {
        if (qaRef.current) {
            const canvas = await html2canvas(qaRef.current);

            // 将canvas转换为Blob对象
            canvas.toBlob(async (blob) => {
                try {
                    // 创建ClipboardItem
                    const item = new ClipboardItem({
                        "image/png": blob as Blob
                    });

                    // 使用Clipboard API复制到剪切板
                    await navigator.clipboard.write([item]);
                    console.log("图片已复制到剪切板！");
                } catch (error) {
                    console.error("复制到剪切板失败:", error);
                }
            }, "image/png");
        }

        onCopy();
    };

    const handleCopyLink = () => {
        copyToClipboard(window.location.href);
        onCopy();
    };

    const handleShare = () => {
        setOpen(true);
    };

    return (
        <>
            <XIconButton size={35} bordered background={token.colorBgPrimary} onClick={handleShare}>
                <XIconFont name={"ShareLine"} color={token.colorTextL2} />
            </XIconButton>
            <Modal
                open={open}
                centered
                footer={null}
                width={600}
                closeIcon={null}
                maskClosable
                styles={{
                    content: {
                        borderRadius: "24px",
                        background: token.colorBgL1,
                        padding: "16px"
                    }
                }}
                onCancel={() => setOpen(false)}
            >
                <XFlex
                    vertical
                    style={{
                        background: token.colorBgPrimary,
                        borderRadius: "24px",
                        padding: "24px"
                    }}
                >
                    <XFlex vertical ref={qaRef}>
                        <XFlex vertical gap={12}>
                            <XText bold size={18}>
                                {t("question")}
                            </XText>

                            <XText color={token.colorTextPrimary}>{question?.prompt?.text}</XText>
                        </XFlex>

                        <XDivider style={{ marginBlock: 10 }} />

                        <XFlex vertical gap={12}>
                            <XText bold size={18}>
                                {t("solution")}
                            </XText>
                            <MarkdownText text={answer?.text?.slice(0, 300)} />
                        </XFlex>
                    </XFlex>

                    <XFlex justify="flex-end" gap={12} style={{ marginTop: "24px" }}>
                        <Button onClick={onCopy}>{t("copyQA")}</Button>
                        <Button onClick={handleCopyLink}>{t("copyLink")}</Button>
                        <Button onClick={handleCopyImg}>{t("copyImage")}</Button>
                    </XFlex>
                </XFlex>
            </Modal>
        </>
    );
}
