import React from "react";
import {useXTheme, XFlex} from "@pro/ui";
import {Input} from "antd";
import IconFont from "@/components/Iconfont";
import {useTranslation} from "react-i18next";
import {useDebounceState} from "@pro/hooks";
import TokenSearcherList from "@/components/Token/Searcher/List.tsx";

function TokenSearcher() {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const {value: keyword, setValue: setKeyword} =
        useDebounceState('', {wait: 500})

    return <XFlex vertical>
        <XFlex height={70} padding={15}>
            <Input onChange={e => setKeyword(e.target.value)}
                   autoFocus
                   variant={'filled'} size="large"
                   placeholder={t('searchPlaceholder')}
                   prefix={<IconFont name={'search-line'} color={themeVars.colorTextPrimary}/>}/>

        </XFlex>
        <TokenSearcherList
            keyword={keyword}
            style={{overflowY: 'scroll', height: `calc(100vh - 70px)`}}
        />
    </XFlex>
}

export default TokenSearcher
