import {queryWalletPositions} from "@/api/wallet_position.ts";
import {useXTheme, XFlex, XList, XText} from "@pro/ui";
import {WalletPosition} from "@/types";
import {Checkbox, Descriptions, Empty, Skeleton} from "antd";
import AmountView from "@/components/Amount";
import {useTranslation} from "react-i18next";
import {useRequest} from "ahooks";
import {cached} from "@/providers/request.ts";
import useAppRouter from "@/hooks/useAppRouter.ts";
import TokenView from "@/components/Views/Token";
import useUsageSettings from "@/hooks/useUsageSetting.ts";

function PositionList({wallet}: { wallet: string }) {

    const {t} = useTranslation()

    const { themeVars, customVars} = useXTheme()
    const {settings: {hideSmallPosition}, setHideSmallPosition} = useUsageSettings()

    const {routeToExchange} = useAppRouter()

    const {data, loading} = useRequest<any, any>(
        () => wallet && queryWalletPositions({id: wallet, hideSmallPosition: !!hideSmallPosition}), {
            ...cached(`assetList`),
            refreshDeps: [hideSmallPosition]
        })

    return <XList
        title={
            <XFlex padding={[0, 15, 0, 15]} justify={'end'}>
                <Checkbox checked={hideSmallPosition}
                          onChange={e => setHideSmallPosition(e.target.checked)}>
                    <XText size={12} color={themeVars.colorTextL2}>{t('hideSmallPosition')}</XText>
                </Checkbox>
            </XFlex>
        }
        loading={!data?.list && loading}
        dataSource={data?.list}
        renderItem={(x: WalletPosition, index: number) => {
            return (
                <XFlex
                    key={index}
                    padding={[8, 15, 8, 15]}
                    align={'center'}
                >
                    <XFlex vertical gap={8}>

                        <div onClick={() => routeToExchange(x.token?._id)}>
                            <TokenView data={x.token} layout={'icon'}/>
                        </div>

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
                                        key: 'currentPosition',
                                        label: t('currentPosition'),
                                        children: <AmountView size={'sm'} type={'vu'} data={x.balance}/>
                                    },
                                    {
                                        key: 'currentPrice',
                                        label: t('currentPrice'),
                                        children: <AmountView size={'sm'} type={'u'} data={x.price}/>
                                    },
                                ]
                            }>
                        </Descriptions>
                        {/*<Button shape={'round'} block>{t('clearPosition')}</Button>*/}
                    </XFlex>
                </XFlex>

            )
        }}

        gap={10}
        skeleton={
            {
                count: 10,
                view:
                    <div style={{margin: '0px 15px 0px 15px'}}>
                        <Skeleton.Button style={{height: 50}} block/>
                    </div>
            }
        }
        split={
            <div style={{height: 5}}/>
        }
        empty={
            <Empty description={t('noData')}/>
        }
    />
}

export default PositionList;
