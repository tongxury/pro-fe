"use client";

// @ts-ignore
import { BlockNoteView } from "@blocknote/mantine";
// @ts-ignore
import { useCreateBlockNote } from "@blocknote/react";
// @ts-ignore
import {
    SuggestionMenuController,
    getDefaultReactSlashMenuItems,
    BasicTextStyleButton,
    BlockTypeSelect,
    ColorStyleButton,
    CreateLinkButton,
    FileCaptionButton,
    FileReplaceButton,
    FormattingToolbar,
    FormattingToolbarController,
    NestBlockButton,
    TextAlignButton,
    UnnestBlockButton
} from "@blocknote/react";
// @ts-ignore
import {
    BlockNoteSchema,
    defaultBlockSpecs,
    filterSuggestionItems,
    insertOrUpdateBlock,
    PartialBlock
} from "@blocknote/core";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import "@blocknote/react/style.css";
import "../style.css";

// @ts-ignore
import Focus from "@tiptap/extension-focus";
import AICommand, { Position } from "./AICommand";
import { useState } from "react";
import { OutlineBlock } from "./OutlineBlock";
import { RiAlertFill } from "react-icons/ri";

const schema = BlockNoteSchema.create({
    blockSpecs: {
        // Adds all default blocks.
        ...defaultBlockSpecs,
        // 添加 大纲block
        outlineBlock: OutlineBlock
    }
});

const insertOutlineBlock = (editor: typeof schema.BlockNoteEditor) => ({
    title: "OutlineBlock",
    onItemClick: () => {
        insertOrUpdateBlock(editor, {
            type: "outlineBlock",
            props: {
                data: "{}",
                writingIntention: ""
            }
        });
    },
    aliases: ["OutlineBlock"],
    group: "Other",
    icon: <RiAlertFill />
});

// Our <Editor> component we can reuse later
export default function Blocknote(props: {
    initialContent?: PartialBlock[];
    editerId?: string;
    modalPosition: Position;
    onUpdatePosition: (position: Position) => void;
}) {
    // Creates a new editor instance.
    const editor = useCreateBlockNote({
        schema,
        initialContent: props?.initialContent || [{ type: "paragraph" }],
        _tiptapOptions: {
            extensions: [Focus]
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const onUpdatePosition = (position: Position) => {
        setIsModalOpen(true);
        props.onUpdatePosition(position);
    };

    const [value, setValue] = useState("");

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            editor={editor}
            formattingToolbar={false}
            slashMenu={false}
            style={{ maxWidth: 700 }}
            onChange={(editor: any) => console.log("editor", editor.document)}
        >
            <FormattingToolbarController
                formattingToolbar={() => (
                    <FormattingToolbar>
                        {/* Extra button to AI Commands */}
                        <AICommand key={"customButton1"} onUpdatePosition={onUpdatePosition} />
                        {/* <AICommand key={"customButton2"} onUpdatePosition={onUpdatePosition} /> */}

                        <BlockTypeSelect key={"blockTypeSelect"} />

                        <FileCaptionButton key={"fileCaptionButton"} />
                        <FileReplaceButton key={"replaceFileButton"} />

                        <BasicTextStyleButton basicTextStyle={"bold"} key={"boldStyleButton"} />
                        <BasicTextStyleButton basicTextStyle={"italic"} key={"italicStyleButton"} />
                        <BasicTextStyleButton basicTextStyle={"underline"} key={"underlineStyleButton"} />
                        <BasicTextStyleButton basicTextStyle={"strike"} key={"strikeStyleButton"} />
                        {/* Extra button to toggle code styles */}
                        <BasicTextStyleButton key={"codeStyleButton"} basicTextStyle={"code"} />

                        {/* <TextAlignButton
                        textAlignment={"left"}
                        key={"textAlignLeftButton"}
                        />
                        <TextAlignButton
                        textAlignment={"center"}
                        key={"textAlignCenterButton"}
                        />
                        <TextAlignButton
                        textAlignment={"right"}
                        key={"textAlignRightButton"}
                        />

                        <ColorStyleButton key={"colorStyleButton"} />

                        <NestBlockButton key={"nestBlockButton"} />
                        <UnnestBlockButton key={"unnestBlockButton"} />

                        <CreateLinkButton key={"createLinkButton"} /> */}
                    </FormattingToolbar>
                )}
            />
            <SuggestionMenuController
                triggerCharacter={"/"}
                getItems={async (query: any) =>
                    // Gets all default slash menu items and `insertAlert` item.
                    filterSuggestionItems([...getDefaultReactSlashMenuItems(editor), insertOutlineBlock(editor)], query)
                }
            />
            {/* <EditorModal position={props.modalPosition} open={isModalOpen} onChangeOpne={(isModalOpen)=> setIsModalOpen(isModalOpen)} >
                    <XFlex vertical>
                        <PromptInput value={value} onChange={(e)=> { setValue(e.target.value) }} placeholder="please input"></PromptInput>
                        <XFlex  style={{ width: "100%", height: "380px",  background: "#fff",...xBoxShadow({ color: '#01010133' }), padding: 10, borderRadius:10 }}>111</XFlex>
                    </XFlex>
                </EditorModal> */}
        </BlockNoteView>
    );
}
