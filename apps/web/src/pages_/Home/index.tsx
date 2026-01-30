"use client";
import { Col, Flex, Row, theme, Typography } from "antd";
import styles from "./index.module.scss";
import chromeIcon from "@/assets/chrome.png";
import Image, { StaticImageData } from "next/image";
import { addEventLog } from "@/api/api";
import web from "../../assets/web.png";
import mobile from "../../assets/mobile.gif";
import QA from "@/components/Q&A";
import Iconfont from "@/components/Iconfont";
import React, { useEffect, useRef, useState } from "react";
import Swiper from "./swiper";
import { useTranslations } from "next-intl";
import availablePlatforms from "../../assets/availablePlatforms.png";
import { appName } from "@/constants";
import Difference from "@/components/Deference";
import { evaluateList, overviewList } from "./constants";
import TabsSvg from "./svg/tabs";
import Slider from "react-slick";
import Poanel from "./svg/poanel";
import WritingAssistant from "./svg/writingAssistant";

export default function Home() {
    const t = useTranslations("Home");

    useEffect(() => {
        addEventLog({
            id: "home_page_visit"
        });
    }, []);

    const addToChrome = (flag: string) => {
        addEventLog({
            id: "add_to_chrome_" + flag
        });

        window.open("https://chromewebstore.google.com/detail/xtips/ofmbkpnkobpbclceojpgndcbnpfgoand", "_blank");
    };
    const { token } = theme.useToken();

    return (
        <div className={styles.home}>
            <Flex gap={24} vertical style={{ margin: "76px 0 100px" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                        background:
                            // "linear-gradient(180deg,#fff,#fff4fa 40%,#fbd9fd 55%,#e2d5ff 70%,#fff 90%)",
                            `linear-gradient(180deg,${token.colorBgBase},${token.colorBgContainer} 40%, ${token.boxShadow} 55%, ${token.boxShadow} 70%,${token.colorBgBase} 90%)`
                    }}
                >
                    <Flex gap={16} vertical>
                        <Typography.Title style={{ whiteSpace: "pre-line" }}>{t("title")}</Typography.Title>
                        <Typography
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                maxWidth: 780,
                                margin: "0 auto",
                                color: token.colorTextSecondary
                            }}
                        >
                            {t("subtitle", { appName })}
                        </Typography>
                    </Flex>
                    {/* button */}
                    <div className={styles.btnGroup}>
                        <div
                            className={styles.btnGroupItem}
                            style={{ background: token.colorPrimary }}
                            onClick={() => {
                                addToChrome("a");
                            }}
                        >
                            <Image layout="intrinsic" src={chromeIcon} alt="" />
                            <span>{t("add to chrome")}</span>
                        </div>
                    </div>
                    {/* video */}
                    <div className={styles.video}>
                        <Image src={web} className={styles.web} alt="" />
                        <Image src={mobile} className={styles.mobile} alt="" />
                    </div>
                </div>
                <Flex gap={24} vertical className={styles.container}>
                    {/* 你的全能 AI 助手 */}
                    <Flex gap={48} vertical>
                        <Title name={t("all-in-one ai assistant")} />
                        <Swiper />
                    </Flex>
                    {/* 随处可用 */}
                    <Flex gap={48} vertical>
                        <Title name={t("useful everywhere")}></Title>
                        <Card />
                    </Flex>
                    <Flex gap={48} vertical>
                        <Title name={t("Difference between ChatGPT and", { appName })}></Title>
                        <Difference />
                    </Flex>

                    {/*/!* 专业人士的最佳选择 *!/*/}
                    <Flex gap={48} vertical>
                        <Title name={t("works for professionals")} />
                        <Overview />
                    </Flex>
                    {/* 大家都爱 XTips */}
                    {/* <Flex gap={48} vertical>
                <Title name={t("they love", { appName })} />
                <Evaluate />
              </Flex> */}
                    {/* 常见问题 */}
                    <Flex gap={48} vertical>
                        <Title name={t("frequently asked questions")} />
                        <QA />
                    </Flex>
                    {/* 添加谷歌浏览器插件card */}
                    <Flex gap={24} vertical align="center" justify="center" className={styles.addToChrome}>
                        <h2 style={{ whiteSpace: "pre-line" }}>{t("unlock your true potential", { appName })}</h2>
                        <div className={styles.btnGroup}>
                            <div
                                className={styles.btnGroupItem}
                                style={{ background: token.colorPrimary }}
                                onClick={() => {
                                    addToChrome("b");
                                }}
                            >
                                <Image layout="intrinsic" src={chromeIcon} alt="" />
                                <span>{t("add to chrome")}</span>
                            </div>
                        </div>
                    </Flex>
                </Flex>
            </Flex>
            {/* footer */}
            <Footer />
        </div>
    );
}

