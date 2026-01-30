import {useXTheme, XFlex, XImage, XLinearGradientText, XText} from "@pro/ui";
import logo from "@/assets/logo.png";
import React from "react";
import {useRouter} from "@/i18n/routing";

const Logo = ({hideTitle}: { hideTitle?: boolean }) => {

    const {themeVars} = useXTheme()
    const router = useRouter();

    return <XFlex align={'center'} gap={10} style={{cursor: 'pointer'}} onClick={() => {
        router.push('/')
    }}>
        <XImage src={logo}  style={{cursor: 'pointer', width: 30, height: 30}}/>
        {/*<Logo />*/}
        <span
            style={{cursor: 'pointer', display: hideTitle ? 'none' : undefined,}}>
            <span style={{fontSize: 25, fontWeight: 700, color: themeVars.colorTextPrimary}}>Veo</span>
            <XLinearGradientText bold size={25} color={{
                colorStops: [
                    themeVars.colorPrimary as any, themeVars.colorL1 as any, themeVars.colorL2 as any
                ],
            }}>go</XLinearGradientText>
        </span>

    </XFlex>

}

export default Logo;
