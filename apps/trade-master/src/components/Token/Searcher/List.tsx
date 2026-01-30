import {useXTheme, XFlex, XList, XText} from "@pro/ui";
import {Empty, Skeleton} from "antd";
import {Token} from "@/types";
import {useRequest} from "ahooks";
import {CSSProperties, useEffect} from "react";
import {cached} from "@/providers/request.ts";
import Amount from "@/components/Amount";
import {useTranslation} from "react-i18next";
import Follow from "@/components/Token/actions/Follow.tsx";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {queryTokens} from "@/api/token.ts";
import TokenView from "@/components/Views/Token";


function TokenSearcherList({keyword, onItemClick, style}: {
    keyword: string,
    onItemClick?: () => void,
    style?: CSSProperties
}) {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()

    const {routeToExchange} = useAppRouter()

    const {data, run, cancel} = useRequest<any, any>(
        () => queryTokens({category: 'search',keyword, page: 1, size: 20}),
        {
            manual: true,
            ...cached("tokenSearchList"),
        },
    )

    useEffect(() => {
        cancel()
        run()
    }, [keyword])

    return <XList
        dataSource={data?.list}
        title={
            <XFlex align={'center'} justify={'space-between'} padding={[6, 15, 6, 15]}>
                <XText color={themeVars.colorTextL1} size={12}>{t('name')}</XText>
                <XFlex align={'center'} gap={15}>
                    <XText color={themeVars.colorTextL1} size={12}>{t('currentPrice')}</XText>
                    <XText color={themeVars.colorTextL1} size={12}></XText>
                </XFlex>
            </XFlex>
        }
        style={style}
        loading={!data?.list}
        renderItem={(x: Token, index: number) => {
            return <XFlex
                onClick={() => {
                    routeToExchange(x?.id)
                    onItemClick?.()
                }}
                key={index} align={'center'} justify={'space-between'} padding={[6, 15, 6, 15]}
                style={{}}>
                <TokenView data={x} layout={'icon'}/>

                <XFlex align={'center'} gap={20}>
                    <Amount data={x?.price} size={'sm'} type={'u'}/>
                    <Follow tokenId={x.id} following={x?.walletStates?.following}/>
                </XFlex>
            </XFlex>
        }}
        gap={10}
        empty={<Empty style={{marginTop: 30}}/>}
        skeleton={{
            count: 15,
            view: <XFlex align={'center'} gap={15} style={{margin: '6px 15px 6px 15px'}}>
                <Skeleton.Button style={{height: 32}} block/>
                <Skeleton.Button style={{height: 32}}/>
                <Skeleton.Button style={{height: 32}}/>
            </XFlex>
        }}
    />
}

export default TokenSearcherList;
