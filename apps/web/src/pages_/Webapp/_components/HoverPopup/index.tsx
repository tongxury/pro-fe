import { useXTheme } from "@pro/ui";
import { Marked, marked } from "marked";
import { createRef, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

import PopupText, { PopupTextHandles } from "./Popup";

const renderer = new marked.Renderer();

renderer.paragraph = (data: any) => {
    return `<p style="position: relative; overflow: visible">${data.text}</p>`;
};

function HoverPopup({ text }: { text?: string }) {
    const { token } = useXTheme();

    const htmlContent = (text: string) => marked(text, { renderer });

    const answerRef = useRef<HTMLDivElement>(null);

    const popupRef = useRef<{
        [key: string]: React.RefObject<PopupTextHandles>;
    }>({});

    useEffect(() => {
        const handleMouseEnter = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.tagName.toLowerCase() === "p" && target.lastElementChild?.tagName?.toLowerCase() !== "div") {
                const root = document.createElement("div");
                root.className = "tooltiptext";
                target.appendChild(root);

                const container = createRoot(root);
                const id = Math.random().toString(36).substring(2, 15);
                target.setAttribute("id", id);
                popupRef.current[id] = createRef<PopupTextHandles>();
                container.render(
                    <PopupText text={target.innerText} ref={popupRef.current[id]} key={target.innerText} />
                );
            } else if (
                target.tagName.toLowerCase() === "p" &&
                target.lastElementChild?.tagName?.toLowerCase() === "div"
            ) {
                popupRef.current[target.getAttribute("id") ?? ""]?.current?.open();
            }
        };

        const handleMouseLeave = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.tagName.toLowerCase() === "p") {
                popupRef.current[target.getAttribute("id") ?? ""]?.current?.close();
            }
        };

        if (answerRef.current) {
            // 添加监听事件
            answerRef.current.addEventListener("mouseenter", handleMouseEnter, true);

            answerRef.current.addEventListener("mouseleave", handleMouseLeave, true);
        }

        return () => {
            // 移除监听事件
            answerRef.current?.removeEventListener("mouseenter", handleMouseEnter, true);
            answerRef.current?.removeEventListener("mouseleave", handleMouseLeave, true);
        };
    }, []);

    return (
        <div
            ref={answerRef}
            dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: `<div style="width: 100%; overflow: visible; font-size: 15px; color: ${token.colorTextPrimary}">${htmlContent(text)}</div>`
            }}
        />
    );
}

export default HoverPopup;
