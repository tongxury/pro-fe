"use client";
import React, { useState } from "react";
import { Popover } from "antd";
import { features } from "@/constants";
import downOutlined from "@/assets/svg/downOutlined.svg";
import Image from "next/image";
import plugin from "@/assets/svg/plugin.svg";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
export default function TopNav() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const t = useTranslations("Header");
    const featuresTo = (item: any) => {
        window.open("https://xtips.ai" + item.link, "_blank");
    };
    const router = useRouter();
    // const content = () => {
    //   return (
    //     <div className='popover-box'>
    //       <div className='popover-box-item'>
    //         <div className='popover-title'>应用</div>
    //         <div className='popover-item' style={{ gap: "10px" }}>
    //           <Image className='popover-item-icon' src={plugin} alt='' />
    //           <div className='popover-text-box'>
    //             <div className='popover-text-title'>浏览器插件</div>
    //             <div className='popover-text-info'>支持Chrome&Edge</div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className='popover-box-item'>
    //         <div className='popover-title'>工具箱</div>
    //         {features.map((item) => (
    //           <div
    //             key={item.videoId}
    //             className='popover-item'
    //             onClick={() => featuresTo(item)}
    //           >
    //             <div
    //               className='popover-item-icon'
    //               dangerouslySetInnerHTML={{ __html: item.icon }}
    //             />
    //             <div className='popover-text-box'>
    //               <div className='popover-text-title'>{item.title}</div>
    //               <div className='popover-text-info'>{item.desc}</div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   );
    // };
    const navs = [
        {
            title: "Home",
            link: "/home",
            content: ""
        },
        {
            title: "Pricing",
            link: "/pricing"
            // content: content,
        }
        // {
        //   title: "Afiliates",
        //   link: "/blog",
        //   content: "",
        // },
    ];
    const locale = useLocale();
    function handleHoverChange(index: number) {
        setCurrentIndex(index);
        router.push(navs[index].link, { locale });
        // if (index === 2) {
        //   window.open("https://xtips.ai" + "/blogs/", "_blank");
        // }
    }

    return (
        <div className="nav">
            {navs.map((item, index) => {
                return (
                    <Popover
                        placement="bottom"
                        title={null}
                        content={item.content}
                        arrow={false}
                        overlayClassName="popover-nav"
                        key={index}
                    >
                        <span
                            className={`nav-item`}
                            onClick={() => {
                                handleHoverChange(index);
                            }}
                        >
                            {t(item.title)}
                            {item.content && <Image src={downOutlined} className="downOutlined" alt="" />}
                        </span>
                    </Popover>
                );
            })}
        </div>
    );
}
