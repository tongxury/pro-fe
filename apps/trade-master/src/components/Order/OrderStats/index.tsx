import {XGrid, XOption, XText} from "@pro/ui";
import {Button, Drawer, Tabs} from "antd";
import {useTranslation} from "react-i18next";
import PositionList from "@/components/Position/List.tsx";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import HistoryOrderList from "../Lists/History";
import OngoingOrderList from "@/components/Order/Lists/Ongoing.tsx";
import TradeList from "@/components/Trade/List";
import {useRequest} from "ahooks";
import {queryOrderSummary} from "@/api/order.ts";
import {cached} from "@/providers/request.ts";


function OrderStats({activeTab, onChange}: { activeTab: string, onChange: (activeTab: string) => void }) {

    const {t} = useTranslation()
    const {wallet} = useDefaultWallet()

    // const [activeTab, setActiveTab] = useState<string>()

    const {data} = useRequest(queryOrderSummary, {
        ...cached("orderSummary"), refreshDeps: [activeTab]
    })


    const openDrawer = (option: XOption) => {
        // setActiveTab(option.value);
        onChange(option.value)
    }

    const options = [
        {
            value: 'currentOrders',
            count: data?.openOrderCount,
            component: <OngoingOrderList/>
        },
        {value: 'historyOrders', component: <HistoryOrderList/>},
        {value: 'tradeList', component: <TradeList/>},
        {value: 'myPositions', component: <PositionList wallet={wallet?._id}/>},
        // {value: 'myAssets', component: <AssetList wallet={defaultWallet?._id!}/>},
    ]

    return <>
        <XGrid columns={1} style={{padding: 15}}>
            {options.map((x: XOption, index: number) => (
                <Button size={'large'}
                        key={index}
                        block
                        onClick={() => openDrawer(x)}>
                    {t(x.value)} {x.count &&`(${x.count})`}
                </Button>
            ))}
        </XGrid>
        <Drawer destroyOnClose maskClosable
                onClose={() => onChange('')}
                closable={false} open={!!activeTab}
                placement={'bottom'} height={'90%'}
                styles={{content: {borderRadius: 10}, body: {paddingInline: 0}}}>
            <Tabs
                centered
                // onClick={() => onChange('')}
                destroyInactiveTabPane
                activeKey={activeTab}
                onTabClick={activeKey => onChange(activeKey)}
                items={
                    options.map((x: XOption) => ({
                            key: x.value, label: t(x.value), children: x.component
                        })
                    )
                }
            />
        </Drawer>
    </>

}

export default OrderStats
