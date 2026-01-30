import {useXTheme, XFlex, XImage, XTag} from "@pro/ui";
import {Trans, useTranslation} from "react-i18next";
import useLaunchValues from "@/hooks/useLaunchParams.ts";


function Banner({titleI18nKey, descI18nKey, buttonText, image, onClick}: {
    titleI18nKey: string,
    descI18nKey: string,
    buttonText: string,
    image: any,
    onClick: () => void
}) {

    const {themeVars} = useXTheme()

    const {t} = useTranslation()

    const {locale} = useLaunchValues()
    const isZh = locale?.startsWith('zh')

    return <div onClick={onClick}>
        <XFlex justify={'space-between'} align={'center'} padding={15}>
            <XFlex vertical
                   height={ 100}
                   justify={'space-between'}
            >
                <div style={{fontSize: isZh ? 16: 14}}>
                    <Trans
                        i18nKey={titleI18nKey}
                        components={{
                            A: <span
                                style={{
                                    fontWeight: 800,
                                    color: themeVars.colorPrimary
                                }}/>
                        }}
                    />
                </div>
                <div style={{fontSize: 10, maxWidth: 150}}>
                    <Trans
                        i18nKey={descI18nKey}
                        components={{
                            A: <span style={{fontWeight: 800,}}/>
                        }}
                    />
                </div>
                <XTag>{t(buttonText)}</XTag>
            </XFlex>
            <XImage style={{objectFit: 'contain'}} src={image} w={150} h={100}/>
        </XFlex>
    </div>
}

export default Banner