import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, XIconButton, xPadding, XText } from "@pro/ui";
import { Card, Popover, Typography } from "antd";
import { useTranslations } from "next-intl";

import { Attachment } from "../../types";

// todo: 需要更换图标
const ReferencePopoverContent = ({ attachment }: { attachment: Attachment }) => {
    const t = useTranslations();
    const details = [
        {
            icon: <XIconFont name="LikeLine"></XIconFont>,
            text: attachment?.extra?.author
        },
        {
            icon: <XIconFont name="LikeLine"></XIconFont>,
            text: attachment?.extra?.publishAt
        },
        {
            icon: <XIconFont name="LikeLine" size={18}></XIconFont>,
            text: attachment?.extra?.keywords
        },
        {
            icon: <XIconFont name="LikeLine"></XIconFont>,
            text: attachment?.extra?.citation
        }
    ];
    const iconButtons = [
        {
            name: "LikeLine",
            onclick: () => {}
        },
        {
            name: "LikeLine",
            onclick: () => {}
        },
        {
            name: "LikeLine",
            onclick: () => {}
        }
    ];

    return (
        <Card style={{ width: 360 }}>
            <XFlex vertical gap={10}>
                <XText bold>{attachment?.extra?.title}</XText>
                {details.map((item, index) => {
                    return (
                        <XFlex key={index} gap={10}>
                            {item.icon}
                            <XText>{item.text}</XText>
                        </XFlex>
                    );
                })}
                <XFlex gap={20}>
                    {iconButtons.map((item, index) => (
                        <XIconButton
                            onClick={item.onclick}
                            key={index}
                            icon={<XIconFont name={item.name}></XIconFont>}
                        ></XIconButton>
                    ))}
                </XFlex>
                <XFlex vertical>
                    <XText bold>{t("abstract")}</XText>
                    <Typography.Paragraph ellipsis={{ rows: 4 }}>{attachment?.extra?.abstract}</Typography.Paragraph>
                </XFlex>
            </XFlex>
        </Card>
    );
};

const ReferencePopover = ({ attachment, children }: { attachment: Attachment; children: React.ReactNode }) => {
    return (
        <Popover
            content={<ReferencePopoverContent attachment={attachment}></ReferencePopoverContent>}
            trigger={"click"}
        >
            <>{children}</>
        </Popover>
    );
};

const ReferenceCard = ({ attachment }: { attachment: Attachment }) => {
    const { token } = useXTheme();
    const t = useTranslations();
    return (
        <XFlex
            vertical
            justify="space-between"
            style={{
                border: `1px solid ${token.colorBorder}`,
                ...xPadding(8, 14, 8, 14),
                borderRadius: 10,
                cursor: "pointer",
                height: "100%"
            }}
        >
            <Typography.Paragraph style={{ marginBottom: 20 }} ellipsis={{ rows: 3 }}>
                {attachment?.extra?.title}
            </Typography.Paragraph>
            <XText color={token.colorTextL3}>
                {attachment?.extra?.citation} {t("Citation")}
            </XText>
        </XFlex>
    );
};

export { ReferenceCard, ReferencePopover };
