import {InputNumber, Slider, SliderSingleProps} from "antd";
import {useXTheme, XFlex} from "@pro/ui";
import {safeNumber} from "@pro/chain";
import {useTranslation} from "react-i18next";


function SliderInput({value, max, unit, onChange}: {
    value?: number,
    max?: number,
    unit?: string,
    onChange: (val: number, rate?: number) => void
}) {

    const {t} = useTranslation()

    // const [slideValue, setSlideValue] = useState<number>(0)
    const {themeVars} = useXTheme();

    const marks: SliderSingleProps['marks'] = {
        0: '0%',
        25: '25%',
        50: '50%',
        75: '75%',
        100: '100%',
    };
    return <XFlex vertical gap={8}>
        <InputNumber
            style={{width: '100%'}}
            value={value}
            controls={false}
            max={safeNumber(max)}
            onChange={val => {
                onChange(val)
            }}
            placeholder={t('amount')}
            suffix={unit} size={'large'}/>
        <Slider
            styles={{
                track: {background: themeVars.colorTextPrimary},
                // handle: {background: themeVars.colorTextPrimary},
            }}
            value={(max && value) ? safeNumber(value / max * 100) : 0}
            onChange={(value: number) => {
                onChange(safeNumber(value / 100 * max), safeNumber(value / 100))
            }}
            marks={marks}/>
    </XFlex>

}

export default SliderInput
