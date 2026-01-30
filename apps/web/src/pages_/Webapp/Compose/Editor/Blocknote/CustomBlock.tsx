/* eslint-disable react-hooks/rules-of-hooks */
//@ts-ignore
import { createReactBlockSpec } from "@blocknote/react";
import { XFlex, XText, useXTheme } from "@pro/ui";
import { Button } from "antd";
import { useState } from "react";

export const CustomBlock = createReactBlockSpec(
    {
        type: "customBlock",
        propSchema: {
            type: {
                default: "warning",
                values: ["warning", "error", "info", "success"]
            }
        },
        content: "none"
    },
    {
        render: (props: any) => {
            console.log("props in render", props);
            const { token } = useXTheme();
            const [count, setCount] = useState(0);
            const onClick = () => {
                setCount((value) => value + 1);
            };
            return (
                <div
                    style={{
                        width: 300,
                        height: 100,
                        background: token.colorBgL1,
                        userSelect: "none",
                        outline: "none"
                    }}
                    onClick={(e) => {
                        console.log("onClick", e);
                        // fix：formattingToolbar 未知的原因自动弹出，这里是主动关闭
                        setTimeout(() => {
                            props.editor.formattingToolbar.closeMenu();
                        });
                    }}
                    contentEditable={false}
                >
                    <XText bold>{props.block.props.type}</XText>
                    <Button onClick={onClick}>点击次数：{count}</Button>
                </div>
            );
        }
    }
);
