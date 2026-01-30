import { Card, Col, Flex, Row, Segmented, theme, Typography } from "antd";
import { Text } from "@/components/Text";
import React, { useState } from "react";
import Image from "next/image";
import best from "@/assets/best.png";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { addEventLog } from "@/api/api";
import { useTranslations } from "next-intl";
import { levelConfigs } from "@/pages_/Pricing/helper";
import SavingTag from "@/pages_/Pricing/components/SavingTag";
import Level from "@/pages_/Pricing/components/Level";
import GradientButton from "@/pages_/Pricing/components/GradientButton";
import CheckIcon from "@mui/icons-material/Check";
import { capitalize } from "@/utils";
import styles from "./index.module.scss";

const Metadata = ({ metadatas, authed, level }: { metadatas: any; authed: boolean; level: string }) => {
    const trans = useTranslations("Pricing");

    const [cycle, setCycle] = useState<string>(metadatas?.cycles?.[0]?.name);

    const router = useRouter();
    const formatLimit = (limit: { [key: string]: any }) => {
        if (limit["year"] > 0) {
            return `${limit["year"]}/${trans("year")}`;
        } else if (limit["month"] > 0) {
            return `${limit["month"]}/${trans("month")}`;
        } else if (limit["day"] > 0) {
            return `${limit["day"]}/${trans("day")}`;
        } else if (limit["total"] > 0) {
            return `${limit["total"]}`;
        } else {
            return trans("unlimited");
        }
    };

    const { token } = theme.useToken();
    const onLogin = () => {
        router.push("/login");
    };

    const onSubscribe = (level: string, cycle: string) => {
        window.location.href =
            process.env.NEXT_PUBLIC_API_URL +
            `/api/v1/user-subscribes?level=${level}&cycle=${cycle}&promotionCode=${getCookie("promotionCode") || ""}`;
        // setOpenSuggest(false)
    };
    const handlerSubScribe = (level: string, cycle: string) => {
        onSubscribe(level, cycle);
    };

    return (
        <Flex className={styles.container} vertical justify={"center"} align={"center"} gap={50}>
            <Segmented
                style={{ width: 500 }}
                block
                size="large"
                value={cycle}
                onChange={(value) => {
                    setCycle(value);
                }}
                options={metadatas?.cycles?.map((t: any, i: number) => ({
                    label: capitalize(t.name),
                    value: t.name
                }))}
            />

            <Flex align={"center"} justify={"space-between"} gap={50}>
                <Row gutter={[50, 50]}>
                    {metadatas?.metadatas?.map((t: any, i: number) => {
                        const styleConfig = levelConfigs[t.level] || {};

                        const LiItem = ({ icon, name, desc }: { icon?: any; name: string; desc?: string }) => {
                            return (
                                <li
                                    key={i}
                                    style={
                                        icon
                                            ? {
                                                  listStyleType: "none",
                                                  marginInline: "auto",
                                                  paddingBlock: "3px"
                                              }
                                            : {
                                                  paddingBlock: "3px"
                                              }
                                    }
                                >
                                    <Flex align={"center"} gap={8}>
                                        {/*{icon && (*/}
                                        {/*    <Image*/}
                                        {/*        alt={""}*/}
                                        {/*        style={{width: 11, height: 8}}*/}
                                        {/*        layout='intrinsic'*/}
                                        {/*        src={icon}*/}
                                        {/*    />*/}
                                        {/*)}*/}

                                        <CheckIcon sx={{ fontSize: 18 }} />

                                        <Typography.Text>
                                            {name}&nbsp;
                                            <Typography.Text style={{ fontWeight: "bold" }}>
                                                {desc}
                                                {/*{t.functionLimits?.[name]?.desc ? trans(t.functionLimits?.[name]?.desc) : ''}*/}
                                            </Typography.Text>
                                        </Typography.Text>
                                    </Flex>
                                </li>
                            );
                        };

                        return (
                            <Col key={i} xs={{ span: 24 }} lg={{ span: 8 }}>
                                <Card
                                    bodyStyle={{
                                        padding: 0,
                                        paddingInline: 25,
                                        height: styleConfig?.height || 0
                                    }}
                                    style={{
                                        background: styleConfig?.bordered
                                            ? "linear-gradient(180deg,#eee6ff,rgba(230,218,255,0) 80.6%)"
                                            : "",
                                        border: styleConfig?.bordered ? "1px solid #6841ea" : "1px solid #f0ebff",
                                        borderRadius: 16,
                                        backgroundImage: `url(${styleConfig?.backgroundImage})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"
                                    }}
                                    bordered={false}
                                >
                                    <Flex align={"center"} justify={"flex-end"}>
                                        {t.prices?.[cycle]?.save && (
                                            <SavingTag
                                                value={trans("save", { save: t.prices?.[cycle]?.save })}
                                                colors={styleConfig?.colors}
                                                style={{
                                                    height: 20
                                                }}
                                            />
                                        )}
                                    </Flex>
                                    <Flex
                                        vertical={true}
                                        align={"center"}
                                        gap={token.marginMD}
                                        style={{
                                            paddingBlock: token.paddingSM,
                                            paddingInline: token.paddingMD,
                                            marginTop: 30
                                        }}
                                    >
                                        <Level
                                            level={t.level}
                                            levelLabel={t.label}
                                            size={30}
                                            colors={styleConfig?.colors}
                                        />
                                        <Flex align={"center"} gap={token.marginXS}>
                                            <Text bold size={30} ignoreIntl>
                                                ${t.prices?.[cycle]?.value || "0.0"}
                                            </Text>
                                            <Text bold ignoreIntl>
                                                /mo
                                            </Text>
                                        </Flex>
                                        {t.prices?.[cycle]?.original && (
                                            <Flex
                                                align={"center"}
                                                style={{
                                                    textDecoration: "line-through",
                                                    marginTop: 0
                                                }}
                                            >
                                                ${t.prices?.[cycle]?.original}/mo
                                            </Flex>
                                        )}

                                        {authed ? (
                                            <GradientButton
                                                colors={styleConfig.colors}
                                                disabled={t.disabled}
                                                text={"subscribe"}
                                                onClick={() => handlerSubScribe(t?.level, cycle)}
                                            />
                                        ) : (
                                            <GradientButton
                                                colors={styleConfig.colors}
                                                disabled={t.disabled}
                                                text={"Sign in to subscribe"}
                                                onClick={onLogin}
                                            />
                                        )}

                                        <Typography.Paragraph className="content" style={{ width: "100%" }}>
                                            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                                                {trans("More Queries")}
                                            </span>
                                            <ul>
                                                {t.models?.map((m: any, i: number) => (
                                                    <LiItem
                                                        name={""}
                                                        key={i}
                                                        icon={styleConfig.functionIcon}
                                                        desc={formatLimit(t.modelLimits?.[m.name] || {})}
                                                    />
                                                ))}
                                            </ul>
                                            <Text bold>advanced function</Text>
                                            <ul>
                                                {t.functions?.map((m: any, i: number) => (
                                                    <LiItem
                                                        name={trans(m.name)}
                                                        key={i}
                                                        icon={styleConfig.functionIcon}
                                                        // desc={formatLimit(t.modelLimits?.[m.name] || {})}
                                                    />
                                                ))}
                                            </ul>
                                            {/*<Text bold>Other Benefits</Text>*/}
                                            {/*<ul>*/}
                                            {/*    {t.otherFunctions?.map((m: any, i: number) => (*/}
                                            {/*        <LiItem*/}
                                            {/*            name={trans(m.name)}*/}
                                            {/*            key={i}*/}
                                            {/*            icon={styleConfig.functionIcon}*/}
                                            {/*        />*/}
                                            {/*    ))}*/}
                                            {/*</ul>*/}
                                        </Typography.Paragraph>
                                    </Flex>
                                    {styleConfig.showBanner && (
                                        <Image
                                            alt={""}
                                            layout="intrinsic"
                                            src={best}
                                            width={200}
                                            height={200}
                                            style={{ position: "absolute", bottom: 0, right: 0 }}
                                        />
                                    )}
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Flex>
        </Flex>
    );
};

export default Metadata;
