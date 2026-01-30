import { useXTheme } from "@pro/ui";
import { Marked, marked } from "marked";
import { createRef, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

// const renderer = new marked.Renderer();

// renderer.paragraph = (data: any) => {
//     return `<p style="position: relative; overflow: visible">${data.text}</p>`;
// };

function MarkdownText({ text }: { text?: string }) {
    const { token } = useXTheme();

    // const htmlContent = (text: string) => marked(text, { renderer });

    const md = new Marked();

    return (
        <div
            dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: `<div style="width: 100%; overflow: visible; font-size: 15px; color: ${token.colorTextPrimary}">${md.parse(text || "")}</div>`
            }}
        />
    );
}

export default MarkdownText;
