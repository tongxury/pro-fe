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
            <title>Chat_icon_normal</title>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Scholar-Search_默认状态备份"
                    transform="translate(-58.000000, -199.000000)"
                >
                    <g
                        id="左侧边栏"
                        transform="translate(30.000000, 128.000000)"
                    >
                        <g id="list" transform="translate(0.000000, 60.000000)">
                            <g
                                id="Chat_icon_normal"
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
                                    <path
                                        d="M12,1.65 C12.925077,1.65 13.762577,2.02496152 14.3688077,2.63119228 C14.9750385,3.23742304 15.35,4.07492304 15.35,5 L15.35,11 C15.35,11.925077 14.9750385,12.762577 14.3688077,13.3688077 C13.762577,13.9750385 12.925077,14.35 12,14.35 L0.65,14.35 L0.65,5 C0.65,4.07492304 1.02496152,3.23742304 1.63119228,2.63119228 C2.23742304,2.02496152 3.07492304,1.65 4,1.65 L12,1.65 Z"
                                        id="矩形"
                                        strokeWidth="1.3"
                                    ></path>
                                    <path
                                        d="M4.5,9 C5.05228475,9 5.5,8.55228475 5.5,8 C5.5,7.44771525 5.05228475,7 4.5,7 C3.94771525,7 3.5,7.44771525 3.5,8 C3.5,8.55228475 3.94771525,9 4.5,9 Z M8,9 C8.55228475,9 9,8.55228475 9,8 C9,7.44771525 8.55228475,7 8,7 C7.44771525,7 7,7.44771525 7,8 C7,8.55228475 7.44771525,9 8,9 Z M11.5,9 C12.0522847,9 12.5,8.55228475 12.5,8 C12.5,7.44771525 12.0522847,7 11.5,7 C10.9477153,7 10.5,7.44771525 10.5,8 C10.5,8.55228475 10.9477153,9 11.5,9 Z"
                                        id="形状结合"
                                        strokeWidth="0.1"
                                        fill={color}
                                        fillRule="nonzero"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
