import {useXTheme, XFlex, XImage, XText} from "@pro/ui";
import {Button, Card, Col, Radio, Row} from "antd";
import {useState} from "react";
import {CheckOutlined, WechatOutlined} from "@ant-design/icons";
import {useGlobalState} from "@/hooks/global";
import serviceImage from "@/assets/service.png"
import groupImage from "@/assets/group.png"
import {getPrompt} from "@/constants/prompt.tsx";

const PricingView = ({onSubmit}: { onSubmit: (option: any) => void }) => {
    const {themeVars} = useXTheme();
    const {isMobile} = useGlobalState()

    // const options = [
    //     {
    //         id: 'l1-monthly',
    //         // title: '每个月',
    //         amount: 38,
    //         months: 1,
    //         creditPerMonth: 500,
    //         unit: "每月",
    //         features: {
    //             coverAnalysisImages: 16,
    //             analysisImages: 25,
    //             preAnalysisImages: 25,
    //             limitAnalysisImages: 25,
    //             analysis: 12,
    //             limitAnalysis: 12,
    //             preAnalysis: 6,
    //             duplicateScript: 6
    //         }
    //     },
    //     {
    //         id: 'l2-monthly',
    //         // title: '每个月',
    //         amount: 98,
    //         months: 1,
    //         creditPerMonth: 1500,
    //         unit: "每月",
    //         features: {
    //             coverAnalysisImages: 50,
    //             analysisImages: 75,
    //             preAnalysisImages: 75,
    //             limitAnalysisImages: 75,
    //             analysis: 37,
    //             limitAnalysis: 37,
    //             preAnalysis: 18,
    //             duplicateScript: 18
    //         }
    //     },
    //     {
    //         id: 'l3-monthly',
    //         // title: '每个月',
    //         amount: 399,
    //         months: 1,
    //         creditPerMonth: 7000,
    //         unit: "每月",
    //         features: {
    //             coverAnalysisImages: 233,
    //             analysisImages: 350,
    //             preAnalysisImages: 350,
    //             limitAnalysisImages: 350,
    //             analysis: 175,
    //             limitAnalysis: 175,
    //             preAnalysis: 87,
    //             duplicateScript: 87
    //         },
    //         extraFeature: '自媒体起号揭秘分享(价值198元)',
    //         extraValue: 198
    //     },
    //     {
    //         id: 'l4-monthly',
    //         // title: '每个月',
    //         amount: 999,
    //         months: 1,
    //         creditPerMonth: 20000,
    //         unit: "每月",
    //         features: {
    //             coverAnalysisImages: 666,
    //             analysisImages: 1000,
    //             preAnalysisImages: 1000,
    //             limitAnalysisImages: 1000,
    //             analysis: 500,
    //             limitAnalysis: 500,
    //             preAnalysis: 250,
    //             duplicateScript: 250
    //         },
    //         extraFeature: '1v1账号深度分析咨询60分钟(价值800元)',
    //         extraValue: 800,
    //         recommended: true
    //     }
    // ];

    const options = [
        {
            id: 'l1-month',
            title: '1个月',
            amount: 38,
            months: 1,
            creditPerMonth: 500,
            unit: "单月",
            features: {
                coverAnalysisImages: 16,
                analysisImages: 25,
                preAnalysisImages: 25,
                limitAnalysisImages: 25,
                analysis: 12,
                limitAnalysis: 12,
                preAnalysis: 6,
                duplicateScript: 6
            }
        },
        {
            id: 'l2-month',
            title: '1个月',
            amount: 98,
            months: 1,
            creditPerMonth: 1500,
            unit: "单月",
            features: {
                coverAnalysisImages: 50,
                analysisImages: 75,
                preAnalysisImages: 75,
                limitAnalysisImages: 75,
                analysis: 37,
                limitAnalysis: 37,
                preAnalysis: 18,
                duplicateScript: 18
            }
        },
        {
            id: 'l3-month',
            title: '1个月',
            amount: 399,
            months: 1,
            creditPerMonth: 7000,
            unit: "单月",
            features: {
                coverAnalysisImages: 233,
                analysisImages: 350,
                preAnalysisImages: 350,
                limitAnalysisImages: 350,
                analysis: 175,
                limitAnalysis: 175,
                preAnalysis: 87,
                duplicateScript: 87
            },
            extraFeature: '自媒体起号揭秘分享(价值198元)',
            extraValue: 198
        },
        {
            id: 'l4-month',
            title: '1个月',
            amount: 999,
            months: 1,
            creditPerMonth: 20000,
            unit: "单月",
            features: {
                coverAnalysisImages: 666,
                analysisImages: 1000,
                preAnalysisImages: 1000,
                limitAnalysisImages: 1000,
                analysis: 500,
                limitAnalysis: 500,
                preAnalysis: 250,
                duplicateScript: 250
            },
            extraFeature: '1v1账号深度分析咨询60分钟(价值800元)',
            extraValue: 800,
            recommended: true
        }
    ];
    const [option, setOption] = useState(options[0]);
    const [payMethod, setPayMethod] = useState('wxpay');

    const [paying, setPaying] = useState(false);
    //
    // const onSubmit = async () => {
    //     setPaying(true);
    //
    //
    //     const parts = option.id.split("-")
    //
    //     // https://i.veogo.ai/api/pa/v2/payments?level=basic&cycle=month&successUrl=http://veogo.ai/boarding&cancelUrl=http://veogo.ai/boarding
    //     window.location.href = `${import.meta.env.VITE_API_URL}/api/pa/v2/payments?level=${parts[0]}&cycle=${parts[1]}&successUrl=${window.location.href}&cancelUrl=${window.location.href}`;
    //
    //     // createPayment({payMethod, planId: option.id, returnUrl: window.location.href}).then(res => {
    //     //     if (!res.code) {
    //     //         window.location.replace(res.data?.url);
    //     //     }
    //     // })
    // }

    const submit = (options: any) => {
        setPaying(true);
        onSubmit(options);
    }

    // 计算月均价格
    const getMonthlyPrice = (plan: any) => {
        return Math.round((plan.amount / plan.months) * 100) / 100;
    };

    // 计算折扣百分比
    const getDiscountPercent = (plan: any) => {
        if (!plan.originAmount) return null;
        return Math.round((1 - plan.amount / plan.originAmount) * 100);
    };


    return (
        <XFlex block vertical gap={15} style={{maxWidth: 1800, margin: '0 auto', padding: 15}}>
            {/* 顶部标题 */}
            {/*<XFlex align={'center'} gap={20}>*/}
            {/*    <Logo/>*/}
            {/*    <XText bold size={28}>VIP</XText>*/}
            {/*</XFlex>*/}
            <Row gutter={[10, 10]}>
                <Col xs={24} sm={24} md={12}>

                    <XFlex vertical gap={20}>
                        <XText bold size={isMobile ? 18 : 28}>购买VIP会员</XText>

                        <XText bold color={themeVars.colorPrimary}
                               size={isMobile ? 14 : 18}>付款起24小时内无条件全额退款（扫码加客服即可申请）</XText>

                    </XFlex>
                </Col>

                <Col xs={24} sm={24} md={12}>
                    <XFlex align={'center'} gap={10} justify={'center'}>
                        <XFlex gap={10}>
                            <XFlex vertical center gap={10} style={{
                                border: `1px solid ${themeVars.colorBorder || '#eee'}`,
                                borderRadius: 8,
                                padding: 20
                            }}>
                                {/*<XText>客服微信</XText>*/}
                                <XImage src={serviceImage}
                                        style={{width: 80, height: 80, borderRadius: 6, objectFit: 'contain'}}/>
                            </XFlex>

                        </XFlex>
                        <XFlex vertical center gap={10} style={{
                            border: `1px solid ${themeVars.colorBorder || '#eee'}`,
                            borderRadius: 8,
                            padding: 20
                        }}>
                            {/*<XText>小红书交流群</XText>*/}
                            <XImage src={groupImage}
                                    style={{width: 80, height: 80, borderRadius: 6, objectFit: 'contain'}}/>
                        </XFlex>

                    </XFlex>
                </Col>

            </Row>


            {/* 套餐选择区域 */}
            <XFlex gap={10} style={{width: '100%'}}>
                {options.map((x, i) => (
                    <XFlex
                        onClick={() => setOption(x)}
                        center
                        style={{
                            cursor: 'pointer',
                            minWidth: 170,
                            padding: 10,
                            border: `2px solid ${x.id === option.id ? themeVars.colorPrimary : themeVars.colorTextL2}`,
                            borderRadius: 8,
                            // transition: 'all 0.2s ease',
                            // overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        {/* 选中标记 */}
                        {x.id === option.id && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 0,
                                height: 0,
                                borderStyle: 'solid',
                                borderWidth: '0 40px 40px 0',
                                borderColor: `transparent ${themeVars.colorPrimary} transparent transparent`,
                                zIndex: 1
                            }}>
                                <CheckOutlined style={{
                                    position: 'absolute',
                                    top: 5,
                                    right: -35,
                                    // color: 'white',
                                    fontSize: 12
                                }}/>
                            </div>
                        )}

                        {/* 折扣标签 */}
                        {getDiscountPercent(x) && (
                            <div style={{
                                position: 'absolute',
                                top: 3,
                                left: 0,
                                backgroundColor: `${themeVars.colorPrimary}`,
                                color: 'white',
                                padding: '2px 8px',
                                fontSize: 12,
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10
                            }}>
                                省{getDiscountPercent(x)}%
                            </div>
                        )}

                        <XFlex vertical align={'center'} gap={10}
                               style={{height: 300, paddingBlock: 20}}>
                            {/* 标题 */}
                            <XText size={16} weight={500} style={{
                                color: x.id === option.id ? themeVars.colorPrimary : themeVars.colorTextPrimary
                            }}>
                                {x.title}
                            </XText>

                            {/*/!* 原价 *!/*/}
                            {/*{x.originAmount && (*/}
                            {/*    <XText color={themeVars.colorTextL3} style={{textDecoration: 'line-through'}}>*/}
                            {/*        ¥{x.originAmount / x.months}/月*/}
                            {/*    </XText>*/}
                            {/*)}*/}

                            {/* 主价格 */}
                            <XFlex align="baseline" gap={4}>
                                <XText color={themeVars.colorTextPrimary} size={16}>¥</XText>
                                <XText bold size={35} color={
                                    x.id === option.id ? themeVars.colorPrimary : themeVars.colorTextPrimary
                                }>
                                    {x.amount}
                                </XText>
                            </XFlex>

                            {/*/!* 月均价格 *!/*/}
                            {/*{x.months > 1 && (*/}
                            {/*    <XText color={themeVars.colorTextL2} size={12}>*/}
                            {/*        每月只需 ¥{getMonthlyPrice(x)}/月*/}
                            {/*    </XText>*/}
                            {/*)}*/}
                            {/*{x.extraFeature &&*/}
                            {/*    <XText bold color={themeVars.colorPrimary} style={{textAlign: 'center'}}>*/}
                            {/*        {x.extraFeature}*/}
                            {/*    </XText>*/}
                            {/*}*/}

                            {/* 积分信息 */}
                            <XFlex vertical justify={'space-between'} gap={10} style={{}}>
                                <XText bold style={{
                                    padding: '4px 10px',
                                    borderRadius: 14,
                                    backgroundColor: `${themeVars.colorBgLayout}`,
                                    fontSize: 12
                                }}>
                                    {x.creditPerMonth || '无限'}积分/{x.unit}
                                </XText>


                                {/* 底部提示信息 */}
                                {x.extraFeature && (
                                    <XFlex
                                        gap={4}
                                        align="center"
                                        style={{
                                            marginTop: 4,
                                            padding: '6px 8px',
                                            borderRadius: 4,
                                            backgroundColor: `${themeVars.colorPrimary}08`,
                                            borderLeft: `2px solid ${themeVars.colorPrimary}`
                                        }}
                                    >
                                        <XText size={15} color={themeVars.colorPrimary}>
                                            赠送: {x.extraFeature}
                                        </XText>
                                        {/*<XText size={11} color={themeVars.colorTextL3}>*/}
                                        {/*    (价值{x.extraValue}元)*/}
                                        {/*</XText>*/}
                                    </XFlex>
                                )}

                                {/* 功能列表 */}
                                <XFlex vertical gap={6}
                                       style={{
                                           background: themeVars.colorBgContainerPrimary,
                                           borderRadius: 8,
                                           padding: 8,
                                           height: 110,
                                           overflowY: 'scroll',
                                           scrollbarWidth: 'none'
                                       }}>
                                    <XText size={12} color={themeVars.colorTextL2} bold style={{marginBottom: 4}}>
                                        单一功能Max使用次数:
                                    </XText>

                                    {Object.keys(x.features).map((key, i) => {
                                        const prompt = getPrompt(key);
                                        if (!prompt) return null;

                                        return (
                                            <XFlex
                                                key={i}
                                                justify={'space-between'}
                                                align="center"
                                                style={{
                                                    // padding: '4px 6px',
                                                    borderRadius: 4,
                                                    transition: 'all 0.2s ease',
                                                    // ':hover': {
                                                    //     backgroundColor: themeVars.colorBgLayout
                                                    // }
                                                }}
                                            >
                                                <XFlex gap={6} align="center">
                                                    {/*{prompt.icon && (*/}
                                                    {/*    <XText size={11} color={themeVars.colorTextL3}>*/}
                                                    {/*        {prompt.icon}*/}
                                                    {/*    </XText>*/}
                                                    {/*)}*/}
                                                    <XText size={11} color={themeVars.colorTextL2}>
                                                        {prompt.text}
                                                    </XText>
                                                </XFlex>

                                                <XFlex gap={4} align="center">
                                                    <XText
                                                        size={12}
                                                        bold
                                                        color={themeVars.colorPrimary}
                                                        style={{
                                                            padding: '1px 6px',
                                                            borderRadius: 4,
                                                            backgroundColor: `${themeVars.colorPrimary}10`
                                                        }}
                                                    >
                                                        {/*// @ts-ignore*/}
                                                        {x.features[key]}
                                                    </XText>
                                                    <XText size={11} color={themeVars.colorTextL3}>次</XText>
                                                </XFlex>
                                            </XFlex>
                                        );
                                    })}


                                </XFlex>
                            </XFlex>

                        </XFlex>
                    </XFlex>
                ))}
            </XFlex>


            <XFlex justify="center" style={{marginTop: 10}}>
                <Button
                    loading={paying}
                    onClick={() => submit(option)}
                    type="primary"
                    size="large"
                    style={{
                        width: 200,
                        // height: 40,
                        borderRadius: 20
                    }}
                >
                    立即支付 ¥{option.amount}
                </Button>
            </XFlex>
        </XFlex>
    );
};

export default PricingView;
