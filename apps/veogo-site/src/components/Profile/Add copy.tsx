import {useXTheme, XCardSelector, XFlex, XSelector, XText} from "@pro/ui";
import {Button, Card, Dropdown, Input, message, Select} from "antd";
import IconFont from "@/components/Iconfont";
import React, {useState} from "react";
import {addProfile} from "@/api/api";
import {useGlobalState} from "@/hooks/global";
import { useTranslation } from "@/hooks/useTranslation";


const Add = ({platforms, onComplete}: { platforms?: string[], onComplete: () => void }) => {
    const {themeVars} = useXTheme()
    const t = useTranslation()
    const {selectedProfile, setSelectedProfile, setSelectedXhsProfile} = useGlobalState()


    const options = [
        {value: 'douyin', label: t('douyin')},
        {value: 'tiktok', label: t('tiktok')},
        {value: 'xiaohongshu', label: t('xiaohongshu')},
    ].filter(x => platforms?.length ? platforms?.includes(x.value) : true)

    const [platform, setPlatform] = useState(options[0].value);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);


    const onLinkAdded = (e: any) => {

        if (!keyword) return
        setLoading(true)

        addProfile({platform, keyword, link: keyword,}).then(res => {
            if (!res.code) {
                message.success({content: t('added')})
                // setAdding(false);
                setSelectedProfile(res.data)

                if (platform === 'xiaohongshu') {
                    setSelectedXhsProfile(res.data)
                }

                onComplete?.()
            } else {
                message.error({content: t(res.code)})
                setLoading(false)
            }
        })
    }


    return (
        <XFlex vertical gap={8}>
            <XFlex align={'center'} gap={10}>
                <XCardSelector
                    options={options}
                    value={platform}
                    onChange={x => setPlatform(x.value)}
                    renderItem={(x, selected) => {
                        return (
                            <XFlex
                                style={{
                                    padding: 8, borderRadius: 5,
                                    border: selected ? '1px solid ' + themeVars.colorPrimary : undefined
                                }}
                                align={'center'} gap={10}>

                                <IconFont size={25} name={x.value as any}/>
                                <XText>{x.label}</XText>
                            </XFlex>
                        )
                    }}/>

            </XFlex>

            {platform === "xiaohongshu" &&
                <XFlex vertical gap={5}>
                    <Input.TextArea value={keyword}
                                    placeholder={'例如: https://www.xiaohongshu.com/user/profile/xxxxx?channel_type=web_explore_feed&xsec_token=xxxxxx&xsec_source=pc_note'}
                                    onChange={e => setKeyword(e.target.value.trim())}/>
                    <Dropdown forceRender placement={'bottomRight'} popupRender={() => {
                        return <div
                            style={{background: themeVars.colorBgContainerPrimary, padding: 10, borderRadius: 10}}>
                            {/*<XText>fdsafsdfsd</XText>*/}
                            {/*<video autoPlay style={{width: 150, objectFit: 'contain'}}*/}
                            {/*       src={'https://oscar-res.oss-cn-hongkong.aliyuncs.com/app/upload_video_link.mp4'}></video>*/}
                            <video preload="metadata"
                                   autoPlay loop
                                   style={{width: 150, objectFit: 'contain'}}
                                   src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/app/copy_profile.mp4"}>
                                <source
                                    src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/app/copy_profile.mp4"}/>
                            </video>
                        </div>
                    }}>
                        <XText style={{cursor: 'pointer'}} size={12}
                               color={themeVars.colorPrimary + "88"}>如何获取主页链接？</XText>
                    </Dropdown>
                </XFlex>

            }
            {platform === "douyin" && <Input value={keyword} placeholder={t('input_tip_douyin')}
                                             onChange={e => setKeyword(e.target.value.trim())}/>}

            {platform === "tiktok" && <Input value={keyword} placeholder={t('input_tip_tiktok')}
                                             onChange={e => setKeyword(e.target.value.trim())}/>}


            <Button loading={loading} disabled={!keyword} block type={'primary'} onClick={onLinkAdded}>确认</Button>
        </XFlex>
    )
}

export default Add
