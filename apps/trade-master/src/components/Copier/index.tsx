import IconFont from "@/components/Iconfont";
import {useXTheme} from "@pro/ui";
import copy from "copy-to-clipboard";
import {useState} from "react";


const Copier = ({text, size}: { text: string, size?: number }) => {
    const {themeVars} = useXTheme()

    const [icon, setIcon] = useState('copy-fill')

    const onCopy = () => {
        copy(text)

        setIcon('checkbox-circle-fill')

        setTimeout(() => {
            setIcon('copy-fill')
        }, 3000)
    }

    return <IconFont onClick={onCopy} size={size} name={icon as any} color={themeVars.colorTextL2}/>
}

export default Copier;
