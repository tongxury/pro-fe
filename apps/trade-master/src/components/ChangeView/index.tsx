import {useXTheme, XFlex, XText} from "@pro/ui";
import {Button} from "antd";


function ChangeView({value, variant = 'text'}: { value?: number, variant?: 'text' | 'button' }) {

    const {customVars} = useXTheme()

    const content = (() => {

        if (!value) return '+0.00%'

        const sign = value >= 0 ? '+' : '-'

        const unsignedValue = Math.abs(value)


        if (unsignedValue >= 10) {
            return `${sign}${unsignedValue}X`
        }

        return `${sign}${(unsignedValue * 100).toFixed(2)}%`
    })()

    const color = content.startsWith("-") ? customVars?.['color_decrease'] : customVars?.['color_increase']

    switch (variant) {
        case "text":
            return <div style={{color}}>{content}</div>
        case "button":
            return <Button type={'primary'} style={{background: color, width: 90}}>{content}</Button>
    }
}


export default ChangeView
