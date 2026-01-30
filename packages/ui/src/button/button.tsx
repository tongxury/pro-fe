import React, {ButtonHTMLAttributes, useState} from "react";

import {parseStyleProperties} from "../styles/utils";
import {ButtonProps} from "./types";

const Button = ({children, style, ...rest}: ButtonProps & ButtonHTMLAttributes<any>) => {
    // const {themeVars} = useTheme()
    // const [isHovering, setIsHovering] = React.useState(false);
    //
    // const handleMouseEnter = () => {
    //     setIsHovering(true);
    // };
    //
    // const handleMouseLeave = () => {
    //     setIsHovering(false);
    // };

    return (
        <div
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            style={{
                // backgroundColor: isHovering ? 'salmon' : '',
                // color: isHovering ? 'white' : '',
                // [buttons('focus')]: {
                //     background: 'blue'
                // },
                // background: themeVars?.colorPrimary,
                // background:'red',
                cursor: "pointer",
                ...parseStyleProperties(style)
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default Button;
