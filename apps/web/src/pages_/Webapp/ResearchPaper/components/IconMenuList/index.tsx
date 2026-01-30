import { IconName, XIcon } from "@pro/icons";
import { useXTheme, XFlex, XOption } from "@pro/ui";
import { AnswerAttitude, AnswerState } from "@pro/ui-pro";
import React, { CSSProperties } from "react";

interface IProps {
    id: string;
    isCollected?: boolean;
    attitude?: string;
    style?: CSSProperties;
    onCopy: () => void;
    onChangeCollect: (isCollected: boolean) => void;
    onRegenerate: () => void;
    onChangeAttitude: (attitude: AnswerAttitude) => void;
}

const IconMenu = ({ name, onClick }: { name: IconName | undefined; onClick: () => void }) => {
    const t = useXTheme();
    return (
        <XFlex
            style={{
                border: `1px solid ${t.token.colorBorder}`,
                borderRadius: 8,
                padding: 9,
                cursor: "pointer"
            }}
            align="center"
            justify="center"
            onClick={onClick}
        >
            <XIcon name={name} style={{ cursor: "pointer" }}></XIcon>
        </XFlex>
    );
};

const IconMenuList = (props: IProps) => {
    const { id, isCollected, attitude, style, onCopy, onChangeCollect, onRegenerate, onChangeAttitude } = props;

    const t = useXTheme();
    const leftMenuList: XOption[] = [
        {
            value: "CopyLine",
            icon: <IconMenu name="CopyLine" onClick={onCopy}></IconMenu>
        },
        {
            value: "StarLine",
            icon: isCollected ? (
                <IconMenu name="StarLine" onClick={() => onChangeCollect(false)}></IconMenu>
            ) : (
                <IconMenu name="StarLine" onClick={() => onChangeCollect(true)}></IconMenu>
            )
        },
        {
            value: "RegenerateLine",
            icon: <IconMenu name="RegenerateLine" onClick={onRegenerate}></IconMenu>
        }
    ];

    const rightMenuList: XOption[] = [
        {
            value: "HelpfulLine",
            icon:
                attitude === "helpful" ? (
                    <IconMenu name="HelpfulLine" onClick={() => onChangeAttitude(undefined)}></IconMenu>
                ) : (
                    <IconMenu name="HelpfulLine" onClick={() => onChangeAttitude("helpful")}></IconMenu>
                )
        },
        {
            value: "UnhelpfulLine",
            icon:
                attitude === "unHelpful" ? (
                    <IconMenu name="UnhelpfulLine" onClick={() => onChangeAttitude(undefined)}></IconMenu>
                ) : (
                    <IconMenu name="UnhelpfulLine" onClick={() => onChangeAttitude("unHelpful")}></IconMenu>
                )
        }
    ];

    return (
        <XFlex justify="space-between" align="center" style={{ ...style }}>
            <XFlex gap={14} align="center">
                {leftMenuList.map((item, index) => {
                    return item.icon;
                })}
            </XFlex>
            <XFlex gap={14} align="center">
                {rightMenuList.map((item, index) => {
                    return item.icon;
                })}
            </XFlex>
        </XFlex>
    );
};

export default IconMenuList;
