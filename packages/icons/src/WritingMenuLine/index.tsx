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
            <title>Writing Guide_icon_normal</title>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Scholar-Search_默认状态备份"
                    transform="translate(-58.000000, -337.000000)"
                >
                    <g
                        id="左侧边栏"
                        transform="translate(30.000000, 128.000000)"
                    >
                        <g id="list" transform="translate(0.000000, 60.000000)">
                            <g
                                id="Write"
                                transform="translate(0.000000, 138.000000)"
                            >
                                <g
                                    id="Writing-Guide_icon_normal"
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
                                        id="编组-5"
                                        transform="translate(6.089295, 5.809353)"
                                        stroke={color}
                                        strokeWidth="1.3"
                                    >
                                        <g id="编组" strokeLinejoin="round">
                                            <path
                                                d="M0,10.8894335 L2.71518411,10.5077041 L9.72272262,3.50016563 C10.3670846,2.85580369 10.3670846,1.81108656 9.72272262,1.16672462 C9.72272125,1.16672325 9.72271988,1.16672188 9.7227185,1.1667205 C9.07835149,0.522358045 8.03363028,0.522360311 7.38926606,1.16672556 L0.403825419,8.15217743 L0.403825419,8.15217743 L0,10.8894335 Z"
                                                id="路径"
                                            ></path>
                                            <line
                                                x1="6.22253225"
                                                y1="2.3334685"
                                                x2="8.55598975"
                                                y2="4.666926"
                                                id="路径"
                                                strokeLinecap="round"
                                            ></line>
                                        </g>
                                        <line
                                            x1="5.41070475"
                                            y1="10.9902011"
                                            x2="12.6735933"
                                            y2="10.9902011"
                                            id="路径-10"
                                            strokeLinecap="round"
                                        ></line>
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
