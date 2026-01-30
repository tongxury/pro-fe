import {Button, message} from "antd";
import {QRCodeSVG} from 'qrcode.react';
import {useXTheme, XFlex, XText} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import ChainView from "@/components/ChainView";
import {CHAIN_SOLANA} from "@/contants.ts";
import copy from 'copy-to-clipboard'
import {useTranslation} from "react-i18next";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";
import useCurrentChain from "@/hooks/useCurrentChain.ts";


function TransferIn() {
    const {t} = useTranslation()
    const {customVars} = useXTheme()
    const {wallet} = useDefaultWallet()
    const {chain} = useCurrentChain()

    const onCopy = (value: string) => {
        copy(value)
        message.success({content: t('copied')}).then()
    }

    return <XFlex vertical gap={40} padding={15} justify={'space-between'} height={'100vh'}>

        <XFlex vertical gap={20} block>
            <ChainView data={chain} style={{marginInline: 'auto'}}/>

            <XFlex vertical align={'center'} gap={20}>
                {
                    wallet?._id &&
                    <QRCodeSVG value={wallet?._id}
                               style={{
                                   padding: 10,
                                   background: customVars.colorTextPrimary,
                                   borderRadius: 10
                               }}/>
                }

                <XText style={{maxWidth: 200}}>{wallet?._id}</XText>
                <Button shape={'round'} type={'default'}
                        onClick={() => onCopy(wallet?._id)}
                        icon={<IconFont name={'copy-fill'} color={customVars.colorTextPrimary}/>}>
                    {t('copy')}
                </Button>
            </XFlex>
        </XFlex>
    </XFlex>
}

export default TransferIn
