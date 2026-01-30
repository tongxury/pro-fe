import React from "react";
import { Text } from "@/components/Text";
import { Flex, theme, Typography } from "antd";
import Image from "next/image";

const GradientBorder = ({
    icon,
    name,
    desc,
    colors,
    ignoreIntl,
    children
}: {
    icon: string;
    name: string;
    desc?: string;
    colors: string[];
    ignoreIntl?: boolean;
    children?: any;
}) => {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                border: "1.5px solid transparent",
                borderRadius: 12,
                backgroundClip: "padding-box, border-box",
                backgroundOrigin: "padding-box, border-box",
                backgroundColor: "white",
                backgroundImage: `linear-gradient(165deg, ${colors.join(",")}), linear-gradient(165deg,  ${colors.join(",")})`
            }}
        >
            <Flex
                vertical={true}
                align={"center"}
                gap={token.marginXS}
                style={{
                    minHeight: 110,
                    background: "white",
                    paddingInline: token.paddingSM,
                    paddingBlock: token.paddingXS,
                    borderRadius: 10
                }}
            >
                <Flex align={"center"} gap={5}>
                    <Image alt={""} layout="intrinsic" src={icon} width={17} height={17} />
                    <Text ignoreIntl size={16} ellipsis boldNumber={660}>
                        {name}
                    </Text>
                </Flex>
                <Typography style={{ fontSize: 15, textAlign: "center", color: "#000", lineHeight: "18px" }}>
                    {/* 需要自定义的话 */}
                    {children ? (
                        children
                    ) : (
                        <Text ellipsis maxLines={3} style={{ maxLines: 3, maxHeight: 70 }} ignoreIntl={ignoreIntl}>
                            {desc}
                        </Text>
                    )}
                </Typography>
            </Flex>
        </div>
    );
};

export default GradientBorder;
