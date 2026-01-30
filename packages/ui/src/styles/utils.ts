import {Property} from "csstype";
import {fontFace} from "polished";
import {CSSProperties} from "react";

import {
    BackgroundImageConfig,
    BoxShadowConfig,
    FontConfig,
    IBackgroundText,
    LinearGradientConfig,
    PositionConfig,
    StyleProperties,
    TransitionConfig
} from "./index";

// export const parseStyleColor = (color: Color): string | undefined => {
//     let result;
//
//     switch (typeof color) {
//         case 'object':
//             result = `linear-gradient(${color.direction || 'to bottom right'}, ${color.colorStops?.join(',')})`
//             break
//         case 'string':
//             result = color as string
//             break
//         default:
//     }
//     return result
// }

// 取消这种方式 改成 style方法封装
export const parseStyleProperties = (style?: StyleProperties): CSSProperties => {
    if (!style) return {};

    // let finalStyles: CSSProperties = {
    //     background: style?.bg,
    //     // padding: style?.pd,
    //
    // }

    // if (style.pd) {
    //     finalStyles = {
    //         ...finalStyles,
    //         paddingTop: style.pd[0],
    //         paddingRight: style.pd[1],
    //         paddingBottom: style.pd[2],
    //         paddingLeft: style.pd[3],
    //     }
    // }

    // if (style.br) {
    //     finalStyles = {
    //         ...finalStyles,
    //         borderTopLeftRadius: style.br[0],
    //         borderTopRightRadius: style.br[1],
    //         borderBottomRightRadius: style.br[2],
    //         borderBottomLeftRadius: style.br[3],
    //     }
    // }

    // if (style.bgColor) {
    //     let background
    //
    //     switch (typeof style.bgColor) {
    //         case 'object':
    //             background = `linear-gradient(${style.bgColor.direction || 'to bottom right'}, ${style.bgColor.colorStops?.join(',')})`
    //             break
    //         case 'string':
    //             background = style.bgColor as string
    //             break
    //         default:
    //     }
    //
    //     finalStyles = {
    //         ...finalStyles,
    //         background,
    //     }
    // }

    // if (style.bgImage) {
    //     finalStyles = {
    //         ...finalStyles,
    //         backgroundImage: `url(${style.bgImage})`,
    //         backgroundSize: "cover",
    //         // backgroundRepeat: "no-repeat",
    //     }
    // }

    return style;
};

export const linearGradient = (config: LinearGradientConfig): CSSProperties => {
    if (!config.colorStops || config.colorStops.length === 0) {
        return {};
    }

    return {
        background: `linear-gradient(${config.toDirection || "to bottom right"}, ${config.colorStops?.join(",")})`,
        backgroundColor: `linear-gradient(${config.toDirection || "to bottom right"}, ${config.colorStops?.join(",")})`
    }

};

export const boxShadow = (config: BoxShadowConfig): CSSProperties => {
    return {
        boxShadow: `0px 0px  ${config.width || 10}px 0px ${config.color || "#333"}`
    };
};

export const padding = (
    top: Property.Padding<number>,
    right: Property.Padding<number>,
    bottom: Property.Padding<number>,
    left: Property.Padding<number>
): CSSProperties => {
    return {
        paddingLeft: left,
        paddingTop: top,
        paddingRight: right,
        paddingBottom: bottom
    };
};

export const borderRadius = (
    topLeft: Property.BorderRadius<number>,
    topRight: Property.BorderRadius<number>,
    bottomRight: Property.BorderRadius<number>,
    bottomLeft: Property.BorderRadius<number>
): CSSProperties => {
    return {
        borderTopLeftRadius: topLeft,
        borderTopRightRadius: topRight,
        borderBottomRightRadius: bottomRight,
        borderBottomLeftRadius: bottomLeft
    };
};

export const backgroundImage = (config: BackgroundImageConfig): CSSProperties => {
    return {
        backgroundImage: `url(${config.image})`,
        backgroundSize: config.backgroundSize || "cover"
    };
};

// 目前这个封装没有意义
export const position = (config: PositionConfig): CSSProperties => {
    return {
        position: config.position || "fixed",
        left: config.left,
        right: config.right,
        top: config.top,
        bottom: config.bottom
    };
};


// todo
export const transition = (config: TransitionConfig): CSSProperties => {
    return {
        transition: "all .2s ease-in-out"
    };
};
export const margin = (
    top: Property.Padding<number>,
    right: Property.Padding<number>,
    bottom: Property.Padding<number>,
    left: Property.Padding<number>
): CSSProperties => {
    return {
        marginLeft: left,
        marginTop: top,
        marginRight: right,
        marginBottom: bottom
    };
};
