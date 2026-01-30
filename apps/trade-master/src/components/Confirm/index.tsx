import React, {cloneElement, CSSProperties, ReactElement, ReactNode} from "react";
import {Modal} from "antd";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";


function Confirm({title, content, icon, onConfirm, children, styles,}: {
    title: string,
    content?: ReactNode
    icon?: ReactNode,
    onConfirm?: () => void,
    styles?: {
        okButton?: CSSProperties
    }
    children: ReactElement
}) {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()

    const showConfirm = (e) => {

        e.stopPropagation()

        Modal.confirm({
            title: <XFlex align={'center'} gap={5}>
                {icon}
                <XText bold size={18}>{title}</XText>
            </XFlex>,
            icon: null,
            closable: false,
            content,
            // content: <XFlex align={'center'} gap={5}>
            //     <Checkbox onChange={e => {
            //         setHideConfirm?.(e.target.checked)
            //     }}/>
            //     <XText color={themeToken.colorTextL1}>{t(`confirmNoMoreNotify_${side}`)}</XText>
            // </XFlex>,
            onOk() {
                onConfirm?.();
            },
            centered: true,
            style: {maxWidth: 300},
            styles: {content: {background: themeVars.colorBgPrimary, margin: 0}},
            cancelButtonProps: {
                shape: 'round', type: 'primary', size: 'large',
                style: {background: themeVars.colorBgL1, width: '100%',},
            },
            okText: t('OK'),
            cancelText: t('cancel'),
            okButtonProps: {
                shape: 'round', size: 'large',

                style: {width: '100%', background: themeVars.colorPrimary, ...styles?.okButton},
            },
            footer: (_, {OkBtn, CancelBtn}) => {
                return <XFlex align={'center'} gap={10}>
                    <CancelBtn/>
                    <OkBtn/>
                </XFlex>
            },

        });
    }

    return cloneElement(children, {
        ...children.props,
        onClick: showConfirm,
    })

}

export default Confirm
