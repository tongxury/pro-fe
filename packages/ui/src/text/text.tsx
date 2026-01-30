import {Typography} from "antd";
import {DOMAttributes} from "react";

import {useTheme} from "../provider";
import {TextProps} from "./index";

export const Text_ = ({
                          children,
                          style,
                          color,
                          size = 15,
                          bold,
                          weight,
                          ellipsis,
                          ...rest
                      }: TextProps & DOMAttributes<any>) => {
    const {themeVars} = useTheme();

    let newStyle = {
        // color: themeVars.colorTextPrimary || color,
        // padding: 0,
        // margin: 0,
        lineHeight: 1,
        fontWeight: weight || (bold ? "bold" : "normal"),
        color: (color as string) || themeVars.colorTextPrimary,
        ...style,
        fontSize: size,
        // border: '1px solid red'
};

    let ellipsisProps: any = false;
    if (ellipsis) {
        ellipsisProps = {
            rows: ellipsis.maxLines || 1
        };

        newStyle.maxWidth = ellipsis.maxWidth
    }

    return (
        <Typography.Text ellipsis={ellipsisProps} style={newStyle} {...rest} >
            {children}
        </Typography.Text>
    );
};
