import { XIcon } from "@pro/icons";
import { useXTheme, XCardSelector, XFlex, XOption, XText } from "@pro/ui";
import { Popover } from "antd";
import React from "react";

function Selector({
    current,
    options,
    onChange
}: {
    current: XOption;
    options: XOption[];
    onChange: (option: XOption) => void;
}) {
    const { token } = useXTheme();

    return (
        <Popover
            arrow={false}
            placement="top"
            title={""}
            zIndex={2147483647}
            content={
                <XCardSelector
                    onChange={onChange}
                    value={current?.value}
                    options={options}
                    renderItem={(option: XOption, selected: boolean) => (
                        <XFlex vertical style={{ width: 150 }}>
                            <XFlex gap={5} align={"center"} style={{ cursor: "pointer" }}>
                                <XIcon name={option?.icon} color={token.colorPrimary} />
                                <XText>{option.desc}</XText>
                            </XFlex>
                            {/* <XText>{option.desc}</XText> */}
                        </XFlex>
                    )}
                />
            }
        >
            <div style={{ display: "inline-block" }}>
                <XFlex gap={5} align={"center"} style={{ cursor: "pointer" }}>
                    <XIcon name={current?.icon} color={token.colorPrimary} />
                    <XText color={token.colorPrimary} size={15}>
                        {current?.label}
                    </XText>
                </XFlex>
            </div>
        </Popover>
    );
}

export default Selector;
