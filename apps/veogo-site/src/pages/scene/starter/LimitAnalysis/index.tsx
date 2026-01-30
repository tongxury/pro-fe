import {useXTheme, XFlex, XLinearGradientText} from "@pro/ui";
import React, {useEffect, useState} from "react";
import {generateObjectId} from "@/utils";
import {useRouter, useTranslation} from "@/i18n/routing";
import {useLocalStorageState} from "ahooks";
import {Segmented} from "antd";
import {AppstoreOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {useGlobalState} from "@/hooks/global";
import ScriptInputArea from "./ScriptInputArea";
import {useParams} from "react-router";
import Carousel from "./Carousel";
import ImagesInputArea from "../PreAnalysis/ImagesInputArea";
import InputArea from "./InputArea";


const Index = () => {

    const {themeVars} = useXTheme()

    const [sessionId, setSessionId] = useState(generateObjectId())

    useEffect(() => {
        setSessionId(generateObjectId())
    }, [])

    const t = useTranslation()
    const router = useRouter()

    const {selectedXhsProfile, setSelectedXhsProfile} = useGlobalState()
    const {isMobile} = useGlobalState()
    const {scene} = useParams()

    const [category, setCategory] = useLocalStorageState(`${scene}_category`, {defaultValue: 'images'})


    return <XFlex vertical center gap={50} style={{flex: 1}}>

        <XFlex center style={{marginInline: 'auto', width: '100%', paddingInline: 15}}
               vertical gap={isMobile ? 15 : 20}>
            <XLinearGradientText size={isMobile ? 35 : 40} style={{textAlign: 'center'}}
                                 color={{colorStops: [themeVars.colorPrimary as any, themeVars.colorL2 as any]}}>
                {t('restrictionPredictionDesc')}
            </XLinearGradientText>

            <Segmented
                value={category}
                onChange={value => setCategory(value)}
                options={[
                    // {label: '脚本分析', value: 'script', icon: <FileTextOutlined/>},
                    {label: '视频分析', value: 'video', icon: <VideoCameraOutlined/>},
                    {label: '图文分析', value: 'images', icon: <AppstoreOutlined/>},
                ]}
            />

            {category === 'script' && (<ScriptInputArea sessionId={sessionId} scene={scene}/>)}
            {category === 'video' && (<InputArea sessionId={sessionId} scene={scene}/>)}
            {category === 'images' && (
                <ImagesInputArea sessionId={sessionId} scene={scene} promptId={'limitAnalysisImages'}/>
            )}

        </XFlex>

        {/*<DataCarousel />*/}

        <Carousel/>

    </XFlex>
}

export default Index;
