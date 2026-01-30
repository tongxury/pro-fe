import React, {useState} from 'react';
import {useUser} from "@/api/api";
import {Dropdown, Skeleton} from "antd";
import {useXTheme, XDivider, XFlex, XText} from "@pro/ui";
import {LogoutOutlined, MenuFoldOutlined} from '@ant-design/icons';
import {removeAuthToken} from "@/utils";
import LoginState from "@/components/LoginState";
import IconFont from "@/components/Iconfont";
import {useGlobalState} from "@/hooks/global";
import {useRouter} from '@/hooks/useRouter';
import {useTranslations} from "@/hooks/useTranslation.ts";

const AccountState = () => {

    const {themeVars} = useXTheme()

    const t = useTranslations('Default')

    const router = useRouter()

    const [open, setOpen] = useState<boolean>(false)

    const [user, {loading}] = useUser()

    const {isMobile} = useGlobalState()

    if (loading) {
        return <Skeleton.Button style={{
            width: isMobile ? 150 : 210,
            height: isMobile ? 35 : 40
        }} shape={'round'}/>
    }

    return (user ?
            <Dropdown
                onOpenChange={setOpen}
                open={open} popupRender={() => {
                return (<XFlex vertical bordered borderRadius={15}
                               style={{
                                   background: themeVars.colorBgContainerPrimary + 'dd',
                                   minWidth: isMobile ? 200 : 250,
                                   border: '1px solid ' + themeVars.colorBorder
                               }}>
                    <XFlex vertical gap={isMobile ? 5 : 10} padding={isMobile ? 15 : 20}>
                        <XText size={isMobile ? 14 : 16} weight={500}>{user.nickname || t('user') + user.phone}</XText>
                        <XText size={isMobile ? 12 : 13}
                               color={themeVars.colorTextL2}>{t('phone')}: {user.phone}</XText>
                    </XFlex>
                    <XDivider/>
                    <XFlex onClick={() => {
                        removeAuthToken()
                        window.location.reload()
                    }} padding={isMobile ? 15 : 20} align={'center'} gap={10} >
                        <LogoutOutlined style={{color: themeVars.colorError}}/>
                        <XText color={themeVars.colorError}>{t('logout')}</XText>
                    </XFlex>
                </XFlex>)
            }}>
                {
                    isMobile ? <MenuFoldOutlined style={{color: themeVars.colorTextPrimary}}/>
                        :
                        <XFlex
                            center
                            onClick={() => setOpen(!open)}
                            style={{
                                height: isMobile ? 38 : 45,
                                background: themeVars.colorBgContainerPrimary + 'dd',
                                width: isMobile ? 160 : 210,
                                borderRadius: 50,
                                paddingBlock: isMobile ? 8 : 10,
                                border: '1px solid ' + themeVars.colorBorder
                            }} align={'center'} gap={8}>
                            <XText weight={500} size={isMobile ? 13 : undefined}>
                                {user.nickname || t('user') + user.phone}
                            </XText>

                            <IconFont size={18} color={themeVars.colorTextPrimary}
                                      name={open ? 'arrow-up-s-line' : 'arrow-down-s-line'}/>
                        </XFlex>
                }
            </Dropdown>
            :
            <LoginState/>
    );
};

export default AccountState;
