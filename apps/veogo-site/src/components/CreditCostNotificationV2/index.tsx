import React, {useState} from 'react';
import {Button, Modal, Switch, Typography} from 'antd';
import {useXTheme, XFlex} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import {useLocalStorageState} from "ahooks";
import {addSessionV3} from "@/api/api";
import {useTranslation} from "@/hooks/useTranslation.ts";
import {useRouter} from "@/hooks/useRouter.tsx";
import {getCost, getFunConfig} from "@/constants/quota.ts";

const CreditCostNotificationV2 =
    ({
         sessionId,
         scene,
         promptId,
         resources,
         personalProfile,
     }: {
        sessionId: string
        scene: string,
        promptId: string,
        resources: any[],
        personalProfile?: any
    }) => {
        const {themeVars} = useXTheme()
        const [open, setOpen] = useState(false);
        const t = useTranslation()

        const router = useRouter()
        // const {selectedProfile, selectedXhsProfile,} = useGlobalState()

        const [submitting, setSubmitting] = useState(false)

        const [neverShow, setNeverShow] = useLocalStorageState(`creditCostNeverShow_${scene}_${promptId}`, {defaultValue: false})

        const handleConfirm = () => {
            confirm();
        };

        const handleClick = () => {
            if (neverShow) {
                confirm();
            } else {
                setOpen(true)
            }
        }

        const confirm = () => {
            setSubmitting(true)

            // const version =
            //     (promptId === "limitAnalysisImages" ||
            //         promptId === "limitAnalysis" ||
            //         promptId === "preAnalysis" ||
            //         promptId === "preAnalysisImages" ||
            //         promptId === "coverAnalysisImages"
            //     )
            //         ? "V5" : "V3"

            const version = "V5"

            // console.log('selectedProfile', selectedProfile)

            const getProfileContent = (profile: any) => {

                const result = {
                    "followerCount": String(profile.followerCount),
                    "likedCount": String(profile.likedCount),
                    "platform": String(profile.platform),
                    "sign": String(profile.sign || ''),
                    "username": String(profile.name || profile.username || ''),
                }

                if (profile?.noteCount != "0") {
                    // @ts-ignore
                    result["noteCount"] = String(profile.noteCount)
                }


                // //  repeated string  tags = 8;
                // string followingCount = 9;
                // string  followerCount = 10;
                // string likedCount = 11;
                // string  noteCount = 12;
                // //  int64 followers = 13;
                // string platform = 14;

                return result;
            };

            const finalResources = personalProfile ? [...resources,
                {
                    mimeType: 'text/plain',
                    category: 'personalProfile',
                    content: JSON.stringify(personalProfile),
                    meta: getProfileContent(personalProfile),
                }] : resources

            addSessionV3({sessionId, scene, resources: finalResources, version}).then((r) => {
                if (!r.code) {
                    router.push(`/scenes/${scene}/sessions/${sessionId}?promptId=${promptId}`)
                }
            })

        }

        const funConfig = getFunConfig(scene, promptId)


        return (
            <>
                <Button
                    type="primary"
                    loading={submitting}
                    onClick={handleClick}
                    icon={
                        <XFlex align="center" gap={1}>
                            <IconFont name="shandian" size={18} color={themeVars.colorTextPrimary}/>
                            {getCost(scene, promptId)}
                        </XFlex>
                    }
                >
                    {t(funConfig?.title)}
                </Button>

                <Modal
                    open={open}
                    footer={null}
                    styles={{root: {padding: 10}}}
                    closable={false}
                    width={400}
                    centered
                    destroyOnHidden
                    // className="credit-cost-modal"
                >
                    <XFlex vertical gap={20} style={{padding: '32px 24px'}}>

                        {/* 标题和积分信息 */}
                        <XFlex vertical gap={16} align="center">
                            {/*{*/}
                            {/*    funConfig?.cannotRefund && <div style={{*/}
                            {/*        fontSize: 24,*/}
                            {/*        fontWeight: 600,*/}
                            {/*        background: `linear-gradient(135deg, ${themeVars.colorPrimary} 0%, ${themeVars.colorL1} 100%)`,*/}
                            {/*        WebkitBackgroundClip: 'text',*/}
                            {/*        WebkitTextFillColor: 'transparent',*/}
                            {/*    }}>*/}
                            {/*        本功能使用后将不再支持退款*/}
                            {/*    </div>*/}
                            {/*}*/}

                            <XFlex vertical gap={8} align="center">
                                <div style={{fontSize: 16, color: themeVars.colorTextPrimary}}>
                                    本次操作将消耗
                                    <span style={{
                                        color: themeVars.colorPrimary,
                                        fontSize: 20,
                                        fontWeight: 600,
                                        margin: '0 4px'
                                    }}>
                                    {getCost(scene, promptId)}
                                </span>
                                    积分
                                </div>
                                {/*<div style={{*/}
                                {/*    fontSize: 15,*/}
                                {/*    color: themeVars.colorTextL2,*/}
                                {/*    opacity: 0.8*/}
                                {/*}}>*/}
                                {/*    助您优化内容策略，提升作品表现，创造更多爆款机会*/}
                                {/*</div>*/}
                                {/*{*/}
                                {/*    cannotRefund && <Typography.Text style={{color: 'red'}}>*/}
                                {/*        本功能使用后将不再支持退款。*/}
                                {/*    </Typography.Text>*/}
                                {/*}*/}

                            </XFlex>
                        </XFlex>

                        {/* 按钮组 */}
                        <XFlex vertical gap={16} style={{width: '100%'}}>
                            <Button
                                type="primary"
                                loading={submitting}
                                size="large"
                                style={{
                                    // height: 48,
                                    background: `linear-gradient(135deg, ${themeVars.colorPrimary} 0%, ${themeVars.colorL1} 100%)`,
                                    border: 'none',
                                    // fontSize: 16,
                                    fontWeight: 500,
                                }}
                                onClick={handleConfirm}
                            >
                                {t(funConfig?.title)}
                            </Button>
                            <Button
                                size="large"
                                style={{
                                    // height: 48,
                                    // fontSize: 16,
                                    border: `1px solid ${themeVars.colorBorder}`,
                                    color: themeVars.colorTextL2,
                                }}
                                onClick={() => setOpen(false)}
                            >
                                稍后再试
                            </Button>
                        </XFlex>

                        {/* 不再提示选项 */}
                        <XFlex
                            justify="center"
                            align="center"
                            gap={8}
                            style={{
                                color: themeVars.colorTextL2,
                                fontSize: 14,
                            }}
                        >
                            <Switch
                                size="small"
                                checked={neverShow}
                                onChange={(checked) => setNeverShow(checked)}
                            />
                            <span>此功能不再提示</span>
                        </XFlex>
                    </XFlex>
                </Modal>

                {/*/!* 添加全局样式 *!/*/}
                {/*<style jsx global>{`*/}
                {/*    .credit-cost-modal .ant-modal-content {*/}
                {/*        border-radius: 16px;*/}
                {/*        overflow: hidden;*/}
                {/*        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);*/}
                {/*    }*/}
                {/*    */}
                {/*    .credit-cost-modal .ant-btn:hover {*/}
                {/*        transform: translateY(-1px);*/}
                {/*        transition: all 0.2s ease;*/}
                {/*    }*/}
                {/*`}</style>*/}
            </>
        );
    };

export default CreditCostNotificationV2;
