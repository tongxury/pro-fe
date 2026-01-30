import React from "react";
import { Input, Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { updateAssetRemark } from "@/api/asset";

interface AssetRemarkProps {
    asset: any;
    onUpdate: (newItem?: any) => void;
    isOverlay?: boolean;
}

const AssetRemark: React.FC<AssetRemarkProps> = ({ asset, onUpdate, isOverlay }) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [value, setValue] = React.useState(asset.remark || '');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setValue(asset.remark || '');
    }, [asset.remark]);

    const handleSave = async (e?: React.MouseEvent | React.KeyboardEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // If the value hasn't changed, just exit editing mode
        if (value === (asset.remark || '')) {
            setIsEditing(false);
            return;
        }

        setLoading(true);
        try {
            const res = await updateAssetRemark({ id: asset._id, remark: value });
            message.success('备注已更新');
            setIsEditing(false);
            onUpdate(res?.data);
        } catch (e) {
            message.error('更新失败');
        } finally {
            setLoading(false);
        }
    };

    if (isEditing) {
        return (
            <div 
                className={classNames(
                    "flex flex-col gap-2 z-[100]",
                    isOverlay 
                        ? "absolute top-3 left-3 right-14 p-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl" 
                        : "mt-2 p-2 bg-white rounded-xl border border-primary/30 shadow-sm"
                )}
                onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <Input.TextArea
                    size="small"
                    rows={4}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onPressEnter={(e) => {
                        if (e.shiftKey) return;
                        handleSave(e);
                    }}
                    placeholder="备注内容..."
                    autoFocus
                    disabled={loading}
                    className={classNames(
                        "text-xs !border-none !shadow-none !resize-none p-1",
                        isOverlay ? "!bg-white/10 !text-white placeholder:text-white/40" : "!bg-gray-50 !text-gray-800"
                    )}
                />
                <div className={classNames(
                    "flex justify-end gap-2 pt-2 border-t",
                    isOverlay ? "border-white/10" : "border-gray-100"
                )}>
                    <Button 
                        size="small" 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsEditing(false);
                        }} 
                        className={classNames(
                            "text-[10px] h-6 px-2",
                            isOverlay ? "bg-white/10 border-white/10 text-white hover:!bg-white/20" : ""
                        )}
                    >
                        取消
                    </Button>
                    <Button 
                        size="small" 
                        type="primary" 
                        onClick={handleSave} 
                        loading={loading} 
                        className="text-[10px] h-6 px-3"
                    >
                        保存
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div 
            className={classNames(
                "group/remark flex items-start justify-between gap-2 transition-all cursor-pointer z-[100]",
                isOverlay 
                    ? "absolute top-3 left-3 right-14 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/30" 
                    : "mt-2 px-2 py-1.5 rounded-xl bg-gray-50/30 hover:bg-gray-50 hover:shadow-sm border border-transparent hover:border-gray-100"
            )}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
            }}
        >
            <div className="flex-1 min-w-0 py-0.5">
                {asset.remark ? (
                    <div className={classNames(
                        "text-[11px] font-bold flex items-start gap-2",
                        isOverlay ? "text-white" : "text-gray-600"
                    )}>
                        <EditOutlined className={classNames("text-[10px] mt-1 shrink-0", isOverlay ? "text-white/60" : "text-gray-400")} />
                        <span className="line-clamp-1 group-hover/remark:line-clamp-none group-hover/remark:whitespace-normal break-all">
                            {asset.remark}
                        </span>
                    </div>
                ) : (
                    <div className={classNames(
                        "text-[10px] font-bold flex items-center gap-2",
                        isOverlay ? "text-white/60" : "text-gray-400"
                    )}>
                        <EditOutlined className="text-[10px]" />
                        <span>添加备注...</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetRemark;
