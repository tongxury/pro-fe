import { Card, Dropdown, Select, Space } from "antd";
import { localeLabels, locales } from "@/config";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { T } from "@/components/Text";

const LocaleSelector = () => {
    const router = useRouter();

    const locale = useLocale();

    const pathname = usePathname();
    const onLocaleChange = (value: string) => {
        router.push(pathname, { locale: value });
    };

    return (
        <Dropdown
            menu={{
                items: locales.map((x) => ({ label: localeLabels[x], key: x })),
                onClick: (e) => onLocaleChange(e.key)
            }}
        >
            <Card
                bordered={false}
                styles={{ body: { padding: 0 } }}
                style={{ borderRadius: 50, paddingInline: 15, paddingBlock: 8 }}
            >
                <Space>
                    <T>{localeLabels[locale] || ""}</T>
                    <DownOutlined style={{ fontSize: 10 }} />
                </Space>
            </Card>
        </Dropdown>
    );

    // return <Select onChange={onLocaleChange} value={locale}
    //                options={} style={{width: 120}}/>
};

export default LocaleSelector;
