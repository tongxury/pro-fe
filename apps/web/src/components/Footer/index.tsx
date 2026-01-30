import React from "react";
import { Col, Row } from "antd";
import logoSvg from "@/assets/logo.png";
// import logoSvg from "@/assets/svg/logo.svg";
import { useInViewport } from "ahooks";
import { features, resources } from "@/constants";

import Image from "next/image";

// import './home.scss'

const icons = [
    {
        link: "https://discord.com/invite/5b8D2TYE",
        icon: `<svg viewBox="0 0 14 11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-5 h-auto"><path d="M11.87.907c1.58 2.341 2.362 4.982 2.07 8.022a.046.046 0 0 1-.019.033 11.54 11.54 0 0 1-3.5 1.779.044.044 0 0 1-.05-.017 9.414 9.414 0 0 1-.715-1.17.045.045 0 0 1 .024-.063 7.132 7.132 0 0 0 1.093-.524.045.045 0 0 0 .004-.074 5.603 5.603 0 0 1-.218-.172.043.043 0 0 0-.046-.006c-2.264 1.053-4.744 1.053-7.035 0a.043.043 0 0 0-.046.006c-.07.059-.143.116-.217.172a.045.045 0 0 0 .005.074 7.61 7.61 0 0 0 1.092.525c.025.01.036.037.024.062-.206.41-.446.8-.715 1.17a.045.045 0 0 1-.05.017A11.578 11.578 0 0 1 .077 8.96a.048.048 0 0 1-.018-.032C-.186 6.299.31 3.637 2.126.907A.041.041 0 0 1 2.145.89 11.46 11.46 0 0 1 4.995 0a.045.045 0 0 1 .045.022c.124.22.265.502.36.733a10.59 10.59 0 0 1 3.201 0 8.15 8.15 0 0 1 .355-.733A.043.043 0 0 1 9.002 0c1 .174 1.957.477 2.85.89a.036.036 0 0 1 .018.016Zm-5.934 5c.011-.777-.551-1.42-1.258-1.42-.7 0-1.258.637-1.258 1.42 0 .783.569 1.42 1.258 1.42.701 0 1.258-.637 1.258-1.42Zm4.652 0c.011-.777-.551-1.42-1.258-1.42-.7 0-1.258.637-1.258 1.42 0 .783.568 1.42 1.258 1.42.707 0 1.258-.637 1.258-1.42Z"></path></svg>`
    }

    // {
    //   link: "https://instagram.com/study_gpt?igshid=OGQ5ZDc2ODk2ZA==",
    //   icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-auto" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path></svg>`,
    // },
];
const legals = [
    {
        title: "Copyright Policy",
        link: "/copyright"
    },
    {
        title: "Academic Integrity",
        link: "/academic"
    },
    {
        title: "Our Honor Code",
        link: "/honor-code"
    },
    {
        title: "privacy Policy",
        link: "/privacy"
    },
    {
        title: "terms of Service",
        link: "/terms"
    },
    {
        title: "FAQ",
        link: "/#faqs"
    }
];
export default function Footer() {
    const featuresTo = (item: any) => {
        window.open("https://xtips.ai" + item.link, "_blank");
    };
    const resourcesTo = (item: any) => {
        window.open("https://xtips.ai" + item.link, "_blank");
    };
    const legalTo = (item: any) => {
        if (item.link === "/#faqs") {
            document.querySelector(".questions")!.scrollIntoView({ behavior: "smooth" });
            return;
        }
        window.open("https://xtips.ai" + item.link, "_blank");
    };

    function useInViewportHook(dom: string) {
        const inViewPort = useInViewport(() => document.querySelector(dom));
        if (inViewPort && inViewPort[0]) {
            return true;
        }
    }

    return <></>;

    return (
        <div className="home-footer">
            <Row className="footer-row">
                <Col span={6}>
                    <div className={`revolutionizing  ${useInViewportHook(".home-footer") ? "animate__fadeInUp" : ""}`}>
                        <div className="footer-logoSvg">
                            <Image src={logoSvg} alt="" layout="intrinsic" />
                            <span>XTips</span>
                        </div>
                        <div className="introduce">
                            XTips集成顶尖AI模型（GPT-4、Claude-3、Gemini）以便一键对话、搜索、撰写、编码等。在Chrome、Edge或我们的应用上尝试。
                        </div>
                        <div className="icons">
                            {icons.map((item, index) => {
                                return (
                                    <a
                                        dangerouslySetInnerHTML={{ __html: item.icon }}
                                        href={item.link}
                                        target="_blank"
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </Col>
                <div className="content">
                    <Col span={6}>
                        <div className={`features  ${useInViewportHook(".home-footer") ? "animate__fadeInUp" : ""}`}>
                            <h2 className="part-title">Features</h2>
                            <div className="features-box">
                                {features.map((item, index) => {
                                    return (
                                        <div
                                            className="feature-item part-item"
                                            onClick={() => featuresTo(item)}
                                            key={index}
                                        >
                                            {item.title}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className={`resources  ${useInViewportHook(".content") ? "animate__fadeInUp" : ""}`}>
                            <h2 className="part-title">Resources</h2>
                            <div className="resources-box">
                                {resources.map((item, index) => {
                                    return (
                                        <div
                                            className="resources-item part-item"
                                            onClick={() => resourcesTo(item)}
                                            key={index}
                                        >
                                            {item.title}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className={`legal  ${useInViewportHook(".content") ? "animate__fadeInUp" : ""}`}>
                            <h2 className="part-title">Legal</h2>
                            <div className="legal-box">
                                {legals.map((item, index) => {
                                    return (
                                        <div className="legal-item part-item" onClick={() => legalTo(item)} key={index}>
                                            {item.title}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Col>
                </div>
            </Row>
        </div>
    );
}
