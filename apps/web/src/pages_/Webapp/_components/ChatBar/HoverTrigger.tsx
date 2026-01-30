import { useGlobalState } from "@/providers/global";
import { useXTheme } from "@pro/ui";
import { useClickAway } from "ahooks";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import ChatBar from "./Bar";

function HoverTrigger({ children }: { children: ReactNode }) {
    const {
        chatPanel: { open, openPanel, onInputTextChange, onSelectedTextChange, barPosition, openBar, closeBar, barOpen }
    } = useGlobalState();

    const { token } = useXTheme();

    const divRef = useRef<any>(null);

    useEffect(() => {
        const currentDiv = divRef.current;
        if (!currentDiv) return;

        const onMouseUp = (event: any) => {
            let selection = window.getSelection()?.toString();

            console.log("onMouseUp", selection);

            if (selection) {
                const range = window.getSelection()!.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                const x = rect?.left + window.scrollX;
                const y = rect?.top + window.scrollY;

                openBar?.({ x, y });
                onSelectedTextChange?.(selection);
                // onSessionIdChange?.(sessionId);
                onInputTextChange?.(selection);

                return;
            }

            if (event.target?.tagName === "P" || event.target?.tagName === "LI") {
                openBar?.({ x: event.x - event.offsetX, y: event.y + 15 });
                onSelectedTextChange?.(event.target?.innerText);
                // onSessionIdChange?.(sessionId);
                onInputTextChange?.(event.target?.innerText);
            }
        };

        const onMouseEnter = (event: any) => {
            if (event.target.tagName === "P" || event.target.tagName === "LI") {
                event.target.style.setProperty("color", token.colorPrimary);
                event.target.style.setProperty("cursor", "pointer");

                // onSelectedTextChange?.(target.innerText);
                // onInputTextChange?.(target.innerText);
                // const rect = target.getBoundingClientRect();
                // openBar?.({ x: rect.left, y: rect.top - 50 });
            }
        };

        const onMouseLeave = (event: any) => {
            const target = event.target;
            if (target.tagName === "P" || target.tagName === "LI") {
                event.target.style.setProperty("color", "");
                event.target.style.setProperty("cursor", "default");
            }
        };

        if (!barOpen) {
            currentDiv.addEventListener("mouseup", onMouseUp, true);
            currentDiv.addEventListener("mouseenter", onMouseEnter, true);
            currentDiv.addEventListener("mouseleave", onMouseLeave, true);

            return () => {
                currentDiv.removeEventListener("mouseup", onMouseUp, true);
                currentDiv.removeEventListener("mouseenter", onMouseEnter, true);
                currentDiv.removeEventListener("mouseleave", onMouseLeave, true);
            };
        } else {
            currentDiv.removeEventListener("mouseup", onMouseUp);
            currentDiv.removeEventListener("mouseenter", onMouseEnter);
            currentDiv.removeEventListener("mouseleave", onMouseLeave);
        }
    }, [barOpen]);

    return (
        <div ref={divRef}>
            {/* <div>barOpen: {barOpen ? "true" : "false"}</div> */}
            {/* {barPosition && !open && (
                <ChatBar
                    sessionId={sessionId}
                    selectedText={selectedText}
                    position={barPosition}
                />
            )} */}
            {children}
        </div>
    );
}

export default HoverTrigger;
