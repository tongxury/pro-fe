import success_bg from "@/assets/success_bg.png";
import { Col, Flex, Modal, Row, theme, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import stars_left_light from "@/assets/stars_left_light.png";
import stars_right_light from "@/assets/stars_right_light.png";
import success_gif from "@/assets/gif/success.gif";
import styles from "./index.module.scss";
import Image from "next/image";
import { GradientText, Text } from "@/components/Text";
import Level from "@/pages_/Pricing/components/Level";
import GradientBorder from "@/pages_/Pricing/components/GradientBorder";
import { functionIcons, getLimit, lightColors, modelIcons } from "@/pages_/Pricing/helper";
import GradientButton from "@/pages_/Pricing/components/GradientButton";
import { useTranslations } from "next-intl";

const Success = ({
    open,
    member,
    close,
    width = 707
}: {
    open: boolean;
    member: any;
    close: () => void;
    width?: number;
}) => {
    const t = useTranslations("Pricing");

    const { token } = theme.useToken();

    const styleObject = {
        background: "var(--pro-red, linear-gradient(303deg, #DE13FF 16.59%, #FF9F0E 84.96%))",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    };
    const advancedModelMsg = t("More_queries_desc", {
        gpt4Times: getLimit(member?.metadata?.modelLimits?.["GPT-4"]),
        gpt35Times: getLimit(member?.metadata?.modelLimits?.["GPT-3.5"])
    });

    useEffect(() => {
        if (open) {
        }
    }, [open]);

    const try_it_now = () => {
        close();
    };
    return (
        <Modal
            styles={{
                body: {
                    borderRadius: 5,
                    backgroundImage: `url(${success_bg})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    padding: "0px 28px 28px 10px"
                }
            }}
            // onCancel={close}
            title={null}
            style={{ padding: 0 }}
            closable={false}
            footer={null}
            width={width}
            className={width === 850 ? styles.customModal : undefined}
            open={open}
        >
            {/*<Image alt={''} layout={'intrinsic'} src={success_gif}*/}
            {/*       style={{position: "absolute", width: '260px', left: '50%', marginLeft: '-18%'}}/>*/}
            <Flex vertical={true} align={"center"} style={{ width: "100%" }} gap={15}>
                <Flex justify={"end"} align={"center"}>
                    <CloseOutlined onClick={close} style={{ marginTop: "15px", marginRight: "-15px" }} />
                </Flex>
                <Flex vertical={true} gap={3} style={{ transform: "translateX(12px)" }}>
                    <Flex align={"center"} className={width === 850 ? "custom-style" : ""}>
                        <Level
                            title={"XTips"}
                            level={member?.metadata?.level}
                            levelLabel={member?.metadata?.tag}
                            colors={["#FF9F0E", "#DE13FF"]}
                            left={stars_left_light}
                            right={stars_right_light}
                            size={20}
                            labelStyles={styleObject}
                        />
                    </Flex>
                    <GradientText
                        style={{ fontWeight: "bold", fontSize: 50 }}
                        gradient={["to bottom right", `${["#FF9F0E", "#FF0852", "#FF0852"]?.join(",")}`]}
                    >
                        {t("subscribed successfully")}
                    </GradientText>
                    <Flex align={"center"} gap={5}>
                        <Text size={18} style={{ color: "#000" }}>
                            exclusive member features
                        </Text>
                    </Flex>
                </Flex>
                <Row
                    gutter={[token.marginSM, token.marginSM]}
                    style={{ marginTop: 20, marginInline: 30, width: "100%", paddingLeft: "20px" }}
                >
                    <Col span={8}>
                        <GradientBorder
                            ignoreIntl
                            icon={modelIcons["powerful models"]}
                            name={t("Advanced Model")}
                            colors={lightColors}
                        >
                            <div dangerouslySetInnerHTML={{ __html: advancedModelMsg }} />
                        </GradientBorder>
                    </Col>
                    {member?.metadata?.functions?.map((x: any, i: number) => (
                        <Col key={i} span={8}>
                            <GradientBorder
                                icon={functionIcons[x.name]}
                                name={t(x.name)}
                                desc={x.desc}
                                colors={lightColors}
                            />
                        </Col>
                    ))}
                </Row>
                <div id="xtips-tryItNow-btn" onClick={try_it_now}>
                    <GradientButton
                        style={{ margin: 30, width: 220 }}
                        text={"try it now"}
                        colors={["#FF9F0E", "#FF0852", "#FF0852"]}
                    />
                </div>
            </Flex>
        </Modal>
    );
};

export default Success;