function Title({ name }: { name: string }) {
    return <h2 className={styles.title}>{name}</h2>;
}

function Overview() {
    const t = useTranslations("Overview");
    const [index, setIndex] = useState(0);
    const { token } = theme.useToken();
    const settings = {
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    let sliderRef: any = useRef(null);
    return (
        <div>
            <Flex vertical gap={32}>
                <Flex justify="center" align="center" gap={48}>
                    {overviewList.map((e) => (
                        <Flex
                            justify="center"
                            align="center"
                            gap={8}
                            vertical
                            key={e.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                sliderRef.current.slickGoTo(e.id);
                                setIndex(e.id);
                            }}
                        >
                            <Iconfont
                                name={e.icon}
                                size={32}
                                color={index === e.id ? token.colorPrimary : token.colorTextSecondary}
                            />
                            <span
                                style={{
                                    color: index === e.id ? token.colorPrimary : token.colorTextSecondary,
                                    fontSize: 20,
                                    fontWeight: 600
                                }}
                            >
                                {t(e.name)}
                            </span>
                        </Flex>
                    ))}
                </Flex>
                {/* @ts-ignore */}
                <Slider {...settings} ref={sliderRef} >
                    {overviewList.map((x) => (
                        <Flex vertical gap={48} className={styles.overview} key={x.id}>
                            <Row gutter={[48, 48]}>
                                {x.chilid.map((e) => (
                                    <Col xs={{ span: 24 }} md={{ span: 12 }} key={e.id}>
                                        <Flex gap={16}>
                                            <Flex justify="center" align="center" className={styles.icon}>
                                                <Iconfont name={e.icon} size={23} color={token.colorPrimary} />
                                            </Flex>
                                            <div className={styles.overviewTextBox}>
                                                <h3 className={styles.overviewTitle}>{t(e.title)}</h3>
                                                <p className={styles.overviewSubTitle}>{t(e.subTitle)}</p>
                                            </div>
                                        </Flex>
                                    </Col>
                                ))}
                            </Row>
                        </Flex>
                    ))}
                </Slider>
            </Flex>
        </div>
    );
}

