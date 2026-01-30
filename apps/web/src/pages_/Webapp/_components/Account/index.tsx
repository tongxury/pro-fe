import { fetchMemberMetadatas, fetchUserDetail } from "@/api/api";
import { T, Text } from "@/components/Text";
import { appName } from "@/constants";
import { useRouter } from "@/navigation";
import Member from "@/pages_/Pricing/components/Member";
import Metadata from "@/pages_/Pricing/components/Metadata";
import { RightOutlined } from "@ant-design/icons";
import { ArrowRightOutlined } from "@mui/icons-material";
import { useXTheme, XFlex, XHoverable, XImage, XText } from "@pro/ui";
import { MemberState, type User } from "@pro/ui-pro";
import { useRequest } from "ahooks";
import { Flex, Modal, Popover, Skeleton, Spin, theme } from "antd";
import { useTranslations } from "next-intl";
import { HTMLAttributes, useState } from "react";

function Account({ data, loading, ...rest }: { data: User; loading?: boolean } & HTMLAttributes<any>) {
    const { token } = useXTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <div style={{ margin: 15 }} {...rest}>
            {loading ? (
                <Skeleton.Button style={{ height: 50, borderRadius: 10 }} active block />
            ) : (
                <XHoverable style={{ padding: 10, borderRadius: 10 }} color={token.colorBgLayout}>
                    <Popover
                        content={
                            <MemberState
                                onRoute={(path: string) => router.push(path)}
                                onUpgrade={() => setIsModalOpen(true)}
                                data={data}
                            />
                        }
                        open={open}
                        onOpenChange={setOpen}
                        trigger={"click"}
                        placement="rightTop"
                    >
                        <div>
                            <XFlex align={"center"} justify="space-between">
                                <XFlex gap={10} align="center">
                                    <XImage size={30} circle src={data?.user_avatar} />
                                    <XText size={16}>{data?.username}</XText>
                                </XFlex>
                                <RightOutlined
                                    style={{
                                        fontSize: 14,
                                        color: token.colorTextL3
                                    }}
                                />
                            </XFlex>
                        </div>
                    </Popover>
                </XHoverable>
            )}
            <Modal
                width={"90%"}
                title={null}
                footer={null}
                open={isModalOpen}
                zIndex={10000}
                onCancel={() => setIsModalOpen(false)}
            >
                <Subscribe />
            </Modal>
        </div>
    );
}

const Subscribe = () => {
    const {
        data: userDetailResult,
        loading: userDetailLoading,
        run: runFetch
    } = useRequest(fetchUserDetail, { manual: true });

    const { data: metadatasResult, loading: metadataLoading } = useRequest(fetchMemberMetadatas);

    const loading = userDetailLoading || metadataLoading;
    const userDetail = userDetailResult?.data;

    const metadatas = metadatasResult?.data;
    const t = useTranslations("Pricing");
    const { token } = theme.useToken();
    const authed = !(userDetailResult?.code && userDetailResult?.code == 401);

    const Title = () => {
        return (
            <Flex vertical gap={15} align={"center"}>
                <Flex gap={token.marginSM} align={"center"}>
                    <T bold size={50}>
                        {t("energize your academic level with", { name: "" })}
                    </T>
                    <span
                        style={{
                            fontSize: 50,
                            fontWeight: "bold",
                            color: token.colorPrimary
                        }}
                    >
                        {appName}
                    </span>
                </Flex>
                {(!authed || userDetail?.member?.level === "free") && (
                    <Text size={20}>subscribe now to secure Early Bird Pricing before it increases soon!</Text>
                )}
            </Flex>
        );
    };

    return (
        <Spin style={{ flex: 1 }} size="large" spinning={loading && !userDetail}>
            <Flex vertical align={"center"} style={{ paddingBlock: token.paddingLG * 2, height: "100%" }} gap={50}>
                <Flex vertical gap={15}>
                    <Title />
                    {userDetail?.membership?.level && userDetail?.membership?.level !== "free" && (
                        <Member member={userDetail?.membership} />
                    )}
                </Flex>

                {metadatas && (
                    <Metadata metadatas={metadatas} authed={authed} level={userDetail?.member?.level || "free"} />
                )}
            </Flex>
        </Spin>
    );
};

export default Account;
