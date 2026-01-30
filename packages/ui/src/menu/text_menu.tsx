import { CSSProperties } from "react";

import { Flex } from "../flex";
import { useTheme } from "../provider";
import { parseStyleProperties } from "../styles/utils";
import { MenuOption, TextMenuProps } from "./index";

const TextMenu = ({ value, onChange, gap = 15, options, direction = "row", style }: TextMenuProps) => {
    const { themeVars } = useTheme();

    return (
        <Flex
            align={"center"}
            style={{
                background: themeVars.colorBgPrimary,
                ...parseStyleProperties(style)
            }}
            gap={gap}
            vertical={direction === "column"}
        >
            {options?.map((x: MenuOption, index: number) => {
                const commonStyle: CSSProperties = {
                    cursor: "pointer",
                    paddingInline: 10,
                    paddingBlock: 8
                };

                const selectedStyle: CSSProperties = {
                    ...commonStyle,
                    color: themeVars.colorPrimary,
                    fontWeight: "bold",
                    // fontSize: 16,
                    ...x.selectedStyle
                };

                const unselectStyle: CSSProperties = {
                    ...commonStyle,
                    // fontSize: 14,
                    color: themeVars.colorTextPrimary,
                    ...x.unselectedStyle
                };

                return (
                    <div
                        style={x.value === value ? selectedStyle : unselectStyle}
                        key={index}
                        onClick={() => onChange?.(x)}
                    >
                        {x.label}
                    </div>
                );
            })}
        </Flex>
    );
};

export default TextMenu;
