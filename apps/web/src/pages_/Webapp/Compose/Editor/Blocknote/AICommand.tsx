"use client";
// @ts-ignore
import { useBlockNoteEditor, useComponentsContext, useEditorContentOrSelectionChange } from "@blocknote/react";
import "@blocknote/mantine/style.css";

export interface Position {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
}

// Custom Formatting Toolbar Button to toggle blue text & background color.
export default function AICommand(props: { onUpdatePosition: (position: Position) => void }) {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext()!;

    // Updates state on content or selection change.
    useEditorContentOrSelectionChange(() => {}, editor);

    const onClickHandle = (event: any) => {
        const position = editor.getTextCursorPosition();
        const selectedText = editor.getSelectedText();
        // 关闭 toolbar
        editor.formattingToolbar.closeMenu();
        // 获取 选中位置
        const referencePos = editor.formattingToolbar.view.state.referencePos;
        const refPosition = referencePos.toJSON() as Position;
        // 将位置传递给父组件
        props.onUpdatePosition(refPosition);
        // 保持选中状态
        editor.focus();
        event.stopPropagation();
    };

    return (
        <Components.FormattingToolbar.Button mainTooltip={"ai commands"} onClick={onClickHandle}>
            AI Commands
        </Components.FormattingToolbar.Button>
    );
}
