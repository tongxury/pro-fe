import {useXTheme, XFlex} from "@pro/ui";
import React, {useState} from "react";
import {useRouter, useTranslation} from "@/i18n/routing";
import {useGlobalState} from "@/hooks/global";
import ProfileSelector from "@/components/Profile/SelectorV2";
import {Button, Input} from "antd";
import CreditCostNotificationV2 from "@/components/CreditCostNotificationV2";
import Uploader from "@/components/UploaderV6";


const ImagesInputArea = ({sessionId, scene, promptId}: {
    sessionId: string,
    scene: string,
    promptId: string,
}) => {

    const {themeVars} = useXTheme();

    const {selectedXhsProfile, setSelectedXhsProfile} = useGlobalState()
    const [uploading, setUploading] = useState<boolean>(false);

    const [resources, setResources] = useState<any[]>();
    const t = useTranslation()
    const [title, setTitle] = useState<string>('');
    const router = useRouter()

    // const promptId = "preAnalysisImages"

    const onUploaded = (data: any[]) => {
        setResources(data)
    }

    return <XFlex vertical block align={'center'} gap={10}
                  style={{
                      maxWidth: 700,
                      padding: 15,
                      background: themeVars.colorBgContainerPrimary,
                      borderRadius: 10,
                      maxHeight: 400,
                      overflowY: "scroll",
                      width: '100%'
                  }}>
        <Uploader
            max={12}
            accept={'.png,.jpg,.jpeg'}
            onUploaded={(data) => onUploaded(data)}
        >
        </Uploader>
        <Input.TextArea
            value={title}
            onChange={v => setTitle(v.target.value)}
            placeholder={t('inputImagesTitle')}
        />
        <XFlex align={'center'} block justify={'space-between'}>
            <ProfileSelector selected={selectedXhsProfile} onChange={setSelectedXhsProfile}
                             platforms={['xiaohongshu']}/>

            {selectedXhsProfile && resources?.length && resources?.length > 0 &&
                <CreditCostNotificationV2 sessionId={sessionId} scene={scene} promptId={promptId}
                                          resources={title ? resources?.concat({
                                              content: title,
                                              category: 'title',
                                              mimeType: 'text/plain'
                                          }) : resources} personalProfile={selectedXhsProfile}/>
            }

            {!selectedXhsProfile && <Button disabled type={'primary'} shape={'round'}>请先绑定您的账号</Button>}
        </XFlex>
    </XFlex>
}

export default ImagesInputArea
