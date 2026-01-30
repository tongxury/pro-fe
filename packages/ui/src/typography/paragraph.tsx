import { Typography } from "antd";
import { ParagraphProps } from "antd/es/typography/Paragraph";
import { useState } from "react";

/* 
二次封装的意义：
1. expanded state在组件内部维护
*/
function Paragraph({ ellipsis, children, ...rest }: ParagraphProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Typography.Paragraph
            ellipsis={
                ellipsis
                    ? typeof ellipsis === "object"
                        ? {
                              expanded,
                              onExpand: (_, info) => setExpanded(info.expanded),
                              ...ellipsis
                          }
                        : ellipsis
                    : {}
            }
            {...rest}
        >
            {children}
        </Typography.Paragraph>
    );
}

export default Paragraph;
