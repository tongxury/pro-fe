import React from "react";
import { Modal, message } from "antd";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { deleteAsset } from "@/api/asset";
import classNames from "classnames";

interface AssetDeleteActionProps {
    asset: any;
    onUpdate: (newItem?: any) => void;
    className?: string;
}

const AssetDeleteAction: React.FC<AssetDeleteActionProps> = ({ asset, onUpdate, className }) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        Modal.confirm({
            title: '确认删除',
            icon: <ExclamationCircleFilled className="text-red-500" />,
            content: '确定要删除这个素材吗？删除后将无法恢复。',
            okText: '确认删除',
            okButtonProps: { danger: true },
            cancelText: '取消',
                onOk: async () => {
                try {
                    await deleteAsset({ id: asset._id });
                    message.success('已删除');
                    onUpdate({ _id: asset._id, _deleted: true });
                } catch (e) {
                    message.error('删除失败，请重试');
                }
            }
        });
    };

    return (
        <div 
            onClick={handleDelete}
            className={classNames(
                "w-8 h-8 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer hover:bg-red-500/80 hover:border-red-400/40 transition-all text-white flex items-center justify-center z-[101]",
                className
            )}
        >
            <DeleteOutlined className="text-sm" />
        </div>
    );
};

export default AssetDeleteAction;
