import {useRequest} from "ahooks";
import {queryActivities} from "@/api/activity.ts";
import {cached} from "@/providers/request.ts";
import {useXTheme, XDivider, XFlex, XList, XText} from "@pro/ui";
import {Trade} from "@/types";
import {Button, Empty, Skeleton} from "antd";
import {CSSProperties} from "react";
import {useTranslation} from "react-i18next";
import {shorten, TXHash} from "@pro/chain";
import Amount from "@/components/Amount";
import {formatTimeFromNow} from "@pro/hooks";
import QuickOrderSelector from "@/components/Order/QuickOrderSelector";
import TokenView from "@/components/Views/Token";
import useAppRouter from "@/hooks/useAppRouter.ts";
import useLaunchValues from "@/hooks/useLaunchParams.ts";

function ActivitiesList({category, style}: { category: 'publicList' | 'myFollowings', style?: CSSProperties }) {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()

    const {routeToExchange} = useAppRouter()

    const {data, loading} = useRequest<any, any>(() => queryActivities({category}),
        {
            ...cached('activityList' + category),
            pollingInterval: 2000,
            refreshDeps: [
                category
            ]
        });

    const {locale} = useLaunchValues()

    return <XList dataSource={data?.list}
                  style={style}
                  loading={!data?.list && loading}
                  renderItem={
                      (x: Trade, index: number) => {
                          return <XFlex
                              key={index}
                              vertical
                              align={'center'} gap={10}
                              justify={'space-between'}
                              padding={15}
                              margin={[7.5, 15, 7.5, 15]}
                              borderRadius={10} flex={1}
                              style={{background: themeVars.colorBgContainerPrimary,}}>

                              <XFlex align={'center'} justify={'space-between'} block>
                                  <div onClick={() => routeToExchange(x.token?.id)}>
                                      <TokenView data={x.token} layout={'icon'}/>
                                  </div>

                                  <Button onClick={() => routeToExchange(x.token?.id)}
                                          shape={'round'} size={"small"}
                                          type={'primary'}
                                          style={{background: customVars?.['color_' + x.order?.side]}}>{t('toExchange')}</Button>
                              </XFlex>
                              <XDivider/>
                              <XFlex align={'center'} justify={'space-between'} block>
                                  <XText color={themeVars.colorTextL2}>{t('smartWallet')}</XText>
                                  <XText>{x.wallet?.nickname || shorten(x.wallet.id)}</XText>
                              </XFlex>
                              <XFlex align={'center'} justify={'space-between'} block>
                                  <XText color={themeVars.colorTextL2}>{t(x.side)}({x.token?.metadata?.symbol})</XText>
                                  <Amount data={x.amount} type={'u'} size={'sm'}/>
                              </XFlex>
                              <XFlex align={'center'} justify={'space-between'} block>
                                  <XText color={themeVars.colorTextL2}>{t('transactionHash')}</XText>
                                  <TXHash value={x.transaction?.id}/>
                              </XFlex>
                              <XFlex align={'center'} justify={'space-between'} block>
                                  <XText color={themeVars.colorTextL2}>{t('time')}</XText>
                                  <XText>{formatTimeFromNow(x.createdAt?.timestamp, locale)}</XText>
                              </XFlex>
                              {/*<XDivider/>*/}
                              <QuickOrderSelector style={{width: '100%'}} onSelect={() => undefined}
                                                  token={x.token}
                                                  side={x.side} following={x}/>
                          </XFlex>
                      }
                  }
                  empty={<Empty style={{marginTop: 50}}/>}
                  skeleton={{
                      count: 15,
                      view: <div style={{margin: '6px 15px 6px 15px'}}>
                          <Skeleton.Button style={{height: 250}} block/>
                      </div>
                  }}
    />
}

export default ActivitiesList;
