import { Button, Flex, Popover, Select } from "antd";
import logoSvg from "@/assets/logo.png";
// import logoSvg from "@/assets/svg/logo.svg";
import styles from "./index.module.scss";
import chromeIcon from "@/assets/chrome.png";
import Image from "next/image";
import TopNav from "@/components/Header/TopNav";
import { usePathname, useRouter } from "@/navigation";
import { localeLabels, locales } from "@/config";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import UserInfo from "@/components/Header/UserInfo";
import logo from "@/assets/logo.png";
import { defaultImageLoader } from "@/utils";
import { appName } from "@/constants";

export default function Header({
    showNav = true,
    showAd = false,
    showLocales = false,
    showLogin = false,
    _height = "56px",
    addToChrome,
    userInfo
}: {
    showNav?: boolean;
    showAd?: boolean;
    showLocales?: boolean;
    _height?: string;
    showLogin?: boolean;
    addToChrome?: (flag: string) => void;
    userInfo?: any;
}) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Header");
    // const {showNav = true, showAd = true, showLocales = false, _height = '60px'} = props
    const onLocaleChange = (value: string) => {
        console.log(pathname, value, locale);
        router.push(pathname, { locale: value });
    };

    const goHome = () => {
        router.push("/home", { locale });
    };

    const [showBg, setShowBg] = useState(false);
    const scrollHandle = () => {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 50) {
            setShowBg(true);
        } else {
            setShowBg(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandle);
        return () => {
            window.removeEventListener("scroll", scrollHandle);
        };
    }, []);
    return (
        <div className={`${styles.header} ${showBg && styles.active}`} style={{ height: _height }}>
            <div className={styles.logo}>
                <Image src={logoSvg} style={{ width: "auto", height: "100%" }} alt="" onClick={goHome} />
                <span>{appName}</span>
            </div>
            {showLocales && (
                <Select
                    onChange={onLocaleChange}
                    value={locale}
                    options={locales.map((x) => ({ label: localeLabels[x], value: x }))}
                    style={{ width: 120 }}
                />
            )}
            {showNav && <TopNav />}
            <div className={styles.right}>
                {/*{showAd && (*/}
                {/*    <Button size={'small'} type={'primary'} onClick={() => addToChrome?.("d")}>*/}
                {/*        /!*<Image style={{width: 17, height: 17}} src={chromeIcon} alt='' />*!/*/}
                {/*        Add to Chrome*/}
                {/*    </Button>*/}
                {/*)}*/}
                {showLogin &&
                    (userInfo ? (
                        <Flex gap={10} align="center">
                            {/* <Image
                width={20}
                height={20}
                style={{ borderRadius: "50%" }}
                loader={defaultImageLoader}
                src={userInfo?.user_avatar}
                alt=''
              /> */}
                            <span style={{ fontWeight: "bold" }}>{userInfo?.username}</span>
                        </Flex>
                    ) : (
                        <div
                            className={styles.login}
                            onClick={() => {
                                router.push("/login", { locale });
                            }}
                        >
                            {t("Login")}
                        </div>
                    ))}
            </div>
        </div>
    );
}
