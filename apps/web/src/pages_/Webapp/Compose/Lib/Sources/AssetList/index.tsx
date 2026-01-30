import { XIcon } from "@pro/icons";
import { useXTheme, XFlex, XText } from "@pro/ui";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

function AssetList({ data, loading }: { data?: any[]; loading?: boolean }) {
    const { token } = useXTheme();
    const t = useTranslations("Default");

    const AssetItem = ({ data }: { data: any }) => {
        const { token } = useXTheme();
        const t = useTranslations("Default");
        const [hovering, setHovering] = useState(false);

        return (
            <XFlex
                onMouseOver={() => setHovering(true)}
                onMouseOut={() => setHovering(false)}
                vertical
                gap={3}
                style={{
                    padding: 10,
                    borderBottom: "1px solid " + token.colorBorder
                }}
            >
                <XText size={16}>{data?.extras?.title}</XText>
                <XText color={token.colorTextL3}>{data?.extras?.author}</XText>

                <XFlex align={"center"} justify={"space-between"}>
                    <XFlex align={"center"} gap={10}>
                        <XFlex align={"center"} gap={3} style={{ cursor: "pointer" }}>
                            <XIcon name={"ChatgptLine"} size={12} color={token.colorPrimary} />
                            <XText color={token.colorPrimary} size={12}>
                                {t("cite")}
                            </XText>
                        </XFlex>
                        <XFlex align={"center"} gap={3} style={{ cursor: "pointer" }}>
                            <XIcon name={"ChatgptLine"} size={12} color={token.colorPrimary} />
                            <XText color={token.colorPrimary} size={12}>
                                {t("view")}
                            </XText>
                        </XFlex>
                        <XFlex align={"center"} gap={3} style={{ cursor: "pointer" }}>
                            <XIcon name={"ChatgptLine"} size={12} color={token.colorPrimary} />
                            <XText color={token.colorPrimary} size={12}>
                                {t("ai chat")}
                            </XText>
                        </XFlex>
                    </XFlex>

                    {(hovering || data?.favorite) && (
                        <XIcon name={"ChatgptLine"} color={token.colorTextL1} onClick={() => {}} />
                    )}
                </XFlex>
            </XFlex>
        );
    };

    return (
        <div>
            {loading ? <p>loading</p> : <div>{data?.map((x: any, i: number) => <AssetItem key={i} data={x} />)}</div>}
        </div>
    );
}

export default AssetList;
