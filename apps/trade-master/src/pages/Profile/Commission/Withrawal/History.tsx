import {useXTheme, XFlex, XList, XText} from "@pro/ui";
import AmountView from "@/components/Amount";
import IconFont from "@/components/Iconfont";
import {useTranslation} from "react-i18next";
import {useRequest} from "ahooks";
import {queryWithdrawals} from "@/api/withdraw.ts";
import {Empty, Skeleton} from "antd";
import TokenView from "@/components/Views/Token";
import moment from "moment/moment";
import {formatTime} from "@pro/hooks";


function WithdrawHistory() {


    const {t} = useTranslation()
    const {themeVars, customVars} = useXTheme()

    const {data, loading} = useRequest<any, any>(() => queryWithdrawals({category: 'distributed'}), {})

    return <XFlex padding={15} vertical height={'100vh'} gap={15}>

        <XText size={18}>{t('withdrawHistory')}</XText>
        <XList
            dataSource={data?.list}
            renderItem={(x, index) => {
                return <XFlex padding={10} vertical gap={15} borderRadius={10}
                              style={{background: themeVars.colorBgContainerPrimary}}>
                    <XFlex align={'center'} justify={'space-between'}>
                        <TokenView data={x.token}/>
                        {/*<XText color={customVars?.['withdrawStatus_' + x.status?.name]}>*/}
                        {/*    {t('withdrawStatus_' + x.status?.name)}*/}
                        {/*</XText>*/}
                        <XText color={themeVars.colorTextL2}>
                            {formatTime(x.createdAt)}
                        </XText>
                    </XFlex>
                    <AmountView style={{marginInline: 'auto'}} data={x.amount} size={'md'}/>
                </XFlex>
            }}
            loading={loading}
            gap={10}
            skeleton={{
                count: 10,
                view: <Skeleton.Button block style={{height: 60}}/>
            }}
            empty={<Empty/>}
        />

    </XFlex>
}

export default WithdrawHistory;
