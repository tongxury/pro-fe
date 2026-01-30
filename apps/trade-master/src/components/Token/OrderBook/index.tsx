import {useXTheme, XFlex, XText} from "@pro/ui";
import {useRequest} from "ahooks";
import {queryTokenActivities} from "@/api/activity.ts";
import {Trade} from "@/types";
import {shortenDecimal} from "@pro/chain";
import {CSSProperties} from "react";
import {useTranslation} from "react-i18next";
import {cached} from "@/providers/request.ts";


function OrderBook({tokenId, style}: { tokenId: string, style?: CSSProperties }) {

    const {customVars, themeVars} = useXTheme()
    const {t} = useTranslation()

    const {data} = useRequest<any, any>(
        () => queryTokenActivities({token: tokenId}),
        {
            ...cached('orderBook'),
            pollingInterval: 2000,
            refreshDeps: [tokenId]
        })

    // useInterval(run, 5000,)

    return <XFlex vertical block style={{...style}} gap={6}>
        <XFlex align={'center'} justify={'space-between'} gap={15}>
            <XText size={10} color={themeVars.colorTextL2}>{t('price')}(USD)</XText>
            <XText size={10} color={themeVars.colorTextL2}>{t('amount')}(USD)</XText>
        </XFlex>
        <XFlex vertical block gap={6} style={{height: 300, overflowY: 'scroll', scrollbarWidth: 'none'}}>
            {
                data?.list?.map((x: Trade, i: number) => {
                    return <XFlex key={i} align={'center'} justify={'space-between'} gap={15}>
                        <XText size={12} color={customVars?.['color_' + x.side]}>
                            {shortenDecimal(x.price?.usdtValue || 0, {fixed: 3, maxZeros: 3})}
                        </XText>
                        <XText size={12}>{shortenDecimal(x.amount?.usdtValue || 0, {fixed: 3})}</XText>
                    </XFlex>
                })
            }
        </XFlex>
    </XFlex>
}

export default OrderBook;
