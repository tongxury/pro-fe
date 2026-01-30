import {useXTheme, XFlex, XText} from "@pro/ui";
import {useState} from "react";
import {Spin} from "antd";
import {Order} from "@/types";
import IconFont from "@/components/Iconfont";
import OrderStats from "@/components/Order/OrderStats";
import {useTranslation} from "react-i18next";
import OrderSettings from "@/components/Order/Settings";
import {shortenDecimal} from "@pro/chain";
import DrawerTrigger from "@/components/DrawerTrigger";
import TokenSearcher from "@/components/Token/Searcher";
import useTradingToken from "@/pages/Trade/useTradingToken.ts";
import {useRequest} from "ahooks";
import {cached} from "@/providers/request.ts";
import OrderBook from "@/components/Token/OrderBook";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {queryToken} from "@/api/token.ts";
import TokenView from "@/components/Views/Token";
import ChangeView from "@/components/ChangeView";
import TradePanel from "@/pages/Trade/Panel.tsx";


function Trade() {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()
    const {routeToPoolProfile} = useAppRouter()

    const {id, loading: tokenIdLoading} = useTradingToken()

    const {data: token, loading: tokenLoading} =
        useRequest<any, any>(() => id && queryToken({id}),
            {
                ...cached('tradingPool'),
                pollingInterval: 5000,
                refreshDeps: [id]
            })

    const [activeTab, setActiveTab] = useState<string | undefined>()

    const onSuccess = (order: Order) => {
        if (order?.category === 'limit') {
            setActiveTab('currentOrders')
        } else {
            setActiveTab('tradeList')
        }
    }

    return <Spin spinning={tokenIdLoading || (tokenLoading && !token?._id)}>
        <XFlex vertical height={`calc(100vh - ${customVars?.bottomMenuHeight}px)`}
               style={{background: themeVars.colorBgPrimary}}>
            <XFlex align={'center'} justify={'space-between'} padding={[10, 15, 10, 15]}>
                {/* token 切换 */}
                <TokenSearcher>
                    <XFlex align={'center'} gap={3}>
                        <TokenView layout={'icon'} data={token} size={'sm'}/>
                        <IconFont name={'arrow-drop-down-fill'} color={themeVars.colorTextPrimary} size={25}/>
                    </XFlex>
                </TokenSearcher>
                {/* 交易设置  */}
                <XFlex align={'center'} gap={15}>
                    <DrawerTrigger
                        title={t('orderSettings')}
                        trigger={<IconFont name={'settings-fill'} color={themeVars.colorTextPrimary}/>}>
                        <OrderSettings/>
                    </DrawerTrigger>

                    <IconFont onClick={() => routeToPoolProfile(id)} name={'stock-fill'}
                              color={themeVars.colorTextPrimary}/>
                </XFlex>
            </XFlex>
            <XFlex padding={[10, 15, 10, 15]} gap={15}>
                {/* 交易面板 */}
                <XFlex flex={2}>
                    <TradePanel token={token} onSuccess={onSuccess}/>
                </XFlex>
                {/* 交易信息 */}
                <XFlex vertical gap={10} align={'center'} flex={1}>
                    <XFlex center vertical gap={3} borderRadius={10} bordered padding={10}>
                        <XText size={12} color={themeVars.colorTextL2}>{t('currentCap')}(USD)</XText>
                        <XText
                            size={20}>${shortenDecimal(token?.price?.usdtValue * token?.supply?.value, {fixed: 2})}</XText>
                    </XFlex>
                    <XText size={20}>${shortenDecimal(token?.price?.usdtValue)}</XText>
                    <ChangeView value={token?.ohlcStates?.['24h']?.changeRate}/>
                    <OrderBook tokenId={id}/>
                </XFlex>
            </XFlex>
            {/* 交易记录 */}
            <OrderStats activeTab={activeTab} onChange={value => setActiveTab(value)}/>
        </XFlex>
    </Spin>
}

export default Trade;
