import {
    useXTheme,
    XFlex,
    xFont,
    XImage,
    xLinearGradient,
    XLinearGradientText,
    XTag,
    XText,
    type XOption
} from "@pro/ui";
import React, { type CSSProperties } from "react";

import { appName } from "../constants";
import { levelConfig } from "./config";

export const MemberLevelTag = ({ value, style }: { value: string; style?: CSSProperties }) => {
    const { token, customVars } = useXTheme();
    const config = levelConfig[value];

    if (!value || !config) {
        return <></>;
    }

    return (
        <XTag
            bgColor={xLinearGradient({
                toDirection: "122deg",
                colorStops: config.colorStops!
            })}
            style={{
                ...style
            }}
        >
            {config.text}
        </XTag>
    );
};

export const MemberLevelText = ({ value }: { value?: string }) => {
    const config = (value && levelConfig[value]) || undefined;

    const text = config?.text || "";
    if (!value || !config) {
        return <></>;
    }

    return (
        <XFlex align={"center"} style={{ background: "transparent" }}>
            {config.icon ? (
                <XImage src={config?.icon} style={{ color: config.iconColor } as CSSProperties}></XImage>
            ) : (
                <></>
            )}
            <XLinearGradientText
                bold
                size={14}
                color={{
                    colorStops: config.colorStops!,
                    direction: config.direction
                }}
            >
                {appName} {text}
            </XLinearGradientText>
        </XFlex>
    );
};
