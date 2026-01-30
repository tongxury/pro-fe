import {useXTheme, XFlex, XLinearGradientText} from "@pro/ui";
import {Button, Card, Input, Typography} from "antd";
import React, {useState} from "react";
import {useRouter, useTranslation} from "@/i18n/routing";
import {FileImageOutlined} from "@ant-design/icons";
import Uploader from "@/components/UploaderV6";
import {generateObjectId} from "@/utils";
import {useLocalStorageState} from "ahooks";
import CreditCostNotificationV2 from "@/components/CreditCostNotificationV2";
import {useParams} from "react-router";
import {useGlobalState} from "@/hooks/global.tsx";
import Carousel from "./Carousel";
import ProfileSelector from "@/components/Profile/SelectorV2";

const {Title, Paragraph} = Typography;

const CoverAnalysis = () => {

    const {themeVars} = useXTheme()
    const t = useTranslation()
    const router = useRouter()

    const [uploading, setUploading] = useState<boolean>(false);

    const promptId = "coverAnalysisImages"
    const {scene} = useParams()

    const [sessionId] = useState<string>(generateObjectId())
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [resources, setResources] = useState<any[]>();

    const [category, setCategory] = useLocalStorageState(`${scene}_category`, {defaultValue: 'video'})
    const [title, setTitle] = useState<string>('');
    const {selectedProfile, setSelectedProfile} = useGlobalState()


    const onUploaded = (data: any[]) => {
        setResources(data)
    }


    // 卡片悬停样式
    const getCardStyle = (cardType: string) => ({
        width: '100%',
        maxWidth: 800,
        marginInline: 'auto',
        borderRadius: '12px',
        boxShadow: hoveredCard === cardType
            ? `0 10px 10px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.08)`
            : '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        transform: hoveredCard === cardType ? 'translateY(-5px)' : 'translateY(0)',
        border: `1px solid ${hoveredCard === cardType ? themeVars.colorPrimary : 'transparent'}`,
        height: '100%',
        overflow: 'hidden'
    });

    // 卡片头部样式
    const cardHeadStyle = (iconColor: string) => ({
        borderBottom: `1px solid ${themeVars.colorBorder}`,
        paddingBottom: 16,
        // marginBottom: 20,
    });
    const {isMobile} = useGlobalState()


    return (
        <XFlex vertical center gap={50}>

            <XFlex center style={{width: '100%', paddingInline: 15}}
                   vertical gap={isMobile ? 15 : 20}>
                <XLinearGradientText size={isMobile ? 35 : 40} style={{textAlign: 'center'}}
                                     color={{colorStops: [themeVars.colorPrimary as any, themeVars.colorL2 as any]}}>
                    {t('coverPredictionDesc')}
                </XLinearGradientText>
                {/*<Segmented*/}
                {/*    value={category}*/}
                {/*    onChange={value => setCategory(value)}*/}
                {/*    options={[*/}
                {/*        // {label: '视频帧推荐', value: 'video', icon: <VideoCameraOutlined/>},*/}
                {/*        {label: '上传封面图', value: 'images', icon: <AppstoreOutlined/>},*/}
                {/*    ]}*/}
                {/*/>*/}

                {/*{category === 'video' && (*/}
                {/*    <Card*/}
                {/*        hoverable*/}
                {/*        style={getCardStyle('video')}*/}
                {/*        onMouseEnter={() => setHoveredCard('video')}*/}
                {/*        onMouseLeave={() => setHoveredCard(null)}*/}
                {/*        // bodyStyle={{padding: 24}}*/}
                {/*    >*/}
                {/*        <div style={cardHeadStyle(themeVars.colorPrimary as any)}>*/}
                {/*            <XFlex gap={12} align="center">*/}
                {/*                <VideoCameraOutlined*/}
                {/*                    style={{fontSize: 20, color: themeVars.colorPrimary}}/>*/}
                {/*                <Title level={4} style={{margin: 0}}>{t('videoFrameRecommendations')}</Title>*/}
                {/*            </XFlex>*/}
                {/*        </div>*/}
                {/*        <Paragraph style={{marginBottom: 20, color: themeVars.colorTextL2}}>*/}
                {/*            {t('videoFrameRecommendationsDesc')}*/}
                {/*        </Paragraph>*/}
                {/*        <Uploader*/}

                {/*            sessionId={sessionId}*/}
                {/*            scene={scene}*/}
                {/*            accept={'.mp4,.mov'}*/}
                {/*            onUploaded={(data) => onUploaded(data, 'coverAnalysis')}*/}
                {/*            onUploadStart={() => setUploading(true)}*/}
                {/*        >*/}
                {/*            <Button*/}
                {/*                size={'large'}*/}
                {/*                type={'dashed'}*/}
                {/*                icon={<UploadOutlined />}*/}
                {/*                disabled={uploading}*/}
                {/*            >*/}
                {/*                {t('chooseFile', {max: 1})}*/}
                {/*            </Button>*/}
                {/*        </Uploader>*/}
                {/*    </Card>*/}
                {/*)}*/}


                {/*{category === 'images' && (*/}
                <Card
                    hoverable
                    style={getCardStyle('image')}
                    onMouseEnter={() => setHoveredCard('image')}
                    onMouseLeave={() => setHoveredCard(null)}
                    // bodyStyle={{padding: 24}}
                >
                    <XFlex vertical block gap={20} style={{}}>

                        <div style={cardHeadStyle(themeVars.colorTextPrimary as any)}>
                            <XFlex gap={12} align="center">

                                <FileImageOutlined
                                    style={{fontSize: 20, color: themeVars.colorPrimary}}/>
                                <Title level={4} style={{margin: 0}}>{t('uploadCover')}</Title>
                            </XFlex>
                        </div>
                        {/*<Paragraph style={{marginBottom: 20, color: themeVars.colorTextL2}}>*/}
                        {/*    {t('uploadCoverDesc')}*/}
                        {/*</Paragraph>*/}
                        <Uploader
                            max={3}
                            accept={'.png,.jpg,.jpeg'}
                            onUploaded={(data) => onUploaded(data)}
                        >
                        </Uploader>

                        <Input.TextArea
                            value={title}
                            onChange={v => setTitle(v.target.value)}
                            placeholder={t('inputCoverTitle')}
                        />

                        {(!uploading && resources?.length && resources?.length > 0) && (
                            // <CreditCostNotification scene={scene} promptId={promptId}
                            //                         cannotRefund={funConfig?.cannotRefund} onConfirm={onConfirm}
                            //                         buttonText={t(funConfig?.title)}/>

                            // <CreditCostNotificationV2
                            //     sessionId={sessionId} scene={scene} promptId={promptId}
                            //     resources={title ? resources?.concat({
                            //         content: title,
                            //         category: 'title',
                            //         mimeType: 'text/plain'
                            //     }) : resources}
                            // />

                            <XFlex align={'center'} block justify={'space-between'}>
                                <ProfileSelector selected={selectedProfile} onChange={setSelectedProfile}/>
                                {selectedProfile && resources?.length && resources?.length > 0 &&
                                    <CreditCostNotificationV2
                                        sessionId={sessionId} scene={scene} promptId={promptId}
                                        resources={title ? resources?.concat({
                                            content: title,
                                            category: 'title',
                                            mimeType: 'text/plain'
                                        }) : resources}
                                        personalProfile={selectedProfile}/>
                                }

                                {!selectedProfile &&
                                    <Button disabled type={'primary'} shape={'round'}>请先绑定您的账号</Button>}
                            </XFlex>

                        )}
                    </XFlex>
                </Card>
                {/*)}*/}


            </XFlex>

            <Carousel/>
            {/*<div style={{height: 1000, width: '100%', border: '1px solid blue'}}>*/}

            {/*</div>*/}
        </XFlex>
    )

}

export default CoverAnalysis
