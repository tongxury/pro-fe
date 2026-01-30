import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, XIconButton, XText } from "@pro/ui";
import { Modal, Select, Tag } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

const tagsData = [
    {
        value: "Movies",
        label: "Movies"
    },
    {
        value: "Books",
        label: "Books"
    },
    {
        value: "Music",
        label: "Music"
    },
    {
        value: "Sports",
        label: "Sports"
    }
];

const AddTagModal = function AddTagModal() {
    const [open, setOpen] = useState(false);

    const handleChange = (value: string[]) => {
        setSelectedTags(value);
    };

    const t = useTranslations("Default");

    const { token } = useXTheme();

    const handleAddTag = () => {
        setOpen(true);
    };

    const [selectedTags, setSelectedTags] = useState<string[]>(["Movies"]);

    const handleTagChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
        console.log("You are interested in: ", nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };

    const handleAddTags = async () => {
        try {
            // 发起添加tags请求
        } catch (error) {}
    };
    return (
        <>
            <XIconButton size={35} bordered background={token.colorBgPrimary} onClick={handleAddTag}>
                <XIconFont name={"TagLine"} color={token.colorTextL2} />
            </XIconButton>
            <Modal
                open={open}
                closeIcon={null}
                centered
                width={600}
                maskClosable
                styles={{
                    content: {
                        borderRadius: "10px",
                        background: token.colorBgPrimary,
                        padding: "16px"
                    }
                }}
                onCancel={() => setOpen(false)}
                onOk={handleAddTags}
            >
                <XFlex vertical gap={24}>
                    <XText size={24} bold>
                        {t("Add tag to this Q&A")}
                    </XText>
                    <Select
                        suffixIcon={null}
                        open={false}
                        mode="tags"
                        size="large"
                        style={{ width: "100%" }}
                        placeholder={t("Add tag to this Q&A")}
                        onChange={handleChange}
                        value={selectedTags as any}
                    />

                    <XFlex gap={4}>
                        {tagsData.map<React.ReactNode>((tag) => (
                            <Tag.CheckableTag
                                key={tag.value}
                                checked={selectedTags.includes(tag.value)}
                                onChange={(checked) => handleTagChange(tag.value, checked)}
                            >
                                {tag.label}
                            </Tag.CheckableTag>
                        ))}
                    </XFlex>
                </XFlex>
            </Modal>
        </>
    );
};

export default AddTagModal;
