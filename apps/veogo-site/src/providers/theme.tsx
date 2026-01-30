import React, {type ReactNode} from "react"
import {XConfigProvider} from "@pro/ui";
import {ConfigProvider, theme} from "antd";

export const colorBgPrimary = '#090909'

export const ThemeProvider = ({children}: Readonly<{ children: any; }>) => {


    return (

        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: "#0ad9a2",
                colorLink: "#14f3b8",
            },
            components: {
                Segmented: {
                    itemSelectedBg: "#0ad9a2",
                    itemSelectedColor: '#ffffff',
                    // itemColor: '#ffffff',
                },
            },
        }}>

            <XConfigProvider
                theme={{
                    themeVars: {
                        colorPrimary: "#0ad9a2",
                        colorL1: '#48f13c',
                        colorL2: '#0f9ede',
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
                        colorHomeTitle: '#db06ea',
                    }
                }}
            >
                {children}
            </XConfigProvider>
        </ConfigProvider>
    )
}

