import React, { useState, useEffect } from "react";
import { Carousel, Button, Form, type FormProps, Input, message } from "antd";
import { addEventLog, resetPasswordByEmail, sendVerifyCode, verifyEmailCode } from "@/api/api";
import { useTranslations } from "next-intl";

interface Props {
    setComp: (val?: string) => void;
}

export default function Forgot(props: Props) {
    const t = useTranslations("Login");

    const { setComp } = props;
    const [countdown, setCountdown] = useState(0);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1);

    const onFinish = (values: any) => {
        console.log("Success:", values, "重置密码");
        if (step === 1) {
            //校验验证码
            if (!code) {
                message.error(t("login_enter_verify_code"));
                return;
            }
            onVerifyCode();
        } else {
            //重置密码
            onResetPassword();

            addEventLog({
                id: "reset_password",
                version: document.body.getAttribute("xtips-version") || ""
            });
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    // 重置密码
    const onResetPassword = async () => {
        if (!pwd) {
            message.error("请输入密码");
            return;
        }

        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(pwd)) {
            message.error(t("login_valid_password"));
            return;
        }

        try {
            const data = await resetPasswordByEmail({
                email: email,
                pwd
            });

            if (data.code && data.code > 0) {
                message.error(data.message || data.data);
            } else {
                // 成功
                message.success("Password reset successful");
                setComp();
            }
        } catch (err) {
            addEventLog({
                id: "reset_password_error",
                version: document.body.getAttribute("xtips-version") || "",
                params: {
                    error: err
                }
            });
        }
    };

    // 验证码校验
    const onVerifyCode = async () => {
        try {
            const data = await verifyEmailCode({
                email,
                code
            });

            if ((data.code || 0) === 0) {
                setStep(2);
            } else {
                message.error(data.message || data.data);
            }
        } catch (err) {
            addEventLog({
                id: "verify_code_error",
                version: document.body.getAttribute("xtips-version") || "",
                params: {
                    error: err
                }
            });
        }
    };

    // 获取验证码
    const handleGetCode = async () => {
        const params = {
            type: 2,
            email,
            subject: "Verify your email ID"
        };
        try {
            const data = await sendVerifyCode(params);
            if ((data.code || 0) === 0) {
                // 拿到验证码

                // 开始倒计时
                setCountdown(60);
                const timer = setInterval(() => {
                    setCountdown((prevCountdown) => {
                        if (prevCountdown === 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return prevCountdown - 1;
                    });
                }, 1000);
            } else {
                message.error(data.message || data.data);
            }
        } catch (err) {
            addEventLog({
                id: "get_verify_code_error",
                version: document.body.getAttribute("xtips-version") || "",
                params: {
                    error: err
                }
            });
        }
    };
    const back = () => {
        if (step === 2) {
            setStep(1);
        }
        if (step === 1) {
            setComp();
        }
    };
    return (
        <div className="email-forgot">
            <div className="back" onClick={back}>
                <svg
                    data-v-140ca179=""
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        data-v-140ca179=""
                        d="M10.7962 11.6383L15.5347 6.89982C15.6882 6.74628 15.8581 6.66773 16.0444 6.66418C16.2306 6.66061 16.404 6.73916 16.5647 6.89982C16.7253 7.06047 16.8057 7.23213 16.8057 7.4148C16.8057 7.59748 16.7222 7.77227 16.5553 7.93918L11.4146 13.0798C11.3219 13.1651 11.2245 13.2291 11.1223 13.2718C11.02 13.3144 10.9095 13.3357 10.7907 13.3357C10.6718 13.3357 10.5613 13.3144 10.4591 13.2718C10.3568 13.2291 10.2631 13.1651 10.1778 13.0798L5.03711 7.93918C4.87732 7.77939 4.80027 7.61099 4.80596 7.43399C4.81163 7.257 4.8948 7.08819 5.05546 6.92755C5.21611 6.76688 5.38777 6.68655 5.57044 6.68655C5.75312 6.68655 5.92478 6.76688 6.08542 6.92755L10.7962 11.6383Z"
                        fill="#545c66"
                    ></path>
                </svg>
                {t("login_back")}
            </div>

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {step === 2 ? (
                    <Form.Item
                        label=""
                        name="pwd"
                        rules={[
                            { required: true, message: t("login_enter_password") },
                            {
                                pattern: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
                                message: t("login_valid_password")
                            }
                        ]}
                    >
                        <Input.Password
                            placeholder={t("login_password")}
                            className="pwd"
                            onChange={(event) => {
                                setPwd(event.target.value);
                            }}
                        />
                    </Form.Item>
                ) : (
                    <>
                        {" "}
                        <Form.Item
                            label=""
                            name="email"
                            rules={[
                                { required: true, message: t("login_enter_email") },

                                {
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: t("login_valid_email")
                                }
                            ]}
                        >
                            <Input
                                placeholder={t("login_address")}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="" name="verifyCode">
                            <Input
                                addonAfter={
                                    <button
                                        type="button"
                                        disabled={countdown > 0}
                                        onClick={handleGetCode}
                                        className={`get-code-btn ${countdown > 0 ? "disabled" : ""}`}
                                    >
                                        {countdown > 0 ? `${countdown} s` : t("login_getCode")}
                                    </button>
                                }
                                placeholder={t("login_code")}
                                onChange={(event) => {
                                    setCode(event.target.value);
                                }}
                                className="code"
                            />
                        </Form.Item>
                    </>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="email-btn">
                        {" "}
                        {t("login_reset")}
                    </Button>
                </Form.Item>
                <div className="rember">
                    {" "}
                    {t("login_remember")} &nbsp;
                    <span
                        onClick={() => {
                            setComp();
                        }}
                    >
                        {t("login_remember_2")}{" "}
                    </span>
                </div>
            </Form>
        </div>
    );
}
