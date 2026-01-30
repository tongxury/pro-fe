import React, {CSSProperties} from "react";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {Avatar, Badge, Col, Row, Tooltip} from "antd";
import {
    UserOutlined,
    HeartOutlined,
    MessageOutlined,
    StarOutlined,
    CheckCircleFilled,
    TagOutlined
} from '@ant-design/icons';

const ResourceList = ({data, style}: { data: any[], style?: CSSProperties }) => {
    const {themeVars} = useXTheme();

    const mediaResources = data?.filter(item => !item.category);
    const videoResources = mediaResources?.filter(item => item.mimeType?.startsWith('video'));
    const imageResources = mediaResources?.filter(item => item.mimeType?.startsWith('image'));
    const metaResources = data?.filter(item => item.category);

    // 基础样式定义
    const styles = {
        card: {
            background: themeVars.colorBgContainerPrimary,
            borderRadius: 16,
            padding: 15,
            // border: '1px solid rgba(0,0,0,0.06)',
            // transition: 'all 0.3s ease',
        } as CSSProperties,

        statItem: {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            // padding: '8px 16px',
            borderRadius: 20,
            background: 'rgba(0,0,0,0.02)',
            fontSize: 14,
        } as CSSProperties,

        tag: {
            padding: '4px 12px',
            borderRadius: 16,
            background: `${themeVars.colorPrimary}15`,
            color: themeVars.colorPrimary,
            fontSize: 12,
            marginRight: 8,
        } as CSSProperties,
    };

    const renderAuthorProfile = (item: any) => {
        const {meta} = item;
        if (!meta) return null;

        return (
            <div style={styles.card}>
                <XFlex vertical gap={10}>
                    {/* 作者基本信息 */}
                    <XFlex gap={16} align="center">

                        <Avatar
                            size={64}
                            src={meta.avatar}
                            icon={<UserOutlined/>}
                            style={{
                                border: `2px solid ${themeVars.colorPrimary}`,
                            }}
                        />
                        <XFlex vertical gap={4} flex={1}>
                            <XFlex gap={8} align="center">
                                <XText bold size={18}>{meta.username}</XText>
                                <XText color={themeVars.colorTextL2} size={12} style={{
                                    background: 'rgba(0,0,0,0.02)',
                                    padding: '2px 10px',
                                    borderRadius: 12,
                                }}>{meta.ipAddress}</XText>
                            </XFlex>
                            <XText color={themeVars.colorTextL2} size={13} style={{lineHeight: '1.6'}}>
                                {meta.sign}
                            </XText>
                        </XFlex>
                    </XFlex>

                    {/* 标签 */}
                    {meta.tags && (
                        <XFlex gap={8}>
                            <TagOutlined style={{color: themeVars.colorPrimary}}/>
                            <XText style={styles.tag}>{meta.tags}</XText>
                        </XFlex>
                    )}

                    {/* 统计数据 */}
                    <XFlex gap={24} style={{
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        // paddingTop: 20,
                    }}>
                        <XFlex vertical align="center" gap={4}>
                            <XText bold>{meta.followingCount}</XText>
                            <XText color={themeVars.colorTextL2} size={13}>关注</XText>
                        </XFlex>
                        <XFlex vertical align="center" gap={4}>
                            <XText bold>{meta.followerCount}</XText>
                            <XText color={themeVars.colorTextL2} size={13}>粉丝</XText>
                        </XFlex>
                        <XFlex vertical align="center" gap={4}>
                            <XText bold>{meta.likedCount}</XText>
                            <XText color={themeVars.colorTextL2} size={13}>获赞</XText>
                        </XFlex>
                    </XFlex>
                </XFlex>
            </div>
        );
    };

    const renderInteractionMetrics = (item: any) => {
        const {meta} = item;
        if (!meta) return null;

        return (
            <div style={styles.card}>
                <XFlex vertical gap={10}>
                    <XText bold size={20}>{meta.title}</XText>

                    <XText color={themeVars.colorTextL2} size={14} style={{lineHeight: '1.8'}}>
                        {meta.description}
                    </XText>

                    <XFlex gap={8}>
                        {meta.keywords?.split(',').slice(0, 6).map((keyword: string, idx: number) => (
                            <Tooltip key={idx} title={keyword.trim()}>
                                <XText style={styles.tag}>#{keyword.trim()}</XText>
                            </Tooltip>
                        ))}
                        {meta.keywords?.split(',').length > 6 && (
                            <XText color={themeVars.colorTextL2} size={12}>...</XText>
                        )}
                    </XFlex>

                    <XFlex gap={16} style={{}}>
                        <XFlex gap={4} align="center" style={styles.statItem}>
                            <HeartOutlined style={{color: themeVars.colorPrimary}}/>
                            <XText>{meta.likedCount}</XText>
                        </XFlex>
                        <XFlex gap={4} align="center" style={styles.statItem}>
                            <MessageOutlined style={{color: themeVars.colorPrimary}}/>
                            <XText>{meta.commentCount}</XText>
                        </XFlex>
                        <XFlex gap={4} align="center" style={styles.statItem}>
                            <StarOutlined style={{color: themeVars.colorPrimary}}/>
                            <XText>{meta.collectedCount}</XText>
                        </XFlex>
                    </XFlex>
                </XFlex>
            </div>
        );
    };

    return (
        <XFlex vertical gap={24} block style={{padding: '24px 0', ...style}}>
            {/* Meta Resources */}
            <Row gutter={[24, 24]}>
                {metaResources?.map((item, index) => (
                    <Col span={24} key={item._id}>
                        {item.category === 'authorProfile' && renderAuthorProfile(item)}
                        {item.category === 'interactionMetrics' && renderInteractionMetrics(item)}
                    </Col>
                ))}
            </Row>

            {/* Media Resources */}
            {imageResources?.length && (
                <Row gutter={[16, 16]}>
                    {imageResources?.map((item, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index} >
                            <img
                                src={item.url}
                                alt=""
                                style={{
                                    width: '100%',
                                    height: 200,
                                    objectFit: 'cover',
                                    borderRadius: 12,
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {videoResources?.length && (
                <Row gutter={[16, 16]} style={{width:'100%'}}>
                    {videoResources?.map((item, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index} style={{}}>
                            <video
                                src={item.url}
                                style={{
                                    width: '100%',
                                    height: 200,
                                    objectFit: 'cover',
                                    borderRadius: 12,
                                }}
                                // controls
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </XFlex>
    );
};

export default ResourceList;
