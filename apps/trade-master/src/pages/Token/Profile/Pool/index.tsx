import {useXTheme, XFlex, XImage, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";
import {useRequest} from "ahooks";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {useMemo} from "react";
import {Token} from "@/types";
import {Button, Skeleton} from "antd";
import AmountView from "@/components/Amount";
import {queryTokenPool} from "@/api/token.ts";
import TokenView from "@/components/Views/Token";

function TokenPool({id}: { id: string }) {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const {data, loading} = useRequest<any, any>(() => queryTokenPool({id}), {refreshDeps: [id]})

    const {routeToExchange} = useAppRouter()

    const token = useMemo<Token>(() => data?.token, [data]);
    const quoteToken = useMemo<Token>(() => data?.quoteToken, [data]);

    if (loading) {
        return <XFlex vertical gap={15}>
            <Skeleton.Input active/>
            <Skeleton.Button block style={{height: 80}}/>
        </XFlex>
    }

    return <XFlex vertical>
        <XFlex vertical flex={1} style={{overflowY: 'scroll'}} gap={15}>
            <XText color={themeVars.colorTextL1}>{t('tokenInfo')}</XText>
            <TokenView data={token} layout={'iconAddress'} size={'sm'}/>
            {/* 流动性池 */}
            <XText color={themeVars.colorTextL1}>{t('liquidityPool')}</XText>
            <XFlex vertical borderRadius={10} gap={10} padding={15} background={themeVars.colorBgContainerPrimary}>
                <XFlex align={'center'} justify={'space-between'}>
                    <XText color={themeVars.colorTextL2} size={13}>{t('token')}</XText>
                    <XText color={themeVars.colorTextL2} size={13}>{t('amount')}</XText>
                    <XText color={themeVars.colorTextL2} size={13}>{t('marketPrice')}</XText>
                </XFlex>
                <XFlex align={'center'} justify={'space-between'}>
                    <XFlex align={'center'} gap={8}>
                        <XImage circle src={token?.metadata?.image}/>
                        <XText size={16}>{token?.metadata?.symbol}</XText>
                    </XFlex>
                    <AmountView data={token?.balance} type={'v'} size={'sm'}/>
                    <AmountView data={{usdtValue: token?.balance?.value * token?.price?.usdtValue}} type={'u'}
                                size={'sm'}/>
                </XFlex>
                <XFlex align={'center'} justify={'space-between'}>
                    <XFlex align={'center'} gap={8}>
                        <XImage circle src={quoteToken?.metadata?.image}/>
                        <XText size={16}>{quoteToken?.metadata?.symbol}</XText>
                    </XFlex>
                    <AmountView data={quoteToken?.balance} type={'v'} size={'sm'}/>
                    <AmountView data={{usdtValue: quoteToken?.balance?.value * quoteToken?.price?.usdtValue}} type={'u'}
                                size={'sm'}/>
                </XFlex>
            </XFlex>
        </XFlex>
    </XFlex>
}

export default TokenPool;
