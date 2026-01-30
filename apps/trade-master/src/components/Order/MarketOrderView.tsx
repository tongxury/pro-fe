import {useXTheme, XFlex, XTag, XText} from "@pro/ui";
import {Descriptions} from "antd";
import AmountView from "@/components/Amount";
import {TXHash} from "@pro/chain";
import {Order} from "@/types";
import {useTranslation} from "react-i18next";
import TokenView from "@/components/Views/Token";
import {formatTime, formatTimeFromNow} from "@pro/hooks";
import useLaunchValues from "@/hooks/useLaunchParams.ts";

function MarketOrderView({x}: { x: Order }) {

    const {t} = useTranslation()

    const {themeVars, customVars} = useXTheme()

    const {locale} = useLaunchValues()

    return <XFlex
        padding={[8, 15, 8, 15]}
        align={'center'}
    >

        <XFlex vertical gap={10}>
            <TokenView data={x.token} layout={'icon'}/>
            <XFlex align={'center'} gap={8}>
                <XTag size={'sm'}
                      bgColor={customVars?.['color_bg_' + x.side]}
                      textColor={customVars?.['color_' + x.side]}>
                    {t(x.category)}
                </XTag>
                <XTag size={'sm'}
                      bgColor={customVars?.['color_bg_' + x.side]}
                      textColor={customVars?.['color_' + x.side]}>
                    {t(x.side)}
                </XTag>
                <XText size={10} color={customVars?.['color_' + x.status]}>{t(x.status)}</XText>

            </XFlex>
            <Descriptions
                column={2}
                colon={false}
                size={'small'}
                labelStyle={{color: themeVars.colorTextL2}}
                contentStyle={{color: themeVars.colorTextPrimary}}
                layout={'vertical'}
                items={
                    [
                        {
                            key: 'price',
                            label: t('price'),
                            children: <AmountView size={'sm'} type={'u'} data={x.price}/>
                        },
                        {
                            key: 'time',
                            label: t('time'),
                            children: formatTimeFromNow(x.createdAt, locale),
                        },
                        {
                            key: 'orderVolume',
                            label: `${t('orderVolume')}(${x.quoteToken?.metadata?.symbol})`,
                            children: <AmountView size={'sm'} type={'v'} data={x.quoteAmount}/>,
                        },
                        {
                            key: 'orderAmount',
                            label: `${t('orderAmount')}`,
                            // children: shortenDecimal(x.amount * (x.price?.usdtValue || 0)) ,
                            children: <AmountView
                                size={'sm'} type={'u'}
                                data={{usdtValue: x.amount?.usdtValue || x.quoteAmount?.usdtValue }}/>,
                        },
                        {
                            key: 'transactionHash',
                            span: 1,
                            label: `${t('transactionHash')}`,
                            children: <TXHash value={x.tx}/>,
                        },
                    ]
                }>
            </Descriptions>
        </XFlex>
    </XFlex>
}

export default MarketOrderView;
