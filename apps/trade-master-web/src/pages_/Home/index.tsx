'use client'
import {useXTheme, XDivider, XFlex, xLinearGradient, XLinearGradientText, XList, xPosition, XText} from "@pro/ui";
import React, {useState} from "react";
import {Button, Card} from "antd";
import IconFont from "@/components/Iconfont";
import {useTranslation} from "@/i18n/routing";
import {colorBgPrimary, constantineFont} from "@/providers/theme";
import Image from "next/image";
// import home_image from "@/assets/home_image.png";
import home_image from "@/assets/home.png";

export default function Home() {

    const [state, setState] = useState('a')

    const {themeVars, customVars} = useXTheme()
    const t = useTranslation()

    return (


        <XFlex vertical style={{maxWidth: 900, width: '100%', marginInline: 'auto', marginTop: 50,}}>
            {/* 1 */}
            <XFlex align={'center'} style={{}}>
                <XFlex vertical
                       style={{}}
                       gap={15}>


                    <XText style={{...constantineFont.style, maxWidth: 800, width: '100%', lineHeight: 1.2}}
                           size={45}>{t('homeTitle')}</XText>
                    <XText size={15} style={{maxWidth: 500, lineHeight: 1.5}}>{t('homeDesc')}</XText>
                    <XText size={15}>{t('homeExtraText')}</XText>

                    <div>
                        <Button
                            onClick={() => window.open(process.env.NEXT_PUBLIC_BOT_URL, '_blank')}
                            size={'large'}
                            variant={'text'}
                            icon={<IconFont
                                color={themeVars.colorTextPrimary}
                                size={22}
                                name={'send-fill'}/>}
                        >
                            {t('launchTelegramBot')}
                        </Button>
                    </div>

                </XFlex>


                <Image
                    src={home_image} alt={''}
                    style={{
                        zIndex: 999,
                        // ...xPosition({right: -80, bottom: -250}),
                        // left: 100,
                        // border: '1px solid blue',
                        // position: 'absolute',
                        marginRight: -80,
                        height: 500,
                        width: 500,
                        // objectFit: 'contain',
                        // ...xPosition({
                        //     // position: 'absolute',
                        //     // top: -120,
                        //     // left: 100
                        // })
                    }}/>
            </XFlex>

            {/*  2  */}
            <XFlex center style={{marginTop: 100}} vertical gap={30}>
                <XText size={22}>{t('s2Title')}</XText>

                <XFlex align={'center'} style={{}} gap={10}>
                    {[
                        {title: t('s2p1Title'), desc: t('s2p1Desc')},
                        {title: t('s2p2Title'), desc: t('s2p2Desc')},
                        {title: t('s2p3Title'), desc: t('s2p3Desc')},
                    ].map((x, i) => (
                        <XFlex key={i} vertical borderRadius={10}
                               style={{background: themeVars.colorBgContainerPrimary,}}>
                            <XText style={{margin: 'auto', padding: 20}}>{x.title}</XText>
                            <XFlex margin={[0, 10, 10, 10]} borderRadius={10} center padding={20}
                                   style={{background: themeVars.colorBgPrimary}}>
                                <XText>{x.desc}</XText>
                            </XFlex>
                        </XFlex>
                    ))
                    }
                </XFlex>
            </XFlex>

            <XFlex center style={{marginTop: 180}} vertical gap={30}>
                <XLinearGradientText
                    color={{
                        colorStops: [
                            themeVars.colorTextPrimary!,
                            themeVars.colorPrimary!,
                            // themeVars.colorPrimary!,
                            themeVars.colorTextPrimary!,
                        ]
                    }}
                    style={{textAlign: 'center'}}
                    size={50}>
                    {t('s3Title')}
                </XLinearGradientText>
            </XFlex>

            <XFlex style={{marginTop: 180}} vertical gap={30}>
                <XText size={22} style={{margin: 'auto'}}>{t('faqTitle')}</XText>
                <XList
                    dataSource={[
                        {q: t('q1'), a: t('a1')},
                        {q: t('q2'), a: t('a2')},
                        {q: t('q3'), a: t('a3')},
                        {q: t('q4'), a: t('a4')},
                        {q: t('q5'), a: t('a5')},
                        {q: t('q6'), a: t('a6')},
                    ]}
                    split={<XDivider/>}
                    renderItem={(x, i) => (
                        <XFlex vertical gap={10} padding={[30, 0, 30, 0]}>
                            <XText size={16}>{x.q}</XText>
                            <XText color={themeVars.colorTextL2}>{x.a}</XText>
                        </XFlex>
                    )}
                />
            </XFlex>

        </XFlex>
    );
}
