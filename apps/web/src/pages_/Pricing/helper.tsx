import gpt_4 from "@/assets/gpt_4.png";
import gpt_35 from "@/assets/gpt_35.png";
import document from "@/assets/document.png";
import test_paper from "@/assets/test_paper.png";
import writing from "@/assets/writing.png";
import video from "@/assets/video.png";
import email from "@/assets/email.png";
import powerfulmodel from "@/assets/powerfulmodel.png";
import stars_left from "@/assets/stars_left.png";
import stars_right from "@/assets/stars_right.png";
import stars_right_free from "@/assets/stars_right_free.png";
import stars_left_free from "@/assets/stars_left_free.png";
import stars_left_light from "@/assets/stars_left_light.png";
import stars_right_light from "@/assets/stars_right_light.png";
import meta_card_sug_bg from "@/assets/meta_card_sug_bg.png";
import meta_card_bg from "@/assets/meta_card_bg.png";
import meta_card_free_bg from "@/assets/meta_free_card_bg.png";
import chat_image from "@/assets/chatImage.png";
import red_icon from "@/assets/red-hook.png";
import blue_icon from "@/assets/blue-hook.png";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import { ReactNode } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ImageIcon from "@mui/icons-material/Image";
export const getLimit = (limit?: { [key: string]: any }) => {
    return limit ? limit["year"] || limit["month"] || limit["day"] || limit["total"] || 0 : 0;
};
export const modelIcons: { [k: string]: any } = {
    "GPT-4": gpt_4,
    "GPT-3.5": gpt_35,
    GPT4: gpt_4,
    "GPT3.5": gpt_35,
    "powerful models": powerfulmodel
};
export const functionIcons: { [k: string]: any } = {
    chatDocument: document,
    "Chat Document": document,
    testPaper: test_paper,
    "Test Paper": test_paper,
    writingGuide: writing,
    "Writing Guide": writing,
    chatVideo: video,
    "Video Summarize": video,
    emailCopilot: email,
    chatImage: chat_image,
    "Screenshot & Get Answer": chat_image,
    writing: writing
};

export const functionIcons2: { [k: string]: ReactNode } = {
    chatDocument: <FilePresentIcon sx={{ fontSize: 16 }} />,
    "Chat Document": <FilePresentIcon sx={{ fontSize: 16 }} />,
    testPaper: <DescriptionIcon sx={{ fontSize: 16 }} />,
    "Test Paper": <DescriptionIcon sx={{ fontSize: 16 }} />,
    writingGuide: <DriveFileRenameOutlineIcon sx={{ fontSize: 16 }} />,
    writing: <DriveFileRenameOutlineIcon sx={{ fontSize: 16 }} />,
    "Writing Guide": <DriveFileRenameOutlineIcon sx={{ fontSize: 16 }} />,
    chatVideo: <FilePresentIcon sx={{ fontSize: 16 }} />,
    "Video Summarize": <FilePresentIcon sx={{ fontSize: 16 }} />,
    emailCopilot: <FilePresentIcon sx={{ fontSize: 16 }} />,
    chatImage: <ImageIcon sx={{ fontSize: 16 }} />,
    "Screenshot & Get Answer": <ImageIcon sx={{ fontSize: 16 }} />
};

export const lightColors = ["#6841ea", "#6841ea"];
export const colors = ["#6841ea", "#6841ea"];
export const lightColors2 = ["#6841ea", "#6841ea"];

export const levelConfigs: { [k: string]: any } = {
    basic: {
        iconPrefix: stars_left,
        iconSuffix: stars_right,
        colors,
        functionIcon: red_icon,
        height: 630
    },
    pro: {
        iconPrefix: stars_left,
        iconSuffix: stars_right,
        backgroundImage: meta_card_bg,
        height: 630,
        colors,
        functionIcon: blue_icon
    },
    pro_plus: {
        iconPrefix: stars_left_light,
        iconSuffix: stars_right_light,
        backgroundImage: meta_card_sug_bg,
        bordered: true,
        height: 630,
        colors: lightColors,
        normalIconPrefix: stars_left,
        normalIconSuffix: stars_right_light,
        showBanner: false,
        functionIcon: red_icon
    },
    free: {
        iconPrefix: stars_left_free,
        iconSuffix: stars_right_free,
        backgroundImage: meta_card_free_bg,
        height: 630,
        colors: ["#079E82", "#079E82"]
    }
};
