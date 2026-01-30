import React, {CSSProperties} from "react";
import {Col, Row, Empty, Skeleton} from "antd";
import VideoView2 from "@/components/Resource/VideoView2";
import {useXTheme, XFlex, XText} from "@pro/ui";

const ResourceList = ({data, style}: { data: any[], style?: CSSProperties }) => {

    const {themeVars} = useXTheme()
    // 确保 data 总是数组
    const resourceData = Array.isArray(data) ? data : [];

    if (resourceData.length === 0) {
        return <Skeleton.Button block style={{height: 200}} active/>;
    }

    // 将资源分组，视频单独处理，图片可以网格展示
    const videoResources = resourceData.filter(item => item.mimeType?.startsWith('video'));
    const imageResources = resourceData.filter(item => item.mimeType?.startsWith('image'));

    return (
        <XFlex vertical gap={10}
               style={{background: themeVars.colorBgContainerPrimary, borderRadius: 10, padding: 15, ...style}}>
            {/*<XText bold></XText>*/}
            {/* 视频部分 */}
            {videoResources.length > 0 && (
                <div>
                    {videoResources.map((item, index) => (
                        <VideoView2 key={`video-${index}`} data={item}/>
                    ))}
                </div>
            )}

            {/* 图片网格部分 */}
            {imageResources.length > 0 && (
                <Row gutter={[10, 10]}>
                    {imageResources.map((item, index) => (
                        <Col xs={6} sm={6} md={6} lg={6} xl={6} key={`image-${index}`}
                            // style={{border: '1px solid red'}}
                        >
                            <img
                                src={item.url}
                                alt={item.title || "Image"}
                                style={{
                                    // position: 'absolute',
                                    // top: 0,
                                    // left: 0,
                                    width: '100%',
                                    borderRadius: 10,
                                    // height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                }}
                                loading="lazy"
                                // onError={(e) => {
                                //     (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Image+Error";
                                // }}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </XFlex>
    );
}

export default ResourceList;
