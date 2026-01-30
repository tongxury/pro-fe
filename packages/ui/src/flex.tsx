import type {Property} from "csstype";
import {CSSProperties, HTMLAttributes, ReactNode, RefAttributes} from "react";
import {borderStyle} from "polished";
import {useXTheme} from "./index";

// antd自带的组件 vertical 默认为true。 vertical 位false的组件，正在加载过程中会出现闪屏，所有这里重新实现
export const Flex = (
    {
        vertical,
        boxSizing = 'border-box',
        height,
        flex,
        center,
        bordered,
        justify,
        align,
        gap,
        padding,
        margin,
        background,
        borderRadius,
        style,
        children,
        // pointer,
        block,
        ...rest
    }: {
        vertical?: boolean;
        boxSizing?: Property.BoxSizing,
        height?: Property.Height<number| string>,
        flex?: Property.Flex;
        center?: boolean;
        bordered?: boolean;
        padding?: Property.Padding<number>[] | Property.Padding<number>;
        margin?: Property.Margin<number>[] | Property.Margin<number>;
        background?: Property.Background
        borderRadius?: Property.BorderRadius<number>[] | Property.BorderRadius<number>
        justify?: Property.JustifyContent;
        align?: Property.AlignItems;
        gap?: number;
        // pointer?: boolean;
        block?: boolean;
        style?: CSSProperties;
        children: ReactNode;
    } & HTMLAttributes<any> &
        RefAttributes<any>) => {

    const {themeVars} = useXTheme()

    let paddingStyle: CSSProperties = {};
    if (Array.isArray(padding)) {
        paddingStyle = {
            paddingTop: padding && padding.length > 0 ? padding[0] : 0,
            paddingRight: padding && padding.length > 1 ? padding[1] : 0,
            paddingBottom: padding && padding.length > 2 ? padding[2] : 0,
            paddingLeft: padding && padding.length > 3 ? padding[3] : 0
        };
    } else {
        paddingStyle = {padding: padding};
    }

    let marginStyle: CSSProperties = {};
    if (Array.isArray(margin)) {
        marginStyle = {
            marginTop: margin && margin.length > 0 ? margin[0] : 0,
            marginRight: margin && margin.length > 1 ? margin[1] : 0,
            marginBottom: margin && margin.length > 2 ? margin[2] : 0,
            marginLeft: margin && margin.length > 3 ? margin[3] : 0
        };
    } else {
        marginStyle = {margin: margin};
    }


    let borderRadiusStyle: CSSProperties = {};
    if (Array.isArray(borderRadius)) {
        borderRadiusStyle = {
            borderTopLeftRadius: borderRadius && borderRadius.length > 0 ? borderRadius[0] : 0,
            borderTopRightRadius: borderRadius && borderRadius.length > 1 ? borderRadius[1] : 0,
            borderBottomRightRadius: borderRadius && borderRadius.length > 2 ? borderRadius[2] : 0,
            borderBottomLeftRadius: borderRadius && borderRadius.length > 3 ? borderRadius[3] : 0
        };
    } else {
        borderRadiusStyle = {borderRadius: borderRadius};
    }


    return (
        <div
            style={{
                boxSizing,
                display: "flex",
                flex,
                height,
                border: bordered ? '1px solid ' + themeVars.colorBorder : undefined,
                width: block ? '100%' : 'auto',
                // background: background || undefined,
                background,
                // background: themeVars?.colorBgPrimary,
                flexDirection: vertical ? "column" : "row",
                justifyContent: center ? "center" : justify,
                alignItems: center ? "center" : align,
                // cursor: pointer ? "pointer" : "default",
                ...paddingStyle,
                ...marginStyle,
                ...borderRadiusStyle,
                gap,
                ...style
            }}
            {...rest}
        >
            {children}
        </div>
    );
};
