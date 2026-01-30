import {DOMAttributes, ReactNode} from "react";
import {Direction} from "../base";

export declare type IconTextProps = {
    icon: ReactNode;
    title: string | ReactNode;
    direction?: Direction;
    gap?: number;
};

function IconText({icon, title, direction = "column", gap = 8, onClick}: IconTextProps & DOMAttributes<any>) {


    return (
        <div
            style={{
                display: "flex",
                flexDirection: direction,
                alignItems: "center",
                gap,
                cursor: onClick ? "pointer" : "default"
            }}
        >
            <div>{icon}</div>
            <div>{title}</div>
        </div>
    );
}

export default IconText;
