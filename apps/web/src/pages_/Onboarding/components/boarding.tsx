import { Button, Card, Flex, theme } from "antd";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { T } from "@/components/Text";
import { appName } from "@/constants";
import { defaultImageLoader } from "@/utils";
import { useTranslations } from "next-intl";
import bg from "@/assets/bg.jpeg";
import "./boarding.scss";
function Boarding({ data }: { data: { [key: string]: any } }) {
    const t = useTranslations("Login");

    const { token } = theme.useToken();

    // background: url("../assets/bg.jpeg") no-repeat;
    // background-size: cover;
    return (
        <Flex className="boarding-container" align={"center"} justify={"center"} style={{ height: "100vh" }}>
            <Card style={{ width: 500, borderRadius: 20, paddingBottom: 60 }} hoverable>
                <Flex vertical align={"center"} gap={40}>
                    <Flex style={{ width: "100%" }}>
                        <Flex gap={8} align={"center"}>
                            <Image src={logo} alt={""} width={30} height={30} />
                            <T size={20} bold>
                                {appName}
                            </T>
                        </Flex>
                    </Flex>
                    <Flex vertical gap={30}>
                        <Flex vertical gap={10} align={"center"}>
                            <Image
                                loader={defaultImageLoader}
                                src={data?.user_avatar || ""}
                                alt={""}
                                width={60}
                                height={60}
                                style={{ borderRadius: 30 }}
                            />
                            <T size={15}>{data?.username}</T>
                        </Flex>
                        <T bold size={25}>
                            {t("welcome_to", { appName })}
                        </T>
                    </Flex>

                    <Button
                        size={"large"}
                        type="primary"
                        shape={"round"}
                        id="use_now_ele"
                        style={{ minWidth: 200, fontWeight: "bold" }}
                    >
                        {t("use_now")}
                    </Button>
                </Flex>
            </Card>
        </Flex>
    );
}

export default Boarding;
