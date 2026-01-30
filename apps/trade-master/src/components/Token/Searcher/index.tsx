import React, {ReactElement, useState} from "react";
import {useXTheme, XFlex} from "@pro/ui";
import {Input} from "antd";
import {useTranslation} from "react-i18next";
import IconFont from "@/components/Iconfont";
import {useDebounceState} from "@pro/hooks";
import DrawerTrigger from "@/components/DrawerTrigger";
import TokenSearcherList from "./List";

function TokenSearcher({children}: { onChange?: (tokenId: string) => void, children: ReactElement }) {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const {value: keyword, setValue: setKeyword} =
        useDebounceState('', {wait: 500})

    return <>
        <DrawerTrigger
            // style={{
            //     background: themeVars.colorBgPrimary,
            //     ...xBorderRadius(10, 10, 0, 0)
            // }}
            trigger={children}
            styles={{
                body: {padding: 0, overflowY: 'hidden'}
            }}
            renderBody={({closeDrawer}) =>
                <XFlex vertical>
                    <XFlex padding={15}>
                        <Input onChange={e => setKeyword(e.target.value)}
                               variant={'filled'} size="large"
                               placeholder={t('searchPlaceholder')}
                               prefix={<IconFont name={'search-line'} color={themeVars.colorTextPrimary}/>}/>

                    </XFlex>
                    <TokenSearcherList
                        onItemClick={closeDrawer}
                        keyword={keyword}
                        style={{overflowY: 'scroll', height: `calc(100vh - 128px)`}}
                    />
                </XFlex>}
        >


        </DrawerTrigger>
    </>
}

export default TokenSearcher;
