"use client";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from "react";
import styles from "./index.module.scss";
import Slider from "react-slick";
import Image from "next/image";
import { Flex, theme } from "antd";
import Iconfont from "@/components/Iconfont";
import { functions } from "@/pages_/Home/constants";
import { useTranslations } from "next-intl";

function SimpleSlider() {
    const settings = {
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (current: number, next: number) => {
            setIndex(next);
        }
    };

    const [index, setIndex] = useState(0);
    const { token } = theme.useToken();
    let sliderRef: any = useRef(null);
    const t = useTranslations("Swiper");
    return (
        <Flex vertical gap={24}>
            <Flex justify="center" align="center" gap={48}>
                {functions.map((e) => (
                    <Flex
                        justify="center"
                        align="center"
                        gap={8}
                        vertical
                        key={e.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            sliderRef.current.slickGoTo(e.id);
                            setIndex(e.id);
                        }}
                    >
                        <Iconfont
                            name={e.icon}
                            size={28}
                            color={index === e.id ? token.colorPrimary : token.colorTextSecondary}
                        />
                        <span
                            style={{
                                color: index === e.id ? token.colorPrimary : token.colorTextSecondary,
                                fontSize: 20,
                                fontWeight: 600
                            }}
                        >
                            AI {t(e.name)}
                        </span>
                    </Flex>
                ))}
            </Flex>
            <Flex justify="center" align="center">
                <span
                    style={{
                        color: "var(--grayblue-600)",
                        fontSize: 20,
                        fontWeight: 400,
                        textAlign: "center",
                        width: "80%"
                    }}
                >
                    {t(functions[index].subTitle)}
                </span>
            </Flex>
            <div
                style={{
                    width: "100%",
                    // height: 650,
                    // margin: "0 auto",
                    background: "var(--brand-50)",
                    borderRadius: 24,
                    position: "relative",
                    paddingBlock: 100
                }}
            >
                <div
                    className={styles.slickPrev}
                    onClick={() => {
                        sliderRef.current.slickPrev();
                    }}
                >
                    <Iconfont name="arrow-bottom" size={30} />
                </div>
                <div>
                    {/* @ts-ignore */}
                    <Slider {...settings} ref={sliderRef}>
                        {functions.map((x, i) => (
                            <div key={i}>
                                <Flex align="center" justify="center">
                                    <Image
                                        style={{
                                            width: "70%",
                                            height: "auto",
                                            objectFit: "cover",
                                            borderRadius: 20
                                        }}
                                        src={x.cover}
                                        alt=""
                                    />
                                </Flex>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div
                    className={styles.slickNext}
                    onClick={() => {
                        sliderRef.current.slickNext();
                    }}
                >
                    <Iconfont name="arrow-bottom" size={30} />
                </div>
            </div>
        </Flex>
    );
}

export default SimpleSlider;
