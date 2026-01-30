import { Property } from "csstype";
import { ReactNode } from "react";
import { Directions } from "react-text-gradients/lib/types/helpers";

import { BaseProps, Color, GradientColorProps } from "../base";

export declare interface TextProps extends BaseProps {
    color?: string;
    size?: Property.FontSize<number>;
    ellipsis?: { maxWidth?: number | string; maxLines?: number };
    bold?: boolean | number;
    fontFamily?: Property.FontFamily;
    weight?: Property.FontWeight;
    children?: ReactNode | undefined;
}

export declare interface LinearGradientTextProps extends TextProps {
    color: GradientColorProps;
    size?: Property.FontSize<number>;
    ellipsis?: { maxWidth?: number | string; maxLines?: number };
    bold?: boolean | number;
    fontFamily?: Property.FontFamily;
    weight?: Property.FontWeight;
    children?: ReactNode | undefined;
}
