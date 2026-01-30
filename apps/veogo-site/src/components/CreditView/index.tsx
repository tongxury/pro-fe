import {useXTheme, XFlex, XText} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import {useGlobalState} from "@/hooks/global";
import eventBus, {eventTypes} from "@/utils/eventBus";


const CreditView = () => {

    const {themeVars} = useXTheme()

    const {user, userLoading} = useGlobalState()

    if (userLoading) {
        return null
    }

    return (
        <XFlex align={'center'} gap={8}
               onClick={() => {
                   eventBus.emit(user ? eventTypes.OpenPricingModal : eventTypes.OpenLoginModal);
               }}
               style={{
                   cursor: 'pointer',
                   borderRadius: 20,
                   padding: '5px 10px',
                   background: themeVars.colorBgContainerPrimary
               }}>
            <IconFont size={18} name={'shandian'} color={themeVars.colorPrimary}/>
            <XText>{user?.creditSummary?.remaining || 0}</XText>
        </XFlex>
    )
}

export default CreditView
