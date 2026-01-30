import React, { CSSProperties } from "react";

const ImageView = ({ data, style }: { data: any, style?: CSSProperties }) => {
    return (
        <div style={{
            // width: '100%',
            // paddingBottom: '100%', // 创建1:1的宽高比
            // position: 'relative',
            // overflow: 'hidden',
            borderRadius: 10,
            ...style
        }}>
            <img
                src={data.url}
                alt={data.title || "Image"}
                style={{
                    // position: 'absolute',
                    // top: 0,
                    // left: 0,
                    // width: '100%',
                    // height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                }}
                loading="lazy"
                // onError={(e) => {
                //     (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Image+Error";
                // }}
            />
        </div>
    );
}

export default ImageView;
