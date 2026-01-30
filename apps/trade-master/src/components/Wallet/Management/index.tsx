import {useXTheme, XFlex} from "@pro/ui";
import Wallet from "@/components/Wallet";
import {useTranslation} from "react-i18next";


function WalletManagement() {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    return <XFlex padding={15} vertical style={{height: '100vh'}}>
        <Wallet showExport style={{
            background: themeVars.colorBgContainerPrimary,
            borderRadius: 10,
            padding: 15
        }}/>
    </XFlex>
}

export default WalletManagement;
