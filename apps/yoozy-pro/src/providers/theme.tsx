import React, { type ReactNode } from "react"
import { XConfigProvider } from "@pro/ui";
import { ConfigProvider, theme } from "antd";

export const colorBgPrimary = '#090909'

export const ThemeProvider = ({ children }: Readonly<{ children: any; }>) => {


    return (

        <ConfigProvider theme={{
            // algorithm: theme.defaultAlgorithm,
            token: {
                colorPrimary: "#7150ff",
                colorLink: "#7150ff",
            },
            components: {
                Segmented: {
                    itemSelectedBg: "#7150ff",
                    itemSelectedColor: '#ffffff',
                    // itemColor: '#ffffff',
                },
            },
        }}>

            <XConfigProvider
                theme={{
                    themeVars: {
                        colorPrimary: "#7150ff",
                        colorL1: '#7150ff',
                        colorL2: '#7150ff',
                        colorTextPrimary: '#ffffff',
                        colorBgContainerPrimary: '#1f1f1f',
                        colorBgPrimary: '#090909',
                        colorBgL1: '#111111',
                        colorBgL2: '#2c2c2c',
                        colorBgL3: '#494949',
                        colorTextL4: '#444444',
                        colorBorder: '#2f2f2f',
                        colorDivider: '#2f2f2f',
                        // colorDivider: '#262632',
                        // colorBorder: '#d8d8d9',
                    },
                    customVars: {
                        colorHomeTitle: '#7150ff',
                    }
                }}
            >
                {children}
            </XConfigProvider>
        </ConfigProvider>
    )
}

