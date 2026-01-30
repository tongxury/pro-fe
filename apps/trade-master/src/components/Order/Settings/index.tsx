import {useXTheme, XCardSelector, XFlex, XText} from "@pro/ui";
import {useTranslation} from "react-i18next";
import {Slider, Switch, Tag} from "antd";
import useOrderSettings from "@/hooks/useOrderSettings.ts";
import {PriorityOption} from "@/types";

function OrderSettings() {

    const {t} = useTranslation()
    const {themeVars} = useXTheme()

    // const {chain} = useCurrentChain()

    const {
        settings: {antiMEV, priority, slippage, metadata},
        // slippageOptions,
        setAntiMEV,
        setPriority,
        setSlippage
    } = useOrderSettings(true)

    return <XFlex block vertical gap={25} padding={15}>
        {/*{JSON.stringify({antiMEV, priority, slippage})}*/}
        {/* 防夹 */}
        <XFlex align={'center'} justify={'space-between'}>
            <XText bold color={themeVars.colorTextPrimary} size={13}>{t('antiMEV')}</XText>
            <Switch size={'small'} checked={antiMEV} onChange={() => setAntiMEV(!antiMEV)}/>
        </XFlex>
        {/* 滑点 */}
        <XFlex vertical gap={8}>
            <XText bold color={themeVars.colorTextPrimary} size={13}>{t('slippageSetting')}</XText>

            <XFlex align={'center'}>
                {
                    metadata?.slippageOptions.map((x, i) => {
                        return <Tag.CheckableTag
                            onClick={() => setSlippage(x.value)} key={i}
                            // style={{background: slippage === x.value ? themeVars.colorTextPrimary : undefined}}
                            checked={slippage === x.value}>
                            {x.label}
                        </Tag.CheckableTag>
                    })
                }
                {
                    !metadata?.slippageOptions.map(x => x.value)?.includes(slippage) &&
                    <Tag.CheckableTag checked={true}>
                        {(slippage * 100).toFixed(0)}%({t('custom')})
                    </Tag.CheckableTag>

                }
            </XFlex>
            <Slider value={slippage * 100} onChange={(value: number) => setSlippage((value / 100))}/>
        </XFlex>
        {/* Gas费 */}
        <XFlex vertical gap={8}>
            <XText bold color={themeVars.colorTextPrimary} size={13}>{t('gasFee')}</XText>
            <XCardSelector
                options={metadata?.priorityOptions?.map(x => ({...x}))}
                onChange={option => setPriority(option as PriorityOption)}
                value={priority?.value}
                renderItem={(x, selected, index) => {
                    return <XFlex
                        vertical gap={5}
                        flex={1} key={index}
                        center
                        background={selected ? themeVars.colorPrimary : themeVars.colorBgPrimary}
                    >
                        <XText color={themeVars.colorTextPrimary}>
                            {t(x.value)}
                        </XText>
                        <XText color={themeVars.colorTextPrimary}>
                            {x.label}
                        </XText>
                    </XFlex>
                }}>

            </XCardSelector>
        </XFlex>
    </XFlex>
}

export default OrderSettings;
