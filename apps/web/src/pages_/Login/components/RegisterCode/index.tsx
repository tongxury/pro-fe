import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { addEventLog, loginByEmail, sendVerifyCode, verifyEmailCode } from "@/api/api";
import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { setToken } from "@/utils";

//@ts-ignore

interface Props {
    email?: string;
    pwd?: string;
}

export default function RegisterCode(props: Props) {
    const t = useTranslations("Login");

    const { email, pwd } = props;
    const [countdown, setCountdown] = useState(0);
    const [code, setCode] = useState("");
    useEffect(() => {
        handleGetCode();
    }, [email]);
    const emailLogin = async (params: any) => {
        try {
            const data = await loginByEmail(params);
            if (data.code && data.code > 0) {
                message.error(data.message || data.data);
                return;
            } else {
                setToken(data.data?.token);
                window.location.href = data.data?.redirect;
            }
        } catch (error) {
            addEventLog({
                id: "login_error",
                version: document.body.getAttribute("xtips-version") || "",
                params: {
                    error
                }
            });
        }
    };
    const onFinish = async (values: any) => {
        if (!code) {
            message.error(t("login_enter_verify_code"));
            return;
        }
        addEventLog({
            id: "verify"
        });
        //校验验证码
        try {
            const data = await verifyEmailCode({
                email,
                code
            });

            if ((data.code || 0) === 0) {
                // 验证成功
                // message.success('Verification successful');
                emailLogin({
                    email,
                    pwd
                });
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
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    // 获取注册的验证码
    const handleGetCode = async () => {
        console.log(email, 47, "0-0-00-");

        const params = {
            type: 1,
            email,
            subject: "Verify your email ID"
        };
        addEventLog({
            id: "get_code"
        });
        try {
            const data = await sendVerifyCode(params);
            console.log(data, 53);

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
    return (
        <div className="email-register-code">
            <div className="verity"> {t("login_verify")} </div>
            <div className="send">{t("login_digit", { email })}</div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                wrapperCol={{ span: 14 }}
            >
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
                <Form.Item>
                    {" "}
                    <Button type="primary" htmlType="submit" className="email-verifyCode">
                        {t("login_check")}
                    </Button>
                </Form.Item>
            </Form>
            <div className="account">
                {t("login_signUpGoogle")}{" "}
                <span
                    onClick={() => {
                        location.reload();
                    }}
                >
                    {t("login_signUpGoogle_2")}{" "}
                </span>
            </div>
        </div>
    );
}
