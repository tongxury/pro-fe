import {useXTheme, XFlex, XOption, XText} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import {useTranslation} from "react-i18next";

function Settings() {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const options: XOption[] = [
        {value: 'walletManagement', iconName: 'wallet-3-fill'},
        {value: 'walletManagement', iconName: 'wallet-3-fill'},
        {value: 'walletManagement', iconName: 'wallet-3-fill'},
    ]

    return <XFlex vertical>
        {
            options.map((x: XOption, i: number) =>
                <XFlex key={i} align={'center'} justify={'space-between'} padding={15}>
                    <XFlex align={'center'} gap={8}>
                        <IconFont name={x.iconName} color={themeVars.colorTextL1}/>
                        <XText>{t(x.value)}</XText>
                    </XFlex>
                    <IconFont name={"arrow-drop-right-fill"} color={themeVars.colorTextL1}/>
                </XFlex>
            )
        }
    </XFlex>
}

export default Settings;
