import AttachmentView from "./chat/AttachmentView";
import FileUploader from "./chat/FileUploader";
import Selector from "./chat/Selector";
import {
    modelOptions,
    modeOptions,
    promptAnswerQuestion,
    promptChat,
    promptChatDocument,
    promptChatImage,
    promptExplain,
    promptOptions,
    promptOptionsMap,
    promptTranslate,
    promptWritingForCompose,
    tokenName
} from "./constants";
import useChatEventSource from "./hooks/eventsource";
import useClickOutside from "./hooks/clickOutside";
import useSession from "./hooks/useSession";
import { MemberLevelTag, MemberLevelText } from "./member/Level";
import MemberState from "./member/State";
import PromptView from "./chat/PromptView";
import MarkdownText from "./chat/MarkdownText";
import {
    Answer,
    AnswerAttitude,
    Attachment,
    Prompt,
    Question,
    QuestionAnswer,
    Session,
    User,
    Composition,
    Scenario,
    Position,
    AnswerState,
    UserAction,
    UserAttitude
} from "./types";

// 组件
export {
    AttachmentView,
    Selector,
    MemberLevelTag,
    MemberLevelText,
    MemberState,
    FileUploader,
    PromptView,
    MarkdownText
};

// 数据结构
export type {
    Scenario,
    Question,
    Attachment,
    Answer,
    Session,
    Prompt,
    QuestionAnswer,
    User,
    AnswerAttitude,
    Composition,
    Position,
    AnswerState,
    UserAction,
    UserAttitude
};

// 常量
export {
    modelOptions,
    modeOptions,
    tokenName,
    promptAnswerQuestion,
    promptExplain,
    promptTranslate,
    promptChat,
    promptWritingForCompose,
    promptChatImage,
    promptOptions,
    promptOptionsMap,
    promptChatDocument
};

// Hooks
export { useChatEventSource, useClickOutside, useSession };
