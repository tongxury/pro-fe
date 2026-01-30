"use client";
// @ts-ignore
import { useBlockNoteEditor } from "@blocknote/react";
import { useRef } from "react";
import { Position } from "./AICommand";
import { useClickOutside } from "@pro/ui-pro";

/** 弹窗：需跟随文本内容移动 */
const EditorModal = (props: {
    position: Position;
    open: boolean;
    onChangeOpne: (open: boolean) => void;
    children: React.ReactNode;
}) => {
    const { position } = props;
    const { x, y, width } = position;
    const modalRef = useRef<HTMLDivElement>(null);
    const editor = useBlockNoteEditor();
    useClickOutside(modalRef, () => {
        props.onChangeOpne(false);
        // editor.removeStyles({ backgroundColor: 'blue' })
    });
    return (
        <div
            style={{
                display: props.open ? "block" : "none",
                zIndex: 1000,
                visibility: "visible",
                position: "absolute",
                inset: "0 auto auto 0",
                margin: 0,
                transform: `translate3d(${x || 0}px, ${y || 0}px, 0px)`,
                maxWidth: 700,
                width
            }}
            ref={modalRef}
            onClick={(e) => {
                console.log("editor", editor);
                const tiptap = editor._tiptapEditor;
                const pmState = editor.prosemirrorView.state;
                const tr = pmState.tr;
                const { $from, $to } = tr.curSelection;

                // here we use tr.mapping.map to map the position between transaction steps
                const from = tr.mapping.map($from.pos);
                const to = tr.mapping.map($to.pos);
                // tr.delete(from, to)

                // console.log()

                console.log(to, from);
                // 删除
                // tiptap.commands.deleteSelection()
                // const content = '123456789010'
                // 插入文本
                // tiptap.commands.insertContent('123456789010')
                // 选中
                // tiptap.commands.setTextSelection({ from, to: from + content.length })
                // 聚焦
                // tiptap.commands.focus()
                e.stopPropagation();
            }}
        >
            {props.children}
        </div>
    );
};

export default EditorModal;
