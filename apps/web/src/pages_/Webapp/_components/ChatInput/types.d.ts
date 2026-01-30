export declare type UploaderCategory = "popup" | "normal" | "none";
export declare type SendCategory = "search" | "send" | "create";

export declare interface SendProps {
    text?: string;
    attachments?: Attachment[];
}
