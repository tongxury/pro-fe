import PageTitle from "@/layouts/Webapp/PageContainer/PageTitle";
import { usePathname } from "@/navigation";
import Library from "@/pages_/Webapp/_components/Library";
import { useXTheme, XFlex, XIconButton, XText, xTransition } from "@pro/ui";
import { useTranslations } from "next-intl";
import React, { CSSProperties, ReactNode, useEffect, useState } from "react";

function PageContainer({
    headerLeft,
    headerMiddle,
    headerRight,
    renderHeader,
    children,
    style,
    contentStyle
}: {
    headerLeft?: ReactNode | string;

    headerMiddle?: ReactNode;
    headerRight?: ReactNode;
    renderHeader?: ({ height }: { height: number }) => ReactNode;
    // header?: { title?: string, left?: ReactNode, middle?: ReactNode, right?: ReactNode },
    children: ReactNode;
    // headerStyle?: CSSProperties,
    style?: CSSProperties;
    contentStyle?: CSSProperties;
}) {
    const t = useTranslations("Default");
    const { token } = useXTheme();
    const [open, setOpen] = useState(false);

    function PageTitle({ title, style }: { title?: string; style?: CSSProperties }) {
        // const t = useTranslations('App')
        // const pathname = usePathname()
        // return <XFlex align={'center'} justify={'space-between'} style={style} >
        //     <XText bold size={14}>{t(pathname.replace('/webapp/', ''))}</XText>
        // </XFlex>

        if (!title) return <div></div>;

        return (
            <XFlex align={"center"} justify={"space-between"} style={style}>
                <XText bold size={14}>
                    {title}
                </XText>
            </XFlex>
        );
    }

    // const renderHeader = ({style}: {style:CSSProperties}) => {

    // }
    const [headerHeight, setHeaderHeight] = useState(76);
    useEffect(() => {
        if (headerLeft === null) {
            setHeaderHeight(0);
        } else {
            setHeaderHeight(76);
        }
    }, [headerLeft]);

    const headerStyle: CSSProperties = {
        height: headerHeight,
        paddingInline: 20,
        borderBottom: headerHeight > 0 ? `1px solid ${token.colorBorder}` : "none"
    };

    return (
        <XFlex style={{ ...style }}>
            <XFlex vertical style={{ flex: 1 }}>
                {renderHeader ? (
                    renderHeader({ height: headerHeight })
                ) : (
                    <XFlex
                        justify={"space-between"}
                        align={"center"}
                        // gap={20}
                        style={headerStyle}
                    >
                        {headerLeft ? (
                            typeof headerLeft === "string" ? (
                                <PageTitle title={headerLeft as string} />
                            ) : (
                                headerHeight
                            )
                        ) : (
                            <div></div>
                        )}
                        {headerMiddle}
                        {/* {headerRight || (headerHeight > 0 && (
                            <XText
                                onClick={() => setOpen(true)}
                                size={20}
                                bold
                                style={{ cursor: "pointer" }}
                            >
                                {t("library")}
                            </XText>
                        ))} */}
                    </XFlex>
                )}

                <div
                    style={{
                        height: `calc(100vh - ${headerHeight}px)`,
                        ...contentStyle,
                        boxSizing: "border-box"
                    }}
                >
                    {children}
                </div>
            </XFlex>
            {headerHeight > 0 && (
                <XFlex
                    vertical
                    style={{
                        borderLeft: "1px solid " + token.colorBorder,
                        // padding: 10,
                        width: open ? 400 : 0,
                        ...xTransition({}),
                        visibility: open ? "visible" : "hidden"
                    }}
                >
                    {open && <Library onClose={() => setOpen(false)} />}
                </XFlex>
            )}
        </XFlex>
    );
}

export default PageContainer;
