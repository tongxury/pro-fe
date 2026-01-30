import { Typography } from "antd";
import { DOMAttributes, HTMLAttributes } from "react";

import { useTheme } from "../provider";
import { LinearGradientTextProps, TextProps } from "./index";

export const LinearGradientText = ({
    children,
    style,
    color,
    size = 15,
    bold,
    weight,
    ellipsis,
    ...rest
}: LinearGradientTextProps & DOMAttributes<any>) => {
    const { themeVars } = useTheme();

    let newStyle = {
        // color: themeVars.colorTextPrimary || color,
        padding: 0,
        margin: 0,
        fontWeight: weight || (bold ? "bold" : "normal"),
        fontSize: size,
        background: `linear-gradient(${color.direction || "to bottom right"}, ${color.colorStops?.join(",")})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        ...style
    };

    let ellipsisProps: any = false;
    if (ellipsis) {
        ellipsisProps = {
            rows: ellipsis.maxLines
        };
    }

    newStyle = {
        ...newStyle
    };

    return (
        <span {...rest} style={newStyle}>
            {children}
        </span>
    );
};
