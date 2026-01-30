import {useXTheme, XFlex, XText} from "@pro/ui";
import {Button, Card, Col, Row} from "antd";
import {useState} from "react";
import {CheckOutlined} from "@ant-design/icons";
import {useGlobalState} from "@/hooks/global";
import {useTranslation} from "@/i18n/routing";

const PricingView = () => {
    const {themeVars} = useXTheme();
    const {isMobile} = useGlobalState()
    const t = useTranslation()

    const options = [
        {
            id: 'single_month',
            level: 'basic',
            cycle: 'monthly',
            title: t('monthly'),
            amount: 9.9,
            months: 1,
            creditPerMonth: 500
        },
        {
            id: 'single_month_unlimited',
            level: 'pro', cycle: 'monthly',
            title: `${t('monthly')}(${t('unlimited')})`,
            amount: 19.9,
            months: 1,
        },
        {
            id: 'single_year',
            level: 'basic',
            cycle: 'annually',
            title: t('annually'),
            amount: 95,
            originAmount: 118.8,
            months: 12,
            creditPerMonth: 500
        },
        {
            id: 'single_year_unlimited', level: 'pro',
            cycle: 'annually',
            title: `${t('annually')}(${t('unlimited')})`,
            amount: 191,
            originAmount: 238.8,
            months: 12,
        },
    ];

    const [option, setOption] = useState(options[0]);
    const [payMethod, setPayMethod] = useState('alipay');


    const [paying, setPaying] = useState(false);

    const onSubmit = async () => {
        setPaying(true);
        // https://i.veogo.ai/api/pa/v1/payments?level=basic&cycle=monthly&successUrl=http://veogo.ai/boarding&cancelUrl=http://veogo.ai/boarding
        window.location.href = `${import.meta.env.VITE_API_URL}/api/pa/v1/payments?level=${option.level}&cycle=${option.cycle}&successUrl=${window.location.href}&cancelUrl=${window.location.href}`;
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
        <XFlex block vertical gap={30} style={{maxWidth: 1200, margin: '0 auto', padding: '20px 0'}}>
            {/* 顶部标题 */}
            {/*<XFlex align={'center'} gap={20}>*/}
            {/*    <Logo/>*/}
            {/*    <XText bold size={28}>VIP</XText>*/}
            {/*</XFlex>*/}
            <XText size={isMobile ? 18 : 28}>{t('subscriptionMember')}</XText>

            <XText bold color={themeVars.colorPrimary} size={18}>{t('unsubscribeDesc')}</XText>

            {/* 套餐选择区域 */}
            <Row gutter={[15, 15]} style={{width: '100%'}}>
                {options.map((x, i) => (
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} key={x.id} style={{width: '100%'}}>
                        <Card
                            hoverable
                            onClick={() => setOption(x)}
                            styles={{
                                body: {
                                    padding: 0
                                }
                            }}
                            style={{
                                cursor: 'pointer',
                                border: x.id === option.id ? `1px solid ${themeVars.colorPrimary}` : undefined,
                                borderRadius: 8,
                                transition: 'all 0.2s ease',
                                overflow: 'hidden',
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
                                        color: 'white',
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
                                    {getDiscountPercent(x)}%
                                </div>
                            )}

                            <XFlex vertical align={'center'} gap={10}
                                   style={{height: 170, paddingTop: 30, paddingBottom: 10}}>
                                {/* 标题 */}
                                <XText size={14} weight={500} style={{
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
                                    <XText color={themeVars.colorTextPrimary} size={16}>$</XText>
                                    <XText bold size={35} color={
                                        x.id === option.id ? themeVars.colorPrimary : themeVars.colorTextPrimary
                                    }>
                                        {x.amount}
                                    </XText>
                                </XFlex>

                                {/* 月均价格 */}
                                {x.months > 1 && (
                                    <XText color={themeVars.colorTextL2} size={12}>
                                        {t('subscriptionPriceTip', {price: `${getMonthlyPrice(x)}`})}
                                        {/*每月只需 ¥{getMonthlyPrice(x)}/月*/}
                                    </XText>
                                )}

                                {/* 积分信息 */}
                                <XFlex center style={{marginTop: 'auto'}}>
                                    <XText style={{
                                        padding: '4px 10px',
                                        borderRadius: 12,
                                        backgroundColor: `${themeVars.colorBgLayout || '#f5f5f5'}`,
                                        fontSize: 10
                                    }}>
                                        {x.creditPerMonth || t('unlimited')} {t('credit')}
                                    </XText>
                                </XFlex>
                            </XFlex>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Button onClick={onSubmit} loading={paying} size={'large'} type={'primary'}
                    shape={'round'}>{t('subscription')}</Button>
        </XFlex>
    );
};

export default PricingView;
