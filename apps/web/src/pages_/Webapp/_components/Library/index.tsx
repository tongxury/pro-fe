import { RightOutlined } from "@ant-design/icons";
import {
    BookRounded,
    HistoryOutlined,
    LibraryAddRounded,
    LibraryBooks,
    LibraryBooksRounded,
    LibraryMusicRounded,
    QuestionAnswer,
    SearchOutlined,
    SearchRounded
} from "@mui/icons-material";
import { useXTheme, XFlex, XIconButton, XOption, XSelector, XText } from "@pro/ui";
import { Selector } from "@pro/ui-pro";
import { Input, Tabs, Tag } from "antd";
import { useTranslations } from "next-intl";
import React, { CSSProperties, useState } from "react";

function Library({ onClose, style }: { onClose: () => void; style?: CSSProperties }) {
    const t = useTranslations("Default");
    const { token } = useXTheme();

    const tabs = [
        {
            key: "chatHistory",
            label: t("chatHistory"),
            icon: <HistoryOutlined style={{ fontSize: 15 }} />
        },
        {
            key: "question",
            label: t("question"),
            icon: <QuestionAnswer style={{ fontSize: 15 }} />
        },
        {
            key: "scholar",
            label: t("scholar"),
            icon: <QuestionAnswer style={{ fontSize: 15 }} />
        },
        {
            key: "scholar1",
            label: t("scholar"),
            icon: <QuestionAnswer style={{ fontSize: 15 }} />
        },
        {
            key: "scholar2",
            label: t("scholar"),
            icon: <QuestionAnswer style={{ fontSize: 15 }} />
        }
    ];

    const tags: XOption[] = [
        {
            value: "all",
            label: t("all")
        },
        {
            value: "recent",
            label: t("recent")
        },
        {
            value: "favorite",
            label: t("favorite")
        }
    ];

    const [tag, setTag] = useState<XOption>(tags[0]!);

    const onTagChange = (key: string) => {
        console.log(key);
    };

    return (
        <XFlex vertical style={{ ...style }}>
            <XFlex justify={"space-between"} align={"center"} style={{ paddingInline: 15, height: 60 }}>
                <XFlex align={"center"} gap={4}>
                    <LibraryBooks style={{ color: token.colorTextL2, fontSize: 16 }} />
                    <XText>{t("library")}</XText>
                </XFlex>

                <XIconButton onClick={onClose}>
                    <RightOutlined style={{ color: token.colorTextL2, fontSize: 13 }} />
                </XIconButton>
            </XFlex>

            <XFlex vertical gap={10} style={{ paddingInline: 10 }}>
                <Input allowClear addonBefore={<SearchOutlined />} style={{}} placeholder={t("search libraries")} />

                <Tabs
                    type="card"
                    indicator={{
                        align: "center"
                    }}
                    style={
                        {
                            // height: '100%'
                        }
                    }
                    onChange={onTagChange}
                    // type="card"
                    items={tabs}
                />

                <XSelector
                    style={{ marginTop: -10 }}
                    value={tag.value}
                    options={tags}
                    onChange={setTag}
                    renderItem={(option: XOption, selected: boolean, index: number) => {
                        return (
                            <Tag style={{ cursor: "pointer" }} color={selected ? token.colorPrimary : undefined}>
                                {option.label}
                            </Tag>
                        );
                    }}
                />
            </XFlex>

            <XFlex vertical style={{ border: "1px solid red", padding: 10 }}>
                content
            </XFlex>
        </XFlex>
    );
}

export default Library;
