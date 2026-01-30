import DrawerTrigger from "@/components/DrawerTrigger";
import {Button, Input, message, Modal} from "antd";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";
import Confirm from "@/components/Confirm";
import {exportPrivateKey} from "@/api/wallet.ts";
import {useState} from "react";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {CUSTOMER_SERVICE_TG} from "@/contants.ts";
import ModalTrigger from "@/components/ModalTrigger";


function Export({wallet}: { wallet: string }) {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const [exporting, setExporting] = useState(false)

    const {routeToPasswordSetting} = useAppRouter()

    const [value, setValue] = useState<string>("");

    const onChange = (value: string, closeDrawer: () => void) => {

        setValue(value)

        if (value.length >= 6) {

            setExporting(true)

            exportPrivateKey({wallet, password: value}).then(r => {
                setValue('')

                if (!r.code) {
                    message.success({
                        content: t('exportPrivateKeySuccessMessage'),
                        duration: 2,
                    }).then()

                    closeDrawer()

                } else {
                    message.error({
                        content: t(r.code),
                        duration: 2,
                    }).then()

                }

                setExporting(false)
            }).catch(e => setExporting(false))
        }
    }

    return <ModalTrigger
        title={t('exportPrivateKey')}
        extra={<XText onClick={routeToPasswordSetting} size={13}
                      color={themeVars.colorTextL2}>{t('passwordSetting')}</XText>}
        trigger={
            <Button type={'dashed'}>{t('exportPrivateKey')}</Button>
        }
        renderBody={({closeDrawer}) => {
            return <XFlex padding={15} vertical gap={15}>
                <XText color={themeVars.colorTextL2}>{t('exportPrivateKeyPassword')}</XText>
                <Input.OTP disabled={exporting} value={value} onChange={(value) => onChange(value, closeDrawer)}
                           autoFocus mask="*"
                           style={{width: 200, marginInline: 'auto'}}/>
                <XFlex justify={'end'}>
                    <Confirm
                        title={t('forgetPassword')}
                        content={
                            <XText color={themeVars.colorTextL2}>
                                {t('pleaseContactCustomerService', {customerService: CUSTOMER_SERVICE_TG})}
                            </XText>
                        }
                    >
                        <XText color={themeVars.colorTextL2} size={12}>{t('forgetPassword')}</XText>
                    </Confirm>
                </XFlex>
            </XFlex>
        }}
    >

    </ModalTrigger>
}

export default Export
