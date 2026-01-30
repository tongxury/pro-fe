import {Alert} from "antd";
import {getServerMetadata} from "@/api/metadata.ts";
import {ReactNode, useEffect, useState} from "react";


const RegionNotification = () => {

    const [text, setText] = useState<ReactNode>()

    useEffect(() => {
        getServerMetadata().then(result => {
            // 海外用户访问中文站，推荐去 ai 站
            if (result.data?.countryCode && result.data?.countryCode != "CN") {
                if (import.meta.env.VITE_LOCALE === "zh") {
                    setText(
                        <>
                            <p><strong>检测到您来自海外地区</strong>
                                请您访问我们为海外用户特别优化的
                                <strong><a href={'https://veogo.ai/scenes/leaderboard'}> https://veogo.ai </a></strong>
                                站点, 可获得更快的访问速度。否则可能出现<a>无法上传、卡顿等问题严重影响您的使用体验</a>，请您谅解。
                                <span style={{color: 'yellow'}}>我们会为您同步 2025-06-23 12:00:00
                                    前的数据，在这之后的数据两个站点之间是相互独立的。</span>
                            </p>


                        </>
                    )
                }
            } else {
                // 国内用户访问英文站，推荐去 cn 站
                if (import.meta.env.VITE_LOCALE != "zh") {
                    setText(
                        <>
                            <p><strong>我们检测到您来自中国大陆</strong> 请您访问我们为国内用户特别优化的 <strong><a
                                target={'_blank'}
                                href={'https://veogo.cn/scenes/leaderboard'}>https://veogo.cn</a></strong> 站点,
                                可获得更快的访问速度。否则可能出现<a>无法上传、卡顿等问题严重影响您的使用体验</a>，请您谅解。
                                <span style={{color: 'yellow'}}>我们会为您同步 2025-06-23 12:00:00
                                    前的数据，在这之后的数据两个站点之间是相互独立的。</span>
                            </p>

                        </>
                    )
                }
            }
        })

    }, [])

    // if (!notNotifyAnyMore) {
    //
    //
    //     getServerMetadata().then(result => {
    //         // 海外用户访问中文站，推荐去 ai 站
    //         if (result.data?.countryCode && result.data?.countryCode != "CN") {
    //             if (import.meta.env.VITE_LOCALE === "zh") {
    //                 modal.confirm({
    //                     icon: <CheckCircleFilled style={{color: 'green'}}/>,
    //                         title: '检测到您来自海外地区',
    //                         content: (
    //                             <div>
    //                                 <p>🌍 我们为海外用户特别优化了 <strong>veogo.ai</strong> 站点,
    //                                     更快的访问速度、更稳定的服务体验，让您畅享无阻</p>
    //                                 <p style={{color: 'yellow'}}>我们只为您同步 2025-06-23
    //                                     12:00:00 前的数据，在这之后的数据两个站点之间是相互独立的</p>
    //
    //                             </div>
    //                         ),
    //                         cancelText: '留在当前网站,并不再提示',
    //                         onCancel() {
    //                         },
    //                         okText: "立即前往",
    //                         onOk() {
    //                             setNotNotifyAnyMore(true)
    //                             window.location.href = "https://www.veogo.ai"
    //                         },
    //                     });
    //                 }
    //             } else {
    //                 // 国内用户访问英文站，推荐去 cn 站
    //                 if (import.meta.env.VITE_LOCALE != "zh") {
    //                     modal.confirm({
    //                         icon: <CheckCircleFilled style={{color: 'green'}}/>,
    //                         title: '检测到您来自中国大陆',
    //                         content: (
    //                             <div>
    //                                 <p>🇨🇳
    //                                     我们检测到您来自中国大陆，为您推荐 <strong>veogo.cn</strong> 中文站,专为国内用户优化，访问更快、内容更贴合、服务更贴心
    //                                 </p>
    //                                 <p style={{color: 'yellow'}}>我们只为您同步2025-06-23
    //                                     12:00:00前的数据，在这之后的数据两个站点之间是相互独立的</p>
    //                             </div>
    //                         ),
    //                         okText: "立即前往",
    //                         cancelText: '留在当前网站,并不再提示',
    //                         okButtonProps: {},
    //                         onOk() {
    //                             setNotNotifyAnyMore(true)
    //                             window.location.href = "https://www.veogo.cn"
    //                         },
    //                     });
    //                 }
    //             }
    //         }
    //     )
    // }

    if (!text) return null;

    return (
        <Alert style={{paddingBlock: 0}} message={text} type="warning"/>
    )
}

export default RegionNotification;
