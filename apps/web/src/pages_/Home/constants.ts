import chat from "../../assets/cover_chat.png";
import writing from "../../assets/cover_writing.png";
import translate from "../../assets/cover_translate.png";
import search from "../../assets/cover_search.png";
import read from "../../assets/cover_read.png";
import chromeIcon from "@/assets/chrome.png";

export const functions: {
    id: number;
    icon: any;
    name: string;
    cover: any;
    subTitle: string;
}[] = [
    {
        id: 0,
        icon: "search",
        name: "Search",
        cover: search,
        subTitle: "Translate any web page for an Immersive bilingual reading experience"
    },
    {
        id: 1,
        icon: "pen-nib-fill",
        name: "Writing",
        cover: writing,
        subTitle: "Write or improve any content 10X faster, from a paragraph to a full article"
    },
    {
        id: 2,
        icon: "translate-line",
        name: "Translate",
        cover: translate,
        subTitle: "Your powerful answer engine with realtime web access"
    },
    {
        id: 3,
        icon: "chat",
        name: "Chat",
        cover: chat,
        subTitle: "Chat with all of the best models in one place"
    },
    {
        id: 4,
        icon: "bookmark-fill",
        name: "Read",
        cover: read,
        subTitle: "Translate any web page for an Immersive bilingual reading experience"
    }
];

export const overviewList: {
    id: number;
    icon: any;
    name: string;
    chilid: { id: number; icon: any; title: string; subTitle: string }[];
}[] = [
    {
        id: 0,
        icon: "navigation-05",
        name: "research",
        chilid: [
            {
                id: 0,
                icon: "pen",
                title: "ResearcherTitle1",
                subTitle: "ResearcherContent1"
            },
            {
                id: 1,
                icon: "select-all",
                title: "ResearcherTitle2",
                subTitle: "ResearcherContent2"
            },
            {
                id: 2,
                icon: "translate1",
                title: "ResearcherTitle3",
                subTitle: "ResearcherContent3"
            },
            {
                id: 3,
                icon: "mind-mapping",
                title: "ResearcherTitle4",
                subTitle: "ResearcherContent4"
            }
        ]
    },
    {
        id: 1,
        icon: "navigation-14",
        name: "entrepreneur",
        chilid: [
            {
                id: 0,
                icon: "search1",
                title: "EntrepreneurTitle1",
                subTitle: "EntrepreneurContent1"
            },
            {
                id: 1,
                icon: "navigation-32",
                title: "EntrepreneurTitle2",
                subTitle: "EntrepreneurContent2"
            },
            {
                id: 2,
                icon: "Table-10",
                title: "EntrepreneurTitle3",
                subTitle: "EntrepreneurContent3"
            },
            {
                id: 3,
                icon: "Table-12",
                title: "EntrepreneurTitle4",
                subTitle: "EntrepreneurContent4"
            }
        ]
    },
    {
        id: 2,
        icon: "navigation-07",
        name: "analyst",
        chilid: [
            {
                id: 0,
                icon: "navigation-32",
                title: "AnalystTitle1",
                subTitle: "AnalystContent1"
            },
            {
                id: 1,
                icon: "pen",
                title: "AnalystTitle2",
                subTitle: "AnalystContent2"
            },
            {
                id: 2,
                icon: "navigation-07",
                title: "AnalystTitle3",
                subTitle: "AnalystContent3"
            },
            {
                id: 3,
                icon: "Table-10",
                title: "AnalystTitle4",
                subTitle: "AnalystContent4"
            }
        ]
    },
    {
        id: 3,
        icon: "navigation-36",
        name: "developer",
        chilid: [
            {
                id: 0,
                icon: "navigation-23",
                title: "DeveloperTitle1",
                subTitle: "ResearcherContent1"
            },
            {
                id: 1,
                icon: "code",
                title: "DeveloperTitle2",
                subTitle: "ResearcherContent2"
            },
            {
                id: 2,
                icon: "command",
                title: "DeveloperTitle3",
                subTitle: "ResearcherContent3"
            },
            {
                id: 3,
                icon: "robot",
                title: "DeveloperTitle4",
                subTitle: "ResearcherContent4"
            }
        ]
    },
    {
        id: 4,
        icon: "navigation-10",
        name: "marketing",
        chilid: [
            {
                id: 0,
                icon: "search1",
                title: "MarketingTitle1",
                subTitle: "MarketingContent1"
            },
            {
                id: 1,
                icon: "user1",
                title: "MarketingTitle2",
                subTitle: "MarketingContent2"
            },
            {
                id: 2,
                icon: "message",
                title: "MarketingTitle3",
                subTitle: "MarketingContent3"
            },
            {
                id: 3,
                icon: "command",
                title: "MarketingTitle4",
                subTitle: "MarketingContent4"
            }
        ]
    }
    // {
    //   id: 5,
    //   icon: "customer-service",
    //   name: "customerService",
    //   chilid: [
    //     {
    //       id: 0,
    //       icon: "message",
    //       title: "CustomerServiceTitle1",
    //       subTitle: "CustomerServiceContent1",
    //     },
    //     {
    //       id: 1,
    //       icon: "Table-12",
    //       title: "CustomerServiceTitle2",
    //       subTitle: "CustomerServiceContent2",
    //     },
    //     {
    //       id: 2,
    //       icon: "navigation-06",
    //       title: "CustomerServiceTitle3",
    //       subTitle: "CustomerServiceContent3",
    //     },
    //     {
    //       id: 3,
    //       icon: "search1",
    //       title: "CustomerServiceTitle4",
    //       subTitle: "CustomerServiceContent4",
    //     },
    //   ],
    // },
];

export const evaluateList = [
    [
        {
            id: 0,
            icon: chromeIcon,
            name: "Giyya",
            text: `I must say XTips is a fantastic little extension. It's incredibly polished and user-friendly. One of my favorite features is the ability to customize quick actions and prompts - with my own actions in place, I hardly need to consider using any other extensions providing features about "do something with your selected text using ChatGPT". Highly recommend!`
        },
        {
            id: 1,
            icon: chromeIcon,
            name: "Mikolaj Lobrow",
            text: `So far, keeps true to hosting all-in-one compared to other subscriptions and seems like it's fairly priced.`
        }
    ],
    [
        {
            id: 0,
            icon: chromeIcon,
            name: "Joseph Boutwell",
            text: `his one is great and on-par! Searching is more interactive and far less tedious now, and more informative when nothing shows up on my search.`
        },
        {
            id: 1,
            icon: chromeIcon,
            name: "Bala Krishnan",
            text: `I must say XTips is a fantastic little extension. It's incredibly polished and user-friendly. One of my favorite features is the ability to customize quick actions and prompts - with my own actions in place, I hardly need to consider using any other extensions providing features about "do something with your selected text using ChatGPT". Highly recommend!`
        }
    ],
    [
        {
            id: 0,
            icon: chromeIcon,
            name: "Bala Krishnan",
            text: `I must say XTips is a fantastic little extension. It's incredibly polished and user-friendly. One of my favorite features is the ability to customize quick actions and prompts - with my own actions in place, I hardly need to consider using any other extensions providing features about "do something with your selected text using ChatGPT". Highly recommend!`
        }
    ]
];
