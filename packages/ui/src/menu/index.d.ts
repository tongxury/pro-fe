import { CSSProperties } from "react";

import { BaseProps, Direction, Option_ } from "../base";

export declare interface MenuOption extends Option_ {
    selectedStyle?: CSSProperties;
    unselectedStyle?: CSSProperties;
}

export declare interface MenuProps extends BaseProps {
    value: string;
    options: MenuOption[];
    onChange?: (option: MenuOption) => void;
    direction?: Direction;
}

export declare interface TextMenuProps extends MenuProps {
    gap?: number;
}
