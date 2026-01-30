import {CSSProperties} from "react";

export declare interface Option_<T = any> {
    value: T;
    label?: string;

    [key: string]: any;
}

// export declare const Direction: readonly ["to left", "to top left", "to bottom left", "to right", "to top right", "to bottom right", "to top", "to bottom"];
export type Direction = "column" | "column-reverse" | "row" | "row-reverse";
export type Position = "center" | "centerInline" | "centerBlock";
export type Size = "sm" | "md" | "lg" | number;

// export type Shape = "circle" | "square";

export declare interface BaseProps {
    style?: CSSProperties;
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
export type GradientsDirections = (typeof directions)[number];

export declare interface GradientColorProps {
    direction?: GradientsDirections | string | undefined;
    colorStops: string[];
}

export type Color = string | GradientColorProps;
