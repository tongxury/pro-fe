import React, {ButtonHTMLAttributes, useState} from "react";

import {useTheme} from "../provider";
import {IconButtonProps} from "./types";

const IconButton = ({
    icon,
    children,
    background,
    hoverBackground,
    bordered,
    size = 30,
    // width,
    // height,
    shape = "round",
    style,
    ...rest
}: IconButtonProps & ButtonHTMLAttributes<any>) => {
    const [hovering, setHovering] = useState(false);
    const { themeVars } = useTheme();

    return (
        <div
            onMouseEnter={() => {
                setHovering(true);
            }}
            onMouseLeave={() => {
                setHovering(false);
            }}
            style={{
                cursor: "pointer",
                border: bordered ? "1px solid " + themeVars.colorBorder : undefined,
                borderRadius: shape === "round" ? 5 : "50%",
                width: size,
                height: size,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: hovering ? hoverBackground || themeVars.colorBgL1 : background || themeVars.colorBgL1,
                ...style
            }}
            {...rest}
        >
            {React.Children.map(icon || children, (child) => {
                if (!React.isValidElement(child)) {
                    return null;
                }
                const childProps = {
                    ...child.props,
                    style: {
                        cursor: "pointer",
                        // width: size - 2 * padding,
                        // height: size - 2 * padding,
                        // width: 20,
                        // height: 20,
                        ...child.props.style
                    }
                };
                return React.cloneElement(child, childProps);
            })}
        </div>
    );
};

export default IconButton;
