import { uploadFileV2 } from "@/api/api.ts";
import {
    CommentOutlined,
    CustomerServiceOutlined,
    FolderFilled,
    RightOutlined,
    UploadOutlined,
    UserOutlined
} from "@ant-design/icons";
import { ListOutlined } from "@mui/icons-material";
import { useXTheme, XFlex, XIconButton, XText, xTransition } from "@pro/ui";
import { Dropdown, FloatButton, Popover, Tabs, Upload } from "antd";
import { useTranslations } from "next-intl";
import React, { CSSProperties, useState } from "react";

import Collections from "./Collections";
import Sources from "./Sources";

function Lib({ open, onClose, style }: { open?: boolean; onClose: () => void; style?: CSSProperties }) {
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const tabs: any[] = [
        {
            label: t("sources"),
            key: "sources",
            children: <Sources height={`calc(100vh - ${50 + 10 + 10 + 60}px)`} />,
            icon: <ListOutlined />
        },
        {
            label: t("collections"),
            key: "collections",
            children: <Collections />,
            icon: <FolderFilled />
        }
    ];
    const [tabKey, setTabKey] = useState<string>(tabs[0].key);

    const onUpload = ({ file }: { file: any }) => {
        uploadFileV2(file).then((result) => {
            if (!result.code) {
                const assets = result.data?.files?.map((x: any) => ({
                    file: x
                }));

                if (assets && assets.length > 0) {
                    addAsset(assets[0]).then(() => {});
                }
            }
        });
    };

    const items = [
        {
            key: "uploadSources",
            icon: <UploadOutlined />,
            label: (
                <Upload
                    // accept={accept}
                    // @ts-ignore
                    customRequest={onUpload}
                    // beforeUpload={beforeUpload}
                    showUploadList={false}
                    // onChange={change}
                >
                    {t("uploadSources")}
                </Upload>
            )
        }
    ];

    if (!open) return <></>;

    return (
        <XFlex
            vertical
            style={{
                padding: 10,
                width: open ? 400 : 0,
                ...xTransition({}),
                visibility: open ? "visible" : "hidden",
                borderLeft: open ? "1px solid " + token.colorBorder : undefined,
                ...style
            }}
        >
            <XFlex justify={"space-between"} align={"start"} style={{ height: 50 }}>
                <XFlex align={"center"} gap={3}>
                    <XIconButton onClick={onClose} background={token.colorBgPrimary} hoverBackground={token.colorBgL1}>
                        <RightOutlined style={{ color: token.colorTextL2, fontSize: 14 }} />
                    </XIconButton>
                    <XText>{t("library")}</XText>
                </XFlex>
            </XFlex>

            <Tabs
                style={{ height: `calc(100vh - ${50 + 10 + 10}px)` }}
                // tabBarStyle={{height: 45}}
                // renderTabBar={(props) => <div>{props.DefaultTabBar}</div>}
                activeKey={tabKey}
                onChange={(tabKey) => setTabKey(tabKey)}
                centered
                items={tabs}
            />

            <Dropdown
                menu={{
                    items
                }}
                placement="topRight"
                arrow
            >
                <FloatButton shape="circle" type="primary" style={{}} icon={<CustomerServiceOutlined />} />
            </Dropdown>
        </XFlex>
    );
}

export default Lib;
