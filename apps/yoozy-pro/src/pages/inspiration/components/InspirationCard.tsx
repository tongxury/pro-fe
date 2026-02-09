import React, { useState } from "react";
import DetailV2 from "@/pages/inspiration/DetailV2";
import classNames from "classnames";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { updateResourceSegment } from "@/api/resource";

interface InspirationCardProps {
    data: any;
    className?: string;
    showEntry?: boolean
}

const InspirationCard: React.FC<InspirationCardProps> = ({ data, className, showEntry }) => {
    const [collected, setCollected] = useState(data.collected);
    if (!data) return null;

    const coverUrl = data.segments?.[0]?.startFrame || data.highlightFrames?.[0]?.url || data.root?.coverUrl;

    return (
        <DetailV2 id={data?._id} showEntry={showEntry}>
            <div className={classNames("group relative cursor-pointer", className)}>
                <div
                    className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-gray-100 relative shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                        src={coverUrl}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Tags Overlay */}
                    <div
                        className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                        {[
                            ...(data.typedTags?.text || []),
                            ...(data.typedTags?.picture || []),
                            ...(data.typedTags?.scene || []),
                        ]?.slice(0, 3).map((t: string, i: number) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs border border-white/10"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Collection Button */}
                    <div
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            const action = collected ? 'cancel' : 'collect';
                            updateResourceSegment(data._id, action).then(() => {
                                setCollected(!collected);
                            });
                        }}
                    >
                        {collected ? <HeartFilled className="text-red-500 text-lg" /> : <HeartOutlined className="text-white text-lg" />}
                    </div>
                </div>
            </div>
        </DetailV2>
    );
};

export default InspirationCard;