function Evaluate() {
    const t = useTranslations("Home");
    return (
        <Flex gap={32} vertical>
            {/*<Flex gap={40} justify='center' align='center' flex={1}>*/}
            {/*    <Flex vertical align='center'>*/}
            {/*        <Typography*/}
            {/*            style={{*/}
            {/*                fontSize: 32,*/}
            {/*                fontWeight: 600,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            160,000+*/}
            {/*        </Typography>*/}
            {/*        <Typography*/}
            {/*            style={{*/}
            {/*                fontSize: 16,*/}
            {/*                color: "var(--grayblue-600)",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            {t('comments')}*/}
            {/*        </Typography>*/}
            {/*    </Flex>*/}
            {/*    <Flex vertical align='center'>*/}
            {/*        <Flex align='center' gap={10}>*/}
            {/*            <Typography*/}
            {/*                style={{*/}
            {/*                    fontSize: 32,*/}
            {/*                    fontWeight: 600,*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                4.9*/}
            {/*            </Typography>*/}
            {/*            <Iconfont name='wujiaoxing-' size={25}/>*/}
            {/*        </Flex>*/}
            {/*        <Typography*/}
            {/*            style={{*/}
            {/*                fontSize: 16,*/}
            {/*                color: "var(--grayblue-600)",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Chrome Store*/}
            {/*        </Typography>*/}
            {/*    </Flex>*/}
            {/*    <Flex vertical align='center'>*/}
            {/*        <Flex align='center' gap={10}>*/}
            {/*            <Typography*/}
            {/*                style={{*/}
            {/*                    fontSize: 32,*/}
            {/*                    fontWeight: 600,*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                4.6*/}
            {/*            </Typography>*/}
            {/*            <Iconfont name='wujiaoxing-'/>*/}
            {/*        </Flex>*/}
            {/*        <Typography*/}
            {/*            style={{*/}
            {/*                fontSize: 16,*/}
            {/*                color: "var(--grayblue-600)",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Product Hunt*/}
            {/*        </Typography>*/}
            {/*    </Flex>*/}
            {/*    <Flex vertical align='center'>*/}
            {/*        <Typography*/}
            {/*            style={{*/}
            {/*                fontSize: 32,*/}
            {/*                fontWeight: 600,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            2,000,000+*/}
            {/*        </Typography>*/}
            {/*        <Typography*/}
            {/*            style={{*/}
            {/*                fontSize: 16,*/}
            {/*                color: "var(--grayblue-600)",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            用户*/}
            {/*        </Typography>*/}
            {/*    </Flex>*/}
            {/*</Flex>*/}
            <Flex gap={32}>
                {evaluateList.map((e, k) => (
                    <Flex vertical gap={32} key={k}>
                        {e.map((v) => (
                            <EvaluateItem {...v} key={v.id} />
                        ))}
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
}

function EvaluateItem({ id, icon, name, text }: { id: number; icon: StaticImageData; name: string; text: string }) {
    const { token } = theme.useToken();
    return (
        <Flex
            vertical
            gap={10}
            style={{
                padding: token.padding,
                background: token.colorBorderSecondary,
                borderRadius: token.borderRadius
            }}
        >
            <Flex align="center" gap={10}>
                <Image alt="" src={icon} />
                <Typography
                    style={{
                        fontSize: 16
                    }}
                >
                    {name}
                </Typography>
            </Flex>
            <Flex gap={5}>
                <Iconfont name="wujiaoxing-" scale={20} />
                <Iconfont name="wujiaoxing-" scale={20} />
                <Iconfont name="wujiaoxing-" scale={20} />
                <Iconfont name="wujiaoxing-" scale={20} />
                <Iconfont name="wujiaoxing-" scale={20} />
            </Flex>
            <Typography>{text}</Typography>
        </Flex>
    );
}

function Card() {
    const { token } = theme.useToken();
    const t = useTranslations("Home");

    return (
        <Row gutter={[24, 24]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Flex
                    style={{
                        background: token.colorBgContainer,
                        borderRadius: 20,
                        padding: token.padding
                    }}
                    vertical
                    align="center"
                    justify="center"
                >
                    <Flex gap={8} vertical justify="center" align="center" style={{ marginTop: 20 }}>
                        <Typography
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                textAlign: "center"
                            }}
                        >
                            {t("AI Sidebar")}
                        </Typography>
                        <Typography
                            style={{
                                fontSize: 18,
                                color: "var(--grayblue-600)",
                                textAlign: "center",
                                height: 84
                            }}
                        >
                            {t("one-click to access all ai features from any web page")}
                        </Typography>
                    </Flex>
                    <TabsSvg />
                </Flex>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Flex
                    style={{
                        background: token.colorBgContainer,
                        borderRadius: 20,
                        padding: token.padding
                    }}
                    vertical
                    align="center"
                    justify="center"
                >
                    <Flex gap={8} vertical justify="center" align="center" style={{ marginTop: 20 }}>
                        <Typography
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                textAlign: "center"
                            }}
                        >
                            {t("available on all platforms")}
                        </Typography>
                        <Typography
                            style={{
                                fontSize: 18,
                                color: "var(--grayblue-600)",
                                textAlign: "center"
                            }}
                        >
                            {t("chat with your favorite assistant from browser, desktop and mobile phone")}
                        </Typography>
                    </Flex>
                    <Image style={{ width: "100%", height: "auto" }} src={availablePlatforms} alt="" />
                </Flex>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Flex
                    style={{
                        background: token.colorBgContainer,
                        borderRadius: 20,
                        padding: token.padding
                    }}
                    vertical
                    align="center"
                    justify="center"
                >
                    <Flex gap={8} vertical justify="center" align="center" style={{ marginTop: 20 }}>
                        <Typography
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                textAlign: "center"
                            }}
                        >
                            {t("smart toolbar")}
                        </Typography>
                        <Typography
                            style={{
                                fontSize: 18,
                                color: "var(--grayblue-600)",
                                textAlign: "center"
                            }}
                        >
                            {t("seamlessly explain, translate or summarize any text you select")}
                        </Typography>
                    </Flex>
                    <Poanel />
                    {/* <Image width={565} height={365} src={smartToolbar} alt='' /> */}
                </Flex>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                <Flex
                    style={{
                        background: token.colorBgContainer,
                        borderRadius: 20,
                        padding: token.padding
                    }}
                    vertical
                    align="center"
                    justify="center"
                >
                    <Flex gap={8} vertical justify="center" align="center" style={{ marginTop: 20 }}>
                        <Typography
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                textAlign: "center"
                            }}
                        >
                            {t("writing assistant")}
                        </Typography>
                        <Typography
                            style={{
                                fontSize: 18,
                                color: "var(--grayblue-600)",
                                textAlign: "center"
                            }}
                        >
                            {t("draft, rewrite or improve text content on any web page")}
                        </Typography>
                    </Flex>
                    <WritingAssistant />
                    {/* <Image width={565} height={365} src={writingAssistant} alt='' /> */}
                </Flex>
            </Col>
        </Row>
    );
}

function Footer() {
    const t = useTranslations("Pricing");
    const { token } = theme.useToken();
    return (
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
    );
}
