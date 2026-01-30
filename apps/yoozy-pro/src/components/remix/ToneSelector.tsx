import React, { useState, useEffect } from "react";
import { Spin, Empty, message } from "antd";
import { LoadingOutlined, PlayCircleFilled, PauseCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { listRemixOptions } from "@/api/remixoptions";

interface ToneSelectorProps {
    value?: string;
    onChange: (item: any) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ value, onChange }) => {
    const [loading, setLoading] = useState(false);
    const [tones, setTones] = useState<any[]>([]);
    const [playingTone, setPlayingTone] = useState<string | null>(null);
    const [audio] = useState(new Audio());

    useEffect(() => {
        fetchOptions();
        return () => {
            audio.pause();
        };
    }, []);

    const fetchOptions = async () => {
        setLoading(true);
        try {
            const res = await listRemixOptions({ fields: 'tones' });
            setTones(res.data?.tones || []);
        } catch (e) {
            message.error("获取音色失败");
        } finally {
            setLoading(false);
        }
    };

    const handleTogglePlay = (url: string) => {
        if (playingTone === url) {
            audio.pause();
            setPlayingTone(null);
        } else {
            audio.src = url;
            audio.play();
            setPlayingTone(url);
            audio.onended = () => setPlayingTone(null);
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

    if (tones.length === 0) {
        return <Empty className="py-10" description="暂无音色模板" />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tones.map((item) => (
                <div 
                    key={item.id}
                    onClick={() => onChange(item)}
                    className={`p-4 rounded-2xl cursor-pointer border-2 transition-all flex items-center gap-4 group relative ${
                        value === item.id ? 'border-primary bg-primary/5' : 'bg-gray-50 border-transparent hover:border-gray-200'
                    }`}
                >
                    <div 
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 relative"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleTogglePlay(item.downloadUrl);
                        }}
                    >
                        {playingTone === item.downloadUrl ? (
                            <PauseCircleFilled className="text-primary text-xl" />
                        ) : (
                            <PlayCircleFilled className="text-gray-400 group-hover:text-primary text-xl transition-colors" />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-800 truncate">{item.name}</div>
                        <div className="text-[10px] text-gray-400 truncate">{item.description}</div>
                    </div>
                    {value === item.id && (
                        <CheckCircleFilled className="text-primary text-base" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ToneSelector;
