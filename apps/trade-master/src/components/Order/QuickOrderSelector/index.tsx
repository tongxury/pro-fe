import {Side, Token} from "@/types";
import {CSSProperties} from "react";
import {useXTheme, XFlex, XOption, XSelector} from "@pro/ui";
import {Button} from "antd";
import MarketOrderSubmitter from "@/components/Order/Submitter/MarketOrderSubmitter.tsx";
import useCurrentChain from "@/hooks/useCurrentChain.ts";

const defaultBuyOptions = [
    {value: 0.1,},
    {value: 0.5,},
    {value: 1,},
    {value: 3,},
    {value: 10,},
    {value: 20,},
]

const defaultSellOptions = [
    {value: 0.25,},
    {value: 0.50,},
    {value: 0.75,},
    {value: 1,},
]

function QuickOrderSelector(
    {
        amountOptions = {buy: defaultBuyOptions, sell: defaultSellOptions},
        value,
        onSelect,
        token,
        side,
        following,
        style
    }: {
        amountOptions?: {
            buy?: XOption[],
            sell?: XOption[],
        }
        value?: string
        onSelect: (side: Side, option: XOption) => void,
        token: Token,
        // quoteToken?: Token,
        side: Side,
        following?: any,
        style?: CSSProperties
    }) {


    const {customVars} = useXTheme()

    const {chain} = useCurrentChain()


    const options = side === 'buy' ?
        amountOptions?.buy.map((option) => ({
            ...option,
            label: `${option.value} ${chain?.nativeToken?.metadata?.symbol || ''}`
        })) :
        amountOptions?.sell?.map((option) => ({
            ...option,
            label: `${option.value * 100}%`
        }))

    return <XFlex vertical justify="space-between" style={style}>
        <XSelector
            style={{
                display: "grid",
                gridTemplateColumns: [...Array(options.length / 2).keys()].map(() => "1fr").join(' '),
            }}
            options={options}
            value={value}
            onChange={(option) => onSelect(side, option)}
            renderItem={(option, selected, index) => {
                return <MarketOrderSubmitter
                    params={{
                        token, side, amount: option.value, category: 'market_quick', following
                    }}>
                    <Button shape={'round'} block size={'small'} type={'primary'}
                            style={{background: customVars?.['color_' + side]}}
                            key={index}>
                        {option.label}
                    </Button>
                </MarketOrderSubmitter>

            }}
        />

    </XFlex>
}

export default QuickOrderSelector;
