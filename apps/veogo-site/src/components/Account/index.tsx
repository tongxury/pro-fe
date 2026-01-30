import React, {CSSProperties, useState} from 'react';
import {Button, Divider, Dropdown, Skeleton, Space} from "antd";
import {useXTheme, XDivider, XFlex, XLetterAvatar, XText} from "@pro/ui";
import {DownOutlined, LogoutOutlined} from '@ant-design/icons';
import {removeAuthToken} from "@/utils";
import {useGlobalState} from "@/hooks/global";
import IconFont from "@/components/Iconfont";
import {useTranslations} from '@/hooks/useTranslation';


const Account = ({collapsed, style}: { collapsed?: boolean, style?: CSSProperties }) => {

    const {themeVars} = useXTheme()

    const t = useTranslations('Default')

    const [open, setOpen] = useState<boolean>(false)

    const {user, userLoading} = useGlobalState()

    if (userLoading) {
        return <Skeleton.Button style={{
            width: 150,
            height: 35
        }} shape={'round'}/>
    }

    if (!user) {
        return <></>
    }


    return <Dropdown
        popupRender={(menu) => (
            <XFlex vertical borderRadius={15}
                   style={{
                       background: themeVars.colorBgPrimary,
                       minWidth: 250,
                       border: '1px solid ' + themeVars.colorBorder
                   }}>
                <XFlex vertical gap={15} padding={15}>
                    <XText size={14} weight={500}>{user.nickname || user.phone || user.email || ''}</XText>
                    {/*<XText size={13}*/}
                    {/*       color={themeVars.colorTextL2}>{t('phone')}: {user.phone}</XText>*/}
                </XFlex>
                <XDivider/>
                <XFlex onClick={() => {
                    removeAuthToken()
                    window.location.reload()
                }} padding={15} align={'center'} gap={10}>
                    <LogoutOutlined style={{color: themeVars.colorError}}/>
                    <XText color={themeVars.colorError}>{t('logout')}</XText>
                </XFlex>
            </XFlex>
        )}
    >
        <a onClick={(e) => e.preventDefault()}>
            {
                !collapsed ?
                    <XFlex
                        center
                        onClick={() => setOpen(!open)}
                        style={{
                            height: 45,
                            paddingInline: '10px 25px',
                            width: '100%',
                            maxWidth: 200,
                            background: themeVars.colorBgContainerPrimary + 'dd',
                            // width: isMobile ? 160 : 210,
                            // borderRadius: 10,
                            paddingBlock: 10,
                            borderRadius: 20,
                            // border: '1px solid ' + themeVars.colorBorder
                        }}
                        align={'center'}
                        gap={8}>

                        <XLetterAvatar size={32} name={user.phone || user.email}/>

                        <XFlex vertical justify={'space-between'} gap={3}>
                            <XText ellipsis={{maxWidth: 100}} weight={500}
                                   size={13}>{user.nickname || user.phone || user.email} </XText>

                            <IconFont style={{height: 13, width: 25}} name={'vip1'}
                                      color={user.isVip ? themeVars.colorL1 : themeVars.colorTextL2}/>
                        </XFlex>
                    </XFlex>
                    :
                    <XFlex
                        center
                        onClick={() => setOpen(!open)}
                        style={{
                            height: 45,
                            // padding: 10,
                            width: '100%',
                            // maxWidth: 200,
                            background: themeVars.colorBgContainerPrimary + 'dd',
                            // width: isMobile ? 160 : 210,
                            borderRadius: 20,
                            // paddingBlock: 10,
                            // position: 'relative',
                            // border: '1px solid ' + themeVars.colorBorder
                        }}
                        align={'center'}
                        gap={8}>

                        <XLetterAvatar size={32} name={user.phone || user.email}/>
                        {/*<IconFont style={{height: 10, width: 25, zIndex: 10, position: 'absolute', bottom: 0}} name={'vip1'}*/}
                        {/*          color={user.isVip ? themeVars.colorL1 : themeVars.colorTextL2}/>*/}
                    </XFlex>
            }
        </a>
    </Dropdown>
};

export default Account;
