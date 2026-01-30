"use client";
import { useXTheme, XFlex, XText, xBoxShadow } from "@pro/ui";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { Position } from "./Blocknote/AICommand";
import { Composition } from "@pro/ui-pro";
// @ts-ignore
import { PartialBlock } from "@blocknote/core";
import { Divider, Input, Skeleton } from "antd";

const Blocknote = dynamic(() => import("./Blocknote").then((mod) => mod.default), { ssr: false });

function Editor({
    curComposition,
    onOpenLib,
    style,
    onRename
}: {
    curComposition?: Composition;
    style?: CSSProperties;
    onOpenLib: () => void;
    onRename: (composition: Composition) => void;
}) {
    const t = useTranslations("Compose");
    const { token } = useXTheme();
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const scrollELementRef = useRef<HTMLDivElement>(null);
    const wrapELementRef = useRef<HTMLDivElement>(null);
    const [initScrollTop, setInitScrollTop] = useState(0);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [wrapELementPosition, setWrapELementPosition] = useState<Position>({ x: 0, y: 0 });
    const [modalPosition, setModalPosition] = useState<Position>({ x: 0, y: 0 });
    const [loading, setLoading] = useState(false);
    const [composition, setComposition] = useState<Composition>({ id: undefined, title: undefined });

    useEffect(() => {
        if (wrapELementRef.current) {
            const rect = wrapELementRef.current.getBoundingClientRect();
            const wrapELementPosition = { x: rect.left, y: rect.top, width: rect.width };
            setWrapELementPosition(wrapELementPosition);
        }
    }, []);

    useEffect(() => {
        const y =
            (position?.y || 0) +
            (position?.height || 0) +
            (initScrollTop - lastScrollTop) -
            (wrapELementPosition.y || 0);
        const x = 64;
        const widthTemp = (wrapELementPosition.width || 0) - 128;
        const width = widthTemp > 700 ? 700 : widthTemp;
        setModalPosition({ y, x, width });
    }, [wrapELementPosition, initScrollTop, lastScrollTop, position]);

    const onUpdatePosition = (position: Position) => {
        console.log("onUpdatePosition", position);
        setInitScrollTop(lastScrollTop);
        setPosition(position);
    };

    const onScroll = () => {
        const scrollTop = scrollELementRef.current?.scrollTop || 0;
        setLastScrollTop(scrollTop);
    };

    const writingIntention =
        "Institutional investors, high-frequency traders, and individual investors each play distinct roles in impacting the efficiency of financial markets, with institutional investors being the most influential due to their substantial resources, expertise, and ability to process and act on information swiftly.";
    const initialContent: PartialBlock[] = [
        {
            type: "outlineBlock",
            props: {
                data: "{}",
                writingIntention: ""
            }
        },
        {
            type: "paragraph"
        }
    ];

    useEffect(() => {
        if (curComposition?.id === composition?.id) {
            if (curComposition?.title !== composition?.title) {
                // 需要更改 title
                composition.title = curComposition?.title;
                setComposition(composition);
            }
        } else {
            // 切换不同的 composition
            setLoading(true);
            // todo：发起请求,目前模拟请求
            setTimeout(() => {
                setComposition({ ...curComposition, content: initialContent });
                setLoading(false);
            }, 2000);
        }
    }, [curComposition]);

    const onChangeTitle = (text: string) => {
        composition.title = text;
        setComposition(composition);
        onRename({ id: composition?.id, title: text });
    };

    return (
        <div
            style={{
                padding: 10,
                position: "relative",
                overflow: "hidden",
                zIndex: 10,
                height: "100%",
                ...style
            }}
            ref={wrapELementRef}
        >
            {loading ? (
                <Skeleton style={{ height: "100%" }} active></Skeleton>
            ) : (
                <div style={{ height: "100%", overflowY: "scroll" }} onScroll={onScroll} ref={scrollELementRef}>
                    <XFlex vertical>
                        <XFlex
                            vertical
                            style={{
                                paddingInline: "3rem",
                                boxSizing: "border-box",
                                width: "100%",
                                maxWidth: 700,
                                paddingTop: 10
                            }}
                        >
                            <Input
                                placeholder={t("Untitled")}
                                style={{
                                    border: "none",
                                    fontWeight: "bold",
                                    color: token.colorTextL1,
                                    boxShadow: "none",
                                    fontSize: 32
                                }}
                                value={composition?.title}
                                onChange={(e) => onChangeTitle(e.target.value)}
                            ></Input>
                            <Divider dashed></Divider>
                        </XFlex>
                        <Blocknote
                            initialContent={composition?.content}
                            modalPosition={modalPosition}
                            onUpdatePosition={onUpdatePosition}
                        />
                        <div style={{ height: 500, width: "100%" }}></div>
                    </XFlex>
                </div>
            )}
        </div>
    );
}

export default Editor;
