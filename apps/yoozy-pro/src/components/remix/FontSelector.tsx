import React, { useState, useEffect } from "react";
import { Spin, Empty, message } from "antd";
import { LoadingOutlined, FontSizeOutlined, CheckCircleFilled } from "@ant-design/icons";
import { listRemixOptions } from "@/api/remixoptions";

interface FontSelectorProps {
    value?: string;
    onChange: (item: any) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [fonts, setFonts] = useState<any[]>([]);

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        setLoading(true);
        try {
            const res = await listRemixOptions({ fields: 'fonts' });
            setFonts(res.data?.fonts || []);
        } catch (e) {
            message.error("获取字体失败");
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

    if (fonts.length === 0) {
        return <Empty className="py-10" description="暂无字体模板" />;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {fonts.map((item) => (
                <div 
                    key={item.mediaId}
                    onClick={() => onChange(item)}
                    className={`p-4 rounded-xl cursor-pointer border-2 transition-all flex flex-col items-center justify-center gap-2 relative ${
                        value === item.mediaId ? 'border-primary bg-primary/5' : 'bg-gray-50 border-transparent hover:border-gray-200'
                    }`}
                >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <FontSizeOutlined className={value === item.mediaId ? 'text-primary' : 'text-gray-400'} />
                    </div>
                    {/* <span className="text-xs font-bold text-gray-600 truncate w-full text-center">
                        {item.mediaId}
                    </span> */}
                    {value === item.mediaId && (
                        <CheckCircleFilled className="absolute top-2 right-2 text-primary" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default FontSelector;
