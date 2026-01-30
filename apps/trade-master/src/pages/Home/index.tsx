import {useXTheme, XFlex, XImage, XText} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import Wallet from "@/components/Wallet";
import {useTranslation} from "react-i18next";
import CategoryList from "@/components/Token/List/CatList.tsx";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {Carousel} from "antd";
import WebApp from "@twa-dev/sdk";
import {TG_BOT_INVITE_URL} from "@/contants.ts";
import useAuthUser from "@/hooks/useAuthUser.ts";
import trade_img from "@/assets/trade.png"
import invite_img from "@/assets/invite.png"
import Banner from "@/pages/Home/Banner";

import bannerEn from "@/assets/IMG_9143.jpg";
import bannerZh from "@/assets/IMG_9144.jpg";


export default function Home() {

    const {themeVars} = useXTheme();

    const {routeToTokenSearch, routeToProfile, routeToExchange} = useAppRouter()

    const {t, i18n} = useTranslation()

    const {user} = useAuthUser()

    const Banners = () => {
        // return <XImage src={bannerEn}/>

        return <Carousel autoplay>

            {/*<div><XImage src={bannerEn} style={{width: '100%', height: 250, objectFit: 'contain'}}/></div>*/}
            <div
                onClick={() => routeToExchange()}
            ><XImage src={i18n.language.includes("zh") ? bannerZh : bannerEn}
                     style={{width: '100%', height: 250, objectFit: 'contain'}}/></div>

            {/*<Banner*/}
            {/*    titleI18nKey={'bannerTradeTitle'}*/}
            {/*    descI18nKey={'bannerTradeDesc'}*/}
            {/*    buttonText={'bannerTradeButtonText'}*/}
            {/*    image={trade_img}*/}
            {/*    onClick={() => routeToExchange()}*/}
            {/*/>*/}
            {/*<Banner*/}
            {/*    titleI18nKey={'bannerInviteTitle'}*/}
            {/*    descI18nKey={'bannerInviteTitleDesc'}*/}
            {/*    buttonText={'bannerInviteButtonText'}*/}
            {/*    image={invite_img}*/}
            {/*    onClick={() =>*/}
            {/*        WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(TG_BOT_INVITE_URL + user?.serial)}&text=${encodeURIComponent(t('shareText'))}`)}*/}
            {/*/>*/}
        </Carousel>
    }

    return (
        <XFlex vertical style={{marginBlock: 15}} gap={15}>
            <XFlex align={'center'} gap={10} style={{marginInline: 15}}>
                {/*<TokenSearcher>*/}
                <IconFont onClick={routeToProfile} name={'account-circle-fill'} size={30}
                          color={themeVars.colorTextPrimary}/>
                <XFlex onClick={routeToTokenSearch}
                       align={'center'} justify={'space-between'} block borderRadius={8} bordered
                       padding={[8, 10, 8, 15]}
                       background={themeVars.colorBgContainerPrimary}>
                    <XText color={themeVars.colorTextL2}>{t('searchPlaceholder')}</XText>
                    <IconFont name={'search-line'} color={themeVars.colorTextL1}/>
                </XFlex>
                {/*</TokenSearcher>*/}
            </XFlex>
            <XFlex vertical gap={15}>
                <Wallet style={{
                    marginInline: 15,
                    background: themeVars.colorBgContainerPrimary,
                    borderRadius: 10,
                    padding: 15
                }}/>
                <Banners/>
                {/*<XImage src={bannerEn}  style={{width:'100%', height: 200, objectFit:'contain'}}/>*/}
                <CategoryList/>

            </XFlex>
        </XFlex>
    );
}
