import {useXTheme, XBasicTabs, XFlex, XGrid, XText} from "@pro/ui";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useRequest} from "ahooks";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {Button, Progress, Skeleton} from "antd";
import {queryToken} from "@/api/token.ts";
import TokenView from "@/components/Views/Token";
import Follow from "@/components/Token/actions/Follow.tsx";
import AmountView from "@/components/Amount";
import ChangeView from "@/components/ChangeView";
import {formatTimeFromNow} from "@pro/hooks";
import useLaunchValues from "@/hooks/useLaunchParams.ts";
import {safeNumber, shortenDecimal} from "@pro/chain";
import {useMemo, useState} from "react";

function TokenProfile() {

    const {id} = useParams()
    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()
    const {locale} = useLaunchValues()

    const {data, loading} = useRequest<any, any>(() => queryToken({
        id,
        tradeStateDurations: '5m,1h,6h,24h',
        ohlcStateDurations: '5m,1h,6h,24h'
    }), {
        pollingInterval: 2000,
        refreshDeps: [id]
    })

    const [tab, setTab] = useState<string>('5m')

    const panelData = useMemo(() => {
        return data?.tradeStates?.[tab]
    }, [data, tab])

    const {routeToExchange} = useAppRouter()

    if (loading && !data) {
        return <XFlex vertical padding={15} gap={15} height={'100vh'}>
            <Skeleton.Button block style={{height: 60}}/>
            <Skeleton.Button block style={{height: 200}}/>
            <Skeleton.Button block style={{height: 200}}/>
            <Skeleton.Button block style={{height: 200}}/>
        </XFlex>
    }

    const D = ({total, left, right}: { total, left, right }) => {
        return <XFlex gap={10}>
            <XFlex flex={1}>
                <XFlex vertical gap={8} style={{}}>
                    <XText color={themeVars.colorTextL2}>{total.label}</XText>
                    <XText>{total.prefix}{shortenDecimal(total.value)}</XText>
                </XFlex>
            </XFlex>

            <XFlex flex={3} vertical block>
                <XFlex align={'center'} justify={'space-between'}>
                    <XFlex vertical gap={8}>
                        <XText color={themeVars.colorTextL2}>{left.label}</XText>
                        <XText>{left.prefix}{shortenDecimal(left.value)}</XText>

                    </XFlex>
                    <XFlex vertical gap={8}>
                        <XText color={themeVars.colorTextL2}>{right.label}</XText>
                        <XText>{right.prefix}{shortenDecimal(right.value)}</XText>
                    </XFlex>
                </XFlex>
                <Progress
                    strokeLinecap={'square'}
                    percent={left.value / (left.value + right.value) * 100}
                    strokeColor={customVars?.['color_buy']}
                    trailColor={customVars?.['color_sell']}
                    showInfo={false}
                />
            </XFlex>

        </XFlex>
    }

    return <XFlex vertical padding={15} gap={20} style={{height: '100vh'}}>

        <XFlex vertical flex={1} gap={20}>
            {/* 基本信息 */}
            <XFlex align={'flex-start'} justify={'space-between'}>
                <TokenView data={data} layout={'iconAddress'} size={'sm'}/>
                <Follow tokenId={data?._id} following={data?.walletStates?.following}/>
            </XFlex>

            <XGrid gap={20}>
                {[
                    {
                        title: t('price'),
                        value: <AmountView size={"sm"} type={'u'} data={data?.price}/>
                    },
                    // {
                    //     title: t('priceWithUnit', {unit: 'SOL'}),
                    //     value: <AmountView type={'v'} size={"sm"} data={data?.price}/>
                    // },
                    // {
                    //     title: t('age'),
                    //     value: <XText>{formatTimeFromNow(data?.createdAt, locale)}</XText>
                    // },
                    {
                        title: t('marketCap'),
                        value: <AmountView
                            size={"sm"}
                            data={{usdtValue: (data?.supply?.value || 0) * (data?.price?.usdtValue || 0)}}
                            type={'u'}
                        />
                    },
                    // {title: t('fdv'), value: <AmountView size={"sm"} data={data?.fdv} type={'u'}/>},
                    // {title: t('liquidity'), value: <AmountView size={"sm"} data={data?.liquidity} type={'v'}/>},
                ].map((x, i) => (
                    <XFlex key={i} vertical gap={8} style={{}}>
                        <XText color={themeVars.colorTextL2}>{x.title}</XText>
                        {x.value}
                    </XFlex>
                ))}

            </XGrid>

            <XBasicTabs
                bordered
                blocked
                value={tab}
                onChange={(tab) => setTab(tab.value)}
                tabs={
                    [
                        {name: '5m',},
                        // {name: '1h',},
                        // {name: '6h',},
                        {name: '24h'},
                    ]
                        .map((x) => (
                            {
                                value: x.name,
                                renderItem: (selected) => (
                                    <XFlex vertical center height={60}
                                           style={{background: selected ? themeVars.colorBgContainerPrimary : undefined}}>
                                        <XText size={12}>{x.name} </XText>
                                        <ChangeView value={data?.ohlcStates?.[x.name]?.changeRate}/>
                                    </XFlex>
                                ),
                            }
                        ))
                }
            />
            <XFlex vertical block gap={20} padding={10}
                   style={{borderRadius: 10, border: '1px solid ' + themeVars.colorBorder}}>
                <D
                    total={{
                        value: parseInt((panelData?.buyVolume?.usdtValue || 0) + (panelData?.sellVolume?.usdtValue || 0)),
                        label: t('volume'),
                        prefix: '$'
                    }}
                    left={{
                        value: parseInt(panelData?.buyVolume?.usdtValue || 0),
                        label: t('buyVolume'),
                        prefix: '$'
                    }}
                    right={{
                        value: parseInt(panelData?.sellVolume?.usdtValue || 0),
                        label: t('sellVolume'),
                        prefix: '$'
                    }}
                />
                <D
                    total={{
                        value: (panelData?.buyCount || 0) + (panelData?.sellCount || 0),
                        label: t('txCount'),
                    }}
                    left={{
                        value: panelData?.buyCount,
                        label: t('buyTxCount')
                    }}
                    right={{
                        value: panelData?.sellCount,
                        label: t('sellTxCount')
                    }}
                />

                <D
                    total={{
                        value: safeNumber(panelData?.buyerCount) + safeNumber(panelData?.sellerCount),
                        label: t('numTraders')
                    }}
                    left={{
                        value: safeNumber(panelData?.buyerCount),
                        label: t('numBuyers')
                    }}
                    right={{
                        value: safeNumber(panelData?.sellerCount),
                        label: t('numSellers')
                    }}
                />
            </XFlex>
        </XFlex>

        <Button size={'large'} onClick={() => routeToExchange(data?._id)} type={'primary'}>{t('toExchange')}</Button>
    </XFlex>
}

export default TokenProfile;
