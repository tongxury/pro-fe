import { Button, Card, Col, Flex, Modal, Row, theme, Typography } from "antd";
import styles from "./index.module.scss";
import React from "react";
import { GradientText, T, Text } from "@/components/Text";
import moment from "moment";
import { useCountDown } from "ahooks";
import GradientButton from "../GradientButton";
import suggest_bg from "@/assets/suggest_bg.png";
import stars_left from "@/assets/stars_left.png";
import stars_right from "@/assets/stars_right.png";
import { addEventLog } from "@/api/api";
import { colors, functionIcons, getLimit, modelIcons } from "@/pages_/Pricing/helper";
import Level from "@/pages_/Pricing/components/Level";
import GradientBorder from "@/pages_/Pricing/components/GradientBorder";
import { useTranslations } from "next-intl";
import { appName } from "@/constants";
import { CheckCircleFilled } from "@ant-design/icons";

const Suggest = ({
    pre,
    open,
    onSubscribe,
    close
}: {
    pre: any;
    open: boolean;
    onSubscribe: (level: string, cycle: string) => void;
    close: () => void;
}) => {
    const t = useTranslations("Pricing");

    const { token } = theme.useToken();

    const [countdown, formattedRes] = useCountDown({
        targetDate: pre?.expireAt
        // onEnd: close
    });
    const styleObject = {
        background: "var(--gradient-purple-blue, linear-gradient(122deg, #03FFE1 -18.41%, #8A2EFF 99.01%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    };
    const advancedModelMsg = t("More_queries_desc", {
        gpt4Times: getLimit(pre?.metadata?.modelLimits?.["GPT-4"]),
        gpt35Times: getLimit(pre?.metadata?.modelLimits?.["GPT-3.5"])
    });
    const startFree = () => {
        onSubscribe(pre?.metadata?.level, pre?.cycle?.name);
    };
    return (
        <Modal
            styles={{
                content: { padding: 0, borderRadius: "10px" },
                body: {
                    // backgroundImage: `url(${suggest_bg})`,
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'cover',
                }
            }}
            onCancel={close}
            title={null}
            closable={false}
            // modalRender={node =>
            //     <div className={styles.modelBody}>{node}</div>
            // }
            footer={null}
            // width={707}
            open={open}
        >
            <Flex vertical={true} align={"center"}>
                <Flex
                    vertical={true}
                    align={"center"}
                    gap={20}
                    style={{ padding: token.paddingXL, paddingTop: token.paddingLG }}
                >
                    {/*<Level title={appName} colors={colors}*/}
                    {/*       level={pre?.metadata?.level}*/}
                    {/*       left={stars_left} right={stars_right}*/}
                    {/*       levelLabel={pre?.metadata?.label} size={20}*/}
                    {/*       labelStyles={styleObject}*/}
                    {/*/>*/}

                    <GradientText
                        style={{ fontWeight: "bold", fontSize: 40 }}
                        gradient={["to bottom right", `${token.colorPrimary}, ${token.colorFill}`]}
                    >
                        {appName} {pre?.metadata?.label}
                    </GradientText>
                    {/*<Typography.Paragraph>*/}
                    {/*    <ul style={{listStyle: 'disc'}}>*/}
                    {/*        <li><Typography.Text*/}
                    {/*            style={{color: "#000", fontSize: '20px', lineHeight: 1, fontWeight: 300}}>*/}
                    {/*            {t('day free trial', {days: pre?.cycle?.trialDays})}*/}
                    {/*        </Typography.Text></li>*/}
                    {/*        <li><Typography.Text*/}
                    {/*            style={{color: "#000", fontSize: '20px', lineHeight: 1, fontWeight: 300}}>*/}
                    {/*            {t('price after trial', {price: pre?.metadata?.prices?.[pre?.cycle?.name]?.value})}*/}
                    {/*        </Typography.Text></li>*/}
                    {/*    </ul>*/}
                    {/*</Typography.Paragraph>*/}

                    {/*<Button*/}
                    {/*    width={300} height={30}*/}
                    {/*    style={{fontSize: '15px'}}*/}
                    {/*    colors={[token.colorFillQuaternary, token.colorFill, token.colorFill]}*/}
                    {/*    text={t('Start free trial', {days: pre?.cycle?.trialDays})} ignoreIntl*/}
                    {/*    onClick={startFree}/>*/}

                    <Button
                        type="primary"
                        onClick={startFree}
                        style={{ width: 300, fontWeight: "bold" }}
                        shape={"round"}
                    >
                        {/*{t('Start free trial', {days: pre?.cycle?.trialDays})}*/}
                        {t("subscribe")}
                    </Button>

                    <Card bordered={false} style={{ background: token.colorBgLayout }}>
                        <Flex gap={10} vertical>
                            {pre?.metadata?.functions?.map((x: any, i: number) => (
                                <Flex gap={5} vertical key={i}>
                                    <Flex gap={8} align={"center"}>
                                        <CheckCircleFilled style={{ color: token.colorPrimary }} />
                                        <T bold size={16}>
                                            {t(x.name)}
                                        </T>
                                    </Flex>
                                    <T bold size={14} color={token.colorTextDescription}>
                                        {t(x.desc)}
                                    </T>
                                    {/*<GradientBorder icon={functionIcons[x.name]}*/}
                                    {/*                name={t(x.name)}*/}
                                    {/*                desc={x.desc} colors={colors}/>*/}
                                </Flex>
                            ))}
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </Modal>
    );
};

export default Suggest;
