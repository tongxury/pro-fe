import {Button, Input, InputNumber, message} from "antd";
import {useXTheme, XFlex, XText} from "@pro/ui";
import ChainView from "@/components/ChainView";
import {useTranslation} from "react-i18next";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import useCurrentChain from "@/hooks/useCurrentChain.ts";
import AmountView from "@/components/Amount";
import {useState} from "react";
import {transferOut} from "@/api/wallet.ts";
import Confirm from "@/components/Confirm";
import useAppRouter from "@/hooks/useAppRouter.ts";


function TransferOut() {
    const {t} = useTranslation()
    const {themeVars} = useXTheme()
    const {wallet} = useDefaultWallet(true)

    const {chain} = useCurrentChain()

    const [amount, setAmount] = useState<any>()
    const [address, setAddress] = useState<string>()

    const [sending, setSending] = useState<boolean>(false)

    const {goBack} = useAppRouter()

    const onTransferOut = () => {

        setSending(true)

        transferOut({id: wallet?._id, amount, address})
            .then((r: any) => {

                if (r.code) {
                    message.error({
                        content: t(r.code),
                    }).then()
                } else {
                    if (r.data?.tx) {
                        message.success({
                            content: t('transactionHasBeenSent'),
                            duration: 3,
                        }).then()
                    }

                    goBack()
                }

                setSending(false)
            })
            .catch(e => setSending(false))
    }

    return <XFlex vertical gap={40} padding={15} justify={'space-between'} height={'100vh'}>

        <XFlex vertical gap={20} block>
            <ChainView data={chain} style={{marginInline: 'auto'}}/>

            <XFlex vertical gap={10}>
                <XText>{t('sendToAddress')}</XText>
                <Input.TextArea autoSize value={address} size={'large'}
                                onChange={e => setAddress(e.target.value)}
                                placeholder={t('sendToAddress')}/>
                {/*<XText size={12}*/}
                {/*       onClick={() => {*/}
                {/*           navigator?.clipboard?.readText().then(value => setAddress(value))*/}
                {/*           // WebApp.readTextFromClipboard(text => setAddress(text))*/}
                {/*       }}*/}
                {/*       color={themeVars.colorPrimary}>{t('pasteFromClipboard')}*/}
                {/*</XText>*/}
            </XFlex>

            <XFlex vertical gap={10}>
                <XText>{t('amount')}</XText>
                <InputNumber
                    style={{width: '100%'}}
                    controls={false}
                    max={wallet?.balance?.value}
                    value={amount}
                    onChange={value => setAmount(value)} size={'large'}
                    placeholder={t('amount')} suffix={chain?.nativetoken?.metadata?.symbol}/>
                {
                    amount && <XText size={12} color={themeVars.colorTextL2}>
                        ≈${amount / wallet?.balance?.value * wallet?.balance?.usdtValue}
                    </XText>
                }
                <XFlex align={'center'} justify={'space-between'}>
                    <XText size={12} color={themeVars.colorTextL2}>{t('available')}</XText>
                    <XFlex align={'center'} gap={10}>
                        <AmountView type={'v'} data={wallet?.balance} size={'sm'}/>
                        <XText size={12}
                               onClick={() => setAmount(wallet?.balance?.value)}>
                            {t('transferAll')}
                        </XText>
                    </XFlex>
                </XFlex>
            </XFlex>

        </XFlex>

        <Confirm title={t('confirm')}
                 content={
                     <XText size={13} color={themeVars.colorTextPrimary}>{t('sendConfirmText')}</XText>
                 }
                 onConfirm={onTransferOut}>
            <Button loading={sending} disabled={!(amount && address)} block shape={'round'} type={'primary'}>
                {t('confirm')}
            </Button>
        </Confirm>
    </XFlex>
}

export default TransferOut
