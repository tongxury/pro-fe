import { XIcon } from "@pro/icons";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { Question, QuestionAnswer } from "@pro/ui-pro";
import { useTranslations } from "next-intl";

const Regenerate = ({ data, onSend }: { data: QuestionAnswer; onSend: (message: Question) => void }) => {
    const t = useTranslations("Default");
    const { token } = useXTheme();

    const chatItemActionStyle = {
        fontSize: 12,
        color: token.colorTextL1,
        letterSpacing: 0.01
    };
    return (
        <XFlex align={"center"} gap={5} style={{ cursor: "pointer" }} onClick={() => onSend(data.question)}>
            <XIcon name={"RedoLine"} size={10} color={token.colorPrimary} />
            <XText style={chatItemActionStyle}>{t("answer again")}</XText>
        </XFlex>
    );
};

export default Regenerate;
