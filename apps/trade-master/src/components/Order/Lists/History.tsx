import {useTranslation} from "react-i18next";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import {useRequest} from "ahooks";
import {cancelOrder, queryOrders} from "@/api/order.ts";
import {cached} from "@/providers/request.ts";
import {Order} from "@/types";
import {Checkbox, Empty, message, Skeleton} from "antd";
import {useXTheme, XDivider, XFlex, XList, XText} from "@pro/ui";
import MarketOrderView from "@/components/Order/MarketOrderView.tsx";
import LimitOrderView from "@/components/Order/LimitOrderView.tsx";
import useUsageSettings from "@/hooks/useUsageSetting.ts";


function HistoryOrderList() {

    const {t} = useTranslation()
    const {themeVars} = useXTheme()

    const {wallet} = useDefaultWallet()

    const {settings: {hideFailedOrder}, setHideFailedOrder} = useUsageSettings()

    const {data, loading, refresh} = useRequest<any, any>(
        () => queryOrders({category: 'history', hideFailedOrder: !!hideFailedOrder }),
        {
            refreshDeps: [hideFailedOrder],
            ...cached(`${wallet?._id}:orderList:history`)
        })


    return <XList
        // title={
        //     <XFlex padding={[0, 15, 0, 15]} justify={'end'}>
        //         <Checkbox checked={hideFailedOrder} onChange={e => setHideFailedOrder(e.target.checked)}>
        //             <XText size={12} color={themeVars.colorTextL2}>{t('hideFailedOrder')}</XText>
        //         </Checkbox>
        //     </XFlex>
        // }
        dataSource={data?.list}
        renderItem={(x: Order, index: number) => {
            if (x.category === 'market_quick' || x.category === 'market') {
                return <MarketOrderView key={index} x={x}/>
            }
            return <LimitOrderView key={index} x={x}/>
        }}
        skeleton={{
            count: 10, view: <div style={{margin: '6px 15px 6px 15px'}}>
                <Skeleton.Button style={{height: 50}} block/>
            </div>
        }}
        split={<XDivider/>}
        empty={<Empty description={t('noData')}/>}
    />
}

export default HistoryOrderList;
