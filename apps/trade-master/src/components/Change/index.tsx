import {useXTheme, XFlex, XText} from "@pro/ui";
import {Amount} from "@/types";
import {Button} from "antd";


function Change({data, variant = 'text'}: { data?: Amount, variant?: 'text' | 'button' }) {

    const {customVars} = useXTheme()

    if (!data) {
        return <></>
    }


    const diff = (data.usdtValue || 0) - (data.diffBetween?.usdtValue || 0);

    const diffRate = data.diffBetween?.usdtValue ? diff / data.diffBetween?.usdtValue : 0


    const content = `${diff >= 0 ? '+' : '-'}${(Math.abs(diffRate) * 100).toFixed(2) + '%'}`
    const color = diff >= 0 ? customVars?.['color_increase'] : customVars?.['color_decrease']

    switch (variant) {
        case "text":
            return <div style={{color}}>{content}</div>
        case "button":
            return <Button type={'primary'} style={{background: color, width: 90}}>{content}</Button>
    }
}


export default Change
