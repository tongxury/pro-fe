import React, {useState, useEffect} from "react";
import {useXTheme, XFlex, XText, XDivider} from "@pro/ui";
import Logo from "@/components/Logo";
import {Form, Input, Button, Checkbox, message, Divider, Segmented} from "antd";
import {MailOutlined, MobileOutlined, SafetyOutlined} from "@ant-design/icons";
import {
    fetchTokenByCredential,
    getAuthToken,
    getEmailAuthToken,
    sendEmailVerifyCode,
    sendVerifyCode
} from "@/api/api";
import {getCookie, isZh, setAuthToken} from "@/utils";
import {GoogleLogin} from "@react-oauth/google";
import {useTranslation} from "@/hooks/useTranslation.ts";
import {Link} from "react-router";

const LoginView2 = ({onSuccess}: { onSuccess: (data: any) => void }) => {
    const {themeVars} = useXTheme();
    const t = useTranslation();
    const [loginType, setLoginType] = useState<"email" | "phone">("phone");
    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    // 清理定时器
    useEffect(() => {
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timer]);

    // 发送验证码
    const sendVerificationCode = () => {
        if (loginType === "email") {
            form.validateFields(["email"])
                .then((values) => {
                    startCountdown();

                    sendEmailVerifyCode({email: values["email"]}).then((result) => {
                        if (!result.code) {
                            message.success(`验证码已发送至您的邮箱`);
                        }
                    });
                })
                .catch((error) => {
                    console.log("验证失败:", error);
                });
        } else {
            form.validateFields(["phone"])
                .then((values) => {
                    startCountdown();
                    sendVerifyCode({phone: values["phone"]}).then((result) => {
                        if (!result.code) {
                            message.success(`验证码已发送至手机`);
                        }
                    });
                })
                .catch((error) => {
                    console.log("验证失败:", error);
                });
        }
    };

    // 开始倒计时
    const startCountdown = () => {
        setCountdown(60);
        const intervalId = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setTimer(intervalId);
    };

    // 提交表单
    const handleSubmit = (values: any) => {
        if (!agreedToTerms) {
            message.error("请阅读并同意用户协议和隐私政策");
            return;
        }

        if (loginType === "email") {
            getEmailAuthToken({...values, xhsClickId: getCookie("xhs_click_id") || ""}).then((result) => {
                console.log("getEmailAuthToken", result);

                if (result.code) {
                    message.error(t(result.code));
                } else {
                    message.success("登录成功");
                    setAuthToken(result?.data?.token);
                    onSuccess(result?.data);
                }
            });
        } else {
            getAuthToken({...values, xhsClickId: getCookie("xhs_click_id") || ""}).then((result) => {
                console.log("getPhoneAuthToken", result);
                if (result.code) {
                    message.error(t(result.code));
                } else {
                    message.success("登录成功");
                    setAuthToken(result?.data?.token);
                    onSuccess(result?.data);
                }
            });
        }

        // setLoading(true);
        // console.log('提交登录表单:', values);
        //
        // // 模拟登录过程
        // setTimeout(() => {
        //     setLoading(false);
        //     message.success('登录成功');
        //     onSuccess();
        // }, 1000);
    };

    return (
        <XFlex vertical align="center" padding={[30, 20, 30, 20]} style={{maxWidth: 480, margin: "0 auto"}}>
            {/* Logo 区域 */}
            <XFlex vertical align="center" style={{marginBottom: 40}}>
                <Logo/>
            </XFlex>

            <Segmented
                style={{marginBottom: 20}}
                value={loginType}
                onChange={(value) => {
                    setLoginType(value as "email" | "phone");
                    form.resetFields();
                }}
                options={[
                    {label: "手机号登录", value: "phone"},
                    {label: "邮箱登录", value: "email"}
                ]}
            />
            {/* 登录表单区域 */}
            <Form
                form={form}
                name="login"
                onFinish={handleSubmit}
                style={{width: "100%"}}
                layout="vertical"
                requiredMark={false}
            >
                {/* 邮箱/手机输入框 */}
                {loginType === "email" ? (
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: "请输入邮箱地址"},
                            {type: "email", message: "请输入有效的邮箱地址"}
                        ]}
                    >
                        <Input
                            size="large"
                            placeholder="请输入邮箱地址"
                            prefix={<MailOutlined style={{color: themeVars.colorTextL3}}/>}
                            style={{
                                height: 50,
                                borderRadius: 8
                            }}
                        />
                    </Form.Item>
                ) : (
                    <Form.Item style={{marginBottom: 16}}>
                        <XFlex
                            style={{
                                border: `1px solid ${themeVars.colorBorder || "#d9d9d9"}`,
                                borderRadius: 8,
                                overflow: "hidden",
                                height: 50
                            }}
                        >
                            <XFlex
                                align="center"
                                justify="center"
                                style={{
                                    width: 80,
                                    borderRight: `1px solid ${themeVars.colorBorder || "#d9d9d9"}`,
                                    padding: "0 12px",
                                    position: "relative"
                                }}
                            >
                                <XText>+86</XText>
                                <div
                                    style={{
                                        position: "absolute",
                                        right: 12,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: 0,
                                        height: 0,
                                        borderLeft: "5px solid transparent",
                                        borderRight: "5px solid transparent",
                                        borderTop: `5px solid ${themeVars.colorTextL3 || "#999"}`
                                    }}
                                />
                            </XFlex>
                            <Form.Item
                                name="phone"
                                noStyle
                                rules={[
                                    {required: true, message: "请输入手机号码"},
                                    {pattern: /^1\d{10}$/, message: "请输入有效的手机号码"}
                                ]}
                            >
                                <Input
                                    placeholder="请输入手机号"
                                    bordered={false}
                                    style={{
                                        flex: 1,
                                        height: "100%",
                                        padding: "0 15px"
                                    }}
                                />
                            </Form.Item>
                        </XFlex>
                    </Form.Item>
                )}

                {/* 验证码输入框 */}
                <Form.Item
                    name="code"
                    rules={[
                        {required: true, message: "请输入验证码"},
                        {pattern: /^\d{6}$/, message: "验证码为6位数字"}
                    ]}
                    help={form.getFieldError("code")?.[0]}
                    validateStatus={form.getFieldError("code").length > 0 ? "error" : undefined}
                >
                    <XFlex style={{width: "100%"}}>
                        <Input
                            placeholder="请输入验证码"
                            size="large"
                            prefix={<SafetyOutlined style={{color: themeVars.colorTextL3}}/>}
                            style={{
                                height: 50,
                                borderRadius: 8,
                                flex: 1,
                                marginRight: 12
                            }}
                        />
                        <Button
                            type={"primary"}
                            style={{
                                height: 50,
                                borderRadius: 8,
                                width: 120,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            disabled={countdown > 0}
                            onClick={sendVerificationCode}
                        >
                            {countdown > 0 ? `${countdown}秒后获取` : "获取验证码"}
                        </Button>
                    </XFlex>
                </Form.Item>

                {/* 错误提示区域 */}
                {loginType === "phone" && form.getFieldError("phone").length > 0 && (
                    <div
                        style={{
                            color: themeVars.colorError || "#ff4d4f",
                            marginTop: -8,
                            marginBottom: 16,
                            fontSize: 14
                        }}
                    >
                        请输入手机号码
                    </div>
                )}

                {/* 协议同意区域 */}
                <XFlex style={{marginTop: 16, marginBottom: 32}}>
                    <Checkbox checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}>
                        <XText size={14} color={themeVars.colorTextL3}>
                            我已阅读并同意
                            <Link to="/terms" style={{color: themeVars.colorPrimary}}>
                                用户协议
                            </Link>
                            、
                            <Link to="/privacy" style={{color: themeVars.colorPrimary}}>
                                隐私政策
                            </Link>
                        </XText>
                    </Checkbox>
                </XFlex>

                {/* 登录按钮 */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape={"round"}
                        block
                        size={"large"}
                        loading={loading}
                        disabled={!agreedToTerms}
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>

            {
                !isZh &&
                <GoogleLogin
                    shape={"pill"}
                    width={330}
                    theme={"outline"}
                    ux_mode={"popup"}
                    useOneTap
                    auto_select
                    use_fedcm_for_prompt
                    onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            fetchTokenByCredential(credentialResponse.credential).then((result) => {
                                if (result?.data?.token) {
                                    setAuthToken(result?.data?.token);

                                    window.location.reload();

                                    // if (searchParams?.get('redirect')) {
                                    //     window.location.href = searchParams?.get('redirect')!;
                                    // }
                                }
                            });
                        }
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            }

            {/*/!* 登录方式切换按钮 *!/*/}
            {/*<Button*/}
            {/*    type="link"*/}
            {/*    onClick={toggleLoginType}*/}
            {/*    style={{ color: themeVars.colorPrimary }}*/}
            {/*>*/}
            {/*    使用{loginType === 'email' ? '手机号' : '邮箱'}登录*/}
            {/*</Button>*/}
        </XFlex>
    );
};

export default LoginView2;
