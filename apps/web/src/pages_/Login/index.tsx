"use client";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Flex, Typography } from "antd";
import { addEventLog } from "@/api/api";
import { getDeviceID, getUrlParam } from "@/utils";
import Image from "next/image";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";
import EmailLogin from "@/pages_/Login/components/EmailLogin";
import Resigter from "@/pages_/Login/components/Resigter";
import logoSvg from "@/assets/svg/logo.svg";
import logo from "@/assets/logo.png";
import { T, Text } from "@/components/Text";
import { appName } from "@/constants";

export default function Login() {
    const [curComponent, setCurComponent] = useState("");
    useEffect(() => {
        addEventLog({
            id: "onboarding_login_view",
            params: {
                referrer: getUrlParam("referrer") || ""
            }
        });

        if (getUrlParam("referrer") === "plugin_installed") {
            addEventLog({ id: "onboarding_login_view_installed" });
        }
    }, []);
    const onAuthGoogle = async () => {
        addEventLog({
            id: "click_google_auth_btn"
        });
        const deviceID = getDeviceID();
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/google-auth-codes?channel=${deviceID}&deviceId=${deviceID}`;
    };
    const emailBtn = () => {
        setCurComponent("emailLogin");
        addEventLog({
            id: "click_continue_with_email_btn"
        });
    };

    const backInit = () => {
        setCurComponent("");
    };
    const resigter = (e: any) => {
        setCurComponent("resigter");
        addEventLog({
            id: "click_create_account_btn"
        });
    };

    const t = useTranslations("Login");

    return (
        <>
            {/* <Header showNav={false} showAd={false} showLocales></Header> */}
            <div className="login-box">
                {/* <div className="swiper-box">
                    <Carousel dots={{className: 'login-dot'}} autoplay autoplaySpeed={2000}>
                        {[0, 1, 2, 3, 4, 5].map((item, index) => (
                            <div key={index}>
                                <Image layout="intrinsic" src={require(`@/assets/login/${index + 1}.png`)} alt=""/>
                            </div>
                        ))}

                    </Carousel>
                </div> */}
                <div className="login">
                    {/* <h2 className='person'>{t('login_person')}</h2>
                    <h1 className='ai'>{t('login_copilot')} </h1> */}
                    <Flex justify={"center"} align={"center"} gap={10}>
                        <Image src={logo} alt="" width={35} style={{ objectFit: "cover" }} />
                        <T bold size={20}>
                            {appName}
                        </T>
                    </Flex>
                    {curComponent === "emailLogin" && <EmailLogin backInit={backInit}></EmailLogin>}
                    {curComponent === "resigter" && <Resigter backInit={backInit}></Resigter>}
                    {curComponent === "" && (
                        <div className="index">
                            <div className="google-btn btn" onClick={onAuthGoogle}>
                                <Image layout="intrinsic" src={require("@/assets/auth-chrome.png")} alt="" />
                                {t("login_google")}
                            </div>
                            <div className="register-btn btn" onClick={emailBtn}>
                                {t("login_email")}
                            </div>
                            <div className="dividing">{t("login_account")}</div>
                            <div className="register-btn btn" onClick={resigter}>
                                {t("login_create")}
                            </div>
                            <div className="explain">
                                {t("login_policy")}&nbsp;
                                <a href="/legal/terms" target="_blank" className="blue">
                                    {" "}
                                    {t("login_policy_2")}
                                </a>
                                &nbsp;
                                {t("login_policy_3")}&nbsp;
                                <a href="/legal/privacy" target="_blank" className="blue">
                                    {" "}
                                    {t("login_policy_4")}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
