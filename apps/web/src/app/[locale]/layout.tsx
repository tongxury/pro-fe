import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";

import { Inter } from "next/font/google";
import { ReactNode } from "react";
import React from "react";
import "@/styles/global.scss";
import "@/styles/animate.css";
import "@/styles/home.scss";
import "@/styles/footer.scss";
import "@/styles/home.header.nav.scss";
import "@/styles/login.scss";
import "@/styles/login.email.scss";
import "@/styles/login.forgot.scss";
import "@/styles/login.registercode.scss";
import "@/styles/onboarding.scss";
import "@/styles/freetrial.scss";
import "@/styles/legal.privacy.scss";
import { locales } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";
import { appName } from "@/constants";
import AppLayout from "@/layouts/AppLayout";

export type Props = {
    children: ReactNode;
    params: { locale: string };
};

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {};
export default function RootLayout({ children, params: { locale } }: Readonly<Props>) {
    unstable_setRequestLocale(locale);

    // const AntdThemeProvider = ({children}: { children: ReactNode }) => (
    //     <ConfigProvider
    //         theme={{
    //             // algorithm: theme.darkAlgorithm,
    //             token: {
    //                 // Seed Token，影响范围大
    //                 colorPrimary: "#6841ea", //
    //                 colorInfoBg: "#6841ea", //
    //                 colorPrimaryHover: "#9373ff",
    //                 colorFill: "#6841ea",
    //                 colorFillSecondary: "#a087f1",
    //                 // colorFillTertiary: "#065AFF",
    //                 colorBgLayout: "#ede9fa",

    //                 // colorFillQuaternary: '#04FFD2',
    //                 boxShadow: "#dbd0fd",
    //                 colorBgBase: "#ffffff",
    //                 borderRadius: 5,
    //                 colorBorder: "#ececec",
    //                 // 派生变量，影响范围小
    //                 colorBgContainer: "#F9FAFB",
    //             },
    //             components: {
    //                 PromptInput: {
    //                     colorBgContainer: "rgb(241, 242, 243)",
    //                     colorBorder: "rgba(217, 217, 217, 0)",
    //                     hoverBorderColor: "rgb(103, 65, 234)",
    //                     activeBorderColor: "rgb(103, 65, 234)",
    //                 },
    //                 Spin: {
    //                     colorPrimary: "#324CFC",
    //                 },
    //                 Select: {
    //                     optionActiveBg: "rgba(79,89,102,.08)",
    //                     selectorBg: "rgba(79,89,102,.08)",
    //                     colorPrimary: "rgb(191, 48, 209)",
    //                     colorBorder: "rgba(110, 67, 67, 0)",
    //                     colorPrimaryHover: "rgba(61, 76, 94, 0)",
    //                 },
    //                 Segmented: {
    //                     itemSelectedBg: "#6841ea",
    //                     itemSelectedColor: "#fff",
    //                     trackBg: "#fff",
    //                     borderRadius: 20,
    //                     borderRadiusSM: 20,
    //                     borderRadiusLG: 20,
    //                     itemActiveBg: "rgba(220, 12, 12, 0)",
    //                     itemHoverBg: "rgba(0, 0, 0, 0)",
    //                 },
    //                 Modal: {
    //                     // borderRadius: 20,
    //                     // paddingContentHorizontalLG: 0,
    //                     // paddingContentVerticalLG: 0,
    //                 },
    //             },
    //         }}
    //     >
    //         {children}
    //     </ConfigProvider>
    // );

    const desc = `With ${appName}, you can easily check for plagiarism and find reliable references for your academic papers with our free plagiarism checker and academic search engine. Try it now!`;

    return (
        <NextIntlClientProvider messages={useMessages()} locale={locale}>
            <AppLayout>
                <html lang={locale}>
                    <head>
                        {/*<link rel="shortcut icon" href="https://xmethod.oss-eu-central-1.aliyuncs.com/favicon.ico" type="image/x-icon"/>*/}
                        <title>{appName} - Your AI Copilot Chrome Extension</title>
                        <meta name="application-name" content={appName} />
                        <meta property="og:type" content="website" />
                        <meta property="og:site_name" content={appName} />
                        <meta property="og:url" content="https://xtips.ai" />
                        <meta property="og:title" content={appName} />
                        <meta property="og:description" content={desc} />
                        <meta name="description" content="" />
                        <meta
                            name="keywords"
                            content="chrome ai extensio，search academic articles,paper plagiarism checker"
                        />
                        <meta
                            name="description"
                            content={`With ${appName}, you can easily check for plagiarism and find reliable references for your academic papers with our free plagiarism checker and academic search engine. Try it now!`}
                        />
                        <script src="https://www.googletagmanager.com/gtag/js?id=AW-16571435804" async />
                        <script src="https://www.googletagmanager.com/gtag/js?id=G-7HSZDRE4R9" async />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag("js", new Date());
                                    gtag("config", "AW-16571435804");
                                    gtag("config", "G-7HSZDRE4R9");
                                `
                            }}
                        ></script>
                        <link
                            rel="stylesheet"
                            type="text/css"
                            charSet="UTF-8"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
                        />
                        <link
                            rel="stylesheet"
                            type="text/css"
                            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
                        />
                    </head>
                    <body className={inter.className}>{children}</body>
                </html>
            </AppLayout>
        </NextIntlClientProvider>
    );
}
