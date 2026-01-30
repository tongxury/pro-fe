import {useXTheme, XFlex, XLinearGradientText} from "@pro/ui";
import React, {useEffect, useState} from "react";
import {generateObjectId} from "@/utils";
import {useTranslation} from "@/i18n/routing";
import {Row, Segmented} from "antd";
import {AppstoreOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {useLocalStorageState} from "ahooks";
import Carousel from "./Carousel";
import {useGlobalState} from "@/hooks/global.tsx";
import Uploader from "./Uploader";
import {useParams} from "react-router";


const Index = () => {

    const {themeVars} = useXTheme()

    const [sessionId, setSessionId] = useState(generateObjectId())

    useEffect(() => {
        setSessionId(generateObjectId())
    }, [])


    const t = useTranslation()

    const {scene} = useParams()

    const [category, setCategory] = useLocalStorageState<string>('analysisMimeType', {defaultValue: 'video'});


    const {isMobile} = useGlobalState()


    return <XFlex vertical center gap={50} style={{flex: 1}}>

        <XFlex center style={{width: '100%', paddingInline: 15}}
               vertical gap={isMobile ? 15 : 20}>
            <XLinearGradientText size={isMobile ? 30 : 35} style={{textAlign: 'center'}}
                                 color={{colorStops: [themeVars.colorPrimary as any, themeVars.colorL2 as any]}}>
                {t('analysisDesc')}
            </XLinearGradientText>

            <Segmented
                value={category}
                onChange={value => setCategory(value)}
                options={[
                    {label: '视频分析', value: 'video', icon: <VideoCameraOutlined/>},
                    {label: '图文分析', value: 'imageText', icon: <AppstoreOutlined/>},
                ]}
            />

            {
                category === 'video' && <Uploader sessionId={sessionId} scene={scene} promptId={'analysis'}
                                                  placeholder={"请输入您要分析的视频分享链接(目前视频支持小红书,抖音)"}
                                                  icon={<VideoCameraOutlined/>}/>
            }

            {
                category === 'imageText' &&
                <Uploader sessionId={sessionId} scene={scene} promptId={'analysisImages'}
                          placeholder={"请输入您要分析的图文分享链接(目前视频支持小红书)"}
                          icon={<AppstoreOutlined/>}/>
            }

            {/*<Tabs centered defaultActiveKey="1" items={items}*/}
            {/*      style={{width: '100%', border: '0px solid'}}/>*/}
            {/*<Uploader sessionId={sessionId} scene={scene}/>*/}
            {/*<Row style={{width: '100%', maxWidth: 800,}} gutter={[10, 10]}>*/}
            {/*    <Col xs={24} sm={24} md={12} lg={12} xl={12}>*/}
            {/*        <Uploader sessionId={sessionId} scene={scene}/>*/}
            {/*    </Col>*/}
            {/*    <Col xs={24} sm={24} md={12} lg={12} xl={12}>*/}
            {/*        <ImageTextUploader sessionId={sessionId} scene={scene}/>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </XFlex>

        <Carousel/>

    </XFlex>
}

export default Index;
