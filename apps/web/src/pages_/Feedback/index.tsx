"use client";
import Typography from "@mui/material/Typography";
import { Button, Card, Flex, Input, message, Select, theme } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { addFeedback } from "@/api/api";

const Feedback = () => {
    const t = useTranslations("Feedback");

    const { token } = theme.useToken();

    const categories = [
        { value: "bug", label: t("bug") },
        { value: "feature", label: t("feature") }
    ];

    const [content, setContent] = useState("");
    const [category, setCategory] = useState(categories[0].value);

    const onSubmit = () => {
        addFeedback({
            content,
            category
        }).then((rsp) => {
            if (!rsp.code) {
                message.success("submitted");
            }
        });
    };

    return (
        <div style={{ paddingInline: 15 }}>
            <Flex
                vertical
                style={{ margin: 15, marginInline: "auto", maxWidth: 800, width: "100%", paddingBlock: 50 }}
                gap={20}
            >
                <Typography variant={"h4"} fontWeight={"bold"}>
                    {t("feedback")}
                </Typography>
                <Typography variant={"body1"} color={token.colorTextDescription}>
                    {t("desc")}
                </Typography>

                <Card bordered={false}>
                    <Flex vertical gap={15}>
                        <Typography variant={"h6"}>{t("types")}</Typography>
                        <Select options={categories} value={category} onChange={(value) => setCategory(value)} />
                    </Flex>
                </Card>

                <Card bordered={false}>
                    <Flex vertical gap={15}>
                        <Typography variant={"h6"}>{t("issue detail")}</Typography>
                        <Input.TextArea
                            rows={5}
                            maxLength={200}
                            value={content}
                            onChange={(v) => setContent(v.target.value)}
                        />
                    </Flex>
                </Card>
                <Button onClick={onSubmit} disabled={!content} type={"primary"} style={{ width: "100%" }}>
                    {t("submit")}
                </Button>
            </Flex>
        </div>
    );
};

export default Feedback;
