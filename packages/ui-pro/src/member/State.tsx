import {XIconFont} from "@pro/icons";
import {useXTheme, XFlex, XText, XUserCard} from "@pro/ui";
import {Button} from "antd";
import {useTranslations} from "next-intl";
import {useMemo} from "react";
import {RightOutlined} from "@ant-design/icons";
import {User} from "../types";
import {levelConfig} from "./config";

function MemberState({
                         data,
                         onUpgrade,
                         onRoute
                     }: {
    data: User;
    onUpgrade: () => void;
    onRoute: (path: string) => void;
}) {
    const {themeVars} = useXTheme();
    const t = useTranslations();

    // 模型剩余次数 如：78/天、78/月、78/总数
    const modelLimits = data?.membership?.quota.modelLimits || {};

    // 开放功能
    const functions = data?.membership?.quota.functions || [];
    // 用户已经使用次数
    const modelUsed = data?.membership?.used || {};
    // ChatGPT 模型
    const models = data?.membership?.quota.models || [];
    // 用户会员等级
    const level = data?.membership?.level;

    const config = levelConfig[level ?? "free"];

    const modelInfos = useMemo(() => {
        return models.map((modelItem: any) => {
            const {name} = modelItem;
            const modelLimitsItem = modelLimits[name] || {}; // 数据结构是 { day, month, total }
            const values = Object.values(modelLimitsItem) || [];
            return {
                name,
                used: modelUsed[name] || 0,
                count: values[0] || 0
            };
        });
    }, [data]);

    const onLogout = () => {
        console.log("onLogout");
        // todo
    };

    return (
        <XFlex vertical gap={10} style={{minWidth: 360, padding: 10}}>
            <XUserCard avatar={data?.user_avatar} name={data?.username || ""} desc={data?.email}/>
            {/* <div style={{ background: token.colorBgPrimary, padding: 0 }}>
                <XFlex
                    justify="space-between"
                    padding={12}
                    style={{
                        background:
                            "linear-gradient(0deg,rgba(255,255,255,.5) 0%,rgba(255,255,255,.5) 100%),var(--color-secondary, #e6f3ff)",
                        borderRadius: "5px 5px 0 0"
                    }}
                >
                    <MemberLevelText value={data?.membership?.level} />
                    {level === "free" && config && (
                        <XButton
                            style={{
                                color: token.colorTextWhite,
                                padding: "0 8px",
                                lineHeight: "20px",
                                borderRadius: 4,
                                background: xLinearGradient({
                                    //@ts-ignore
                                    toDirection: "286deg",
                                    colorStops: config.colorStops as string[]
                                })
                            }}
                        >
                            {t("subscribe")}
                        </XButton>
                    )}
                </XFlex>
                <XFlex vertical padding="12px 12px 0 12px">
                    {modelInfos.map((item: any, index: number) => {
                        return (
                            <Row
                                key={index}
                                gutter={[10, 10]}
                                justify="space-between"
                                align="middle"
                            >
                                <Col span={12}>
                                    <XText
                                        bold
                                        color={token.colorTextL3}
                                        style={{ marginRight: 6 }}
                                    >
                                        {item.name?.toUpperCase()}
                                    </XText>

                                    <XText bold color={token.colorTextL3}>
                                        {t("Queries")}
                                    </XText>
                                </Col>
                                <Col span={12} style={{ textAlign: "right" }}>
                                    <XText
                                        bold
                                        color={token.colorTextL1}
                                        style={{ marginRight: 6 }}
                                    >
                                        {(item.count &&
                                            `${item.used}/${item.count}`) ||
                                            t("unlimited")}
                                    </XText>
                                    <XText color={token.colorTextL3}>
                                        {level === "free"
                                            ? t("per day")
                                            : t("per month")}
                                    </XText>
                                </Col>
                            </Row>
                        );
                    })}
                </XFlex>
                <Divider style={{ marginBlock: 10 }} />
                <XFlex vertical padding="0 12px 12px 12px" gap={4}>
                    {functions?.map((item: any, index: number) => (
                        <Col key={index} span={12}>
                            <XFlex gap={5} align={"center"}>
                                {functionConfig[item.name] && (
                                    <XIconFont
                                        name={functionConfig[item.name]!.icon}
                                    ></XIconFont>
                                )}
                                <XText
                                    style={{
                                        ...xFont({ family: "Nunito-Regular" })
                                    }}
                                >
                                    {t(item.name)}
                                </XText>
                            </XFlex>
                        </Col>
                    ))}
                </XFlex>
            </div> */}
            <XFlex vertical gap={10}>
                <XFlex justify="space-between" style={{flex: 1}}>
                    <XText size={14} bold>
                        Free Plan
                    </XText>
                    <Button type="primary" size="small" onClick={onUpgrade}>
                        Upgrade
                    </Button>
                </XFlex>
                <XFlex style={{background: themeVars.colorBgPrimary, borderRadius: 10, padding: 10}}>
                    <XFlex style={{flex: 1, cursor: "pointer"}} justify="space-between">
                        <XText>Credits</XText>
                        <XFlex align="flex-end" gap={5}>
                            <XText>12/12</XText>
                            <XText color="#666" size={14}>
                                day
                            </XText>
                        </XFlex>
                    </XFlex>
                </XFlex>
                <XFlex>
                    <XText size={14} bold>
                        Community Reward
                    </XText>
                </XFlex>
                <XFlex style={{background: themeVars.colorBgPrimary, borderRadius: 10, padding: 10}}>
                    <XFlex style={{flex: 1, cursor: "pointer"}} justify="space-between">
                        <XText>Credits</XText>
                        <XText>12/12</XText>
                    </XFlex>
                </XFlex>
                <XFlex>
                    <XText size={14} bold>
                        Management
                    </XText>
                </XFlex>
                <XFlex vertical style={{background: themeVars.colorBgPrimary, borderRadius: 10, padding: "0 10px"}}>
                    <XFlex
                        onClick={() => onRoute("/webapp/settings")}
                        style={{flex: 1, padding: "10px 0", cursor: "pointer"}}
                        justify="space-between"
                    >
                        <XText>Settings</XText>
                        <RightOutlined/>
                    </XFlex>
                    <XFlex style={{flex: 1, padding: "10px 0", cursor: "pointer"}} justify="space-between">
                        <XText>My subscription</XText>
                        <RightOutlined/>
                    </XFlex>
                </XFlex>
            </XFlex>
            <XFlex
                align="center"
                justify="flex-end"
                style={{cursor: "pointer", userSelect: "none"}}
                onClick={onLogout}
            >
                {/* todo: 缺少 logout 图标 */}
                <XIconFont name="LogOut"></XIconFont>
                <XText
                    style={{
                        marginLeft: 10
                    }}
                >
                    {t("Log Out")}
                </XText>
            </XFlex>
        </XFlex>
    );
}

export default MemberState;
