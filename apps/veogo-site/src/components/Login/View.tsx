import React, {useState, useEffect} from 'react';
import {Input, Button, Form, message} from 'antd';
import {MobileOutlined, LockOutlined} from '@ant-design/icons';
import {getAuthToken, sendVerifyCode} from "@/api/api";
import {setAuthToken} from "@/utils";
import {useXTheme} from "@pro/ui";

const PhoneLogin = ({onSuccess}: { onSuccess: () => void }) => {
    const {themeVars} = useXTheme();

    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);

    // 倒计时逻辑
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [countdown]);

    // 验证手机号格式
    const isValidPhone = (phone: string) => {
        return /^1[3-9]\d{9}$/.test(phone);
    };

    // 发送验证码
    const handleSendCode = async () => {
        const phone = form.getFieldValue('phone');
        if (!isValidPhone(phone)) {
            message.error('请输入正确的手机号');
            return;
        }

        try {
            setSendLoading(true);
            await sendVerifyCode({phone});
            setCountdown(60);

            message.success('验证码填写成功, 请直接登录');
            form.setFieldValue('code', '000000')

        } catch (error) {
            message.error('发送验证码失败');
        } finally {
            setSendLoading(false);
        }
    };

    // 提交登录
    const handleSubmit = async (values: { phone: string; code: string }) => {
        try {
            setLoading(true);
            const response = await getAuthToken({...values});

            if (!response?.code) {
                message.success('登录成功');
                setAuthToken(response?.data?.token);
                onSuccess();
            } else {
                message.error('登录失败');
            }
        } catch (error) {
            console.error(error);
            message.error('登录失败');
        } finally {
            setLoading(false);
        }
    };

    // 获取主题颜色
    const primaryColor = themeVars.colorPrimary || '#29ffc6';
    const secondaryColor = themeVars.colorL2 || '#38bdf8';

    return (
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '30px 20px',
            // backgroundColor: 'rgba(22, 22, 24, 0.9)',
            borderRadius: '12px',
            // boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            // border: '1px solid rgba(255, 255, 255, 0.05)',
        }}>
            {/* 标题 */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <h1 style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    margin: '0 0 6px',
                    color: primaryColor,
                }}>
                    VeoGo AI 登录
                </h1>
                {/*<p style={{*/}
                {/*    color: 'rgba(255, 255, 255, 0.6)',*/}
                {/*    fontSize: '14px',*/}
                {/*    margin: 0,*/}
                {/*}}>*/}
                {/*    登录账号，使用流量预测功能*/}
                {/*</p>*/}
            </div>

            <Form
                form={form}
                onFinish={handleSubmit}
                // initialValues={{
                //     phone: 'xxx',
                //     phone1: 'xxx1',
                //     code: '000000',
                // }}
                layout="vertical"
                style={{width: '100%'}}
            >
                {/* 手机号 */}
                <Form.Item
                    name="phone"
                    rules={[
                        {required: true, message: '请输入手机号'},
                        {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号'}
                    ]}
                    style={{marginBottom: '20px'}}
                >
                    <Input
                        size={'large'}
                        prefix={<MobileOutlined style={{color: 'rgba(255, 255, 255, 0.5)'}}/>}
                        placeholder="请输入手机号"
                        maxLength={11}
                        style={{
                            backgroundColor: 'rgba(30, 30, 32, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            height: '42px',
                            color: '#fff',
                        }}
                    />
                </Form.Item>

                {/* 验证码 */}
                <Form.Item
                    name="code"
                    rules={[
                        {required: true, message: '请输入验证码'},
                        {len: 6, message: '验证码必须是6位'}
                    ]}
                    style={{marginBottom: '25px'}}
                >

                    <Input
                        addonAfter={
                            <Button
                                type="link"
                                variant={'link'}
                                // type={'default'}
                                onClick={handleSendCode}
                                disabled={countdown > 0 || sendLoading}
                                loading={sendLoading}
                                // style={{
                                //     minWidth: '120px',
                                //     height: '42px',
                                //     borderRadius: '8px',
                                //     background: secondaryColor,
                                //     border: 'none',
                                // }}
                            >
                                {countdown > 0 ? `${countdown}秒后重发` : '发送内测码'}
                            </Button>
                        }
                        size={'large'}
                        prefix={<LockOutlined style={{color: 'rgba(255, 255, 255, 0.5)'}}/>}
                        placeholder="内测验证码为 000000"
                        maxLength={6}
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(30, 30, 32, 0.8)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            height: '42px',
                            color: '#fff',
                        }}
                    />

                </Form.Item>

                {/* 登录按钮 */}
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{
                            width: '100%',
                            height: '42px',
                            borderRadius: '8px',
                            background: primaryColor,
                            border: 'none',
                            fontWeight: 500,
                        }}
                    >
                        {loading ? '登录中...' : '登录'}
                    </Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default PhoneLogin;
