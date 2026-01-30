"use client";
import { Text } from "@/components/Text";
import PageContainer from "@/layouts/Webapp/PageContainer";
import { useXTheme, XFlex } from "@pro/ui";
import { List } from "antd";
import { useTranslations } from "next-intl";
const Settings = () => {
    const t = useTranslations("Default");
    const { token } = useXTheme();
    const data = [
        {
            name: "Account",
            data: [
                { key: 0, name: "ID" },
                { key: 1, name: "Email" },
                { key: 2, name: "Password" }
            ]
        },
        {
            name: "Profile",
            data: [
                { key: 0, name: "Nickname" },
                { key: 1, name: "Profile Picture" },
                { key: 2, name: "Educational Level" }
            ]
        },
        {
            name: "Subscription Plan",
            data: [{ key: 0, name: "StudyX Limited Plan" }]
        },
        {
            name: "Email Notifications Settings",
            data: [{ key: 0, name: "Manage your email preferences to stay updated with StudyX" }]
        },
        {
            name: "Connected Accounts",
            data: [
                {
                    key: 0,
                    name: "Are you on Google?",
                    subName: "Connect your StudyX account with Google to log in easily"
                },
                {
                    key: 1,
                    name: "Are you on Apple?",
                    subName: "Connect your StudyX account with Apple to log in easily"
                },
                {
                    key: 2,
                    name: "Are you on discord?",
                    subName: "Connect your StudyX account with Discord to log in easily"
                }
            ]
        },
        {
            data: [{ key: 0, name: "Delete Account" }]
        }
    ];
    return (
        <PageContainer headerLeft={t("chat")}>
            <XFlex vertical gap={5} style={{ padding: 20, height: "100%", boxSizing: "border-box", overflow: "auto" }}>
                {data.map((e) => (
                    <XFlex vertical style={{ margin: "10px 0" }} key={e.name}>
                        <List
                            style={{ border: `1px solid #ddd` }}
                            size="large"
                            header={e.name ? <div style={{ fontWeight: "bold" }}>{e.name}</div> : null}
                            bordered
                            dataSource={e.data}
                            renderItem={(item: any) => (
                                <List.Item style={{ borderTop: `1px solid #ddd` }}>
                                    <XFlex vertical>
                                        {item.subName ? (
                                            <Text bold ignoreIntl size={18}>
                                                {item.name}
                                            </Text>
                                        ) : (
                                            <Text ignoreIntl>{item.name}</Text>
                                        )}
                                        {item.subName ? <Text ignoreIntl>{item.subName}</Text> : null}
                                    </XFlex>
                                </List.Item>
                            )}
                        />
                    </XFlex>
                ))}
            </XFlex>
        </PageContainer>
    );
};
export default Settings;
