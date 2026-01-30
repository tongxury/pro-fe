import {CSSProperties} from "react";

import {useTheme} from "../provider";

function Divider({
                     direction = "horizontal",
                     color,
                     style
                 }: {
    orientationMargin?: number;
    direction?: "horizontal" | "vertical";
    color?: string;
    style?: CSSProperties;
}) {
    const {themeVars} = useTheme();

    return (
        direction === "horizontal" ?
            <div style={{width: '100%', margin: 0, height: 1, background: color || themeVars.colorDivider, ...style}}/>
            :
            <div style={{height: 10, margin: 0, width: 1, background: color || themeVars.colorDivider, ...style}}/>
    )

    // return (
    //     <AntDivider
    //         style={{ margin: 0, background: color || themeVars.colorDivider, ...style }}
    //         type={direction}
    //         orientationMargin={orientationMargin}
    //     />
    // );

    // return direction === "horizontal" ? (
    //     <div
    //         style={{
    //             height: w,
    //             marginBlock: m,
    //             // paddingInline: orientationMargin,
    //             // boxSizing: 'content-box',
    //             background: color || themeVars.colorTextL3,
    //             width: `calc(100% - ${orientationMargin}px)`
    //         }}
    //     />
    // ) : (
    //     <div
    //         style={{
    //             width: w,
    //             marginInline: m,
    //             // paddingBlock: orientationMargin,
    //             // boxSizing: 'content-box',
    //             background: color || themeVars.colorTextL3,
    //             height: `calc(100% - ${orientationMargin}px)`
    //         }}
    //     />
    // );
}

export default Divider;
