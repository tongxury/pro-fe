import { CSSProperties, ReactNode } from "react";

import { Option_ } from "../base";

export declare interface SelectorProps {
    value?: string | number | undefined;
    options: Option_[];
    renderItem: (option: Option_, selected: boolean, index: number) => ReactNode;
    onChange?: (option: Option_) => void;
    style?: CSSProperties;
}

export declare interface CardSelectorProps extends SelectorProps {}
