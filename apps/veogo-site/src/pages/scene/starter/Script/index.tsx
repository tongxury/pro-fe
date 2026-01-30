import {useXTheme, XFlex, XLinearGradientText} from "@pro/ui";
import React, {useEffect, useState} from "react";
import {generateObjectId} from "@/utils";
import {useTranslation} from "@/i18n/routing";
import {useGlobalState} from "@/hooks/global.tsx";
import {useParams} from "react-router";
import Carousel from "./Carousel";
import Uploader from "./Uploader";


const Index = () => {

    const {themeVars} = useXTheme()

    const [sessionId, setSessionId] = useState(generateObjectId())

    useEffect(() => {
        setSessionId(generateObjectId())
    }, [])

    const t = useTranslation()
    const {isMobile} = useGlobalState()
    const {scene} = useParams()


    return <XFlex vertical center gap={50} style={{flex: 1}}>

        <XFlex center style={{marginInline: 'auto', width: '100%', paddingInline: 15}}
               vertical gap={isMobile ? 15 : 20}>
            <XLinearGradientText size={isMobile ? 35 : 50} style={{textAlign: 'center'}}
                                 color={{colorStops: [themeVars.colorPrimary as any, themeVars.colorL2 as any]}}>
                {t('scriptReplicationDesc')}
            </XLinearGradientText>
            <Uploader sessionId={sessionId} scene={scene}/>
        </XFlex>

        {/*<DataCarousel />*/}

        <Carousel/>

    </XFlex>
}

export default Index;
