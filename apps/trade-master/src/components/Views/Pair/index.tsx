import {Pool, Token} from "@/types";
import {useXTheme, XFlex, XImage, XSize, XText} from "@pro/ui";
import {shorten} from "@pro/chain";
import IconFont from "@/components/Iconfont";

function PairView({data, layout = 'default', size = 'sm'}: {
    data?: Pool,
    layout?: 'default' | 'icon' | 'iconAddress',
    size?: XSize,
}) {

    const {themeVars} = useXTheme()

    const T = () => {
        return <XFlex align={'baseline'} gap={5}>
            <XText size={config.symbolSize}>{data?.token?.metadata?.symbol}</XText>
            <XText size={config.quoteTokenSymbolSize} color={themeVars.colorTextL2}>/</XText>
            <XText size={config.quoteTokenSymbolSize}
                   color={themeVars.colorTextL2}>{data?.quoteToken?.metadata?.symbol}</XText>
        </XFlex>
    }

    const config = {
        "sm": {
            symbolSize: 18,
            quoteTokenSymbolSize: 12,
            addressSize: 14,
            iconSize: 25,
        },
        "md": {
            symbolSize: 22,
            quoteTokenSymbolSize: 16,
            addressSize: 16,
            iconSize: 45,
        },
        "lg": {
            symbolSize: 30,
            quoteTokenSymbolSize: 20,
            addressSize: 20,
            iconSize: 60,
        },
    }[size]

    switch (layout) {
        case 'icon':
            return <XFlex align={'center'} gap={10}>
                <XImage src={data?.token?.metadata?.image} circle size={config.iconSize}/>
                <T/>
            </XFlex>
        case "iconAddress":
            return <XFlex align={'center'} gap={10}>
                <XImage src={data?.token?.metadata?.image} circle size={config.iconSize}/>
                <XFlex vertical justify={'space-between'}>
                    <T/>
                    <XFlex align={'center'} gap={5}>
                        <XText size={config.addressSize} color={themeVars.colorTextL2}>{shorten(data?._id)}</XText>
                        <IconFont size={config.addressSize} name={'copy-fill'} color={themeVars.colorTextL2}/>
                    </XFlex>
                </XFlex>
            </XFlex>
        default:
            return <T/>
    }
}

export default PairView;
