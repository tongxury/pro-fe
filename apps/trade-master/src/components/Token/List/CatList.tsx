import {XFlex} from "@pro/ui";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {TokenCategory} from "@/types";
import {Segmented} from "antd";
import TokenList from "@/components/Token/List/index.tsx";


function CategoryList() {
    const {t} = useTranslation()
    const [category, setCategory] = useState<TokenCategory>('hot')

    return <XFlex vertical gap={10}>
        <Segmented
            style={{paddingInline: 15}}
            options={[
                {value: 'following', label: t('selfSelect')},
                {value: 'hot', label: t('hot')},
                {value: 'new', label: t('newToken')},
            ]}
            value={category}
            onChange={(value) => setCategory(value as TokenCategory)}
        />
        <TokenList filters={{category}} pollingInterval={5000}/>
    </XFlex>
}

export default CategoryList;
