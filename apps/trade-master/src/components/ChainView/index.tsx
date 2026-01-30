import {Chain} from "@/types";
import {useXTheme, XFlex, XImage, XText} from "@pro/ui";
import {CSSProperties} from "react";

function ChainView({data, style}: { data: Chain, style?: CSSProperties }) {

    const {themeVars} = useXTheme()

    return <XFlex align={'center'} gap={10} style={style}>
        <XImage src={data.icon} style={{width: 28, height: 28}}/>
        <XText size={20} color={themeVars.colorTextPrimary}>{data?.name} </XText>
    </XFlex>
}

export default ChainView;
