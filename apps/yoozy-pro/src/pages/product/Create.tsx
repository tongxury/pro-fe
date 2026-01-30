import React, { useState } from "react";
import { Button, Drawer, Input, message, Space, Typography } from "antd";
import Uploader from "@/components/UploaderV6";
import { PlusOutlined } from "@ant-design/icons";
import { createCommodity } from "@/api/task.ts";
import { extractDouyinLink } from "@/utils/url.ts";

export default function Create({ onComplete }: { onComplete?: () => void }) {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const [medias, setMedias] = useState<{ mimeType: string; url: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        const link = extractDouyinLink(url)

        if (!link) {
            message.error("链接错误，请检查并重新输入")
            return
        }


        setLoading(true);
        try {
            const response = await createCommodity({ url: link, medias });

            console.log('responsex', response);
            if (!response?.code) {
                message.success('商品已添加...');
            }

            setOpen(false);
            setUrl("");
            setMedias([]);

            onComplete()

        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (loading) return;
        setOpen(false);
        setUrl("");
        setMedias([]);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} type="primary" icon={<PlusOutlined />} className="h-9">
                添加商品
            </Button>
            <Drawer
                width={520}
                open={open}
                destroyOnHidden
                onClose={handleClose}
                title="创建新商品"
            >
                <div className="flex flex-col h-full">
                    <div className="flex flex-col gap-6 flex-1">
                        {/* 链接输入 */}
                        <div className="flex flex-col gap-1">
                            <Typography.Title level={5} className="">
                                商品链接
                            </Typography.Title>
                            <Input.TextArea
                                placeholder="9.28 04/21 X@z.TL ban:/ 【抖音商城】https://v.douyin.com/snVdn9oWCeY/ 汤美星TommeeTippee亲喂瓶喂安抚奶嘴0-6-18月防胀气新生婴幼宝 长按复制此条消息，打开抖音搜索，查看商品详情！"
                                size="large"
                                rows={4}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onPressEnter={handleSubmit}
                                disabled={loading}
                            />
                        </div>

                        {/* 素材上传 */}
                        <div className="flex flex-col gap-1">
                            <Typography.Title level={5} className="">
                                商品素材
                            </Typography.Title>
                            <div className="text-gray-400">
                                上传的图片中第一张图片要清晰完整包含商品立体图
                            </div>
                            <Uploader
                                max={1}
                                accept={'.jpg, .png'}
                                onUploaded={(data) => setMedias(data)}
                            />
                        </div>
                    </div>

                    {/* 底部操作按钮 */}
                    <Space className="flex flex-row justify-end">
                        <Button onClick={handleClose} disabled={loading} className="w-24">
                            取消
                        </Button>
                        <Button
                            disabled={!medias?.length}
                            type="primary"
                            onClick={handleSubmit}
                            loading={loading}
                            className="w-32"
                        >
                            添加
                        </Button>
                    </Space>
                </div>
            </Drawer>
        </>
    );
}
