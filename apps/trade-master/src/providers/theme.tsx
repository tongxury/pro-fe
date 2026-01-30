import {XConfigProvider} from "@pro/ui";
import {ConfigProvider, theme} from "antd";
import {ReactNode} from "react";

export const ThemeProvider = ({children}: Readonly<{ children: ReactNode }>) => {

    /**
     "accentTextColor": "#6ab2f2",
     "bgColor": "#17212b",
     "buttonColor": "#5288c1",
     "buttonTextColor": "#ffffff",
     "destructiveTextColor": "#ec3942",
     "headerBgColor": "#17212b",
     "hintColor": "#708499",
     "linkColor": "#6ab3f3",
     "secondaryBgColor": "#232e3c",
     "sectionBgColor": "#17212b",
     "sectionHeaderTextColor": "#6ab3f3",
     "subtitleTextColor": "#708499",
     "textColor": "#f5f5f5"
     **/

    const primary = "#83fa03"
    const bgPrimary = "#000000"
    // const bgL1 = "#16191c"
    const bgContainerPrimary = "#13141c"

    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: primary,
                colorBgLayout: bgPrimary,
                colorBgContainer: bgContainerPrimary,
                colorFill: bgContainerPrimary,
                colorBgElevated: bgContainerPrimary,
                colorBorder: "#35373a",
                // colorText: bgContainerPrimary,
            }
        }}>
            <XConfigProvider
                theme={{
                    themeVars: {
                        colorPrimary: primary,
                        colorBgPrimary: bgPrimary,
                        colorBgContainerPrimary: bgContainerPrimary,
                        // colorBgL1: bgL1,
                        colorDivider: '#262632',
                        colorBorder: "#24272b",
                        colorTextPrimary: "#ffffff"

                    },
                    customVars: {
                        withdrawStatus_pending: '#f89e28',
                        withdrawStatus_distributed: '#04c860',

                        colorQuickOrderOption_buy: 'rgba(4,200,96,0.4)',
                        colorQuickOrderOption_sell: 'rgba(214,3,77,0.4)',

                        color_buy: '#04c860',
                        color_bg_buy: '#04c86033',
                        color_sell: '#d6034d',
                        color_bg_sell: '#d6034d33',

                        color_increase: '#04c860',
                        color_decrease: '#d6034d',

                        color_created: '#f89e28',
                        color_uncompleted: '#f89e28',
                        color_completed: '#04c860',
                        color_feeSettled: '#04c860',
                        color_failed: '#d6034d',
                        color_cancelled: '#d6034d',
                        color_danger: '#d6034d',

                        color_bg_completed: '#04c86033',
                        color_bg_cancelled: '#d6034d33',

                        bottomMenuHeight: 60,
                    }
                }}
            >
                {children}
            </XConfigProvider>
        </ConfigProvider>
    );
};
