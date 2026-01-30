import {useXTheme, XFlex} from "@pro/ui";
import {Button, Progress} from "antd";
import React, {CSSProperties, useState} from "react";
import {useRouter, useTranslation} from "@/i18n/routing";
import {useGlobalState} from "@/hooks/global";
import UploaderV5 from "@/components/UploaderV5";
import ProfileSelector from "@/components/Profile/Selector";
import CreditCostNotificationV2 from "@/components/CreditCostNotificationV2";
import ResourceList from "@/components/ResourceV2";


const InputArea = ({sessionId, scene, platforms, style,}: {
    sessionId: string,
    scene: string,
    platforms?: string[],
    style?: CSSProperties
}) => {
    const t = useTranslation()

    const {themeVars} = useXTheme()
    const [resource, setResource] = useState<any>()
    const [uploading, setUploading] = useState(false)
    const {isMobile} = useGlobalState()

    const [platform, setPlatform] = useState<string>('xiaohongshu')
    const {selectedProfile, setSelectedProfile} = useGlobalState()

    const router = useRouter()
    // const {mutateSessions} = useGlobalState()

    const promptId = "preAnalysis"


    const onUploaded = ({fileUrl, mimeType, filename}: any) => {

        setResource({
            url: fileUrl,
            mimeType: mimeType,
            name: filename
        })
    };

    const renderUploader = (progress: number) => {

        if (progress) {
            return (<Progress showInfo style={{}}
                              percent={progress} size="small"/>)
        }

        if (!selectedProfile) {
            return <Button disabled={true} size={'large'} block type={'dashed'}>
                {t('bindFirst')}
            </Button>
        }

        return (
            <Button size={'large'} block type={'dashed'}>
                {t('uploadVideo')}
            </Button>
        )

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
                {
                    resource ? <ResourceList data={[resource]} style={{maxHeight: 400, overflowY: 'scroll'}}/> :
                        <UploaderV5
                            onUploaded={onUploaded}
                            renderBody={renderUploader}
                        />
                }
            </XFlex>
            <XFlex align={'center'} justify={'space-between'}>
                <ProfileSelector platforms={platforms}/>
                {
                    resource &&
                    <CreditCostNotificationV2 sessionId={sessionId} scene={scene} promptId={promptId}
                                              resources={[resource]} personalProfile={selectedProfile}/>
                }
            </XFlex>

        </XFlex>
    </XFlex>

}

export default InputArea
