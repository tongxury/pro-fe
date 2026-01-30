import {XFlex, XList} from "@pro/ui";
import {Empty, Skeleton} from "antd";
import {Token} from "@/types";
import {useRequest} from "ahooks";
import {CSSProperties} from "react";
import {cached} from "@/providers/request.ts";
import Amount from "@/components/Amount";
import useAppRouter from "@/hooks/useAppRouter.ts";
import {queryTokens} from "@/api/token.ts";
import TokenView from "@/components/Views/Token";
import ChangeView from "@/components/ChangeView";


function TokenList({filters, onItemClick, pollingInterval, style}: {
    filters?: { category?: string, keyword?: string },
    onItemClick?: () => void
    pollingInterval?: number;
    style?: CSSProperties
}) {

    const {data, loading} = useRequest<any, any>(
        () => queryTokens({...filters, page: 1, size: 30}),
        {
            ...cached("tokenList:" + filters?.category || ''),
            pollingInterval,
            refreshDeps: [
                filters?.keyword, filters?.category
            ]
        },
    )


    const {routeToExchange} = useAppRouter()

    return <XList
        dataSource={data?.list}
        // title={
        //     <XFlex align={'center'} justify={'space-between'} padding={[6, 15, 6, 15]}>
        //         <XText color={themeVars.colorTextL1} size={12}>{t('name')}</XText>
        //         <XFlex align={'center'} gap={15}>
        //             <XText color={themeVars.colorTextL1} size={12}>{t('currentPrice')}</XText>
        //             <XText color={themeVars.colorTextL1} size={12}>{t('changeDaily')}</XText>
        //         </XFlex>
        //     </XFlex>
        // }
        // title={<XText>{JSON.stringify(data)}</XText>}
        style={style}
        loading={!data?.list && loading}
        // loading={true}
        renderItem={(x: Token, index: number) => {
            return <XFlex
                onClick={() => {
                    routeToExchange(x?.id)
                    onItemClick?.()
                }}
                key={index} align={'center'} justify={'space-between'} padding={[10, 15, 10, 15]}
                style={{}}>
                <TokenView data={x} layout={'iconCreatedAt'}/>

                <XFlex align={'center'} gap={20}>
                    <Amount data={x?.price} size={'sm'} type={'u'}/>
                    <ChangeView value={x?.ohlcStates?.['24h']?.changeRate} variant={'button'}/>
                </XFlex>
            </XFlex>
        }}
        empty={<Empty style={{marginTop: 50}}/>}
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

export default TokenList;
