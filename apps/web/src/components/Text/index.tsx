import React, { CSSProperties, ReactNode } from "react";
import { LinearGradient } from "react-text-gradients";
import { Linear } from "react-text-gradients/lib/types/types";
import { useTranslations } from "next-intl";

export const T = ({
    children,
    style,
    maxWidth,
    color,
    size,
    bold,
    ellipsis,
    maxLines,
    boldNumber,
    ...rest
}: {
    children: ReactNode | string;
    color?: string;
    maxWidth?: number;
    size?: number;
    ellipsis?: boolean;
    maxLines?: number;
    boldNumber?: number;
    bold?: boolean;
    style?: CSSProperties;
}) => {
    let newStyle = {
        ...(style || {})
    };

    if (color) {
        newStyle = { ...newStyle, color };
    }
    if (maxWidth) {
        newStyle = { ...newStyle, maxWidth };
    }

    if (size) {
        newStyle = { ...newStyle, fontSize: size };
    }

    if (bold) {
        newStyle = { ...newStyle, fontWeight: "bold" };
    }
    if (boldNumber) {
        newStyle = { ...newStyle, fontWeight: boldNumber };
    }

    if (ellipsis) {
        newStyle = {
            ...newStyle,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: (maxLines || 1) > 1 ? "normal" : "nowrap",
            maxLines: maxLines || 1
        };
    }

    return (
        <div {...rest} style={newStyle}>
            {children}
        </div>
    );
};

export const Text = ({
    ignoreIntl,
    children,
    style,
    maxWidth,
    color,
    size,
    bold,
    ellipsis,
    maxLines,
    boldNumber,
    params,
    ...rest
}: {
    ignoreIntl?: boolean;
    children: ReactNode | string;
    color?: string;
    maxWidth?: number;
    size?: number;
    ellipsis?: boolean;
    maxLines?: number;
    boldNumber?: number;
    bold?: boolean;
    style?: CSSProperties;
    params?: { [key: string]: any };
}) => {
    const t = useTranslations("Pricing");

    let newStyle = {
        ...(style || {})
    };

    if (color) {
        newStyle = { ...newStyle, color };
    }
    if (maxWidth) {
        newStyle = { ...newStyle, maxWidth };
    }

    if (size) {
        newStyle = { ...newStyle, fontSize: size };
    }

    if (bold) {
        newStyle = { ...newStyle, fontWeight: "bold" };
    }
    if (boldNumber) {
        newStyle = { ...newStyle, fontWeight: boldNumber };
    }

    if (ellipsis) {
        newStyle = {
            ...newStyle,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: (maxLines || 1) > 1 ? "normal" : "nowrap",
            maxLines: maxLines || 1
        };
    }

    if (!ignoreIntl && children) {
        return (
            <div {...rest} style={newStyle}>
                {t(children)}
            </div>
        );
    }

    return (
        <div {...rest} style={newStyle}>
            {children}
        </div>
    );
};

export const GradientText = ({
    gradient,
    children,
    style
}: {
    gradient: Linear;
    children: ReactNode;
    style?: CSSProperties;
}) => {
    return (
        <LinearGradient style={style} gradient={gradient}>
            {children}
        </LinearGradient>
    );

    // return  <div style={{
    //     ...(style || {}),
    //     background: `linear-gradient(to right, ${token.colorPrimary}99, ${token.colorPrimary}, ${token.colorPrimary}33, ${token.colorPrimary})`,
    //     'backgroundClip': 'text', 'WebkitBackgroundClip': 'text', color: 'transparent'
    // }}>
    //     XTips {userDetail?.member?.metadata?.tag}
    // </div>
};
