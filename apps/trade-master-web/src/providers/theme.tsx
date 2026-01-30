'use client'
import React, {type ReactNode} from "react"
import {XConfigProvider} from "@pro/ui";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import {ConfigProvider, theme} from "antd";
import localFont from "next/font/local";


export const constantineFont = localFont({src: '../assets/fonts/Constantine.ttf'})


export const colorBgPrimary = '#0e0e17'


export const ThemeProvider = ({children}: Readonly<{ children: any; }>) => {


    const colorPrimary = "#9fdf00"
    // const colorPrimary = "#b7ff00"

    return (

        <AntdRegistry>
            <ConfigProvider theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary
                }
            }}>

                <XConfigProvider
                    theme={{
                        themeVars: {
                            colorTextPrimary: '#fff',
                            colorPrimary,
                            colorBgPrimary,
                            // colorBgL1: '#fff'
                            colorDivider: '#262632',
                        },
                        customVars: {
                            colorHomeTitle: '#db06ea',
                        }
                    }}
                >
                    {children}
                </XConfigProvider>
            </ConfigProvider>
        </AntdRegistry>
    )
}

