import {useXTheme, XOption, XText} from "..";
import BasicTabs from "./BasicTabs";
import {CSSProperties} from "react";


function TextTabs({options, value, onChange, style}: {
    options: XOption[],
    value: string,
    onChange: (value: string) => void,
    style?: CSSProperties
}) {

    const {themeVars} = useXTheme()

    return <BasicTabs
        style={{overflowX: 'scroll', width: '100%', ...style}}
        tabs={
            options.map((x) => ({
                value: x.value,
                renderItem: (selected: boolean, index: number) => {
                    return <XText key={index} bold={selected}
                                  color={selected ? themeVars.colorTextPrimary : themeVars.colorTextL1}>
                        {x.label}
                    </XText>
                }
            }))
        }
        value={value}
        onChange={x => onChange(x.value)}
    >
    </BasicTabs>
}

export default TextTabs;
