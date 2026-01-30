import {useRequest} from "ahooks";
import {cached} from "@/providers/request.ts";
import {useXTheme, XDivider, XFlex, XList, XText} from "@pro/ui";
import {Trade} from "@/types";
import {Descriptions, Empty, Skeleton} from "antd";
import {CSSProperties} from "react";
import {useTranslation} from "react-i18next";
import {TXHash} from "@pro/chain";
import AmountView from "@/components/Amount";
import {formatTimeFromNow} from "@pro/hooks";
import TokenView from "@/components/Views/Token";
import useAppRouter from "@/hooks/useAppRouter.ts";
import useLaunchValues from "@/hooks/useLaunchParams.ts";
import {queryTrades} from "@/api/trade.ts";
import useDefaultWallet from "@/hooks/useDefaultWallet.ts";

function TradeList({style}: { style?: CSSProperties }) {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()

    const {routeToExchange} = useAppRouter()

    const {wallet} = useDefaultWallet()

    const {data, loading} = useRequest<any, any>(() => queryTrades({wallet: wallet?._id}),
        {
            ...cached('tradeList'),
            // pollingInterval: 2000,
            refreshDeps: []
        });

    const {locale} = useLaunchValues()

    return <XList dataSource={data?.list}
                  style={style}
                  loading={!data?.list && loading}
                  split={<XDivider/>}
                  renderItem={
                      (x: Trade, index: number) => {
                          return <XFlex
                              key={index}
                              vertical
                              align={'center'} gap={15}
                              justify={'space-between'}
                              padding={[10, 0, 10, 0]}
                              margin={[7.5, 15, 7.5, 15]}
                              borderRadius={10} flex={1}
                              style={{background: themeVars.colorBgContainerPrimary,}}>

                              <XFlex align={'center'} justify={'space-between'} block>
                                  <div onClick={() => routeToExchange(x.token?._id)}>
                                      <TokenView data={x.token} layout={'icon'}/>
                                  </div>
                              </XFlex>

                              <Descriptions
                                  column={3}
                                  colon={false}
                                  size={'small'}

                                  labelStyle={{color: themeVars.colorTextL2}}
                                  contentStyle={{color: themeVars.colorTextPrimary}}
                                  layout={'vertical'}
                                  items={
                                      [
                                          {
                                              label: <XText color={customVars?.['color_' + x?.side]}>
                                                  {t(x.side)}
                                              </XText>,
                                              children: <AmountView size={'sm'} type={'u'} data={x.amount}/>
                                          },
                                          {
                                              label: t('currentPrice'),
                                              children: <AmountView size={'sm'} type={'u'} data={x.price}/>
                                          },
                                          {
                                              label: <XText color={themeVars.colorTextL2}>{t('time')}</XText>,
                                              children:
                                                  <XText>{formatTimeFromNow(x.createdAt?.timestamp, locale)}</XText>
                                          },
                                          {
                                              label: <XText
                                                  color={themeVars.colorTextL2}>{t('transactionHash')}</XText>,
                                              children: <TXHash value={x.transaction?.hash}/>
                                          }
                                      ]
                                  }>
                              </Descriptions>
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

export default TradeList;
