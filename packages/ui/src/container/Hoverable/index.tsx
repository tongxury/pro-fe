import {cloneElement, CSSProperties, HTMLAttributes, ReactElement, ReactNode, useEffect, useState} from "react";

import {useTheme} from "../../provider";

function Hoverable({
                       color,
                       onHoverChange,
                       style,
                       children,
                   }: {
    color?: string;
    onHoverChange?: (hovering: boolean) => void;
    style?: CSSProperties;
    children: ReactElement;
} & HTMLAttributes<any>) {
    const {themeVars} = useTheme();

    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        onHoverChange?.(hovering);
    }, [hovering])


    return (cloneElement(children, {
            ...children.props,
            style: {
                ...children.props?.style,
                background: hovering ? color || themeVars.colorPrimary : children.props?.style?.background,
            },
            onMouseOver: () => setHovering(true),
            onMouseOut: () => setHovering(false)
        })

    );
}

export default Hoverable;
