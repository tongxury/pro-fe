import {XFlex, XText, XTag, XDivider, useXTheme} from "@pro/ui";
import React from "react";
import {Card, Flex, Typography} from "antd";

const ProfileView = ({data}: { data: any }) => {

    const {themeVars} = useXTheme();

    return (
        <XFlex vertical gap={20}>
            <XFlex gap={10} align={'center'}
                   style={{padding: 15, background: themeVars.colorBgL2, borderRadius: 10}}>
                <img src={data.avatar} style={{
                    border: '2px solid ' + themeVars.colorPrimary,
                    width: 50,
                    height: 50,
                    borderRadius: '50%'
                }}/>
                <XFlex vertical gap={10}>
                    <XText>{data.username}</XText>
                    <XFlex align={'center'} gap={10}>
                        <Typography.Text
                            style={{fontSize: 13, color: themeVars.colorTextL3}}>{data.ipAddress}</Typography.Text>
                        <Typography.Text style={{
                            fontSize: 13,
                            color: themeVars.colorTextL3
                        }}>{data.followerCount}关注</Typography.Text>
                        <Typography.Text style={{
                            fontSize: 13,
                            color: themeVars.colorTextL3
                        }}>{data.likedCount}获赞</Typography.Text>
                    </XFlex>
                </XFlex>
            </XFlex>

            <Typography.Text style={{fontSize: 14, color: themeVars.colorTextPrimary}}>
                {data.sign}
            </Typography.Text>

            <Flex gap={10} align={'center'} wrap>
                {data.tags?.map((tag: string, index: number) => (
                    <span style={{
                        padding: '7px 12px',
                        color: themeVars.colorTextPrimary,
                        borderRadius: 5,
                        background: themeVars.colorBgL3
                    }}
                          key={index}># {tag}</span>
                ))}
            </Flex>

        </XFlex>
    )


};

export default ProfileView;
