import { GradientText } from "@/components/Text";
import React from "react";
import Image from "next/image";
import { Flex } from "antd";
import { levelConfigs } from "@/pages_/Pricing/helper";

const Level = ({
    colors,
    left,
    right,
    title,
    level,
    levelLabel,
    labelStyles,
    size
}: {
    colors?: string[];
    left?: any;
    right?: any;
    title?: string;
    level: string;
    levelLabel?: string;
    size: number;
    labelStyles?: any;
}) => {
    const conf = levelConfigs[level];

    console.log("LevelLevel", level, levelConfigs);

    return (
        <Flex align={"center"} gap={10}>
            {/*<Image alt={''} layout='intrinsic' src={left || conf?.iconPrefix} width={size + 6} height={size + 6}/>*/}
            <GradientText
                style={{ fontWeight: "bold", fontSize: size }}
                gradient={["to bottom right", `${(colors || conf?.colors || [])?.join(",")}`]}
            >
                {title}&nbsp;
                {/*<span style={labelStyles}>*/}
                <span>{levelLabel}</span>
            </GradientText>
            {/*<Image alt={''} layout='intrinsic' src={right || conf?.iconSuffix} width={size + 6} height={size + 6}/>*/}
        </Flex>
    );
};

export default Level;
