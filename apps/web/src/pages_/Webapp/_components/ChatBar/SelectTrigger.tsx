import logo from "@/assets/logo.svg";
import { useGlobalState } from "@/providers/global";
import { setRef } from "@mui/material";
import { XIconFont } from "@pro/icons";
import { useXTheme, XFlex, xPadding, xPosition, XText } from "@pro/ui";
import { useClickOutside } from "@pro/ui-pro";
import { useClickAway } from "ahooks";
import { Button, Input } from "antd";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

import ChatBar from "./Bar";

function SelectTrigger({
    // sessionId,
    children,
    style
}: {
    // sessionId: string;
    children: ReactNode;
    style?: CSSProperties;
}) {
    // const clazz = "studygpt-select-trigger";

    const { token } = useXTheme();
    const t = useTranslations("Default");
    const divRef = useRef<any>(null);

    const {
        chatPanel: {
            open,
            openPanel,
            onInputTextChange,
            onSelectedTextChange,
            // onSessionIdChange,
            openBar,
            barOpen
        }
    } = useGlobalState();

    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const currentDiv = divRef.current;
        if (!currentDiv) return;

        const onMouseUp = () => {
            if (barOpen) return;
            console.log("mouseup", window.getSelection()?.toString());
            const selection = window.getSelection()?.toString() || "";

            if (selection) {
                const range = window.getSelection()!.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                const x = rect?.left + window.scrollX;
                const y = rect?.bottom + window.scrollY + 1;

                openBar?.({ x, y });
                onSelectedTextChange?.(selection);
                // onSessionIdChange?.(sessionId);
                onInputTextChange?.(selection);
            }
        };

        if (!barOpen) {
            currentDiv.addEventListener("mouseup", onMouseUp, true);
            return () => {
                currentDiv.removeEventListener("mouseup", onMouseUp);
            };
        } else {
            currentDiv.removeEventListener("mouseup", onMouseUp);
        }
    }, [barOpen]);

    return (
        <div ref={divRef} style={{ ...style }}>
            {children}
        </div>
    );
}

export default SelectTrigger;
