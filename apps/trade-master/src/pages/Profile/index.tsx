import {useXTheme, XFlex, XText} from "@pro/ui";
import Iconfont, {IconNames} from "@/components/Iconfont";
import {useTranslation} from "react-i18next";
import useAppRouter from "@/hooks/useAppRouter.ts";
import packageJson from "../../../package.json";
import {CUSTOMER_SERVICE_TG} from "@/contants.ts";
import {ReactNode} from "react";
import {Typography} from "antd";


function Profile() {

    const {t} = useTranslation()

    const Settings = ({icon, title, right, routeTo}: {
        icon: string,
        title: string,
        right?: ReactNode,
        routeTo?: string
    }) => {

        const {themeVars} = useXTheme()

        const {routeTo: navTo} = useAppRouter()

        return <XFlex padding={15} align={'center'} justify={'space-between'}
                      onClick={() => routeTo && navTo(routeTo)}>
            <XFlex align={'center'} gap={8}>
                <Iconfont name={icon as IconNames} color={themeVars.colorTextL2}/>
                <XText color={themeVars.colorTextPrimary}>{title}</XText>
            </XFlex>

            <XFlex align={'center'} gap={5}>
                {right && <XText color={themeVars.colorTextL2}>{right}</XText>}
                {routeTo && <Iconfont name={'arrow-right-s-line'} color={themeVars.colorTextL2}/>}
            </XFlex>
        </XFlex>
    }


    return <XFlex style={{height: '100vh'}} vertical>
        <Settings icon={'wallet-fill'} title={t('walletManage')} routeTo={'/wallet-management'}/>
        <Settings icon={'money-euro-circle-fill'} title={t('commission')} routeTo={'/commission'}/>
        <Settings icon={'settings-fill'} title={t('orderSettings')} routeTo={'/trade-settings'}/>
        {/*<Settings icon={'file-paper-fill'} title={t('beginnerTutorial')} routeTo={'https://www.google.com'}/>*/}
        <Settings icon={'customer-service-2-fill'} title={t('customerService')}
                  right={<Typography.Text copyable>{CUSTOMER_SERVICE_TG}</Typography.Text>}/>
        <Settings icon={'information-fill'} title={t('version')} right={packageJson.version}/>
    </XFlex>
}

export default Profile;
