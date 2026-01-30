import {BaseProps, Direction, Option_} from "../base";
import {ReactElement, ReactNode} from "react";
import {Property} from "csstype";

export declare interface NumberTabProps extends BaseProps {
    readonly value: number;
    readonly count: number;
    readonly size?: number | undefined;
    readonly indicatorColor?: Property.Color | undefined;
    readonly variant?: "outlined" | "contained";
    readonly disableIndicatorColor?: Property.Color | undefined;
    readonly shape?: "round" | "circle";
    readonly renderTitle?: (value: number, count: number) => ReactNode;

    readonly onChange: (value: number) => void;
}

export declare interface BasicTab {
    value: string;
    renderItem: (selected: boolean, index: number) => ReactElement;
    // renderPanel?: () => ReactElement;
}

export declare interface BasicTabsProps extends BaseProps {
    readonly tabs: BasicTab[];
    readonly bordered?: boolean
    readonly value?: string;
    readonly direction?: Direction;
    readonly gap?: number;
    readonly onChange?: (tab: BasicTab) => void;
    readonly blocked?: boolean
}
