import { Property } from "csstype";
import { CSSProperties } from "react";

export declare interface StyleProperties extends CSSProperties {
    // br?: Array<Property.BorderRadius<number | string>> // 四个角的borderRadius ，不用写4个字段了
    // bg?: Property.Background<string>,
    // bgImage?: any,
    // bgColor?: string | GradientColorProps
    // pd?: Array<Property.Padding<number | string>>
    // w?: number | string,
    // mw?: number | string,
    // h?: number | string,
    // mh?: number | string,
}

export declare const directions: readonly [
    "to left",
    "to top left",
    "to bottom left",
    "to right",
    "to top right",
    "to bottom right",
    "to top",
    "to bottom"
];
export type LinearGradientsDirections = (typeof directions)[number];

export declare interface LinearGradientConfig {
    toDirection?: LinearGradientsDirections | string;
    colorStops: string[];
    fallback?: string;
}

export declare interface BoxShadowConfig {
    color?: string;
    width?: number;
}

export declare interface BackgroundImageConfig {
    image: any;
    backgroundSize?: Property.BackgroundSize<number | string>;
}

export declare interface PositionConfig {
    position?: Property.Position;
    left?: Property.Left<number | string>;
    right?: Property.Right<number | string>;
    top?: Property.Top<number | string>;
    bottom?: Property.Bottom<number | string>;
}

export declare interface TransitionConfig {}

export declare interface FontConfig {
    family: "Nunito-ExtraBold" | "Nunito-Regular" | "Nunito-Black" | "Nunito-Bold" | string; // 加载过哪些字体文件 枚举到这
    // size?: Property.FontSize<number | string>;
}

export declare interface IBackgroundText {
    color: string;
}
