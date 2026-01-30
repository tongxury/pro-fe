import { useTranslations } from "next-intl";
import { Flex, Typography } from "antd";
import React from "react";
import styles from "./index.module.scss";

function Difference() {
    const t = useTranslations("Difference");

    const list = [
        {
            id: 0,
            name: t("chat"),
            child: [
                { id: 0, name: t("All in one Al chatbot") },
                { id: 1, name: t("Web Access") },
                { id: 2, name: t("Quick Action & Quick Compose") }
            ]
        },
        {
            id: 1,
            name: t("reading"),
            child: [
                { id: 0, name: t("Webpage & PDF & Youtube summary") },
                { id: 1, name: t("Image Reading") }
            ]
        },
        {
            id: 2,
            name: t("search"),
            child: [
                { id: 0, name: t("Search Agent") },
                { id: 1, name: t("Search Enhance") }
            ]
        },
        // { id: 3, name: "图像艺术", child: [{ id: 0, name: "艺术生成器&画廊" }] },
        {
            id: 4,
            name: t("translator"),
            child: [
                { id: 0, name: t("Web Translation") },
                { id: 1, name: t("Document Translation") }
            ]
        },
        {
            id: 5,
            name: t("writing"),
            child: [{ id: 0, name: t("Writing Agent & Email Reply") }]
        }
    ];
    return (
        <Flex className={styles.difference} vertical>
            <Flex flex={1}>
                <Flex flex={1}>
                    <Typography
                        style={{
                            fontSize: 14,
                            fontWeight: 700,
                            padding: "16px 25px"
                        }}
                    >
                        {t("features")}
                    </Typography>
                </Flex>
                <Flex gap={80} style={{ marginRight: 80 }}>
                    <Typography
                        style={{
                            fontSize: 14,
                            fontWeight: 700,
                            padding: "16px 25px"
                        }}
                    >
                        XTips
                    </Typography>
                    <Typography
                        style={{
                            fontSize: 14,
                            fontWeight: 700,
                            padding: "16px 25px"
                        }}
                    >
                        ChatGPT
                    </Typography>
                </Flex>
            </Flex>
            {list.map((e) => (
                <Flex vertical key={e.id}>
                    <Flex>
                        <Typography
                            style={{
                                fontSize: 14,
                                fontWeight: 700,
                                padding: "16px 25px",
                                background: "rgba(79,89,102,.04)",
                                borderRadius: 12,
                                flex: 1
                            }}
                        >
                            {e.name}
                        </Typography>
                    </Flex>
                    {e.child.map((v) => (
                        <Flex flex={1} key={v.id}>
                            <Flex flex={1}>
                                <Typography
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 700,
                                        padding: "16px 25px"
                                    }}
                                >
                                    {v.name}
                                </Typography>
                            </Flex>
                            <Flex gap={80} style={{ marginRight: 80 }}>
                                <span className={styles.have}></span>
                                <span className={styles.noHave}></span>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            ))}
        </Flex>
    );
}

export default Difference;
