import {useSnapshot} from "valtio/index";
import {state} from "@/providers/state.ts";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import ActivityList from "@/components/Activity/List";
import DrawerTrigger from "@/components/DrawerTrigger";
import IconFont from "@/components/Iconfont";
import FollowingWalletList from "@/components/FollowingWallet/List";
import {Segmented} from "antd";
import useAppRouter from "@/hooks/useAppRouter.ts";

function Activity() {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()
    const [category, setCategory] = useState<any>('publicList')
    const {routeToFollowingManage} = useAppRouter()

    return (
        <XFlex vertical>
            <XFlex align={'center'} justify={'space-between'} padding={15}>
                <XText>{t('smartMoneyNotification')}</XText>
                {/*<IconFont name={'settings-fill'} size={20} color={themeVars.colorTextL1}/>*/}
            </XFlex>
            <XFlex gap={10} padding={[0, 15, 0, 15]} align={'center'} justify={'space-between'}>

                <Segmented
                    value={category}
                    onChange={setCategory}
                    options={[
                        {label: t('publicList'), value: 'publicList',},
                        {label: t('myFollowings'), value: 'myFollowings',},
                    ]}
                />
                <IconFont onClick={routeToFollowingManage}
                          name={'settings-fill'}
                          color={themeVars.colorTextPrimary}/>

            </XFlex>
            <ActivityList category={category}/>
        </XFlex>
    );
}

export default Activity;
