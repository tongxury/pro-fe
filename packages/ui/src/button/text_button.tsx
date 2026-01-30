import { ButtonHTMLAttributes } from "react";

import { useTheme } from "../provider";
import { parseStyleProperties } from "../styles/utils";
import { TextButtonProps } from "./types";

const TextButton = ({ children, style, ...rest }: TextButtonProps & ButtonHTMLAttributes<any>) => {
    const { themeVars } = useTheme();

    return (
        <div
            {...rest}
            style={{
                cursor: "pointer",
                fontSize: themeVars.textSize,
                ...parseStyleProperties(style)
            }}
        >
            {children}
        </div>
    );
};

export default TextButton;
