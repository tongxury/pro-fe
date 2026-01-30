import { usePathname } from "@/navigation";
import { XFlex, XText } from "@pro/ui";
import { useTranslations } from "next-intl";

interface IProps {
    styles?: React.CSSProperties;
}

function PageTitle(props: IProps) {
    const t = useTranslations("Default");
    const pathname = usePathname();
    const { styles } = props;
    return (
        <XFlex align={"center"} justify={"space-between"} style={styles}>
            <XText bold size={14}>
                {t(pathname.replace("/webapp/", ""))}
            </XText>
        </XFlex>
    );
}

export default PageTitle;
