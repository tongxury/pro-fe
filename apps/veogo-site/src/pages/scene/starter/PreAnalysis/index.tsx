import {useXTheme, XFlex, XLinearGradientText} from "@pro/ui";
import React, {useEffect, useState} from "react";
import {generateObjectId} from "@/utils";
import {useRouter, useTranslation} from "@/i18n/routing";
import {useLocalStorageState} from "ahooks";
import {Button, Segmented} from "antd";
import {AppstoreOutlined, UploadOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {useGlobalState} from "@/hooks/global.tsx";
import {useParams} from "react-router";
import Carousel from "./Carousel";
import ImagesInputArea from "./ImagesInputArea";
import InputArea from "./InputArea";

const Index = () => {

    const {themeVars} = useXTheme()

    const [sessionId, setSessionId] = useState(generateObjectId())

    useEffect(() => {
        setSessionId(generateObjectId())
    }, [])

    const t = useTranslation()
    const {isMobile} = useGlobalState()
    const {scene} = useParams()

    const [category, setCategory] = useLocalStorageState(`${scene}_category`, {defaultValue: 'images'})

    return <XFlex vertical center gap={50} style={{flex: 1}}>

        <XFlex center style={{marginInline: 'auto', width: '100%', paddingInline: 15}}
               vertical gap={isMobile ? 15 : 20}>
            <XLinearGradientText size={isMobile ? 35 : 40} style={{textAlign: 'center'}}
                                 color={{colorStops: [themeVars.colorPrimary as any, themeVars.colorL2 as any]}}>
                {t('videoAnalysisDesc')}
            </XLinearGradientText>

            <Segmented
                value={category}
                onChange={value => setCategory(value)}
                options={[
                    {label: '视频分析', value: 'video', icon: <VideoCameraOutlined/>},
                    {label: '图文分析', value: 'images', icon: <AppstoreOutlined/>},
                ]}
            />

            {category === 'video' && (<InputArea sessionId={sessionId} scene={scene}/>)}
            {category === 'images' && (
                <ImagesInputArea sessionId={sessionId} scene={scene} promptId={'preAnalysisImages'}/>
                // <XFlex vertical block align={'center'} gap={10}
                //        style={{
                //            maxWidth: 700,
                //            padding: 15,
                //            background: themeVars.colorBgContainerPrimary,
                //            borderRadius: 10,
                //            width: '100%'
                //        }}>
                //     <Uploader
                //         sessionId={sessionId}
                //         scene={scene}
                //         disabled={!selectedXhsProfile}
                //         version={"V3"}
                //         max={12}
                //         accept={'.png,.jpg,.jpeg'}
                //         onUploaded={(data) => onUploaded(data, 'preAnalysisImages')}
                //     >
                //     </Uploader>
                //     <XFlex block align={'center'} justify={'start'}>
                //         <ProfileSelector selected={selectedXhsProfile} onChange={setSelectedXhsProfile}
                //                          platforms={['xiaohongshu']}/>
                //     </XFlex>
                //
                // </XFlex>
            )}

        </XFlex>

        {/*<DataCarousel />*/}

        <Carousel/>

    </XFlex>
}

export default Index;
