"use client";
import { Flex, Spin, theme, Typography } from "antd";
import gpt4_icon from "@/assets/gpt4.png";
import claude_icon from "@/assets/claude.png";
import React, { Suspense, useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { addEventLog, fetchMemberMetadatas, fetchUserDetail } from "@/api/api";
import Image from "next/image";
import { useRequest } from "ahooks";
import { T, Text } from "@/components/Text";
import { useTranslations } from "next-intl";
import Member from "@/pages_/Pricing/components/Member";
import Suggest from "@/pages_/Pricing/components/Suggest";
import Metadata from "@/pages_/Pricing/components/Metadata";
import Success from "@/pages_/Pricing/components/Success";
// @ts-ignore
import { useQueryState } from "nuqs";
import { appName } from "@/constants";
import Footer from "@/components/Footer";
import QA from "@/components/Q&A";
import Difference from "@/components/Deference/index";

const Pricing = () => {
    const t = useTranslations("Pricing");

    const { token } = theme.useToken();

    const {
        data: userDetailResult,
        loading: userDetailLoading,
        run: runFetch
    } = useRequest(fetchUserDetail, { manual: true });

    const { data: metadatasResult, loading: metadataLoading } = useRequest(fetchMemberMetadatas);

    const loading = userDetailLoading || metadataLoading;
    const userDetail = userDetailResult?.data;

    const metadatas = metadatasResult?.data;

    const [openSuggest, setOpenSuggest] = useState(true);

    const [urlState, setUrlState] = useQueryState("state");

    const [banner, setBanner] = useState(true);

    const onSubscribe = (level: string, cycle: string) => {
        window.location.href =
            process.env.NEXT_PUBLIC_API_URL +
            `/api/v1/user-subscribes?level=${level}&cycle=${cycle}&promotionCode=${getCookie("promotionCode") || ""}`;
        setOpenSuggest(false);
    };

    useEffect(() => {
        // const promotionCode = getUrlParam("promotionCode");
        // if (promotionCode) {
        //   setCookie("promotionCode", promotionCode);
        // }

        runFetch();
    }, []);

    useEffect(() => {
        if (metadatas) {
            const promotion = metadatas?.pre?.promotion?.id;
            if (promotion) {
            }
        }
    }, [metadatas]);

    const closeTrial = (e: any) => {
        e.stopPropagation();
        setBanner(false);
    };

    // @ts-ignore
    const authed = !(userDetailResult?.code && userDetailResult?.code == 401);

    const handlerSubScribe = (level: string, cycle: string) => {
        onSubscribe(level, cycle);
    };

    if (loading && !userDetail) {
        return (
            <Spin size="large" spinning={loading}>
                <div style={{ width: "100%", height: "95vh" }}></div>
            </Spin>
        );
    }

    const Title = () => {
        return (
            <Flex vertical gap={15} align={"center"}>
                <Flex gap={token.marginSM} align={"center"}>
                    <T bold size={50}>
                        {t("energize your academic level with", { name: "" })}
                    </T>
                    <span
                        style={{
                            fontSize: 50,
                            fontWeight: "bold",
                            color: token.colorPrimary
                        }}
                    >
                        {appName}
                    </span>
                </Flex>
                {(!authed || userDetail?.member?.level === "free") && (
                    <Text size={20}>subscribe now to secure Early Bird Pricing before it increases soon!</Text>
                )}
            </Flex>
        );
    };

    return (
        <div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Suggest
                    open={openSuggest && metadatas?.pre}
                    onSubscribe={onSubscribe}
                    close={() => setOpenSuggest(false)}
                    pre={metadatas?.pre}
                />
                {/*<Success*/}
                {/*  open={urlState === "redirect" && !!userDetail?.member}*/}
                {/*  // open={true}*/}
                {/*  member={userDetail?.member}*/}
                {/*  close={() => {*/}
                {/*    setUrlState("");*/}
                {/*  }}*/}
                {/*/>*/}

                <Spin style={{ flex: 1 }} size="large" spinning={loading && !userDetail}>
                    <Flex
                        vertical
                        align={"center"}
                        style={{ paddingBlock: token.paddingLG * 2, height: "100%" }}
                        gap={50}
                    >
                        <Flex vertical gap={15}>
                            <Title />
                            {userDetail?.membership?.level && userDetail?.membership?.level !== "free" && (
                                <Member member={userDetail?.membership} />
                            )}
                        </Flex>

                        {metadatas && (
                            <Metadata
                                metadatas={metadatas}
                                authed={authed}
                                level={userDetail?.member?.level || "free"}
                            />
                        )}
                    </Flex>
                </Spin>

                <Flex justify="center" vertical gap={50} style={{ marginTop: 50 }}>
                    <Flex vertical>
                        <Typography style={{ textAlign: "center", fontSize: 40, fontWeight: 700 }}>
                            {t("Difference between ChatGPT and", { appName })}
                        </Typography>
                        {/*<Typography style={{textAlign: "center", fontSize: 16}}>*/}
                        {/*    {t(*/}
                        {/*        "Learn more about why XTips is seen as a great ChatGPT Plus Alternative"*/}
                        {/*    )}*/}
                        {/*</Typography>*/}
                    </Flex>
                    <Difference />
                </Flex>

                <Flex gap={48} vertical style={{ margin: "80px auto 0", width: "100%" }}>
                    <Typography style={{ fontSize: 40, fontWeight: 700, textAlign: "center" }}>
                        {t("Frequently asked questions")}
                    </Typography>
                    <QA />
                </Flex>

                <Flex justify={"center"} style={{ paddingBottom: 30, marginTop: 100 }}>
                    <Typography
                        style={{
                            maxWidth: 800,
                            padding: "0 24px",
                            boxSizing: "border-box",
                            textAlign: "center"
                        }}
                    >
                        {t("notification")}
                        <Typography style={{ color: token.colorPrimary }}>service@xtips.ai</Typography>
                    </Typography>
                </Flex>

                <Footer />
            </div>
        </div>
    );
};

export default Pricing;
