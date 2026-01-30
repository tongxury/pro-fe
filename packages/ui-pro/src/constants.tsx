import { XOption } from "@pro/ui";

import { locales } from "./locales";
import { Prompt } from "./types";

export const languages = Object.values(locales);

// export const AttachmentCategory_PDF = "pdf"
// export const AttachmentCategory_DOCX = "doc"
// export const AttachmentCategory_TXT = "txt"
// export const AttachmentCategory_Image = "image"
// export const AttachmentCategory_Webpage = "webpage"

export const appName = "XTips";
export const tokenName = "authToken";

export const promptAnswerQuestion = {
    key: "answerQuestion",
    tip: "input the question you want AI to help you answer",
    icon: "AnswerLine"
};

export const promptExplain = {
    key: "explain",
    tip: "input the content you want AI to explain",
    icon: "ExplainLine"
};

export const promptTranslate = {
    key: "translate",
    icon: "TranslateLine"
    // options: languages as { value: string; messages: any; label: string; locale: string; } [],
};

export const promptChat: Prompt = {
    key: "normal_chat",
    tip: "",
    iconName: "ChatgptLine"
};

export const promptSummarize: Prompt = {
    key: "summarize",
    tip: "input the content you want AI to summarize",
    iconName: "ChatgptLine"
};

export const promptChatDocument: Prompt = {
    key: "document_qa",
    tip: "input the content you want AI to summarize",
    iconName: "ChatgptLine"
};

export const promptChatImage: Prompt = {
    key: "image_chat",
    tip: "input the content you want AI to summarize",
    iconName: "ChatgptLine"
};

export const writingFormat = [
    { value: "essay" },
    { value: "paragraph" },
    { value: "email" },
    { value: "idea" },
    { value: "blog post" },
    { value: "outline" },
    { value: "comment" },
    { value: "message" },
    { value: "twitter" }
];

export const writingTone = [
    { value: "formal" },
    { value: "casual" },
    { value: "professional" },
    { value: "enthusiastic" },
    { value: "informational" },
    { value: "funny" }
];

export const writingLength = [{ value: "short" }, { value: "medium" }, { value: "long" }];

export const promptWritingForCompose: Prompt = {
    key: "writingForCompose",
    tip: "input the content you want AI to help you improve",
    iconName: "HistoryLine",
    defaults: {
        value: "",
        format: "essay",
        tone: "formal",
        length: "short",
        lang: "en_US"
    },
    options: [
        {
            value: "format",
            icon: "text",
            children: writingFormat
        },
        {
            value: "tone",
            icon: "gaixieyuqi",
            children: writingTone
        },

        {
            value: "length",
            icon: "changdu",
            children: writingLength
        },
        {
            value: "lang",
            icon: "translate",
            children: languages
        }
    ]
};

export const promptOptions: Prompt[] = [promptChat, promptChatDocument, promptChatImage, promptSummarize];

export const promptOptionsMap: { [key: string]: Prompt } = promptOptions.reduce(function (
    map: { [key: string]: Prompt },
    obj: Prompt
) {
    // @ts-ignore
    map[obj.key] = obj;
    return map;
}, {});

// todo
export const modelOptions = (color: string): XOption[] => [
    {
        value: "GPT-3.5",
        label: "GPT-3.5",
        icon: "StarsFilled",
        desc: "GPT35Desc"
        //queryIcon: 'standard'
    },
    {
        value: "GPT-4",
        label: "GPT-4",
        icon: "FlashFilled",
        // icon: Chat35Star,
        desc: "GPT4Desc"
        //queryIcon: 'senior'
    }
];

export const modeOptions = (color: string, trans: (raw: string) => string): XOption[] => [
    {
        value: "chat",
        label: trans("chatMode"),
        desc: trans("chatModeDesc"),
        icon: "ChatgptLine"
    },
    {
        value: "auto",
        label: trans("autoMode"),
        desc: trans("autoModeDesc"),
        icon: "ChatgptLine"
    },
    {
        value: "online",
        label: trans("intlMode"),
        desc: trans("intlModeDesc"),
        icon: "ChatgptLine"
    },
    {
        value: "scholar",
        label: trans("scholarMode"),
        desc: trans("scholarModeDesc"),
        icon: "ChatgptLine"
    }
];
