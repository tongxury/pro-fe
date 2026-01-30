"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import { list } from "./config";
import gift from "@/assets/12.png";
import { message } from "antd";
import Image from "next/image";

import { addEventLog, fetchUserDetail } from "@/api/api";
import { useRouter } from "@/navigation";
// 在组件渲染前配置 message 的全局样式
message.config({
    top: 200, // 消息提示距离页面顶部的距离
    duration: 3 // 消息提示自动关闭的时间
});
export default function Freetrial() {
    const router = useRouter();

    useEffect(() => {
        addEventLog({
            id: "onboarding-subscribe-view"
        });
    }, []);
    const claim = async () => {
        addEventLog({
            id: "onboarding-subscribe-claim"
        });
        const res = await fetchUserDetail();

        if (res.data?.member && res.data?.member?.level !== "free") {
            message.success({
                content: "You have successfully subscribed.",
                style: { fontSize: "16px" } // 应用自定义样式
            });
            router.push("/onboarding");
            return;
        }

        window.open(
            process.env.NEXT_PUBLIC_API_URL +
                `/api/v1/user-subscribes?source=onboarding&level=pro&cycle=tried3_monthly&redirect=${process.env.NEXT_PUBLIC_BASE_URL}/onboarding?from=freetrial`,
            "_blank"
        );
    };
    const skip = () => {
        addEventLog({
            id: "onboarding-subscribe-skip"
        });
        router.push("/onboarding");
    };
    return (
        <div className="middle-page">
            <Header showNav={false} showAd={false} showLocales></Header>

            <div className="gift">
                <Image className="image" layout="intrinsic" src={gift} alt="" />
                <div className="text">A Gift For You!</div>
                <div className="days">Free For 3 Days</div>
                <div className="claim" onClick={claim}>
                    Claim Now
                </div>
                <div className="skip" onClick={skip}>
                    Skip
                </div>
            </div>
            <div className="list">
                {list.map((item, index) => {
                    return (
                        <div className="item" key={index}>
                            <div className="title">{item.title}</div>

                            <div className="icon" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                            <div className="desc" dangerouslySetInnerHTML={{ __html: item.desc }}></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
