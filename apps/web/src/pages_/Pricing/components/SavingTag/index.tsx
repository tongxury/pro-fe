import { Text } from "@/components/Text";
import React, { CSSProperties } from "react";
import { Flex, theme } from "antd";

const SavingTag = ({ value, colors, style }: { value: string; colors: string[]; style?: CSSProperties }) => {
    const { token } = theme.useToken();

    return (
        <Flex
            align={"center"}
            style={{
                fontSize: 13,
                paddingInline: 15,
                paddingBlock: 8,
                marginRight: -25,
                color: "#a55bf6",
                borderTopRightRadius: 16,
                borderBottomLeftRadius: 15,
                background: "#fcf2fd",
                ...(style || {})
            }}
            gap={token.marginXS}
        >
            <Text ellipsis ignoreIntl bold>
                {value}
            </Text>
        </Flex>
    );
};

export default SavingTag;
