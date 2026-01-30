import { useXTheme, XFlex, XParagraph, XText } from "@pro/ui";
import { Attachment, AttachmentView, Question } from "@pro/ui-pro";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";

function QuestionView({ x, style }: { x: Question; style?: CSSProperties }) {
    const t = useTranslations("Default");
    const { token } = useXTheme();
    return (
        <XFlex
            vertical
            padding={[10, 15, 10, 15]}
            gap={10}
            style={{
                borderRadius: 10,
                ...style,
                // border: "1px solid " + token.colorBorder
                background: token.colorBgPrimary
            }}
        >
            <XFlex align={"center"} justify={"space-between"} padding={[8, 0, 8, 0]}>
                <XText bold size={20}>
                    {t("question")}
                </XText>
            </XFlex>
            {/* <Divider style={{ marginBlock: 0 }} /> */}
            {x?.attachments?.map((x: Attachment, i: number) => {
                return (
                    <AttachmentView
                        key={i}
                        data={x}
                        style={{
                            minHeight: 200,
                            width: "100%"
                        }}
                    />
                );
            })}
            {x?.prompt?.text && (
                <XParagraph
                    ellipsis={{
                        rows: 1,
                        expandable: "collapsible",
                        symbol: (expanded: boolean) => (expanded ? t("collapseTranscript") : t("showTranscript"))
                        // expanded: false,
                        // onExpand: (_, info) => setExpanded(info.expanded)
                    }}
                    // copyable
                >
                    {x?.prompt?.text}
                </XParagraph>
            )}
        </XFlex>
    );
}

export default QuestionView;
