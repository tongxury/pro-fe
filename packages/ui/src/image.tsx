import {Property} from "csstype";
import {type CSSProperties, type ReactNode} from "react";

export const Image_ = ({
                           src,
                           placeholder,
                           size = 22,
                           w,
                           h,
                           mw,
                           mh,
                           br,
                           style,
                           draggable,
                           // onClick,
                           circle,
                           ...rest
                       }: {
    src: any;
    size?: number;
    w?: number | string;
    mw?: number | string;
    h?: number | string;
    mh?: number | string;
    br?: number;
    // onClick?: (e: any) => void;
    circle?: boolean;
    placeholder?: boolean;
    style?: CSSProperties;
    draggable?: boolean;
}) => {
    const imageStyle: CSSProperties = {
        objectFit: "cover",
        // cursor: onClick ? "pointer" : "default",
        width: w || size,
        maxWidth: mw,
        height: h || size,
        maxHeight: mh,
        borderRadius: circle ? "50%" : br,
        background: "transparent",
        ...style
    } as CSSProperties;

    return src ?
        <img alt="" src={src} draggable={draggable} style={imageStyle} {...rest} />
        :
        <>{placeholder && <div style={{...imageStyle}}></div>}</>
}

export const ImageBackground = ({
                                    src,
                                    width,
                                    height,
                                    children,
                                    style
                                }: {
    src: any;
    width?: Property.Width<string | number>;
    height?: Property.Width<string | number>;
    style?: CSSProperties;
    children: ReactNode;
}) => {
    return (
        <div
            style={
                {
                    backgroundSize: "cover",
                    backgroundImage: `url(${src})`,
                    ...style,
                    height,
                    width
                } as CSSProperties
            }
        >
            {children}
        </div>
    );
};
