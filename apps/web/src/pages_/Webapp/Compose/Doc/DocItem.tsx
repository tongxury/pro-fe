import { MoreOutlined, UserOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useXTheme, XFlex, XIconButton, XText } from "@pro/ui";
import { Composition } from "@pro/ui-pro";
import { Button, Dropdown, Input, MenuProps, Modal, Space, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

function DocItem({
    data,
    onDeleted,
    itemSize,
    curComposition,
    onClick
}: {
    data: Composition;
    itemSize: number;
    curComposition?: Composition;
    onDeleted?: () => void;
    onClick: (composition: Composition) => void;
}) {
    const t = useTranslations("Default");

    const { token } = useXTheme();

    const [hovering, setHovering] = useState<boolean>(false);

    const menus: MenuProps["items"] = [
        {
            key: "delete",
            danger: true,
            icon: <DeleteOutlined />,
            label: t("delete")
        }
    ];
    // 打开更多操作
    const [open, setOpen] = useState<boolean>(false);
    const onMenuClick: MenuProps["onClick"] = (e) => {
        switch (e.key) {
            case "delete":
                setIsDeleteModalOpen(true);
                break;
        }
    };
    // 是否被选中
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(curComposition?.id === data.id);
    }, [curComposition]);

    // 删除确认
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleteing, setIsDeleteing] = useState(false);
    const onDeleteComposition = () => {
        if (isDeleteing || !data.id) return;
        setIsDeleteing(true);
        deleteComposition(data.id).then(() => {
            setIsDeleteModalOpen(false);
            onDeleted?.();
            setIsDeleteing(false);
        });
    };

    return (
        <Tooltip placement="right" title={data.title || t("Untitled")} mouseEnterDelay={2}>
            <XFlex
                onMouseOver={() => setHovering(true)}
                onMouseOut={() => setHovering(false)}
                gap={2}
                style={{
                    background: isActive ? token.colorL1 : hovering ? token.colorBgL1 : token.colorBgPrimary,
                    borderRadius: 4
                }}
            >
                <XFlex
                    align={"center"}
                    style={{
                        flex: 1,
                        paddingLeft: 8,
                        borderRadius: 5,
                        height: itemSize,
                        cursor: "pointer"
                    }}
                    onClick={() => onClick(data)}
                >
                    <XText
                        ellipsis={{ maxLines: 1 }}
                        style={{ maxWidth: 146 }}
                        color={isActive ? token.colorPrimary : token.colorTextL1}
                    >
                        {data.title || t("Untitled")}
                    </XText>
                </XFlex>

                {hovering || open ? (
                    <Dropdown
                        open={open}
                        trigger={["click"]}
                        onOpenChange={setOpen}
                        menu={{
                            items: menus,
                            // onChange: setOpen,
                            onClick: onMenuClick
                        }}
                        arrow={{ pointAtCenter: true }}
                    >
                        <XIconButton
                            size={itemSize}
                            onClick={() => setOpen(true)}
                            style={{
                                background: isActive ? token.colorL1 : hovering ? token.colorBgL1 : token.colorBgPrimary
                            }}
                        >
                            <MoreOutlined style={{ fontSize: 20 }} />
                        </XIconButton>
                    </Dropdown>
                ) : (
                    <div style={{ width: itemSize, height: itemSize }}></div>
                )}
                {/** 删除弹窗 */}
                <Modal
                    title={"Delete Document"}
                    open={isDeleteModalOpen}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    footer={[
                        <Button key="back" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={onDeleteComposition} danger loading={isDeleteing}>
                            Delete Document
                        </Button>
                    ]}
                >
                    <p>
                        Are you sure you want to delete this document? <XText bold>{data.title}</XText>{" "}
                    </p>
                    <p>Warning,this action cannot be undone.</p>
                </Modal>
            </XFlex>
        </Tooltip>
    );
}

export default DocItem;
