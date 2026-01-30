import {useXTheme, XFlex} from "@pro/ui";
import React from "react";

const SwitchLang = () => {
    return <></>
    // const {themeVars} = useXTheme();
    // const locale = useLocale();
    // const pathname = usePathname();
    // const router = useRouter();
    //
    // // 创建一个紧凑的语言标签映射
    // const compactLabels: Record<string, string> = {
    //     'en': 'EN',
    //     'zh': '中'
    // };
    //
    // // 处理语言切换并强制刷新页面
    // const handleLanguageChange = (newLocale: string) => {
    //     // 如果是当前语言，不做任何操作
    //     if (newLocale === locale) return;
    //
    //
    //     console.log('newLocale', newLocale);
    //
    //     // 构建新的URL
    //     const currentPath = window.location.pathname;
    //
    //     // 使用router导航到新语言的同一路径
    //     router.replace(pathname, {locale: newLocale})
    //     router.refresh()
    // };
    //
    // return (
    //     <XFlex
    //         align="center"
    //         style={{
    //             borderRadius: 6,
    //             background: themeVars.colorBgLayout,
    //             overflow: 'hidden',
    //             height: '24px',
    //             fontSize: '12px',
    //         }}
    //     >
    //         {Object.entries(localeLabels).map(([key, label]) => (
    //             <div
    //                 key={key}
    //                 onClick={() => handleLanguageChange(key)}
    //                 style={{
    //                     padding: '0 6px',
    //                     height: '100%',
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     backgroundColor: locale === key ? themeVars.colorPrimary : themeVars.colorBgContainerPrimary,
    //                     color: locale === key ? '#fff' : themeVars.colorTextL2,
    //                     textDecoration: 'none',
    //                     minWidth: '24px',
    //                     transition: 'background-color 0.2s, color 0.2s',
    //                     cursor: 'pointer',
    //                 }}
    //                 title={label}
    //             >
    //                 {compactLabels[key] || key}
    //             </div>
    //         ))}
    //     </XFlex>
    // );
};

export default SwitchLang;
