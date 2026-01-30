import { IconName } from "@pro/icons";
import type { ReactNode } from "react";

export declare type AttachmentCategory = "text" | "video" | "image" | "doc" | "research_result";

export declare type Scenario = "homework" | "plugin_chat" | undefined;

/** 附件 */
export declare interface Attachment {
    category: AttachmentCategory;
    content?: any;
    url?: string;
    name?: string;
    size?: number;
    width?: number;
    height?: number;
    status?: string;
    base64?: string;
    file?: any;
    attributes?: { [key: string]: any };
    extra?: { [key: string]: any };
}

/** 问题 */
export declare interface Question {
    sessionId?: string;
    model?: string;
    id?: string;
    // text?: string
    prompt?: Prompt;
    // prompts?: Prompt[]
    // quote?: Question | Answer | Message
    // attachment?: Attachment,
    attachments?: Attachment[];
    answers?: Answer[];

    settings?: {
        lang?: string;
    };

    // [key: string]: any;
}

/** 回答 */
export declare interface Answer {
    sessionId?: string;
    questionId?: string;
    text?: string;
    // prompt?: Prompt
    // model?: Model
    status?: "preparing" | "generating" | "error" | "" | undefined;
    // loading?: boolean
    errorMessage?: string;
    // [key: string]: any
    state?: {
        /** 答案是否收藏 */
        isCollected?: boolean;
        /** 对答案的态度 */
        attitude?: AnswerAttitude;
    };
    /** 答案相关引用 */
    attachments?: Attachment[];
    id?: string;
    answerState?: AnswerState;
}

export declare interface Session {
    id?: string;
    questions: Question[]; // todo ?
    scenario?: Scenario;
}

export declare type UserAction = "like" | "dislike" | "like_none" | "share" | "copy";
export declare type UserAttitude = "like" | "dislike";
export declare interface AnswerState {
    like?: "none" | "like" | "dislike" | undefined;
    share?: boolean;
    copy?: boolean;
}
/** 对答案的态度：有用、无用、未表态 */
export declare type AnswerAttitude = "helpful" | "unHelpful" | undefined;

/** 问题 + 回答 */
export declare interface QuestionAnswer {
    /** 问题 */
    question: Question;
    /** 多个回答 */
    answers?: Answer[];
    /** 相关问题 */
    relationQuestions?: Question[];
}

export declare interface Prompt {
    key?: string;
    name?: string;
    text?: string;
    params?: { [key: string]: string };
    tip?: string;
    iconName?: IconName;

    // options?: Option[],
    [key: string]: any;
}

/** 会员 */
export declare interface Member {
    expireAt?: number;
    level: string;
    metadata?: {
        disabled?: boolean;
        functionLimits?: { [key: string]: any };
        functions?: { name: string; desc: string }[];
        level?: string;
        modelLimits?: {
            [key: string]: { day?: number; month?: number; total?: number };
        };
        models?: { desc: string; label: string; name: string }[];
        otherFunctions?: { name: string }[];
        tag?: string;
    };
    status?: string;
    used?: {
        [key: string]: any;
    };
    userId: string;
}

/** 用户 */
export declare interface User {
    id: string;
    name: string;
    avatar?: string | undefined;
    email?: string;
    member?: Member;

    // todo
    [key: string]: any;
}

/** 作品 */
export declare interface Composition {
    /** id */
    id?: string;
    /** 创建时间 */
    createdAt?: number;
    /** 标题 */
    title?: string;
    /** 内容 */
    content?: string;
}

export declare interface Position {
    x: number;
    y: number;
}
