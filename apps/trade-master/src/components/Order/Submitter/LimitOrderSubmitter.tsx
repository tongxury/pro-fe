import {useXTheme, XFlex, XText} from "@pro/ui";
import React, {cloneElement, CSSProperties, ReactElement} from "react";
import {useTranslation} from "react-i18next";
import {Modal, notification} from "antd";
import {CreateOrderParams, Order} from "@/types";
import IconFont from "@/components/Iconfont";
import {createLimitOrder} from "@/api/order.ts";
import useOrderSettings from "@/hooks/useOrderSettings.ts";

function LimitOrderSubmitter({params: {token, side, amount, amountRate, price}, onSubmitted, children, styles,}: {
    params: CreateOrderParams,
    onSubmitted?: (order?: Order) => void,
    styles?: {
        okButton?: CSSProperties
    }
    children: ReactElement
}) {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()

    const color = customVars?.['color_' + side]

    const [notify, contextHolder] = notification.useNotification({
        maxCount: 1, placement: 'top', duration: 0
    });
    const {settings} = useOrderSettings()

    const disabled = !(amount && price)

    const onSubmit = () => {
        // showConfirm(side, () => {
        notify.open({
            icon: <IconFont size={30} name={'information-fill'} color={color}/>,
            message: <XText size={17}>{t('limitOrderInProgress')}</XText>,
            // closable: false,
            description: <XFlex align={'center'} gap={5}>
                <XText color={color}>{amount}</XText>
            </XFlex>
        });

        createLimitOrder({token: token._id || token.id, side, amount, amountRate, priceUSD: price, settings})
            .then(result => {
                if (result.code) {
                    notify.open({
                        closable: false,
                        icon: <IconFont name={'close-circle-fill'} size={30} color={themeVars.colorError}/>,
                        message: <XText size={17}>{t('orderFailedTitle')}</XText>,
                        description: <XText size={14} color={themeVars.colorTextL2}>{t(result.code)}</XText>,
                        showProgress: true,
                        duration: 5,
                    });
                } else {
                    notify.open({
                        closable: false,
                        icon: <IconFont name={'checkbox-circle-fill'} size={30} color={color}/>,
                        message: <XText size={17}>{t('limitOrderCreated')}</XText>,
                        showProgress: true,
                        duration: 2,
                    });
                }
                onSubmitted?.(result.data)

            })
        // })
    }


    const showConfirm = (e) => {

        e.stopPropagation()

        Modal.confirm({
            title: <XFlex align={'center'} gap={5}>
                <IconFont name={'money-dollar-circle-fill'} size={30}
                          color={customVars?.['color_' + side]}/>
                <XText bold size={18}>{t(`confirmTitle_${side}`)}</XText>
            </XFlex>,
            icon: null,
            closable: false,
            // content: <XFlex align={'center'} gap={5}>
            //     <Checkbox onChange={e => {
            //         setHideConfirm?.(e.target.checked)
            //     }}/>
            //     <XText color={themeToken.colorTextL1}>{t(`confirmNoMoreNotify_${side}`)}</XText>
            // </XFlex>,
            onOk() {
                onSubmit();
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
                shape: 'round', size: 'large', type: 'primary',

                style: {width: '100%', background: color, ...styles?.okButton},
            },
            footer: (_, {OkBtn, CancelBtn}) => {
                return <XFlex align={'center'} gap={10}>
                    <CancelBtn/>
                    <OkBtn/>
                </XFlex>
            },

        });
    }


    // return <div onClick={showConfirm}>{children}</div>
    return <>
        {contextHolder}
        {
            cloneElement(children, {
                ...children.props,
                onClick: showConfirm,
                disabled,
                style: {
                    ...children.props.style,
                    background: disabled ? undefined : color
                }
            })
        }
    </>

}

export default LimitOrderSubmitter
