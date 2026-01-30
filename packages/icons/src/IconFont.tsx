import { CSSProperties, HTMLAttributes } from "react";

import AttachLine from "./_fixed_color/AttachLine";
import NewChatFilled from "./_fixed_color/NewChatFilled";
import PaperFilled from "./_fixed_color/PaperFilled";
import PenFilled from "./_fixed_color/PenFilled";
import UploadLine from "./_fixed_color/UploadLine";
import UploadLine2 from "./_fixed_color/UploadLine2";
import VideoControl from "./_fixed_color/VideoControl";
import AddImageFilled from "./AddImageFilled";
import AnswerLine from "./AnswerLine";
import ArchLine from "./ArchLine";
import BookOpenFilled from "./BookOpenFilled";
import BookOpenLine from "./BookOpenLine";
import ChatgptLine from "./ChatgptLine";
import ChatLine from "./ChatLine";
import CloseLine from "./CloseLine";
import CopyLine from "./CopyLine";
import ExplainLine from "./ExplainLine";
import FlashFilled from "./FlashFilled";
import HistoryLine from "./HistoryLine";
import LawLine from "./LawLine";
import LikeLine from "./LikeLine";
import MoneyLine from "./MoneyLine";
import RedoLine from "./RedoLine";
import ScienceLine from "./ScienceLine";
import SendFilled from "./SendFilled";
import SettingsLine from "./SettingsLine";
import StarsFilled from "./StarsFilled";
import TranslateLine from "./TranslateLine";
import { IconfontName } from "./types";
import UnlikeLine from "./UnlikeLine";
import SearchLine from "./SearchLine";
import LogOut from './LogOut';

export function IconFont({
    name,
    size = 18,
    color = "#333333",
    style,
    ...rest
}: {
    name: IconfontName;
    size?: number;
    color?: string;
    style?: CSSProperties | undefined;
} & HTMLAttributes<any>) {
    switch (name) {
        case "ExplainLine":
            return (
                <ExplainLine
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "AnswerLine":
            return (
                <AnswerLine size={size} color={color} style={style} {...rest} />
            );
        case "BookOpenFilled":
            return (
                <BookOpenFilled
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "ChatgptLine":
            return (
                <ChatgptLine
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "CloseLine":
            return (
                <CloseLine size={size} color={color} style={style} {...rest} />
            );
        case "FlashFilled":
            return (
                <FlashFilled
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "HistoryLine":
            return (
                <HistoryLine
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "RedoLine":
            return (
                <RedoLine size={size} color={color} style={style} {...rest} />
            );
        case "SendFilled":
            return (
                <SendFilled size={size} color={color} style={style} {...rest} />
            );
        case "StarsFilled":
            return (
                <StarsFilled
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "TranslateLine":
            return (
                <TranslateLine
                    size={size}
                    color={color}
                    style={style}
                    {...rest}
                />
            );
        case "AttachLine":
            return <AttachLine size={size} color={color} {...rest} />;
        case "NewChatFilled":
            return <NewChatFilled size={size} color={color} {...rest} />;
        case "PaperFilled":
            return <PaperFilled size={size} color={color} {...rest} />;
        case "PenFilled":
            return <PenFilled size={size} color={color} {...rest} />;
        case "UploadLine2":
            return <UploadLine2 size={size} color={color} {...rest} />;
        case "UploadLine":
            return <UploadLine size={size} color={color} {...rest} />;
        case "VideoControl":
            return <VideoControl size={size} color={color} {...rest} />;
        case "ArchLine":
            return <ArchLine size={size} color={color} {...rest} />;
        case "BookOpenLine":
            return <BookOpenLine size={size} color={color} {...rest} />;
        case "ScienceLine":
            return <ScienceLine size={size} color={color} {...rest} />;
        case "LawLine":
            return <LawLine size={size} color={color} {...rest} />;
        case "SettingsLine":
            return <SettingsLine size={size} color={color} {...rest} />;
        case "MoneyLine":
            return <MoneyLine size={size} color={color} {...rest} />;
        case "LikeLine":
            return <LikeLine size={size} color={color} {...rest} />;
        case "UnlikeLine":
            return <UnlikeLine size={size} color={color} {...rest} />;
        case "CopyLine":
            return <CopyLine size={size} color={color} {...rest} />;
        case "ChatLine":
            return <ChatLine size={size} color={color} {...rest} />;
        case "AddImageFilled":
            return <AddImageFilled size={size} color={color} {...rest} />;
        case "SearchLine":
            return <SearchLine size={size} color={color} {...rest} />;
        case "LogOut":
            return <LogOut size={size} color={color} {...rest} />;
        default:
            return <>aa</>;
    }
}
