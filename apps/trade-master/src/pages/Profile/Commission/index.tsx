import {useXTheme, XFlex, XGrid, XText} from "@pro/ui";
import InviteInfo from "@/components/Invite/InviteInfo";
import {useTranslation} from "react-i18next";
import IconFont from "@/components/Iconfont";
import {useRequest} from "ahooks";
import {cached} from "@/providers/request.ts";
import AmountView from "@/components/Amount";
import {queryCommissionSummary} from "@/api/commission.ts";
import Tips from "@/components/Tips";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {Skeleton, Spin} from "antd";


function Commission() {

    const {t} = useTranslation()
    const {themeVars, customVars} = useXTheme()


    const boxStyle = {
        border: '1px solid ' + themeVars.colorBorder,
        borderRadius: 10,
        gap: 5,
        padding: 15,
    }

    const {data, loading} = useRequest(queryCommissionSummary, {...cached('commissionSummary')})

    const {routeToWithdraw} = useAppRouter()

    if (loading && Object.keys(data)?.length == 0) {
        return <XFlex padding={15} vertical gap={10}>
            <Skeleton.Button/>
            <Skeleton.Button style={{height: 300}} block/>
            <Skeleton.Button style={{height: 300}} block/>
            <Skeleton.Button style={{height: 300}} block/>
        </XFlex>
    }

    return <Spin spinning={loading && Object.keys(data)?.length == 0}>
        <XFlex vertical padding={15} gap={15} style={{height: '100vh'}}>
            <XText size={18}>{t('summary')}</XText>
            <XFlex vertical padding={15} style={boxStyle}>
                <XText size={30}>{data?.commissionRate * 100 || 0}%</XText>
                <XText size={13} color={themeVars.colorTextL2}>{t('commissionRate')}  </XText>
            </XFlex>
            <XGrid>
                <XFlex vertical style={boxStyle}>
                    <IconFont size={26} name={'money-dollar-circle-fill'} color={customVars.color_buy}/>
                    <AmountView data={data?.totalCommissionAmount} type={'u'}/>
                    <XFlex align={'center'} justify={'space-between'} onClick={routeToWithdraw}>
                        <XFlex align={'center'} gap={3}>
                            <XText size={13} color={themeVars.colorTextL2}>{t('totalCommissionAmount')}  </XText>
                            <Tips title={t('commissionRule')} content={t('commissionRuleText')}/>
                        </XFlex>
                        <IconFont color={themeVars.colorTextL2} name={'arrow-right-s-line'}/>
                    </XFlex>
                </XFlex>
                <XFlex vertical style={boxStyle}>
                    <IconFont size={26} name={'money-dollar-circle-fill'} color={themeVars.colorPrimary}/>
                    <AmountView data={data?.totalTransactionAmount} type={'u'}/>
                    <XText size={13} color={themeVars.colorTextL2}>{t('totalCommissionTransactionAmount')}  </XText>
                </XFlex>
                <XFlex vertical style={boxStyle}>
                    <IconFont size={26} name={'group-fill'} color={customVars.color_buy}/>
                    <XText size={30}>{data?.validInviteUserCount || 0}</XText>
                    <XText size={13} color={themeVars.colorTextL2}>{t('inviteTransactionUserCount')}  </XText>
                </XFlex>
                <XFlex vertical style={boxStyle}>
                    <IconFont size={26} name={'group-fill'} color={themeVars.colorPrimary}/>
                    <XText size={30}>{data?.inviteUserCount || 0}</XText>
                    <XText size={13} color={themeVars.colorTextL2}>{t('inviteUserCount')}  </XText>
                </XFlex>

            </XGrid>

            <XText size={18}>{t('inviteUrl')}</XText>
            <XFlex vertical padding={15} gap={20} style={boxStyle}>
                <InviteInfo/>
            </XFlex>
        </XFlex>
    </Spin>

}

export default Commission;
