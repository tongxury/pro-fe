import {useXTheme, XFlex, XGlowingButton, XImage, XText} from "@pro/ui";
import React, {useEffect} from "react";
import {useRouter} from "@/i18n/routing";
import {Button, Card, Col, Row, Typography} from "antd";
import ReactSeamlessScroll from 'react-seamless-scroll';
import FAQAccordion from "./FAQ";
import GradientOverlay from "@/components/GradientOverlay";

import BreathingButton from "@/components/BreathingButton";
import {useBreathingStyle} from "@pro/hooks";
import Footer from "./Footer";
import {useGlobalState} from "@/hooks/global";
import {useTranslations} from "@/hooks/useTranslation.ts";
import {sendEvent} from "@/api/event.ts";
import {useSearchParams} from "react-router";
import {getCookie} from "@/utils";

const users = {
    top: [
        {
            name: '陈屿尘',
            fans: '31.63w',
            image: "https://oscar-res.oss-cn-hongkong.aliyuncs.com/avatar/1040g2jo30p93vi853o0048delmemaoavhfdnp10.jpeg"
        },
        {
            name: '切尔西的一天',
            fans: '28.16w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/5eeb0a1718596000017fbc4e.jpg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '是阿齐呀🍿',
            fans: '91.34w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/64ba2e9e04153bc0d2854068.jpg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '安吉林Angelene',
            fans: '67.61w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31cfhtn0h0u005n3e5bl409nt8kpaf4g?imageView2/2/w/120/format/jpg'
        },
        {
            name: 'ZXD_路',
            fans: '92.45w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31d5epcjfgm0049o5m1mnjce0e70vcbg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '腔调vic',
            fans: '129.47w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/5b379907d1d3b95fc77e91d3.jpg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '路魔哥',
            fans: '48.27w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo316sk9345466g5olujvn5bmpv6tvlha8?imageView2/2/w/540/format/webp'
        },
        {
            name: '曾老师的小世界',
            fans: '57.64w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo313n5ru8fhq0g490l9cho7hj38sli6jo?imageView2/2/w/120/format/jpg'
        },
        {
            name: '财经林妹妹',
            fans: '11.84w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo317cd3lh04400452k99ptv64iuns2ol0?imageView2/2/w/120/format/jpg'
        }
    ],
    bottom: [
        {
            name: '皓晨同学',
            fans: '11.34w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30qrk0ip2gq005orp12p7rvjgg3nakl8?imageView2/2/w/540/format/webp'
        },
        {
            name: 'ki酱の在日iP问答',
            fans: '2.28w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31der5dau100040njgedbmo86sjm4hng?imageView2/2/w/540/format/webp'
        },
        {
            name: '营养师李俊峰',
            fans: '11.90w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/64679ef5aab3394b5ec9b460.jpg?imageView2/2/w/540/format/webp'
        },
        {
            name: '英语跨境主播Helen',
            fans: '6.76w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30q0mamva76005orj3so7r8urrlnel58?imageView2/2/w/540/format/webp'
        },
        {
            name: '安妮老师',
            fans: '9.87w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31fifu9fa7e005oliifsmd548lc6e59g?imageView2/2/w/120/format/jpg'
        },
        {
            name: '加拿大俩哥特',
            fans: '41.57w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/63eae2735c01a20f608aa9c8.jpg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '喵哒_miaoda',
            fans: '54.59w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/641a66d0cafb537ac046e85d.jpg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '小温夫妻测评',
            fans: '1.79w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/647ee2eec66cea47a1fabefa.jpg?imageView2/2/w/120/format/jpg'
        },
        {
            name: '黑评测',
            fans: '76.11w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo317ble8l3ka005oa1m0vgj41l23vnin8?imageView2/2/w/120/format/jpg'
        },
        {
            name: '营养师黑皮',
            fans: '31.15w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30qno9gev0o505om2f466d1a2e4tunro?imageView2/2/w/120/format/jpg'
        },
        {
            name: '发财学姐',
            fans: '60.43w',
            image: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30utqc4ekli0g5nbadfm08r4flkhi5t0?imageView2/2/w/120/format/jpg'
        },
    ]
}

