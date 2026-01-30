import {Token} from "@/types";
import {useXTheme, XFlex, XImage, XSize, XText} from "@pro/ui";
import {shorten} from "@pro/chain";
import {Skeleton} from "antd";
import Copier from "@/components/Copier";
import {formatTimeFromNow} from "@pro/hooks";
import useLaunchValues from "@/hooks/useLaunchParams.ts";

function TokenView({data, layout, size = 'sm'}: {
    data?: Token,
    layout?: 'icon' | 'iconAddress' | 'iconCreatedAt',
    size?: XSize,
}) {

    const {themeVars} = useXTheme()

    const {locale} = useLaunchValues()

    const config = {
        "sm": {
            symbolSize: 16,
            extraSize: 12,
            iconSize: 30,
        },
        "md": {
            symbolSize: 22,
            extraSize: 16,
            iconSize: 45,
        },
        "lg": {
            symbolSize: 30,
            extraSize: 20,
            iconSize: 60,
        },
    }[size]

    if (!data) {
        switch (layout) {
            case 'iconAddress':
                return <Skeleton.Button style={{height: config.iconSize}}/>
            default:
                return <Skeleton.Button style={{height: config.symbolSize + 10}}/>
        }
    }
    switch (layout) {
        case "iconAddress":
            return <XFlex align={'center'} gap={10}>
                <XImage style={{border: '1.5px solid ' + themeVars.colorTextPrimary}} src={data?.metadata?.image} circle
                        size={config.iconSize}/>
                <XFlex vertical justify={'space-between'} gap={8}>
                    <XText size={config.symbolSize}>{data?.metadata?.symbol}</XText>
                    <XFlex align={'center'} gap={5}>
                        <XText size={config.extraSize} color={themeVars.colorTextL2}>{shorten(data?._id)}</XText>
                        <Copier size={config.extraSize} text={data?._id}/>
                    </XFlex>
                </XFlex>
            </XFlex>
        case "iconCreatedAt":
            return <XFlex align={'center'} gap={10}>
                <XImage style={{border: '1.5px solid ' + themeVars.colorTextPrimary}}
                        src={data?.metadata?.image} circle
                        placeholder
                        size={config.iconSize}/>
                <XFlex vertical justify={'space-between'} gap={8}>
                    <XText size={config.symbolSize}>{data?.metadata?.symbol}</XText>
                    <XFlex align={'center'} gap={5}>
                        <XText size={config.extraSize}
                               color={themeVars.colorTextL2}>
                            {formatTimeFromNow(data?.createdAt, locale)}
                        </XText>
                    </XFlex>
                </XFlex>
            </XFlex>
        default:
            return <XFlex align={'center'} gap={6}>
                <XImage style={{border: '1.5px solid ' + themeVars.colorTextPrimary}} src={data?.metadata?.image} circle
                        size={config.symbolSize}/>
                <XFlex vertical justify={'space-between'}>
                    <XText size={config.symbolSize}>{data?.metadata?.symbol}</XText>
                </XFlex>
            </XFlex>
    }
}

export default TokenView;
