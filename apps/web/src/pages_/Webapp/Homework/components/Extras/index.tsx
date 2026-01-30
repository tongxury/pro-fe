import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, XOption, XText } from "@pro/ui";
import { useTranslations } from "next-intl";

function Extras() {
    const t = useTranslations("Default");

    const { token } = useXTheme();

    const options: XOption[] = [
        {
            value: "architecture",
            label: t("architecture"),
            icon: "ArchLine"
        },
        {
            value: "engineering",
            label: t("engineering"),
            icon: "SettingsLine"
        },
        {
            value: "economics",
            label: t("economics"),
            icon: "MoneyLine"
        },
        {
            value: "law",
            label: t("law"),
            icon: "LawLine"
        },
        {
            value: "science",
            label: t("science"),
            icon: "ScienceLine"
        },
        {
            value: "education",
            label: t("education"),
            icon: "BookOpenLine"
        }
    ];

    return (
        <XFlex justify={"space-between"} align={"center"}>
            {options?.map((x: XOption, i: number) => (
                <XFlex style={{ width: 90 }} key={i} vertical align={"center"} gap={7}>
                    <XIconFont name={x.icon} color={token.colorTextL3} size={40} />
                    <XText color={token.colorTextL3}>{x.label}</XText>
                </XFlex>
            ))}
        </XFlex>
    );
}

export default Extras;
