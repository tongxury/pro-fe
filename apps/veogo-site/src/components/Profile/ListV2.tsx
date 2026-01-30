import {useXTheme, XCardSelector, XFlex, XSelector, XText} from "@pro/ui";
import {Button, Card, Select} from "antd";
import IconFont from "@/components/Iconfont";
import ModalOrDrawerTrigger from "@/components/ModalOrDrawerTrigger";
import {useState} from "react";
import Add from "@/components/Profile/Add";
import {useFetchProfiles, useListProfiles} from "@/api/api";
import {useTranslation} from "@/hooks/useTranslation.ts";


const ProfileList = ({onComplete}: { onComplete: () => void }) => {

    const {themeVars} = useXTheme()

    const options = [
        {value: 'xiaohongshu', label: '小红书', icon: <IconFont name={'xiaohongshu'}/>},
        {value: 'douyin', label: '抖音'},
    ]
    const [platform, setPlatform] = useState();

    const [data, {loading}] = useListProfiles({platform})

    const t = useTranslation()

    return <XFlex vertical style={{padding: 10}}>
        <ModalOrDrawerTrigger
            renderTrigger={(open) => {
                return <Button onClick={open} block type={'dashed'}>添加社媒账号</Button>
            }}
            renderBody={(close) => {
                return <Add onComplete={onComplete}/>
            }
            }/>
        <XText>{JSON.stringify(data)}</XText>
    </XFlex>
}

export default ProfileList
