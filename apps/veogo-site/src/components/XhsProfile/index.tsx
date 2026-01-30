import {useXTheme, XFlex, XText} from "@pro/ui";
import {Input, Skeleton, Avatar, Divider, Tag, Tooltip} from "antd";
import {addProfile, deleteProfile, useFetchUserProfile} from "@/api/api";
import moment from "moment";
import {useEffect} from "react";
import {UserOutlined, ClockCircleOutlined, EnvironmentOutlined, DeleteOutlined} from '@ant-design/icons';

const XhsProfile = ({onConfirmed}: { onConfirmed: () => void }) => {
    const [data, {loading, mutate}] = useFetchUserProfile()
    const {themeVars} = useXTheme()

    useEffect(() => {
        if (data) {
            onConfirmed?.()
        }
    }, [data])

    if (loading) {
        return (
            <XFlex
                style={{
                    width: '100%',
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(18, 21, 29, 0.04)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
                }}
            >
                <Skeleton avatar active paragraph={{rows: 6}} />
            </XFlex>
        )
    }

    const onLinkAdded = (e: any) => {
        const link = e.target.value
        // addProfile({link}).then((rsp) => {
        //     if (!rsp.code) {
        //         mutate()
        //     }
        // })
    }

    const onLinkRemoved = (e: any) => {
        // deleteProfile({}).then((rsp) => {
        //     if (!rsp.code) {
        //         mutate()
        //     }
        // })
    }

    const renderDataCard = (value: string | number | undefined, label: string) => (
        <XFlex
            vertical
            align="center"
            style={{
                borderRadius: '12px',
                padding: '16px',
                flex: 1,
                background: 'rgba(72, 160, 237, 0.05)',
                border: '1px solid rgba(72, 160, 237, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                margin: '0 6px',
            }}
            // hoverStyle={{
            //     background: 'rgba(72, 160, 237, 0.08)',
            //     transform: 'translateY(-2px)',
            //     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            // }}
        >
            <XText
                style={{
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#48a0ed',
                    marginBottom: '8px',
                }}
            >
                {value || '0'}
            </XText>
            <XText
                style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                }}
            >
                {label}
            </XText>
        </XFlex>
    )

    return (
        <XFlex
            vertical
            style={{
                width: '100%',
                borderRadius: '16px',
                padding: '24px',
                background: 'rgba(18, 21, 29, 0.6)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            }}
        >
            {data ? (
                <XFlex vertical gap={24}>
                    {/* Header with last updated time */}
                    <XFlex justify="space-between" align="center">
                        <XText
                            style={{
                                fontSize: '20px',
                                fontWeight: 600,
                                color: '#fff',
                                letterSpacing: '0.5px',
                            }}
                        >
                            小红书账户信息
                        </XText>
                        <XFlex align="center" gap={8}>
                            <ClockCircleOutlined style={{ color: 'rgba(255, 255, 255, 0.6)',}} />
                            <XText
                                color="rgba(255, 255, 255, 0.6)"
                                style={{ fontSize: '14px' }}
                            >
                                更新于 {moment(data?.lastUpdatedAt * 1000).format('MM-DD HH:mm')}
                            </XText>
                            <DeleteOutlined  onClick={onLinkRemoved}   style={{ cursor: 'pointer', color: 'rgba(255, 255, 255, 0.6)',  }}/>
                        </XFlex>
                    </XFlex>

                    <Divider style={{ margin: '4px 0 16px', borderColor: 'rgba(255, 255, 255, 0.08)' }} />

                    {/* Profile Header */}
                    <XFlex gap={20} align="center">
                        <Avatar
                            size={80}
                            icon={<UserOutlined />}
                            style={{
                                background: 'linear-gradient(135deg, #48a0ed, #3dbe9b)',
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                            }}
                        />
                        <XFlex vertical gap={6} style={{ flex: 1 }}>
                            <XFlex align="center" gap={12}>
                                <XText
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        color: '#fff',
                                    }}
                                >
                                    {data?.content?.username}
                                </XText>
                                <XText
                                    style={{
                                        padding: '2px 10px',
                                        borderRadius: '12px',
                                        fontSize: '13px',
                                        background: 'rgba(72, 160, 237, 0.15)',
                                        color: '#48a0ed',
                                    }}
                                >
                                    ID: {data?.content?.id}
                                </XText>
                            </XFlex>

                            <XFlex align="center" gap={8}>
                                <EnvironmentOutlined style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                                <XText style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                    {data?.content?.ipAddress || '未知位置'}
                                </XText>
                            </XFlex>

                            <XText
                                style={{
                                    fontSize: '15px',
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    lineHeight: '1.5',
                                    marginTop: '4px',
                                }}
                            >
                                {data?.content?.sign || '这个人很懒，没有留下签名~'}
                            </XText>
                        </XFlex>
                    </XFlex>

                    {/* Tags */}
                    {data?.content?.tags && (
                        <XFlex gap={10} style={{ marginTop: '8px' }}>
                            {data.content.tags.split(',').map((tag: string, index: number) => (
                                <Tag
                                    key={index}
                                    style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '13px',
                                        background: 'rgba(61, 190, 155, 0.1)',
                                        color: '#3dbe9b',
                                        border: '1px solid rgba(61, 190, 155, 0.2)',
                                        margin: 0,
                                    }}
                                >
                                    {tag.trim()}
                                </Tag>
                            ))}
                        </XFlex>
                    )}

                    {/* Stats Section */}
                    <XFlex gap={16} style={{ marginTop: '8px' }}>
                        {renderDataCard(data?.content?.followingCount, '关注')}
                        {renderDataCard(data?.content?.followerCount, '粉丝')}
                        {renderDataCard(data?.content?.liked, '获赞')}
                        {renderDataCard(data?.content?.noteCount, '笔记数量')}
                    </XFlex>
                </XFlex>
            ) : (
                <XFlex vertical>
                    <XFlex align="center" gap={10} style={{ marginBottom: '24px' }}>
                        <Avatar
                            size={40}
                            icon={<UserOutlined />}
                            style={{
                                background: 'linear-gradient(135deg, #48a0ed, #3dbe9b)',
                            }}
                        />
                        <XText
                            style={{
                                fontSize: '20px',
                                fontWeight: 500,
                                color: '#fff',
                            }}
                        >
                            连接小红书账户
                        </XText>
                    </XFlex>

                    <XFlex vertical gap={12}>
                        <XText style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: '1.5' }}>
                            请复制您的小红书主页链接到下方输入框，系统将自动获取您的账户信息。
                        </XText>

                        <Input.TextArea
                            onChange={onLinkAdded}
                            rows={4}
                            placeholder={'例如: https://www.xiaohongshu.com/user/profile/xxxxx?channel_type=web_explore_feed&xsec_token=xxxxxx&xsec_source=pc_note'}
                            style={{
                                width: '100%',
                                borderRadius: '12px',
                                resize: 'none',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.8)',
                                padding: '16px',
                                marginTop: '8px',
                                fontSize: '15px',
                            }}
                        />

                        <XText style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '13px', marginTop: '4px' }}>
                            提示: 在小红书App中点击"分享个人主页"，然后复制链接即可
                        </XText>
                    </XFlex>
                </XFlex>
            )}
        </XFlex>
    )
}

export default XhsProfile;
