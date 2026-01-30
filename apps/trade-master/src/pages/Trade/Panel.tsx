import {useXTheme, XFlex, XSelector, XText} from "@pro/ui";
import {useEffect, useState} from "react";
import {Button, Checkbox, InputNumber, Select, Skeleton} from "antd";
import {Order, OrderCategory, Side, Token} from "@/types";
import IconFont from "@/components/Iconfont";
import {useTranslation} from "react-i18next";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import SliderInput from "@/components/SliderInput";
import OrderSubmitter from "@/components/Order/Submitter";
import AmountView from "@/components/Amount";
import useOrderSettings from "@/hooks/useOrderSettings.ts";
import Tips from "@/components/Tips";
import {useRequest} from "ahooks";
import {queryWalletPosition} from "@/api/wallet_position.ts";
import useCurrentChain from "@/hooks/useCurrentChain.ts";
import {SOLANA_TOKEN_ID} from "@/contants.ts";


function TradePanel({token, onSuccess}: { token: Token, onSuccess: (order: Order) => void }) {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()

    const {chain} = useCurrentChain()

    const {wallet} = useDefaultWallet(false)

    const {data: position, run: fetchPosition} = useRequest<any, any>(
        () => token?._id && queryWalletPosition({wallet: wallet?._id, token: token?._id}),)

    const {data: quotePosition, run: fetchQuotePosition} = useRequest<any, any>(
        () => queryWalletPosition({wallet: wallet?._id, token: SOLANA_TOKEN_ID}),)


    // const {wallet, fetch: fetchWallet} = useDefaultWallet(false)

    const [side, setSide] = useState<Side>('buy')
    const [category, setCategory] = useState<OrderCategory>('market_quick')
    const [amount, setAmount] = useState<number>()
    const [amountRate, setAmountRate] = useState<number>()

    const [price, setPrice] = useState<number | undefined>()
    const [autoSell, setAutoSell] = useState<boolean | undefined>()

    const {settings: orderSettings} = useOrderSettings(true)

    const onSubmitted = (order?: Order) => {
        if (order) {
            fetchQuotePosition()
            fetchPosition()

            onSuccess(order)
        }
    }

    useEffect(() => {

        fetchQuotePosition()
        fetchPosition()
        // (side === 'buy' ? fetchQuotePosition : fetchPosition)()
    }, [side, token?._id]);

    useEffect(() => {
        setAmount(undefined)
    }, [side, token?._id])

    // const quoteToken = useMemo(() => pool?.quoteToken || '', [pool]);
    // const token = useMemo(() => pool?.token, [pool]);

    if (!token) {
        return <Skeleton.Button block></Skeleton.Button>
    }

    return <XFlex gap={15} block>
        <XFlex vertical justify={'space-between'} style={{flex: 3}}>
            <XFlex vertical gap={15}>
                <XSelector
                    value={side}
                    onChange={option => setSide(option.value as Side)}
                    renderItem={(option, selected, index) => {
                        return <XFlex center
                                      style={{
                                          height: 35, borderRadius: 20,
                                          border: '1px solid ' + themeVars.colorBorder,
                                          background: selected ? option.color : themeVars.colorBgPrimary
                                      }}
                                      key={index}>
                            <XText>{option.label}</XText>
                        </XFlex>
                    }}
                    options={[
                        {value: 'buy', label: t('buy'), color: customVars?.['color_increase']},
                        {value: 'sell', label: t('sell'), color: customVars?.['color_decrease']}
                    ]}
                />

                <Select
                    style={{background: themeVars.colorBgPrimary}}
                    size={'large'}
                    value={category}
                    onChange={(value) => setCategory(value)}
                    options={[
                        {value: 'market_quick', label: t('market_quick')},
                        {value: 'market', label: t('market')},
                        {value: 'limit', label: t('limit')},
                    ]}>

                </Select>
                {
                    category === 'market_quick' &&
                    <XFlex vertical gap={5}>
                        <XSelector
                            style={{gap: 15}}
                            value={amount}
                            onChange={option => setAmount(option.value as number)}
                            renderItem={(option, selected, index) => {
                                return <XFlex center
                                              style={{
                                                  height: 45, borderRadius: 23,
                                                  border: '1px solid ' + themeVars.colorBorder,
                                                  background: selected ? customVars?.['colorQuickOrderOption_' + side] : themeVars.colorBgContainerPrimary
                                              }}
                                              key={index}>
                                    <XText>{option.label}</XText>
                                </XFlex>
                            }}
                            options={side === 'buy' ?
                                [0.1, 0.5, 1, 3, 10, 20].map(x => ({
                                    value: x, label: `${x} ${chain?.nativeToken?.metadata?.symbol || ''}`
                                })) :
                                [0.25, 0.33, 0.5, 0.6, 0.75, 1].map(x => ({
                                    value: x, label: `${x * 100}%`
                                }))
                            }
                        />
                        {
                            side === 'buy' && <XFlex align={'center'}>
                                <Checkbox onChange={e => setAutoSell(e.target.checked)}>
                                    <XText color={themeVars.colorTextL2} size={13}>
                                        {t('sellWhenPriceTwice')}
                                    </XText>
                                </Checkbox>
                                <Tips
                                    title={t('sellWhenPriceTwice')}
                                    content={t('sellWhenPriceTwiceDesc')}/>
                            </XFlex>
                        }
                    </XFlex>
                }
                {
                    category === 'market' &&
                    <SliderInput
                        value={amount}
                        unit={side === 'buy' ? chain?.nativeToken?.metadata?.symbol : token?.metadata?.symbol}
                        max={side === 'buy' ? quotePosition?.balance?.value : position?.balance?.value}
                        onChange={setAmount}/>
                }
                {
                    category === 'limit' &&
                    <XFlex vertical gap={15}>
                        <InputNumber controls={false} value={price}
                                     onChange={value => setPrice(value as number)}
                                     style={{width: '100%'}}
                                     placeholder={t('price')}
                                     suffix={'USD'} size={'large'}/>
                        <SliderInput value={amount}
                                     max={side === 'buy' ? quotePosition?.balance?.value : position?.balance?.value}
                                     unit={side === 'buy' ? chain?.nativeToken?.metadata?.symbol : token?.metadata?.symbol}
                                     onChange={(val, rate) => {
                                         setAmount(val)
                                         setAmountRate(rate)
                                     }}/>
                    </XFlex>
                }


            </XFlex>
            {/* 订单设置 gas费 */}
            <XFlex vertical gap={5}>
                <XFlex gap={15} align={'center'} justify={'space-between'}>
                    <XText color={themeVars.colorTextL2}
                           size={13}>Gas {t(orderSettings?.priority?.value)}</XText>
                    <XFlex align={'center'} gap={2}>
                        <IconFont name={'gas-station-fill'} size={15} color={themeVars.colorTextPrimary}/>
                        <AmountView size={'sm'} type={'v'}
                                    data={{
                                        value: orderSettings?.priority?.max,
                                        valueUnit: chain?.quoteToken?.metadata?.symbol,
                                    }}/>
                    </XFlex>

                </XFlex>
                <XFlex gap={15} align={'center'} justify={'space-between'}>
                    <XText color={themeVars.colorTextL2} size={13}>{t('available')}</XText>
                    <AmountView data={side === 'buy' ? quotePosition?.balance : position?.balance} size={'sm'}
                                type={'vu'}/>
                </XFlex>
                {/* 提交按钮 */}
                <OrderSubmitter
                    onSubmitted={onSubmitted}
                    params={{category, token, side, amount: amount, amountRate, price, autoSell}}
                >
                    <Button type={'primary'} size={'large'}>
                        {t('confirm_' + side)}
                    </Button>
                </OrderSubmitter>
            </XFlex>
        </XFlex>
    </XFlex>
}

export default TradePanel;
