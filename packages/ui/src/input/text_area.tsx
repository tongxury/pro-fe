import { InputHTMLAttributes, KeyboardEventHandler, TextareaHTMLAttributes } from "react";

import { BaseProps } from "../base";
import { useTheme } from "../provider";
import { parseStyleProperties } from "../styles/utils";

// todo
interface TextareaProps extends TextareaHTMLAttributes<any> {
    onPressEnter: KeyboardEventHandler<any> | undefined;
}

export const InputTextArea = ({
    value,
    placeholder,
    rows,
    onFocus,
    onBlur,
    onChange,
    onPressEnter,
    style
}: TextareaProps) => {
    const { themeVars } = useTheme();

    // autoFocus
    // variant='borderless'
    // placeholder={$t({id: prompt?.tip || 'inputyourquestion'})}
    // autoSize={{minRows: 3, maxRows: 5}}
    return (
        <>
            <textarea
                // autoCapitalize={}
                placeholder={placeholder}
                style={{
                    background: themeVars.colorBgPrimary,
                    color: themeVars.colorTextPrimary,
                    borderStyle: "none",
                    // border: '1px solid ' + themeVars.colorBgPrimary,
                    outlineStyle: "none",
                    ...style
                }}
                value={value}
                rows={rows}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChange}
                // onKeyDown={onPressEnter}
            />
        </>
    );
};
