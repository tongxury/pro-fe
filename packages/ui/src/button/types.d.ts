import { ReactNode } from "react";

import { BaseProps } from "../base";
import { StyleProperties } from "../styles";

export declare interface ButtonProps extends BaseProps {
    children: ReactNode;
}

export declare interface TextButtonProps extends ButtonProps {}

// todo 将button公共的抽离出来 本期不做
export declare interface IconButtonProps extends ButtonProps {
    icon?: ReactNode;
    children?: ReactNode;
    background?: string;
    bordered?: boolean;
    hoverBackground?: string;
    size?: number;
    padding?: number;
    width?: number;
    height?: number;
    shape?: "circle" | "round";
    style?: StyleProperties;
}
