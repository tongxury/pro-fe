import React, { useState, useEffect } from "react";
import { Spin, Empty, message } from "antd";
import { LoadingOutlined, CheckCircleFilled } from "@ant-design/icons";
import { listRemixOptions } from "@/api/remixoptions";
import ImageComponent from "@/components/Image";

interface FlowerSelectorProps {
    value?: string;
    onChange: (item: any) => void;
}

const FlowerSelector: React.FC<FlowerSelectorProps> = ({ value, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [flowers, setFlowers] = useState<any[]>([]);

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        setLoading(true);
        try {
            const res = await listRemixOptions({ fields: 'flowers' });
            setFlowers(res.data?.flowers || []);
        } catch (e) {
            message.error("获取花字模板失败");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="h-40 flex flex-col items-center justify-center gap-2">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                <span className="text-gray-400 text-xs">加载中...</span>
            </div>
        );
    }

    if (flowers.length === 0) {
        return <Empty className="py-10" description="暂无花字模板" />;
    }

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {flowers.map((item) => (
                <div 
                    key={item.mediaId}
                    onClick={() => onChange(item)}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group ${
                        value === item.mediaId ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-200'
                    }`}
                >
                    <ImageComponent 
                        src={item.cover} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                        preview={false}
                    />
                    {value === item.mediaId && (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <CheckCircleFilled className="text-primary text-xl" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FlowerSelector;
