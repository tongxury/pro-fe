import {BasicTab, BasicTabsProps} from "./types";
import {ReactElement, useMemo, useState} from "react";
import {useXTheme} from "../index";

function BasicTabs({value, bordered, blocked, tabs, direction = "row", gap = 10, onChange, style}: BasicTabsProps) {


    const {themeVars} = useXTheme()

    const [current, setCurrent] = useState<BasicTab>(tabs[0]!)

    const selected = value || current?.value

    const change = (value: BasicTab) => {
        (onChange || setCurrent)(value)
    }


    return (
        <div style={{
            ...(bordered ? {
                border: '1px solid ' + themeVars.colorBorder,
                borderRadius: 10,
                // padding: 10,
            } : {})
        }}>
            <div
                style={{
                    // padding: 10,
                    display: "flex",
                    flexDirection: direction,
                    alignItems: "center",
                    overflowX: 'scroll',
                    width: blocked ? "100%" : undefined,
                    // justifyContent: 'space-around',
                    gap,
                    ...style
                }}>
                {tabs.map((tab, index) => {
                    const view =
                        tab.renderItem(tab
                            .value === selected, index) as ReactElement

                    return (
                        <div key={index}
                             style={{
                                 width: blocked ? "100%" : undefined,
                                 cursor: "pointer"
                             }}
                             onClick={() => change?.(tab)}>
                            {view}
                        </div>
                    );
                })}
            </div>
            {/*{tabs.map((tab, index) => {*/}
            {/*    return tab.renderPanel?.()*/}
            {/*})}*/}
        </div>

    );
}

export default BasicTabs;
