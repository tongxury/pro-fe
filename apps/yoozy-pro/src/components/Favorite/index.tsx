import React, { useState } from "react";
import { Button, message, Tooltip } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

interface FavoriteButtonProps {
    /** 当前收藏状态 */
    value?: boolean;
    /** 点击时的回调，返回 Promise 用于处理异步操作 */
    onChange?: (value: boolean) => Promise<any> | void;
    /** 自定义提示文本 */
    tooltip?: {
        favorite?: string;
        unfavorite?: string;
    };
    /** 自定义成功消息 */
    successMessage?: {
        favorite?: string;
        unfavorite?: string;
    };
    /** 自定义错误消息 */
    errorMessage?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    value = false,
    onChange,
    tooltip = {
        favorite: '取消收藏',
        unfavorite: '收藏'
    },
    successMessage = {
        favorite: '已收藏',
        unfavorite: '已取消收藏'
    },
    errorMessage = '操作失败'
}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onChange) return;

        const newValue = !value;

        try {
            setLoading(true);
            const result = onChange(newValue);

            // 如果返回 Promise，等待完成
            if (result && typeof result.then === 'function') {
                await result;
            }

            message.success(newValue ? successMessage.favorite : successMessage.unfavorite);
        } catch (err) {
            console.error(err);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tooltip title={value ? tooltip.favorite : tooltip.unfavorite} placement="bottom">
            <Button
                type="text"
                loading={loading}
                icon={
                    value ? (
                        <StarFilled
                            style={{
                                color: '#faad14',
                                fontSize: 20,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                            className="animate-scale-in"
                        />
                    ) : (
                        <StarOutlined
                            style={{
                                fontSize: 20,
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        />
                    )
                }
                onClick={handleClick}
                className="hover:bg-gray-100 transition-all duration-200"
                style={{
                    borderRadius: 8,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        </Tooltip>
    );
};

export default FavoriteButton;
