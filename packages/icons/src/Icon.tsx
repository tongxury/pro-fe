import { HTMLAttributes } from "react";

import AttachLine from "./_fixed_color/AttachLine";
import NewChatFilled from "./_fixed_color/NewChatFilled";
import PaperFilled from "./_fixed_color/PaperFilled";
import PenFilled from "./_fixed_color/PenFilled";
import UploadLine from "./_fixed_color/UploadLine";
import UploadLine2 from "./_fixed_color/UploadLine2";
import VideoControl from "./_fixed_color/VideoControl";
import AnswerLine from "./AnswerLine";
import BookOpenFilled from "./BookOpenFilled";
import ChatgptLine from "./ChatgptLine";
import ChatMenuLine from "./ChatMenuLine";
import CloseLine from "./CloseLine";
import CopyLine from "./CopyLine";
import ExplainLine from "./ExplainLine";
import FlashFilled from "./FlashFilled";
import HelpfulLine from "./HelpfulLine";
import HistoryLine from "./HistoryLine";
import HomeworkMenuLine from "./HomeworkMenuLine";
import LibraryLine from "./LibraryLine";
import LogoLine from "./LogoLine";
import RedoLine from "./RedoLine";
import RegenerateLine from "./RegenerateLine";
import ScholarSearchMenuFilled from "./ScholarSearchMenuFilled";
import SendFilled from "./SendFilled/Send";
import SentActiveFilled from "./SentActiveFilled";
import SentFilled from "./SentFilled";
import StarLine from "./StarLine";
import StarsFilled from "./StarsFilled";
import TranslateLine from "./TranslateLine";
import UnhelpfulLine from "./UnhelpfulLine";
import WritingMenuLine from "./WritingMenuLine";
import LogOut from "./LogOut";

export declare type IconName =
    | "AnswerLine"
    | "CloseLine"
    | "UploadLineFixed"
    | "UploadLine2Fixed"
    | "VideoControlFixed"
    | "PenFilledFixed"
    | "PaperFilledFixed"
    | "AttachLineFixed"
    | "NewChatFilledFixed"
    | "ChatgptLine"
    | "FlashFilled"
    | "StarsFilled"
    | "HistoryLine"
    | "ExplainLine"
    | "TranslateLine"
    | "RedoLine"
    | "SendFilled"
    | "BookOpenFilled"
    | "ChatMenuLine"
    | "CopyLine"
    | "HelpfulLine"
    | "LibraryLine"
    | "LogoLine"
    | "HomeworkMenuLine"
    | "RegenerateLine"
    | "ScholarSearchMenuFilled"
    | "SentActiveFilled"
    | "SentFilled"
    | "StarLine"
    | "UnhelpfulLine"
    | "LogOut"
    | "WritingMenuLine";

export declare interface IconProps {
    name: IconName | undefined;
    size?: number;
    color?: string;
}

export function Icon({
    name,
    size = 20,
    color = "#333333",
    onClick,
    ...rest
}: IconProps & HTMLAttributes<any>) {
    const renderSvg = () => {
        switch (name) {
            case "AnswerLine":
                return <AnswerLine size={size} color={color} {...rest} />;
            case "CloseLine":
                return <CloseLine size={size} color={color} {...rest} />;
            case "UploadLineFixed":
                return <UploadLine size={size} color={color} {...rest} />;
            case "UploadLine2Fixed":
                return <UploadLine2 size={size} color={color} {...rest} />;
            case "ChatgptLine":
                return <ChatgptLine size={size} color={color} {...rest} />;
            case "FlashFilled":
                return <FlashFilled size={size} color={color} {...rest} />;
            case "StarsFilled":
                return <StarsFilled size={size} color={color} {...rest} />;
            case "HistoryLine":
                return <HistoryLine size={size} color={color} {...rest} />;
            case "VideoControlFixed":
                return <VideoControl size={size} color={color} {...rest} />;
            case "PenFilledFixed":
                return <PenFilled size={size} color={color} {...rest} />;
            case "PaperFilledFixed":
                return <PaperFilled size={size} color={color} {...rest} />;
            case "AttachLineFixed":
                return <AttachLine size={size} color={color} {...rest} />;
            case "NewChatFilledFixed":
                return <NewChatFilled size={size} color={color} {...rest} />;
            case "ExplainLine":
                return <ExplainLine size={size} color={color} {...rest} />;
            case "TranslateLine":
                return <TranslateLine size={size} color={color} />;
            case "BookOpenFilled":
                return <BookOpenFilled size={size} color={color} />;
            case "RedoLine":
                return <RedoLine size={size} color={color} {...rest} />;
            case "SendFilled":
                return <SendFilled size={size} color={color} />;
            case "ChatMenuLine":
                return <ChatMenuLine size={size} color={color} />;
            case "CopyLine":
                return <CopyLine size={size} color={color} />;
            case "HelpfulLine":
                return <HelpfulLine size={size} color={color} />;
            case "LibraryLine":
                return <LibraryLine size={size} color={color} />;
            case "LogoLine":
                return <LogoLine size={size} color={color} />;
            case "HomeworkMenuLine":
                return <HomeworkMenuLine size={size} color={color} />;
            case "RegenerateLine":
                return <RegenerateLine size={size} color={color} />;
            case "ScholarSearchMenuFilled":
                return <ScholarSearchMenuFilled size={size} color={color} />;
            case "SentActiveFilled":
                return <SentActiveFilled size={size} color={color} />;
            case "SentFilled":
                return <SentFilled size={size} color={color} />;
            case "StarLine":
                return <StarLine size={size} color={color} />;
            case "UnhelpfulLine":
                return <UnhelpfulLine size={size} color={color} />;
            case "WritingMenuLine":
                return <WritingMenuLine size={size} color={color} />;
            case "LogOut":
                return <LogOut size={size} color={color} />;
            default:
                // todo 默认Icon
                return <SendFilled size={size} color={color} />;
        }
    };

    return (
        <div
            onClick={onClick}
            style={{ cursor: onClick ? "pointer" : "default" }}
            {...rest}
        >
            {renderSvg()}
        </div>
    );
}
