import React from "react";

import {useXTheme} from "../index";
import {SelectorProps} from "./index";

export default function Selector({value, options, onChange, renderItem, style}: SelectorProps) {
    const {themeVars} = useXTheme();

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                ...style
            }}
        >
            {options?.map((x, i) => {
                return <div style={{flex: 1}}
                            onClick={() => onChange?.(x)}>{renderItem?.(x, x.value === value, i)}</div>;
            })}
        </div>
    );
}