export default function Home() {

    const {isMobile} = useGlobalState()

    const router = useRouter()
    const {themeVars, customVars} = useXTheme()
    const t = useTranslations('Default')

    const breathingStyle = useBreathingStyle()

    useEffect(() => {
        void sendEvent({name: 'visit', params: {xhsClickId: getCookie("xhs_click_id") || ""}})
    }, [])

    return (
        <div style={{marginTop: 100}}>

            <XFlex vertical gap={isMobile ? 50 : 120} align={'center'}
                   style={{
                       padding: 10,
                       paddingTop: isMobile ? 10 : 50,
                       marginInline: 'auto',
                       maxWidth: 1300,
                       width: '100%'
                   }}>

                {/*<XText>{JSON.stringify(device)}</XText>*/}
                <XFlex vertical align={'center'} gap={30} style={{marginTop: isMobile ? 10 : 50, paddingInline: 20}}>
                    <XText color={themeVars.colorL1}>{t('homeHashtag')}</XText>

                    <Typography.Text
                        style={{textAlign: 'center', color: themeVars.colorTextPrimary}}>
                        {/*<Typography.Text*/}
                        {/*    style={{fontSize: isMobile ? 25 : 50}}>{t('homeTitleP1')}</Typography.Text>*/}
                        <Typography.Text style={{
                            fontSize: isMobile ? 25 : 50,
                            background: `linear-gradient(135deg, ${themeVars.colorPrimary}, ${themeVars.colorL1}, ${themeVars.colorL2})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>{t('homeTitleP2')}</Typography.Text>
                        <Typography.Text style={{fontSize: isMobile ? 25 : 50}}>{t('homeTitleP3')}</Typography.Text>
                    </Typography.Text>
                    {/*<XText size={isSmall ? 25 : 50}*/}
                    {/*       style={{lineHeight: 1.5, fontWeight: 500, textAlign: 'center'}}>{t('homeTitleP1')}</XText>*/}
                    {/*<XText size={isSmall ? 25 : 50}*/}
                    {/*       style={{lineHeight: 1.5, fontWeight: 500, textAlign: 'center'}}>{t('homeTitleP2')}</XText>*/}
                    <XText size={15} color={themeVars.colorTextL2}
                           style={{textAlign: 'center', lineHeight: 1.5}}>{t('homeSubTitle')}</XText>
                </XFlex>

                <XGlowingButton onClick={() => {
                    router.push('/scenes/leaderboard')
                }} style={{...breathingStyle}}>{t('tryNow')}</XGlowingButton>

                {/*<XFlex center*/}
                {/*       onClick={() => {*/}
                {/*           router.push("/dashboard")*/}
                {/*       }}*/}
                {/*       style={{*/}
                {/*           height: 50,*/}
                {/*           borderRadius: 30,*/}
                {/*           background: themeVars.colorTextPrimary,*/}
                {/*           width: 200,*/}
                {/*           ...breathingStyle,*/}
                {/*           // transition: 'all 0.2s'*/}
                {/*       }}>*/}
                {/*    立即使用*/}
                {/*</XFlex>*/}

                <GradientOverlay>
                    <XFlex vertical gap={40} align={'center'}>
                        <XText>{t('usersTitle')}</XText>

                        <ReactSeamlessScroll speed={15} mode={'horizontal'}
                                             style={{height: 110, marginInline: 40,}}>
                            <XFlex align={'center'}>
                                {users.top.map(x =>
                                    <XFlex vertical align={'center'} style={{marginInline: 40}} gap={10}>
                                        <XImage style={{height: 50, width: 50}} circle src={x.image}/>
                                        <XText weight={500}>{x.name}</XText>
                                        <XText color={themeVars.colorTextL2}>{x.fans}</XText>
                                    </XFlex>
                                )}
                            </XFlex>
                        </ReactSeamlessScroll>
                        <ReactSeamlessScroll reverse speed={15} mode={'horizontal'}
                                             style={{height: 110, marginInline: 40,}}>
                            <XFlex align={'center'}>
                                {users.bottom.map((x, i) =>
                                    <XFlex key={i} vertical align={'center'} style={{marginInline: 40}} gap={10}>
                                        <XImage style={{height: 50, width: 50}} circle src={x.image}/>
                                        <XText weight={500}>{x.name}</XText>
                                        <XText color={themeVars.colorTextL2}>{x.fans}</XText>
                                    </XFlex>
                                )}
                            </XFlex>
                        </ReactSeamlessScroll>

                    </XFlex>
                </GradientOverlay>
                {/*https://assets-global.website-files.com/6388604483b03a9ecb34d695/657d5b66bcb648163f99fc06_Footer%20video-transcode.mp4*/}
                <Row gutter={[20, 20]} style={{width: '100%'}}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card bordered={false}>
                            <XFlex vertical align={'center'} gap={10}>
                                <XFlex gap={10} align={'center'}>
                                    <Row gutter={10}>
                                        <Col span={15}>
                                            <video autoPlay loop
                                                   style={{
                                                       width: '100%',
                                                       borderRadius: 10,
                                                       border: '1px solid ' + themeVars.colorBorder,
                                                   }}
                                                   src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/home/459_1743510478.mp4"}>
                                                <source
                                                    src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/home/459_1743510478.mp4"}/>
                                            </video>
                                        </Col>
                                        <Col span={9} style={{}}>
                                            <img
                                                src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/home/4601743510505_.pic.jpg"}
                                                style={{
                                                    borderRadius: 10,
                                                    aspectRatio: 9 / 17,
                                                    width: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                alt={''}/>
                                        </Col>
                                    </Row>
                                </XFlex>
                                <BreathingButton onClick={() => router.push('/pub-detection?id=10000000000000')}
                                                 type={'primary'}>
                                    {t('viewFullReport')}
                                </BreathingButton>
                                {/*<Button style={{width: 100}}>fsafsd</Button>*/}
                            </XFlex>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Card bordered={false}>
                            <XFlex vertical align={'center'} gap={10}>
                                <XFlex gap={10} align={'center'}>
                                    <Row gutter={10}>
                                        <Col span={15}>
                                            <video autoPlay loop
                                                   style={{
                                                       width: '100%',
                                                       borderRadius: 10,
                                                       border: '1px solid ' + themeVars.colorBorder,
                                                   }}
                                                   src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/avatar/458_1743510040.mp4"}>
                                                <source
                                                    src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/avatar/458_1743510040.mp4"}/>
                                            </video>
                                        </Col>
                                        <Col span={9} style={{}}>
                                            <img
                                                src={"https://oscar-res.oss-cn-hongkong.aliyuncs.com/home/4611743510510_.pic.jpg"}
                                                style={{
                                                    borderRadius: 10,
                                                    aspectRatio: 9 / 17,
                                                    width: '100%',
                                                    objectFit: 'cover'
                                                }}
                                                alt={''}/>
                                        </Col>
                                    </Row>
                                </XFlex>
                                <BreathingButton type={'primary'}
                                                 onClick={() => router.push('/pub-detection?id=10000000000001')}>
                                    查看完整报告
                                </BreathingButton>
                                {/*<Button style={{width: 100}}>fsafsd</Button>*/}
                            </XFlex>
                        </Card>
                    </Col>
                </Row>


                {/*{*/}
                {/*    [1, 2, 3, 4, 5].map(x =>*/}
                {/*        <Into*/}
                {/*            title={t(`intro${x}Title`)}*/}
                {/*            desc={t(`intro${x}Desc`)}*/}
                {/*            comment={`"${t(`intro${x}Comment`)}"`}*/}
                {/*            commentUser={t(`intro${x}User`)}*/}
                {/*        />*/}
                {/*    )*/}
                {/*}*/}

                <FAQAccordion isSmall={isMobile}/>

                <GradientOverlay>
                    <div
                        onClick={() => {
                            router.push("/scenes/leaderboard")
                        }}
                        style={{
                            cursor: 'pointer',
                            position: 'relative',
                            width: '100%',
                            overflow: 'hidden',
                        }}>
                        <div style={{
                            width: '100%',
                            position: 'relative',
                            zIndex: 1,
                        }}>
                            <video autoPlay loop
                                   src={'https://assets-global.website-files.com/6388604483b03a9ecb34d695/657d5b66bcb648163f99fc06_Footer%20video-transcode.mp4'}>

                                <source
                                    src={'https://assets-global.website-files.com/6388604483b03a9ecb34d695/657d5b66bcb648163f99fc06_Footer%20video-transcode.mp4'}/>
                            </video>

                        </div>
                        <XFlex gap={30} vertical

                               center
                               style={{
                                   position: 'absolute',
                                   top: 0,
                                   left: 0,
                                   right: 0,
                                   bottom: 0,
                                   zIndex: 2,
                                   // 使用多个渐变创建透明中间+黑色边缘的效果
                                   background: `
      linear-gradient(to right, ${themeVars.colorBgPrimary} 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 50%, ${themeVars.colorBgPrimary}  100%),
      linear-gradient(to bottom, ${themeVars.colorBgPrimary} 0%, rgba(0, 0, 0, 0.1) 40%, rgba(0, 0, 0, 0.1) 60%, ${themeVars.colorBgPrimary}  100%);
    `,
                                   pointerEvents: 'none', // 允许点击下方的内容
                               }}>
                            {/*<XText bold size={isMobile ? 25 : 40}>{t('videoText')}</XText>*/}
                            <div


                                style={{
                                    // zIndex: 3,
                                    cursor: 'pointer',
                                    background: themeVars.colorPrimary,
                                    color: themeVars.colorTextPrimary,
                                    paddingBlock: 15,
                                    paddingInline: 40,
                                    borderRadius: 50
                                }}>
                                {t('videoText')}
                            </div>
                        </XFlex>
                    </div>
                </GradientOverlay>
            </XFlex>
            <Footer/>
        </div>

    );
}
