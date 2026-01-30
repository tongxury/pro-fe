import {ReactElement, useState} from "react";
import {Button, Drawer} from "antd";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";
import useAuthUser from "@/hooks/useAuthUser.ts";
import IconFont from "@/components/Iconfont";
import {TG_BOT_INVITE_URL} from "@/contants.ts";
import copy from "copy-to-clipboard";


function Invite({children}: { children: ReactElement }) {

    const [open, setOpen] = useState(false)

    const {t} = useTranslation()
    const {user} = useAuthUser()
    const {themeVars} = useXTheme()

    return <>
        {/*{cloneElement(children, {...children.props, onClick: () => setOpen(true)})}*/}
        <div onClick={() => setOpen(true)}>{children}</div>
        <Drawer
            open={open}
            height={'auto'}
            placement={'bottom'}
            closable={false}
            onClose={() => setOpen(false)}
        >
            <XFlex vertical gap={10}>

                <XFlex padding={10} borderRadius={10} align={'center'} justify={'space-between'}
                       background={themeVars.colorBgL1}>
                    <XText>{t('inviteCode')}</XText>
                    <XFlex align={'center'} gap={8}>
                        <XText>{user?.serial}</XText>
                        <IconFont name={'copy-fill'} color={themeVars.colorTextL1} onClick={() => copy(user?.serial)}/>
                    </XFlex>
                </XFlex>

                <XFlex padding={10} borderRadius={10} align={'center'} justify={'space-between'}
                       background={themeVars.colorBgL1}>
                    <XText>{t('inviteUrl')}</XText>
                    <XFlex align={'center'} gap={8}>
                        <XText ellipsis={{maxWidth: 200,}}>{`${TG_BOT_INVITE_URL}${user?.serial}`}</XText>
                        <IconFont name={'copy-fill'} color={themeVars.colorTextL1}
                                  onClick={() => copy(`${TG_BOT_INVITE_URL}${user?.serial}`)}/>
                    </XFlex>
                </XFlex>

                <Button size={'large'} type={'primary'} block shape={'round'}>{t('share')}</Button>
            </XFlex>

        </Drawer>
    </>
}

export default Invite;
