import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import React, { ReactNode } from "react";

import { useTheme } from "../provider";
import { NumberTabProps } from "./types";

function NumberTabs({
    value,
    count,
    size = 25,
    shape = "round",
    variant = "outlined",
    onChange,
    renderTitle,
    indicatorColor,
    disableIndicatorColor,
    style
}: NumberTabProps) {
    const { themeVars } = useTheme();

    const defaultRenderTitle = (value: number, count: number) => {
        return (
            <span>
                {" "}
                {value} / {count}
            </span>
        );
    };

    const Indicator = ({
        onClick,
        active,
        children
    }: {
        onClick: () => void;
        active: boolean;
        children: ReactNode;
    }) => {
        const style =
            variant === "contained"
                ? {
                      background: active
                          ? indicatorColor || themeVars.colorPrimary
                          : disableIndicatorColor || themeVars.colorBgL2,
                      color: themeVars.colorBgPrimary
                  }
                : {
                      // border:
                      //     "1px solid " +
                      //     (active
                      //         ? indicatorColor || themeVars.colorPrimary
                      //         : disableIndicatorColor || themeVars.colorBgL2),
                      color: active ? indicatorColor || themeVars.colorPrimary : disableIndicatorColor || themeVars.colorBgL2
                  };

        return (
            <div
                onClick={() => {
                    active && onClick();
                }}
                style={{
                    cursor: active ? "pointer" : "not-allowed",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: size,
                    height: size,
                    borderRadius: shape === "circle" ? "50%" : 4,
                    fontSize: size * 0.6,
                    ...style
                    // background: active
                    //     ? indicatorColor || themeVars.colorPrimary
                    //     : disableIndicatorColor || themeVars.colorBgL2
                }}
            >
                {children}
            </div>
        );
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
                alignItems: "center",
                userSelect: "none",
                ...style
            }}
        >
            <Indicator
                onClick={() => {
                    onChange(value - 1);
                }}
                active={value > 1}
            >
                {/* <LeftOutlined /> */}
                <LeftCircleOutlined style={{ fontSize: 20 }} />
            </Indicator>

            {(renderTitle || defaultRenderTitle)(value, count)}

            <Indicator
                onClick={() => {
                    onChange(value + 1);
                }}
                active={value < count}
            >
                {/* <RightOutlined /> */}
                <RightCircleOutlined style={{ fontSize: 20 }} />
            </Indicator>
        </div>
    );
}

export default NumberTabs;
