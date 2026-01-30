import {useXTheme, XFlex, XText} from "@pro/ui";
import Iconfont from "@/components/Iconfont";
import {CSSProperties, useMemo} from "react";
import AmountView from "@/components/Amount";
import {useTranslation} from "react-i18next";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import Export from "@/components/Wallet/Export.tsx";
import {Skeleton} from "antd";

function Wallet({showExport, style}: { showExport?: boolean, style?: CSSProperties }) {

    const {themeVars} = useXTheme()
    const {t} = useTranslation();
    const {wallet, loading} = useDefaultWallet(true)

    const valuation = useMemo(() => {

        // let balance = wallet?.valuation?.usdtValue || 0
        //
        // if (wallet?.assets?.length > 0) {
        //     balance += wallet?.assets?.map(x => x.balance?.usdtValue || 0)
        //         .reduce((prev, cur) => {
        //             return prev + cur
        //         })
        // }

        return wallet?.valuation?.usdtValue || 0
    }, [wallet])

    if (loading) {
        return <XFlex vertical gap={10} style={style}>
            <Skeleton.Button style={{height: 100}} block active/>
            <XFlex align={'center'} gap={10}>
                <Skeleton.Button size={'large'} active block/>
                <Skeleton.Button size={'large'} active block/>
            </XFlex>
        </XFlex>
    }

    return <XFlex vertical gap={10} style={style}>
        <XFlex align={'center'} gap={5}>
            <Iconfont name={'wallet-fill'} size={20} color={themeVars.colorPrimary}/>
            <XText color={themeVars.colorPrimary} size={13}>{t('account')} {wallet?.name}</XText>
        </XFlex>
        <XText size={12} color={themeVars.colorTextL2}> {t('totalAssetValuation')}</XText>
        <AmountView data={{usdtValue: valuation}} size={'lg'} type={'u'}/>
        {!loading && showExport && <Export wallet={wallet?._id}/>}
    </XFlex>
}

export default Wallet;
