import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import { sendVerifyCode, getAuthToken } from "@/api/api";
import { useRouter } from "@/hooks/useRouter";
import { setAuthToken } from "@/utils";

const Login = () => {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // 发送验证码
    const handleSendCode = async () => {
        if (!phone) {
            message.error("请输入手机号");
            return;
        }

        // 验证手机号格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            message.error("请输入正确的手机号");
            return;
        }

        setSendingCode(true);
        try {
            await sendVerifyCode({ phone });
            message.success("验证码已发送");

            // 开始倒计时
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error: any) {
            message.error(error?.message || "发送验证码失败");
        } finally {
            setSendingCode(false);
        }
    };

    // 登录
    const handleLogin = async () => {
        if (!phone) {
            message.error("请输入手机号");
            return;
        }
        if (!code) {
            message.error("请输入验证码");
            return;
        }

        setLoading(true);
        try {
            const response = await getAuthToken({ phone, code });
            const token = response?.data?.token;

            if (token) {
                // 存储 token
                setAuthToken(token)
                message.success("登录成功");

                // 跳转到首页或之前的页面
                const returnUrl = new URLSearchParams(window.location.search).get("returnUrl");
                router.push(returnUrl || "/");
            } else {
                message.error("登录失败，请重试");
            }
        } catch (error: any) {
            message.error(error?.message || "登录失败");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-[#7150ff]/5 to-[#5a3bc4]/5 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#7150ff]/10 to-[#5a3bc4]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#7150ff]/10 to-[#5a3bc4]/10 rounded-full blur-3xl"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7150ff] to-[#5a3bc4] rounded-2xl mb-4 shadow-lg shadow-[#7150ff]/20">
                            <UserOutlined className="text-white text-2xl" />
                        </div>
                        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] mb-2">
                            欢迎回来
                        </h1>
                        <p className="text-gray-500">使用手机号验证码登录</p>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        {/* Phone Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                手机号
                            </label>
                            <Input
                                size="large"
                                placeholder="请输入手机号"
                                prefix={<PhoneOutlined className="text-gray-400" />}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="!rounded-xl !h-12"
                                maxLength={11}
                            />
                        </div>

                        {/* Verification Code Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                验证码
                            </label>
                            <div className="flex gap-3">
                                <Input
                                    size="large"
                                    placeholder="请输入验证码"
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="!rounded-xl !h-12 flex-1"
                                    maxLength={6}
                                    onPressEnter={handleLogin}
                                />
                                <Button
                                    size="large"
                                    onClick={handleSendCode}
                                    loading={sendingCode}
                                    disabled={countdown > 0}
                                    className="!rounded-xl !h-12 !px-6 !font-medium hover:!bg-[#7150ff]/10 hover:!text-[#7150ff] hover:!border-[#7150ff]"
                                >
                                    {countdown > 0 ? `${countdown}s` : "发送验证码"}
                                </Button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Button
                            type="primary"
                            size="large"
                            block
                            onClick={handleLogin}
                            loading={loading}
                            className="!h-12 !rounded-xl !text-base !font-bold !bg-gradient-to-r from-[#7150ff] to-[#5a3bc4] hover:!from-[#7150ff]/90 hover:!to-[#5a3bc4]/90 border-none shadow-lg shadow-[#7150ff]/20 !mt-8"
                        >
                            登录
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>登录即表示您同意我们的</p>
                        <div className="flex items-center justify-center gap-2 mt-1">
                            <a href="#" className="text-[#7150ff] hover:underline">服务条款</a>
                            <span>和</span>
                            <a href="#" className="text-[#7150ff] hover:underline">隐私政策</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Decoration */}
                <div className="text-center mt-8 text-gray-400 text-sm flex flex-col items-center gap-1">
                    <p>© 2024 Yoozy Pro. All rights reserved.</p>
                    <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer"
                        className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
                        粤ICP备2022084962号-3
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
