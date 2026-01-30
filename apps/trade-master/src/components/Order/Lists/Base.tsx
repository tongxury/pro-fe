import {cancelOrder, queryOrders} from "@/api/order.ts";
import {XDivider, XList} from "@pro/ui";
import {Order} from "@/types";
import {Empty, message, Skeleton} from "antd";
import MarketOrderView from "@/components/Order/MarketOrderView.tsx";
import LimitOrderView from "@/components/Order/LimitOrderView.tsx";
import {useTranslation} from "react-i18next";
import {useRequest} from "ahooks";
import {cached} from "@/providers/request.ts";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";

function OrderList({category}: { category: 'ongoing' | 'history' }) {

    const {t} = useTranslation()

    const {wallet} = useDefaultWallet()

    const {data, loading, refresh} = useRequest<any, any>(() => queryOrders({category}), {
        ...cached(`${wallet?._id}:orderList:${category}`)
    })

    const onCancelOrder = (order: Order) => {
        cancelOrder({id: order._id}).then(result => {
            message.open({
                type: result.code ? 'error' : 'success',
                content: result.code ? t(result.code) : t('limitOrderCancelSuccess'),
                duration: 1
            }).then()
            refresh()
        })
    }

    return <XList
        // loading={loading}
        dataSource={data?.list}
        renderItem={(x: Order, index: number) => {
            if (x.category === 'market_quick' || x.category === 'market') {
                return <MarketOrderView key={index} x={x}/>
            }
            return <LimitOrderView key={index} x={x} onCancel={onCancelOrder}/>
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

export default OrderList;
