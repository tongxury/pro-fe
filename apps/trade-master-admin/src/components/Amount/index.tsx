import {Amount} from "@/types";
import {useXTheme, XFlex, XSize, XText} from "@pro/ui";
import {shortenDecimal} from "@pro/chain";
import Change from "@/components/Change";
import {CSSProperties} from "react";

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

    // if (!data) return <></>

    const renderBody = () => {

        switch (type) {
            case "vu":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText
                        size={config.size}>{shortenDecimal(data?.value || 0, {fixed: 3})} {data?.valueUnit || ''}</XText>

                    <XText size={config.subSize}
                           color={themeVars.colorTextL2}>≈ ${shortenDecimal(data?.usdtValue)} </XText>
                </XFlex>
            case "uv":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>${shortenDecimal(data?.usdtValue || 0, {fixed: 3})} </XText>
                    <XText size={config.subSize}
                           color={themeVars.colorTextL2}>{shortenDecimal(data?.value)} {data?.valueUnit || ''}</XText>
                </XFlex>
            case "nu":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{shortenDecimal(data?.nativeValue || 0)} </XText>
                    {
                        data?.usdtValue &&
                        <XText size={config.subSize}
                               color={themeVars.colorTextL2}>${shortenDecimal(data?.usdtValue)} </XText>
                    }

                </XFlex>
            case 'un':
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>${shortenDecimal(data?.usdtValue || 0)} </XText>
                    <XText size={config.subSize}
                           color={themeVars.colorTextL2}>{shortenDecimal(data?.nativeValue)} </XText>
                </XFlex>

            case "v":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>{shortenDecimal(data?.value || 0)} {data?.valueUnit || ''}</XText>
                </XFlex>

            case "u":
                return <XFlex align={'baseline'} gap={5} vertical={vertical}>
                    <XText size={config.size}>${shortenDecimal(data?.usdtValue || 0, {fixed: 3})} </XText>
                    {data?.diffBetween &&
                        <Change data={data}/>
                    }
                </XFlex>

        }


    }

    return <div style={style}>
        {renderBody()}
    </div>
}

export default AmountView;
