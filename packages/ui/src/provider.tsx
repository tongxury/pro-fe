import {createContext, type ReactNode, useContext} from "react";

export declare interface ThemeVars {
    colorPrimary?: string;
    colorL1?: string;
    colorL2?: string;
    colorL3?: string;
    colorL4?: string;
    colorL5?: string;

    colorBgPrimary?: string;
    // duplicated
    colorBgLayout?: string;
    colorBgL1?: string;
    colorBgL2?: string;
    colorBgL3?: string;
    colorBgL4?: string;
    colorBgL5?: string;

    colorBgContainerPrimary?: string;

    colorTextPrimary?: string;
    colorTextL1?: string;
    colorTextL2?: string;
    colorTextL3?: string;
    colorTextL4?: string; //

    colorBorder?: string;
    colorDivider?: string;
    colorShadow?: string;
    colorHover?: string;

    colorError?: string;
    // todo other config fields

    textSize?: number;
}

export declare interface ThemeProps {
    // themeVars?: ThemeVars;
    themeVars: ThemeVars;
    customVars: {
        [key: string]: any;
    };
    components?: {
        Modal?: {
            background?: string;
            // 其他配置
        };
        // 其他组件
    };
}


const defaultThemeVars: ThemeVars = {
    colorPrimary: "#6841ea", //
    colorL1: "#3297fb",
    colorL2: "#4ba3fa",
    colorL3: "#50a5fa",
    colorL4: "#3297fb",
    colorL5: "#3297fb",

    colorBgPrimary: "#1c1c1c",
    colorBgL1: "#252525",
    colorBgL2: "#3a3a3a",
    colorBgL3: "#4e4e4e",
    colorBgL4: "#878686",
    colorBgL5: "#aaaaaa",
    colorBgLayout: "#1c1c1c",

    colorBgContainerPrimary: "#1c1c1c",

    colorTextPrimary: "#ffffff",
    colorTextL1: "#aaaaaa",
    colorTextL2: "#878686",
    colorTextL3: "#4e4e4e",
    colorTextL4: "#4e4e4e",

    colorShadow: "#d2e6fa",
    colorHover: "#d2e6fa",
    colorBorder: "#ececec",
    colorDivider: "#ececec",
    colorError: '#d52020',

    textSize: 14
}

export const defaultTheme: ThemeProps = {
    // themeVars: defaultThemeVars,
    themeVars: defaultThemeVars,
    customVars: {},
    // 组件深度定制的主题可以放在这里
    components: {
        Modal: {
            // background: 'red'
        }
    }
};

export const XThemeCtx = createContext<ThemeProps>(defaultTheme);

// export const useTheme = () => {
//     // return useContext(XThemeCtx);
//     return defaultTheme
// }

export const useTheme = (): ThemeProps => {
    const ctx = useContext(XThemeCtx);
    if (!ctx) {
        throw new Error("useTheme() called without a <ConfigProvider /> in the tree.");
    }

    return ctx;
    // return defaultTheme
};

export const ConfigProvider = ({theme, children}: { theme?: ThemeProps; children: ReactNode }) => {
    const initialTheme: ThemeProps = {
        ...theme,
        // themeVars: {...defaultTheme.themeVars, ...theme?.themeVars},
        themeVars: {...defaultTheme.themeVars, ...theme?.themeVars},
        customVars: {...defaultTheme.customVars, ...theme?.customVars}
    };
    //const shadowRoot = document.getElementById('studygpt-panel-root')?.shadowRoot as ShadowRoot
    // return <AntdConfigProvider theme={{
    //         _components: {
    //           Switch: {
    //                 handleBg: 'red',
    //                 handleSize:100
    //           },
    //         },
    //       }}>
    //         <StyleProvider containers={shadowRoot}>
    //         <XThemeCtx.Provider value={initialTheme}>
    //             {children}
    //         </XThemeCtx.Provider>
    //     </StyleProvider>
    //     </AntdConfigProvider>
    //const shadowRoot = document.getElementById('studygpt-panel-root')?.shadowRoot as ShadowRoot
    return <XThemeCtx.Provider value={initialTheme}>{children}</XThemeCtx.Provider>;
};
