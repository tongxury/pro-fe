import React from "react";
import {Card, Col, Row} from "antd";
import {XFlex, XText} from "@pro/ui";
import ProfileView from "@/components/Resource/ProfileView";

const VideoView2 = ({data}: { data: any }) => {
    return (

        <Row gutter={[16, 16]} wrap>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div style={{
                    position: 'relative',
                    width: '100%',
                    // paddingBottom: '56.25%', // 16:9 比例
                    // backgroundColor: '#f0f0f0',
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
                    <video
                        style={{
                            // position: 'absolute',
                            // top: 0,
                            // left: 0,
                            width: '100%',
                            // height: "auto",
                            objectFit: 'contain',
                        }}
                        src={data.url}
                        // controls
                        // preload="metadata"
                        // poster={data.thumbnail || ''}
                        // controlsList="nodownload"
                    />
                </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <XFlex vertical gap={12}>
                    {data.title && (
                        <XText
                            size={16}
                            style={{
                                lineHeight: 1.5,
                                fontWeight: 500,
                                wordBreak: 'break-word'
                            }}
                        >
                            {data.title}
                        </XText>
                    )}

                    {data.description && (
                        <XText
                            size={16}
                            style={{
                                color: 'rgba(0,0,0,0.65)',
                                lineHeight: 1.6,
                                marginBottom: 8,
                                wordBreak: 'break-word'
                            }}
                        >
                            {data.description}
                        </XText>
                    )}

                    {data.profile && (
                        <ProfileView data={data.profile}/>
                    )}
                </XFlex>
            </Col>
        </Row>
    );
}

export default VideoView2;
