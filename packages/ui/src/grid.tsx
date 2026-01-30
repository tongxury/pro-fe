import {CSSProperties, ReactNode} from "react";
import {Property} from "csstype";

export const Grid = ({gap = 10, columns = 2, style, children}: {
    gap?: Property.Gap<number | string>,
    columns?: number,
    style?: CSSProperties;
    children: ReactNode;
}) => {

    const gridTemplateColumns = [...Array(columns).keys()].map(() => "1fr").join(' ')

    return <div
        style={{
            display: "grid",
            gridTemplateColumns,
            gap,
            ...style
        }}
    >
        {children}
    </div>
}
