import {ReactNode} from "react";

import {Size} from "./base";
import {useTheme} from "./provider";
import {StyleProperties} from "./styles";
import {Typography} from "antd";

export type TagProps = {
    bgColor?: string;
    textColor?: string;
    size?: Size;
    children?: ReactNode;
    style?: StyleProperties;
};

export const Tag = ({bgColor, textColor, size = 'md', children, style}: TagProps) => {

    const sizeConfig = {
        'sm': {
            height: 10,
            paddingInline: 8,
            paddingBlock: 3,
            fontSize: 10,
        },
        'md': {
            height: 15,
            paddingInline: 10,
            paddingBlock: 2,
            fontSize: 11,
        },
        'lg': {
            height: 15,
            paddingInline: 10,
            paddingBlock: 2,
            fontSize: 11,
        },
    }[size]


    const {themeVars} = useTheme();
    return (
        <div
            style={{
                width: 'fit-content',
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                ...sizeConfig,
                borderRadius: 50, // 这里为实现 round 形状，选择了一个比较大的值
                color: textColor || themeVars?.colorBgPrimary,
                background: bgColor || themeVars?.colorPrimary,
                ...style
            }}
        >
            {children}
        </div>
    );
};
