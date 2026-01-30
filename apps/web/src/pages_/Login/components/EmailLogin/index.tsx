import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";

import Forgot from "../Forgot";
import { addEventLog, loginByEmail } from "@/api/api";
import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { setToken } from "@/utils";

type FieldType = {
    email?: string;
    pwd?: string;
};

export default function EmailLogin(props: any) {
    const t = useTranslations("Login");

    const { backInit } = props;
    const [isForgot, setIsForgot] = useState(false);
    const onFinish = (values: any) => {
        emailLogin(values);
    };
    const onFinishFailed = (errorInfo: any) => {};
    const forgot = () => {
        setIsForgot(true);
    };

    const emailLogin = async (params: FieldType) => {
        addEventLog({
            id: "sign_in",
            version: document.body.getAttribute("xtips-version") || ""
        });
        try {
            const data = await loginByEmail(params);
            if (data?.code && data?.code > 0) {
                message.error(data?.message || data.data);
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
    return (
        <>
            {isForgot ? (
                <Forgot
                    setComp={() => {
                        setIsForgot(false);
                    }}
                ></Forgot>
            ) : (
                <div className="email-login">
                    <div className="back" onClick={backInit}>
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
                        className="email-form"
                    >
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
                            <Input placeholder={t("login_address")} className="email" />
                        </Form.Item>
                        <Form.Item label="" name="pwd" rules={[{ required: true, message: t("login_enter_password") }]}>
                            <Input.Password placeholder={t("login_password")} className="pwd" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="email-btn">
                                {t("login_signin")}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="forgot" onClick={forgot}>
                        {" "}
                        {t("login_forget")}{" "}
                    </div>
                </div>
            )}
        </>
    );
}
