/* eslint-disable */

import React, { CSSProperties } from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const CloseLine = ({
    size = 18,
    color = "#333333",
    style,
    ...rest
}: {
    size?: number;
    color?: string;
    style?: CSSProperties | undefined;
}) => {
    // const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

    return (
        <svg
            viewBox="0 0 20 20"
            width={size + "px"}
            height={size + "px"}
            style={{ display: "block", ...style }}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="13.9832"
                y="3.15002"
                width="1.22562"
                height="15.3203"
                rx="0.612812"
                transform="rotate(45 13.9832 3.15002)"
                fill={color}
            ></rect>
            <rect
                x="3.15009"
                y="4.01685"
                width="1.22562"
                height="15.3203"
                rx="0.612812"
                transform="rotate(-45 3.15009 4.01685)"
                fill={color}
            ></rect>
        </svg>
    );
};

export default CloseLine;
