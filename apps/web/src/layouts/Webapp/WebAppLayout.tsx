"use client";

import logo from "@/assets/logo.png";
import { T } from "@/components/Text";
import { appName } from "@/constants";
import { usePathname, useRouter } from "@/navigation";
import Account from "@/pages_/Webapp/_components/Account";
import ChatBar from "@/pages_/Webapp/_components/ChatBar/Bar";
import ChatToolBar from "@/pages_/Webapp/_components/ChatBar/ChatToolBar";
import ChatPanel from "@/pages_/Webapp/_components/ChatPanel";
import { useGlobalState } from "@/providers/global";
import { XIcon } from "@pro/icons";
import { useXTheme, XFlex, XHoverable, XText, type XMenuOption } from "@pro/ui";
import { MemberLevelTag } from "@pro/ui-pro";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import IconFont from "@/components/Iconfont";

const WebAppLayout = ({ children }: { children: any }) => {
    const { token } = useXTheme();
    const t = useTranslations("Default");
    const tt = useTranslations("Feedback");

    const menuOptions: XMenuOption[] = [
        {
            value: "/webapp/chat",
            label: t("chat"),
            iconName: "chat-smile-fill",
            activeIconName: "chat-smile-fill"
        },
        {
            value: "/webapp/homework",
            label: t("homework"),
            iconName: "homework",
            activeIconName: "homework"
        },
        // {
        //     value: "/webapp/research_paper",
        //     label: t("research_paper"),
        //     iconName: "lunwen",
        //     activeIconName: "lunwen"
        // },
        {
            value: "/webapp/writing_assistant",
            label: t("writing_assistant"),
            iconName: "wenzhangxiezuozhushou",
            activeIconName: "wenzhangxiezuozhushou"
        }
        // {
        //     value: "/webapp/compose",
        //     label: t("compose"),
        //     iconName: "ruanwenzhuanxie-liucheng-zhuanxie",
        //     activeIconName: "ruanwenzhuanxie-liucheng-zhuanxie"
        // }
    ];

    const router = useRouter();
    const pathname = usePathname();

    const { user, userLoading } = useGlobalState();

    return (
        <XFlex>
            <XFlex
                vertical
                style={{
                    height: "100vh",
                    width: 250,
                    boxSizing: "border-box",
                    background: token.colorBgPrimary,
                    borderRight: `1px solid ${token.colorBorder}`,
                    flex: "0 0 auto"
                }}
            >
                <XFlex
                    style={{ padding: 15, boxSizing: "border-box", height: 60 }}
                    gap={10}
                    justify={"center"}
                    align="center"
                >
                    <Image src={logo} style={{ height: "40px", width: "auto", objectFit: "contain" }} alt={""} />
                    <T bold size={20}>
                        {appName}
                    </T>
                    {/* <MemberLevelTag value={'free'}/> */}
                </XFlex>
                <XFlex vertical justify="space-between" style={{ flex: 1, paddingBottom: 10 }}>
                    <XFlex vertical gap={2} style={{ flex: 1, paddingInline: 12 }}>
                        {menuOptions.map((x, i) => {
                            const isSelected = pathname?.startsWith(x.value);

                            return (
                                <XHoverable
                                    key={i}
                                    color={token.colorBgLayout}
                                    onClick={() => router.push(x.value)}
                                    style={{ borderRadius: 10 }}
                                >
                                    <XFlex
                                        align="center"
                                        padding={15}
                                        gap={6}
                                        style={{
                                            cursor: "pointer",
                                            // height: 46,
                                            borderRadius: 10,
                                            background: isSelected ? token.colorBgLayout : undefined
                                        }}
                                    >
                                        <IconFont
                                            size={20}
                                            name={isSelected ? x.activeIconName : x.iconName}
                                            color={isSelected ? token.colorPrimary : undefined}
                                        />
                                        {/* <XIcon
                                          name={
                                              isSelected
                                                  ? x.activeIconName
                                                  : x.iconName
                                          }
                                          color={
                                            isSelected
                                              ? token.colorPrimary : undefined
                                          }
                                      ></XIcon> */}
                                        <XText
                                            size={14}
                                            bold={true}
                                            color={isSelected ? token.colorPrimary : token.colorTextL2}
                                            style={{
                                                fontFamily: "SFProDisplay-Regular"
                                            }}
                                        >
                                            {x.label}
                                        </XText>
                                    </XFlex>
                                </XHoverable>
                            );
                        })}
                    </XFlex>
                    <XFlex style={{ paddingInline: 12, width: "100%", boxSizing: "border-box" }}>
                        <XHoverable
                            color={token.colorBgLayout}
                            onClick={() => router.push("/feedback")}
                            style={{ borderRadius: 10, width: "100%" }}
                        >
                            <XFlex
                                align="center"
                                padding={15}
                                gap={6}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: 10
                                }}
                            >
                                <IconFont size={20} name={"wenzhangxiezuozhushou"} />
                                <XText
                                    size={14}
                                    bold={true}
                                    color={token.colorTextL2}
                                    style={{
                                        fontFamily: "SFProDisplay-Regular"
                                    }}
                                >
                                    {tt("feedback")}
                                </XText>
                            </XFlex>
                        </XHoverable>
                    </XFlex>
                </XFlex>
                <Account
                    style={{ borderTop: `1px solid ${token.colorBorder}`, padding: 10 }}
                    data={user}
                    loading={userLoading}
                />
            </XFlex>
            <div
                style={{
                    height: "100vh",
                    flex: 1,
                    background: "#f1f5f9"
                }}
            >
                {children}
            </div>
            {/* <ChatBar /> */}
            <ChatToolBar />
            <ChatPanel />
        </XFlex>
    );
};

export default WebAppLayout;
