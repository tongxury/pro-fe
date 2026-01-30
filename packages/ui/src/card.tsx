import { ReactNode } from "react";

import { useTheme } from "./provider";
import { StyleProperties } from "./styles";
import { parseStyleProperties } from "./styles/utils";

export const Card = ({
    bordered = false,
    clean = false,
    style,
    children
}: {
    bordered?: boolean;
    clean?: boolean;
    style?: StyleProperties;
    children: ReactNode;
}) => {
    const { themeVars } = useTheme();

    return (
        <div
            style={{
                boxShadow: "0px 0px 20px 0px " + themeVars.colorShadow,
                borderRadius: 5,
                padding: clean ? 0 : 10,
                background: themeVars.colorBgPrimary,
                border: bordered ? "0.8px solid " + themeVars.colorBorder : 0,
                ...style
            }}
        >
            {children}
        </div>
    );
};
