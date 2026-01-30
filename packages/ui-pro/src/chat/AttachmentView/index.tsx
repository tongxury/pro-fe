import { useXTheme, xBoxShadow, XCard, XFlex, XImage, xPosition, XTag, XText } from "@pro/ui";
import type { CSSProperties } from "react";

import { Attachment } from "../../types";
import { ReferenceCard, ReferencePopover } from "./Reference";

function AttachmentView({ data, style }: { data: Attachment; style?: CSSProperties }) {
    const { token } = useXTheme();

    switch (data?.category) {
        case "image":
            return <XImage src={data.url || data.content} style={{ objectFit: "cover", borderRadius: 10, ...style }} />;
        case "research_result":
            return (
                <ReferencePopover attachment={data}>
                    <ReferenceCard attachment={data}></ReferenceCard>
                </ReferencePopover>
            );
        default:
            return (
                <>
                    <XFlex gap={10} align={"center"}>
                        {/*<IconFont name={fileIconConfig(data.category)} size={35}/>*/}
                        <XTag
                            style={{
                                background: token.colorBgL2,
                                color: token.colorPrimary,
                                fontWeight: "700"
                            }}
                        >
                            {data.category?.toUpperCase()}
                        </XTag>
                        <XText
                            size={13}
                            ellipsis={{
                                maxWidth: "101px"
                            }}
                        >
                            {data.name}
                        </XText>
                    </XFlex>
                    {/*<XIcon name={'CloseLine'}*/}
                    {/*       onClick={() => onRemove?.(data)}*/}
                    {/*       style={{cursor: "pointer", marginRight: "7px"}}*/}
                    {/*/>*/}
                </>
            );
    }
}

export default AttachmentView;
