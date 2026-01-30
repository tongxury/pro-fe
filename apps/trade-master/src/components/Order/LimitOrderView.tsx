import {useXTheme, XFlex, XTag, XText} from "@pro/ui";
import {Button, Descriptions} from "antd";
import AmountView from "@/components/Amount";
import {TXHash} from "@pro/chain";
import {Order} from "@/types";
import {useTranslation} from "react-i18next";
import Confirm from "../Confirm";
import Token from "@/components/Views/Token";
import {formatTimeFromNow} from "@pro/hooks";
import useCurrentChain from "@/hooks/useCurrentChain.ts";
import useLaunchValues from "@/hooks/useLaunchParams.ts";

function MarketOrderView({x, onCancel}: { x: Order, onCancel?: (order: Order) => void }) {

    const {t} = useTranslation()
    const {themeVars, customVars} = useXTheme()

    const {locale} = useLaunchValues()
    const {chain} = useCurrentChain()

    return <XFlex
        padding={[8, 15, 8, 15]}
        align={'center'}
        // style={{border: '1px solid red'}}
        // onClick={() => {
        //     onItemClick(x)
        // }}
    >

        <XFlex vertical gap={10} block>
            <Token data={x.token} layout={'icon'}/>
            <XFlex align={'center'} gap={8}>
                <XTag size={'sm'}
                      bgColor={customVars?.['color_bg_' + x.side]}
                      textColor={customVars?.['color_' + x.side]}>
                    {t(x.category)}
                </XTag>
                <XTag size={'sm'}
                      bgColor={customVars?.['color_bg_' + x.side]}
                      textColor={customVars?.['color_' + x.side]}>
                    {t(x.side)}
                </XTag>
                {/*<XTag size={'sm'}*/}
                {/*      bgColor={custom?.['color_bg_' + x.status]}*/}
                {/*      textColor={custom?.['color_' + x.status]}>*/}
                {/*    {t(x.status)}*/}
                {/*</XTag>*/}
                <XText size={10} color={customVars?.['color_' + x.status]}>{t(x.status)}</XText>

            </XFlex>

            <XFlex vertical gap={15}>
                {
                    [
                        {
                            key: 'limitPrice',
                            label: t('limitPrice'),
                            children: <AmountView size={'sm'} type={'u'} data={x.oriPrice}/>
                        },
                        // 委托总量 token
                        ...(x.oriAmount ? [{
                            key: 'limitAmount',
                            label: `${t('limitAmount')}(${x.token?.metadata?.symbol})`,
                            children: <AmountView size={'sm'} type={'v'} data={x.oriAmount}/>,
                        }] : []),
                        // 委托总量
                        ...(x.oriQuoteAmount ? [{
                            key: 'limitOrderAmount',
                            label: `${t('limitAmount')}(${x.quoteToken?.metadata?.symbol})`,
                            children: <AmountView data={x.oriQuoteAmount} type={'v'} size={'sm'}/>,
                        }] : []),

                        ...(x.price ? [{
                            key: 'dealPrice',
                            span: 1,
                            label: `${t('dealPrice')}`,
                            children: <AmountView size={'sm'} type={'u'} data={x.price}/>
                        }] : []),
                        ...(x.amount ? [{
                            key: 'dealAmount',
                            span: 1,
                            label: `${t('dealAmount')}(${x.token?.metadata?.symbol})`,
                            children: <AmountView size={'sm'} type={'v'} data={x.amount}/>
                        }] : []),
                        ...(x.quoteAmount ? [{
                            key: 'dealOrderAmount',
                            span: 1,
                            label: `${t('dealOrderAmount')}(${chain.nativeToken?.metadata?.symbol})`,
                            children: <AmountView size={'sm'} type={'v'} data={x.quoteAmount}/>
                        }] : []),
                        {
                            key: 'orderTime',
                            label: t('orderTime'),
                            children: formatTimeFromNow(x.createdAt, locale),
                        },
                        {
                            key: 'expireTime',
                            label: t('expireTime'),
                            children: formatTimeFromNow(x.expiredAt, locale),
                        },

                        ...(x.tx ? [{
                            key: 'transactionHash',
                            span: 1,
                            label: `${t('transactionHash')}`,
                            children: <TXHash value={x.tx}/>,
                        }] : []),
                    ].map((x) => (
                        <XFlex key={x.key} align={'center'} justify={'space-between'} block>
                            <XText color={themeVars.colorTextL2}>{x.label}</XText>
                            <XText color={themeVars.colorTextPrimary}>{x.children}</XText>
                        </XFlex>
                    ))
                }
            </XFlex>

            {
                x.status === 'uncompleted' && onCancel &&
                <Confirm title={t('confirmToCancelOrder')} onConfirm={() => onCancel(x)}>
                    <Button block>{t('cancel')}</Button>
                </Confirm>
            }
        </XFlex>
    </XFlex>
}

export default MarketOrderView;
