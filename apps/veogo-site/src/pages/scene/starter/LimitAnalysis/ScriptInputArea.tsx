import {useXTheme, XFlex} from "@pro/ui";
import {Button, Input} from "antd";
import React, {CSSProperties, useState} from "react";
import {useRouter, useTranslation} from "@/i18n/routing";
import {useGlobalState} from "@/hooks/global";
import ProfileSelector from "@/components/Profile/Selector";
import {addResourceV5, addSessionV2} from "@/api/api";


const ScriptInputArea = ({sessionId, scene, platforms, style,}: {
    sessionId: string,
    scene: string,
    platforms?: string[],
    style?: CSSProperties
}) => {
    const t = useTranslation()

    const [text, setText] = useState<string>()
    const {themeVars} = useXTheme()
    const [resource, setResource] = useState<any>()
    const [uploading, setUploading] = useState(false)
    const {isMobile} = useGlobalState()

    const [platform, setPlatform] = useState<string>('xiaohongshu')
    const {selectedProfile, setSelectedProfile} = useGlobalState()

    const router = useRouter()
    // const {mutateSessions} = useGlobalState()

    const onConfirm = () => {

        addSessionV2({sessionId, scene, version: "V2"}).then((result) => {
            if (!result.code) {
                addResourceV5(text, "text/plain", sessionId, "script").then((res) => {
                    if (!res.data?.code) {
                        // router.push(`/scenes//session?id=${sessionId}&promptId=scriptLimitAnalysis&scene=limitAnalysis`)
                    }
                })
            }
        })


    }

    return <XFlex vertical block align={'center'} gap={10} style={{maxWidth: 700, width: '100%'}}>

        <XFlex vertical block style={{
            background: themeVars.colorBgContainerPrimary,
            gap: 15,
            // maxWidth: 700,
            // width: '100%',
            borderRadius: 15,
            padding: isMobile ? '10px 10px' : '15px 15px',
            ...style
        }}>
            <XFlex align={resource ? 'end' : 'center'} gap={10} block
                   style={{
                       // border: '1px solid red',
                       // background: themeVars.colorBgContainerPrimary,
                       // maxWidth: 700,
                       // width: '100%',
                       // borderRadius: 30,
                       // padding: isMobile ? '6px 10px' : '12px 20px',
                       // ...style
                   }}>
                <Input.TextArea
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </XFlex>
            <XFlex align={'center'} justify={'space-between'}>
                <ProfileSelector platforms={platforms}/>
                <Button type={'primary'} disabled={!selectedProfile || !text} onClick={onConfirm}>
                    {selectedProfile ? '开始分析' : '绑定社媒账号'}
                </Button>
            </XFlex>

        </XFlex>
    </XFlex>

}

export default ScriptInputArea
