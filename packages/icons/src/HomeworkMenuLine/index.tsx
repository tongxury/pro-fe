import { SvgProps } from "../types";

export default ({ color = "#84888C", size = 24 }: SvgProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Quiz Generation_icon_normal</title>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Scholar-Search_默认状态备份"
                    transform="translate(-58.000000, -245.000000)"
                >
                    <g
                        id="左侧边栏"
                        transform="translate(30.000000, 128.000000)"
                    >
                        <g id="list" transform="translate(0.000000, 60.000000)">
                            <g
                                id="Homework-Help"
                                transform="translate(0.000000, 46.000000)"
                            >
                                <g
                                    id="Quiz-Generation_icon_normal"
                                    transform="translate(28.000000, 11.000000)"
                                >
                                    <rect
                                        id="矩形"
                                        fill="#D8D8D8"
                                        opacity="0"
                                        x="0"
                                        y="0"
                                        width="24"
                                        height="24"
                                    ></rect>
                                    <g
                                        id="编组-3备份-2"
                                        transform="translate(4.500000, 4.000000)"
                                        stroke={color}
                                    >
                                        <rect
                                            id="矩形"
                                            strokeWidth="1.3"
                                            x="0.65"
                                            y="0.65"
                                            width="13.7"
                                            height="14.7"
                                            rx="4"
                                        ></rect>
                                        <line
                                            x1="4.27997665"
                                            y1="12.3305227"
                                            x2="10.7200233"
                                            y2="12.3305227"
                                            id="路径-9"
                                            strokeWidth="1.1"
                                            strokeLinecap="round"
                                        ></line>
                                        <line
                                            x1="5"
                                            y1="10"
                                            x2="9.1482503"
                                            y2="10"
                                            id="路径-6"
                                            strokeWidth="1.1"
                                            strokeLinecap="round"
                                        ></line>
                                        <polyline
                                            id="路径-3"
                                            strokeWidth="1.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            points="5 5.03717474 6.81510315 6.80261198 10 3.8"
                                        ></polyline>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
