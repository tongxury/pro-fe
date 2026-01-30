import {useXTheme, XFlex} from "@pro/ui";
import {Button, Input, message} from "antd";
import React, {CSSProperties, useState} from "react";
import {useRouter, useTranslation} from "@/i18n/routing";
import {addResourceV7, addSessionV3} from "@/api/api";
import {useGlobalState} from "@/hooks/global";
import {extractLink} from "@/utils/url";
import {VideoCameraOutlined} from "@ant-design/icons";
import ResourceList from "@/components/ResourceV2";
import CreditCostNotificationV2 from "@/components/CreditCostNotificationV2";
import ProfileSelector from "@/components/Profile/Selector";


const Uploader = ({sessionId, scene, style}: { sessionId: string, scene: string, style?: CSSProperties }) => {
    const t = useTranslation()

    const [link, setLink] = useState<string>()
    const {themeVars} = useXTheme()
    const [resources, setResources] = useState<any>()
    const [uploading, setUploading] = useState(false)
    const {isMobile, selectedProfile} = useGlobalState()

    const router = useRouter()
    // const {mutateSessions} = useGlobalState()

    const onExtract = () => {

        if (!link) return;

        setUploading(true)

        const url = extractLink(link)

        if (!url) {
            message.error("您的输入有误，请确认您的分享链接是否正确").then(() => {
                setUploading(false)
            })
            return
        }

        addResourceV7({link: url}).then((res) => {
            if (!res?.code && res?.data?.resources) {
                setResources(res.data?.resources)
                setUploading(false)
            } else {
                message.error(t(res?.code)).then()
                setLink('')
                setUploading(false)
            }
        }).catch((err) => {
            console.log('err', err)
            message.error('提取失败，请稍后重试').then(() => {
            })
            setLink('')
            setUploading(false)
        })
    }

    const promptId = 'duplicateScript'

    return <XFlex vertical block align={'center'} gap={10} style={{width: '100%', maxWidth: 800}}>
        <XFlex vertical block style={{
            background: themeVars.colorBgContainerPrimary,
            gap: 15,
            // maxWidth: 700,
            // width: '100%',
            borderRadius: 15,
            padding: isMobile ? '10px 10px' : '15px 15px',
            ...style
        }}>
            <XFlex align={'center'} gap={10} block
                   style={{}}>
                {
                    resources ?
                        <ResourceList data={resources} style={{maxHeight: 400, overflowY: 'scroll'}}/> :
                        <Input.TextArea
                            variant="filled"
                            value={link}
                            onChange={e => setLink(e.target.value)}
                            rows={4}
                            style={{width: '100%', color: themeVars.colorTextPrimary}}
                            placeholder="请输入您要分析的视频分享链接(目前视频支持小红书,抖音)"
                            size="large"/>
                }
            </XFlex>
            <XFlex align={'center'} justify={'space-between'}>
                <ProfileSelector/>

                {selectedProfile &&
                    <>
                        {
                            resources ?
                                <CreditCostNotificationV2 sessionId={sessionId} scene={scene} promptId={promptId}
                                                          resources={resources} personalProfile={selectedProfile}/> :
                                <Button icon={<VideoCameraOutlined/>} loading={uploading} disabled={!link}
                                        type={'primary'}
                                        shape={'round'}
                                        onClick={onExtract}>{uploading ? '正在提取视频，预计1-2分钟...' : '立即提取视频'}</Button>
                        }
                    </>}

                {!selectedProfile && <Button disabled type={'primary'} shape={'round'}>请先绑定您的账号</Button>}
            </XFlex>
            {/*<XFlex align={'center'} justify={'space-between'}>*/}
            {/*    {*/}
            {/*        resources ?*/}
            {/*            <CreditCostNotificationV2 sessionId={sessionId} scene={scene} promptId={promptId}*/}
            {/*                                      resources={resources}/> :*/}
            {/*            <Button icon={<VideoCameraOutlined/>} loading={uploading} disabled={!link} type={'primary'}*/}
            {/*                    shape={'round'}*/}
            {/*                    onClick={onExtract}>{uploading ? '正在提取视频，预计1-2分钟...' : '立即提取视频'}</Button>*/}
            {/*    }*/}

            {/*</XFlex>*/}
        </XFlex>
    </XFlex>

}

export default Uploader

