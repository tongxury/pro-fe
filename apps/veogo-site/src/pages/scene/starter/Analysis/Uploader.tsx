import {useXTheme, XFlex} from "@pro/ui";
import {App, Button, Input, message} from "antd";
import React, {CSSProperties, ReactNode, useState} from "react";
import {useTranslation} from "@/i18n/routing";
import {addResourceV7} from "@/api/api";
import {useGlobalState} from "@/hooks/global";
import {extractLink} from "@/utils/url";
import ResourceList from "@/components/ResourceV2";
import CreditCostNotificationV2 from "@/components/CreditCostNotificationV2";


const Uploader = ({
                      sessionId, scene, promptId,
                      placeholder, icon,
                      style
                  }: {
    sessionId: string,
    scene: string,
    promptId: string,
    placeholder: string,
    icon: ReactNode,
    style?: CSSProperties
}) => {
    const t = useTranslation()

    const [link, setLink] = useState<string>()
    const {themeVars} = useXTheme()
    const [resources, setResources] = useState<any>()
    const [uploading, setUploading] = useState(false)
    const {isMobile} = useGlobalState()

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

    // const promptId = 'analysis'

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
                            placeholder={placeholder}
                            size="large"/>
                }
            </XFlex>
            <XFlex align={'center'} justify={'end'}>
                {
                    resources ?
                        <CreditCostNotificationV2 sessionId={sessionId} scene={scene} promptId={promptId}
                                                  resources={resources}/> :
                        // @ts-ignore
                        <Button icon={icon} loading={uploading} disabled={!link} type={'primary'}
                                shape={'round'}
                                onClick={onExtract}>{uploading ? '正在提取，预计1-2分钟...' : '立即提取'}</Button>
                }

            </XFlex>
        </XFlex>
    </XFlex>

}

export default Uploader
