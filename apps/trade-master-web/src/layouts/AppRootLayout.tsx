'use client'
import {useXTheme, XFlex, xPosition, XText} from "@pro/ui";
import logo_title from "@/assets/logo_title_light.png"
import logo from "@/assets/logo.png"
import title from "@/assets/title.png"
import Image from "next/image";
import {Link, usePathname, useRouter, useTranslation} from "@/i18n/routing";


const AppRootLayout = ({children}: { children: any }) => {

    const {themeVars} = useXTheme()
    const t = useTranslation();

    const router = useRouter()
    const pathname = usePathname()

    return <XFlex
        vertical
        // background={'red'}
        style={{
            // ...xLinearGradient({
            //     colorStops: [themeVars.colorBgPrimary!, themeVars.colorBgPrimary!,themeVars.colorBgPrimary!, themeVars.colorPrimary!]
            // }),
            // background: 'red',
        }}>
        <XFlex block
               style={{
                   height: 100,
                   ...xPosition({top: 0}),

                   // background: themeVars.colorBgPrimary + "ef",
                   backdropFilter: 'blur(15px)',
               }}
        >
            <XFlex style={{maxWidth: 1100, paddingInline: 10, width: '100%', marginInline: 'auto'}} align={'center'}
                   justify={'space-between'}>
                <XFlex align={'center'} gap={20}>

                    <Image src={logo_title} style={{ width: 120, objectFit: 'contain'}} alt={''}/>

                    {/*<XFlex align={'center'}>*/}
                    {/*    <Image src={logo} style={{width: 60, height: 60}} alt={''}/>*/}
                    {/*    <Image src={title} style={{width: 100, height: 36}} alt={''}/>*/}
                    {/*</XFlex>*/}

                    <XFlex align={'center'} gap={20}>
                        <Link style={{textDecoration: 'none'}} href={process.env.NEXT_PUBLIC_BOT_URL!}
                              target={'_blank'}>
                            <XText weight={500}>{t('telegramBot')}</XText>
                        </Link>

                        {/*<Link style={{textDecoration: 'none'}} href={process.env.NEXT_PUBLIC_DOC_URL!}*/}
                        {/*      target={'_blank'}>*/}
                        {/*    <XText weight={500}>{t('learn')}</XText>*/}
                        {/*</Link>*/}

                    </XFlex>
                </XFlex>
            </XFlex>
        </XFlex>
        <div style={{paddingTop: 80}}>
            {children}
        </div>
    </XFlex>
}

export default AppRootLayout
