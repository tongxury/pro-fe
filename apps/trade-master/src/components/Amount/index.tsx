import {Amount} from "@/types";
import {useXTheme, XFlex, XSize, XText} from "@pro/ui";
import {shortenDecimal} from "@pro/chain";
import Change from "@/components/Change";
import {CSSProperties, useMemo} from "react";

/*
 n: nativeValue
 u: usdtValue
 v: value
 */

function AmountView({data, size = 'md', vertical, type = 'un', style}: {
    data?: Amount,
    size?: XSize,
    vertical?: boolean
    type?: 'nu' | 'un' | 'vu' | 'u' | 'v' | 'uv',
    style?: CSSProperties
}) {

    const {themeVars} = useXTheme()

    const config = {
        'lg': {size: 35, subSize: 20},
        'md': {size: 25, subSize: 16},
        'sm': {size: 13, subSize: 13},
    }[size]


    const usdValueText = useMemo(() => `$${shortenDecimal(data?.usdtValue, {fixed: 6})}`, [data]);
    const valueText = useMemo(() => `${shortenDecimal(data?.value, {fixed: 4})} ${data?.valueUnit || ''}`, [data]);
    const nativeValueText = useMemo(() => `${shortenDecimal(data?.usdtValue, {fixed: 4})}`, [data]);

    const renderBody = () => {
        switch (type) {
            case "vu":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{valueText}</XText>
                    <XText size={config.subSize} color={themeVars.colorTextL2}>≈ {usdValueText} </XText>
                </XFlex>
            case "uv":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{usdValueText} </XText>
                    <XText size={config.subSize} color={themeVars.colorTextL2}>{valueText}</XText>
                </XFlex>
            case "nu":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{nativeValueText} </XText>
                    <XText size={config.subSize} color={themeVars.colorTextL2}>{usdValueText} </XText>
                </XFlex>
            case 'un':
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{usdValueText} </XText>
                    <XText size={config.subSize} color={themeVars.colorTextL2}>{nativeValueText} </XText>
                </XFlex>

            case "v":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{valueText}</XText>
                </XFlex>

            case "u":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{usdValueText} </XText>
                </XFlex>

        }


    }

    return <div style={style}>
        {renderBody()}
    </div>
}

export default AmountView;
