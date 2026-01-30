export declare interface LevelConfig {
    key: string;
    icon?: string;
    iconColor?: string;
    direction?: string;
    // colors?: string[];
    colorStops?: string[];
    text: string;
}

export const levelConfig: { [key: string]: LevelConfig } = {
    free: {
        key: "free",
        icon: ``,
        iconColor: "",
        direction: "90deg",
        // colors: ["#FF9F0E", "#FF0852", "#DE13FF"], //
        colorStops: ["#FF9F0E" + " 0%", "#FF0852", "#DE13FF" + " 100%"],
        text: "Free"
    },
    basic: {
        key: "basic",
        iconColor: "",
        // colors: ["#FF9F0E", "#FF0852", "#DE13FF"],
        direction: "122deg",
        colorStops: ["#03ffe1 -18.41%", "#8a2eff 99.01%"],
        text: "Basic"
    },
    pro: {
        key: "pro",
        iconColor: "",
        // colors: ["#FF9F0E", "#FF0852", "#DE13FF"],
        direction: "180deg",
        colorStops: ["#74BCFF 0%", "#7F74FF 100%"],
        //colorStops: ["#00FFFF 0%", "#03ffe1 -18.41%", "#8a2eff 99.01%"],
        text: "Standard"
    },
    pro_plus: {
        key: "pro_plus",
        // icon: star_img,
        iconColor: "#5991dc",
        // colors: ["#FF9F0E", "#FF0852", "#DE13FF"],
        direction: "171deg",
        colorStops: ["#FFDA15 -39.84%", "#FD1CE7 146.69%"],
        //colorStops: ["#00FFFF 0%", "#03ffe1 -18.41%", "#8a2eff 99.01%"],
        text: "Premium"
    }
};

export const functionConfig: { [key: string]: { icon: string } } = {
    chatDocument: {
        icon: "AttachLine"
    },
    testPaper: {
        icon: "PaperFilled"
    },
    chatVideo: {
        icon: "VideoControl"
    },
    chatImage: {
        icon: "UploadLine2"
    },
    writingGuide: {
        icon: "PenFilled"
    }
};
