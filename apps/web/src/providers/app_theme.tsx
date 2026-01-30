import { AntdRegistry } from "@ant-design/nextjs-registry";
import { XConfigProvider } from "@pro/ui";
import { ConfigProvider } from "antd";
import React, { ReactNode } from "react";

const colorPrimary = "#6841ea";
const colorL1 = "#e2effb";
// const colorPrimary = 'red'
//
const ThemeProvider = ({ children }: { children: ReactNode }) => (
    <AntdRegistry>
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token，影响范围大
                    colorPrimary: "#6841ea", //
                    colorInfoBg: "#6841ea", //
                    colorPrimaryHover: "#9373ff",
                    colorFill: "#ccc",
                    colorFillSecondary: "#ddd",
                    // colorFillTertiary: "#065AFF",
                    colorBgLayout: "#ede9fa",

                    // colorFillQuaternary: '#04FFD2',
                    boxShadow: "#dbd0fd",
                    colorBgBase: "#ffffff",
                    borderRadius: 5,
                    colorBorder: "#ececec",
                    // 派生变量，影响范围小
                    colorBgContainer: "#F9FAFB"
                },
                components: {
                    Input: {
                        colorBgContainer: "rgb(241, 242, 243)",
                        colorBorder: "rgba(217, 217, 217, 0)",
                        hoverBorderColor: "rgb(103, 65, 234)",
                        activeBorderColor: "rgb(103, 65, 234)"
                    },
                    Spin: {
                        colorPrimary: "#324CFC"
                    },
                    Select: {
                        optionActiveBg: "rgba(79,89,102,.08)",
                        selectorBg: "rgba(79,89,102,.08)",
                        colorPrimary: "rgb(191, 48, 209)",
                        colorBorder: "rgba(110, 67, 67, 0)",
                        colorPrimaryHover: "rgba(61, 76, 94, 0)"
                    },
                    Segmented: {
                        itemSelectedBg: "#6841ea",
                        itemSelectedColor: "#fff",
                        trackBg: "#fff",
                        borderRadius: 20,
                        borderRadiusSM: 20,
                        borderRadiusLG: 20,
                        itemActiveBg: "rgba(220, 12, 12, 0)",
                        itemHoverBg: "rgba(0, 0, 0, 0)"
                    },
                    Modal: {
                        // borderRadius: 20,
                        // paddingContentHorizontalLG: 0,
                        // paddingContentVerticalLG: 0,
                    }
                }
            }}
        >
            <XConfigProvider
                theme={{
                    token: {
                        colorPrimary,
                        colorL1,
                        colorBgPrimary: "#fff",
                        colorTextPrimary: "#000000",
                        colorTextL2: "#70798C ",
                        // colorBgL1: '#F7F8FA',
                        // colorBgL2: '#f8fcfd',
                        // colorBgL3: '#eff4fa',
                        // colorTextL2: "#333333",
                        colorBorder: "#efefef",

                        textSize: 14
                    },
                    custom: {
                        colorHomeTitle: "#db06ea",
                        // colorBgPagerContainer: "#F0F5FC"
                        colorBgPagerContainer: "#F0F5FC"
                    }
                }}
            >
                {children as any}
            </XConfigProvider>
        </ConfigProvider>
    </AntdRegistry>
);

export default ThemeProvider;
