import {useXTheme, XFlex, XText} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import copy from "copy-to-clipboard";
import {useTranslation} from "react-i18next";
import useAuthUser from "@/hooks/useAuthUser.ts";
import {TG_BOT_INVITE_URL} from "@/contants.ts";
import {QRCodeSVG} from "qrcode.react";
import {message} from "antd";


function InviteInfo() {

    const {t} = useTranslation()
    const {user} = useAuthUser()
    const {themeVars} = useXTheme()

    const inviteUrl = `${TG_BOT_INVITE_URL}${user?.serial}`

    const onCopy = (value: string) => {
        copy(value)
        message.success({
            content: t('copied'),
            duration: 0.8,
        }).then()
    }

    return <XFlex vertical gap={15}>

        <XFlex center>
            <QRCodeSVG value={inviteUrl}
                       style={{
                           padding: 10,
                           width: 100,
                           height: 100,
                           background: themeVars.colorTextPrimary,
                           borderRadius: 10
                       }}/>
        </XFlex>

        <XFlex vertical gap={10}>
            <XFlex align={'center'} justify={'space-between'}>
                <XText color={themeVars.colorTextL2}>{t('inviteCode')}</XText>
                <XFlex align={'center'} gap={8}>
                    <XText>{user?.serial}</XText>
                    <IconFont name={'copy-fill'} size={16} color={themeVars.colorTextL1} onClick={() => onCopy(user?.serial)}/>
                </XFlex>
            </XFlex>
            <XFlex align={'center'} justify={'space-between'}>
                <XText color={themeVars.colorTextL2}>{t('inviteUrl')}</XText>
                <XFlex align={'center'} gap={8}>
                    <XText ellipsis={{maxWidth: 200,}}>{inviteUrl}</XText>
                    <IconFont name={'copy-fill'} size={16} color={themeVars.colorTextL1}
                              onClick={() => onCopy(inviteUrl)}/>
                </XFlex>
            </XFlex>
            <XFlex align={'center'} justify={'space-between'}>
                <XText color={themeVars.colorTextL2}>{t('inviterCode')}</XText>
                <XFlex align={'center'} gap={8}>
                    <XText ellipsis={{maxWidth: 200,}}>{user?.inviterSerial || '-'}</XText>
                    <IconFont name={'copy-fill'} size={16} color={themeVars.colorTextL1}
                              onClick={() => onCopy(user?.inviterSerial)}/>
                </XFlex>
            </XFlex>
        </XFlex>

        {/*<Button size={'large'} type={'primary'} block shape={'round'}>{t('share')}</Button>*/}
    </XFlex>
}

export default InviteInfo;
