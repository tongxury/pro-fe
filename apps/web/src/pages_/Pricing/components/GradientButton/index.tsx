import { Text } from "@/components/Text";
import React, { CSSProperties } from "react";
import { Flex, theme } from "antd";

const GradientButton = ({
    disabled,
    width,
    height,
    text,
    colors,
    onClick,
    ignoreIntl,
    style
}: {
    disabled?: boolean;
    width?: number;
    height?: number;
    text: string;
    colors: string[];
    onClick?: () => void;
    ignoreIntl?: boolean;
    style?: CSSProperties;
}) => {
    const { token } = theme.useToken();

    const btnStyle = {
        cursor: "pointer",
        borderRadius: 50,
        paddingInline: 30,
        paddingBlock: 8,
        width: width || 200,
        height: height || undefined,
        // background: `linear-gradient(135deg, ${'#4DF1F4'}, ${token.colorFill}, ${token.colorFill}) `,
        background: `linear-gradient(165deg, ${colors?.join(",")}`,
        ...style
    };
    const disabledStyle = {
        borderRadius: 50,
        paddingInline: 30,
        paddingBlock: 8,
        width: width || 200,
        height: height || undefined,
        background: token.colorTextQuaternary,
        ...style
    };

    return (
        <Flex
            align={"center"}
            justify={"center"}
            style={disabled ? disabledStyle : btnStyle}
            onClick={() => {
                return !disabled && onClick?.();
            }}
        >
            <Text ignoreIntl={ignoreIntl} color={token.colorBgBase} bold>
                {text}
            </Text>
        </Flex>
    );
};

export default GradientButton;
