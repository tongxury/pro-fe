import { CSSProperties, ReactNode } from "react";

import { BaseProps } from "./base";
import { Flex } from "./flex";
import { Image_ } from "./image";
import { useTheme } from "./provider";

function UserCard({
    avatar,
    name,
    desc,
    extra,
    style
}: {
    avatar?: string | undefined;
    name: ReactNode | string;
    desc?: ReactNode | string | undefined;
    extra?: ReactNode | undefined;
    style?: CSSProperties | undefined;
}) {
    const { themeVars } = useTheme();

    return (
        <Flex align={"center"} justify={"space-between"} style={{ ...style }}>
            <Flex gap={8} align="center">
                <Image_ src={avatar} circle size={40} />
                <Flex vertical justify={"space-between"}>
                    <div style={{ fontSize: 16, color: themeVars.colorTextPrimary }}> {name}</div>
                    <div style={{ fontSize: 14, color: themeVars.colorTextL2 }}> {desc}</div>
                </Flex>
            </Flex>
            {extra}
        </Flex>
    );
}

export default UserCard;
