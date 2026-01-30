import { Card, Col, Divider, Flex, Row, theme } from "antd";
import { T, Text } from "@/components/Text";
import Image from "next/image";
import moment from "moment/moment";
import React from "react";
import Level from "@/pages_/Pricing/components/Level";
import { functionIcons, functionIcons2, levelConfigs, modelIcons } from "@/pages_/Pricing/helper";
import { appName } from "@/constants";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Member = ({ member }: { member: any }) => {
    const { token } = theme.useToken();

    return (
        <Card
            bodyStyle={{
                minWidth: 890,
                paddingBlock: token.paddingMD,
                paddingInline: token.paddingXL,
                paddingTop: token.paddingMD
            }}
            style={{
                marginTop: 50,
                maxWidth: 891,
                boxShadow: `0px 4px 12px ${token.boxShadow}`,
                borderRadius: "16px"
            }}
        >
            <Flex align={"center"} justify={"space-between"}>
                <Level title={appName} levelLabel={member?.quota?.label} level={member?.level} size={28} />
                {/*<Text color={levelConfigs[member?.quota?.level]?.light ? '#FF0953' :*/}
                {/*    token.colorFill}>current plan</Text>*/}
                <Flex align={"center"} gap={3} style={{ fontSize: 14 }}>
                    {/*{member?.status === 'subscribing' &&*/}
                    {/*    <Text color={token.colorTextDescription}>this plan will renew on</Text>}*/}
                    {/*{member?.status !== 'subscribing' &&*/}
                    {/*    <Text color={token.colorTextDescription}>this plan will expire on</Text>}*/}
                    <Text color={token.colorTextDescription}>this plan will renew on</Text>
                    <Text color={token.colorTextDescription} ignoreIntl>
                        {moment(member?.expireAt * 1000 || 0).format("yyyy/MM/DD")}
                    </Text>
                </Flex>
            </Flex>
            <Divider style={{ marginBlock: 10 }} />
            <Flex vertical gap={token.marginSM} style={{}}>
                <Flex align={"start"} justify={"space-between"} gap={token.marginSM}>
                    <Flex vertical gap={token.marginSM}>
                        {member?.quota?.models?.map((m: any, i: number) => {
                            // const limit = member?.quota?.modelLimits?.[m.name]?.day ||
                            //     member?.quota?.modelLimits?.[m.name]?.month

                            return (
                                <Flex align={"center"} key={i} gap={10}>
                                    {/*<Image alt={''} layout="intrinsic" src={modelIcons[m.name]} width={17}*/}
                                    {/*       height={17}/>*/}
                                    <Text ignoreIntl size={16} bold>
                                        Queries
                                    </Text>
                                    {(!m.queries || m.queries == 0) && (
                                        <Text size={16} bold>
                                            unlimited
                                        </Text>
                                    )}
                                    {m.queries > 0 && (
                                        <Text size={16} ignoreIntl bold>
                                            {m?.used || 0} / {m.queries}
                                        </Text>
                                    )}
                                </Flex>
                            );
                        })}
                    </Flex>
                    <Row style={{ maxWidth: 350 }} gutter={[token.marginSM, token.marginXS]}>
                        {member?.quota?.functions?.map((m: any, i: number) => (
                            <Col span={12} key={i}>
                                <Flex align={"center"} justify={"center"}>
                                    <Flex
                                        align={"center"}
                                        gap={5}
                                        style={{ width: 200, color: token.colorTextDescription }}
                                    >
                                        {functionIcons2[m.name]}
                                        <Text ellipsis>{m.name}</Text>
                                    </Flex>
                                </Flex>
                            </Col>
                        ))}
                    </Row>
                </Flex>
                <Flex align={"center"} justify={"space-between"}>
                    <a href={member?.billingUrl} target={"_blank"} style={{ color: token.colorTextDescription }}>
                        <Text size={10} style={{ cursor: "pointer" }}>
                            manage billing
                        </Text>
                    </a>
                </Flex>
            </Flex>
        </Card>
    );
};

export default Member;
