import React, { cloneElement, ReactElement } from "react";
import { useXTheme } from "../index";
import { CardSelectorProps } from "./index";

export function CardSelector({ value, options, onChange, renderItem }: CardSelectorProps) {
    const { themeVars } = useXTheme();

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10
                // justifyContent: "space-between",
                // flexDirection: "column"
            }}
        >
            {options?.map((x, i) => {
                const child = renderItem?.(x, x.value === value, i) as ReactElement;

                return cloneElement(child, {
                    ...child.props,
                    onClick: (e: any) => {
                        e.stopPropagation();
                        onChange?.(x);
                        child.props.onClick?.();
                    },
                    style: {
                        cursor: "pointer",
                        borderRadius: 4,
                        columns: "pointer",
                        margin: "3px 0",
                        padding: 5,
                        // background: x.value === value ? themeVars.colorBgPrimary : themeVars.colorBgPrimary,
                        ...child.props.style
                    }
                });
                // <div
                //     key={i}
                //     onClick={() => onChange?.(x)}
                //     style={{
                //         flex: 1,
                //         cursor: "pointer",
                //         borderRadius: 4,
                //         columns: "pointer",
                //         margin: "3px 0",
                //         padding: 5,
                //         background: x.value === value ? themeVars.colorBgPrimary : themeVars.colorBgPrimary
                //     }}
                // >
                //     {renderItem?.(x, x.value === value, i)}
                // </div>
            })}
        </div>
    );
}
