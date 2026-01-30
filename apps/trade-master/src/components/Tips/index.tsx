import IconFont from "@/components/Iconfont";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {Modal} from "antd";
import {ReactNode} from "react";
import {useTranslation} from "react-i18next";


function Tips({title, content}: { title: string | ReactNode, content?: string | ReactNode }) {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const click = (e) => {

        e.stopPropagation()

        Modal.info({
            title: <XFlex align={'center'} gap={5}>
                <IconFont name={'information-fill'} color={themeVars.colorPrimary}/>
                <XText bold size={18}>{title}</XText>
            </XFlex>,
            icon: null,
            content: <XText size={14}>{content}</XText>,
            centered: true,
            maskClosable: true,
            style: {maxWidth: 300},
            styles: {content: {background: themeVars.colorBgPrimary, margin: 0}},
            okButtonProps: {
                style: {
                    backgroundColor: themeVars.colorPrimary,
                }
            },
            okText: t('iSee'),
            onOk() {
            },
        });
    }

    return <IconFont onClick={click} name={'information-fill'} size={15} color={themeVars.colorTextL2}/>
}

export default Tips
