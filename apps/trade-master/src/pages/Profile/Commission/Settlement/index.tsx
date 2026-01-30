import {useXTheme, XDivider, XFlex, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";
import AmountView from "@/components/Amount";
import {useRequest} from "ahooks";
import {queryCommissionSettlementSummary} from "@/api/commission.ts";
import {cached} from "@/providers/request.ts";
import TokenView from "@/components/Views/Token";
import {Alert, Button, message} from "antd";
import Confirm from "@/components/Confirm";
import IconFont from "@/components/Iconfont";
import {withdraw} from "@/api/withdraw.ts";
import useAppRouter from "@/hooks/useAppRouter.ts";


function CommissionSettlement() {

    const {t} = useTranslation()

    const {themeVars, customVars} = useXTheme()

    const {data, run: refreshSummary} = useRequest<any, any>(queryCommissionSettlementSummary, {...cached('withdrawSummary')})


    const onWithdraw = (token: string) => {

        withdraw({token}).then(result => {
            if (result.code) {
                message.error({
                    content: t(result.code)
                })
            } else {
                message.success({
                    content: t('withdrawSuccess'),
                })

                refreshSummary()
            }
        })

    }

    const {routeToWithdrawHistory} = useAppRouter()


    return <XFlex vertical height={'100vh'}>


        <XFlex padding={15} align={'center'} justify={'space-between'}>

            <XText size={18}>{t('totalCommissionAmount')}</XText>
            <XFlex align={'center'} gap={10}>
                <AmountView data={data?.total} type={'u'}/>

                <XFlex align={'center'} gap={5} onClick={routeToWithdrawHistory}>
                    <IconFont size={15} name={'file-list-fill'} color={themeVars.colorTextL2}/>
                    <XText size={12} color={themeVars.colorTextL2}>{t('withdrawHistory')}</XText>
                </XFlex>
            </XFlex>
        </XFlex>

        <XFlex gap={10} vertical>
            <Alert style={{marginInline: 15}} type={'warning'} message={t('commissionNotification')}/>
            {
                data?.tokenStats?.map((x, i) => {
                    return <XFlex key={i} vertical margin={[0, 15, 0, 15]} gap={10}
                                  background={themeVars.colorBgContainerPrimary}
                                  borderRadius={10}
                                  padding={10}>

                        <XFlex align={'center'} justify={'space-between'} block padding={8}>
                            <TokenView data={x.token}/>
                            <AmountView data={x.total} type={'vu'}/>
                        </XFlex>

                        <XDivider/>
                        {
                            x.stats?.map((xx, ii) => {
                                return <XFlex key={ii}  gap={8} align={'center'} justify={'space-between'}>
                                    <XText size={12}
                                           color={themeVars.colorTextL2}>
                                        {t('commission_settlement_' + xx.status?.name)}
                                    </XText>
                                    <AmountView data={xx.amount} size={'sm'} type={'vu'}/>
                                </XFlex>
                            })
                        }

                        <Confirm
                            title={t('confirm')}
                            onConfirm={() => onWithdraw(x.token?._id)}
                            content={
                                <XFlex vertical>
                                    <XFlex gap={10}>
                                        <IconFont name={'information-fill'} color={customVars?.['color_danger']}/>
                                        <XText color={customVars?.['color_danger']}>
                                            {t('withdrawNotification', {minAmount: data?.settings?.threshold?.nativeValue})}
                                        </XText>
                                    </XFlex>
                                </XFlex>
                            }>
                            <Button type={'dashed'} shape={'round'}>{t('withdraw')}</Button>
                        </Confirm>
                    </XFlex>
                })
            }

        </XFlex>
    </XFlex>
}

export default CommissionSettlement;
