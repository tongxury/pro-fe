import { SvgProps } from "../types";

export default ({ color = "84888C", size = 16 }: SvgProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Copy_icon</title>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Scholar-Search_Reference"
                    transform="translate(-275.000000, -359.000000)"
                >
                    <g id="中" transform="translate(236.000000, 174.000000)">
                        <g
                            id="功能图标"
                            transform="translate(30.000000, 176.000000)"
                        >
                            <g
                                id="Copy_icon"
                                transform="translate(9.000000, 9.000000)"
                            >
                                <rect
                                    id="矩形"
                                    fill="#D8D8D8"
                                    opacity="0"
                                    x="0"
                                    y="0"
                                    width="16"
                                    height="16"
                                ></rect>
                                <path
                                    d="M4.9,4.93269211 L4.9,4.93269211 L4.9,4.1 C4.9,2.9954305 5.7954305,2.1 6.9,2.1 L11.9,2.1 C13.0045695,2.1 13.9,2.9954305 13.9,4.1 L13.9,9.1 C13.9,10.2045695 13.0045695,11.1 11.9,11.1 L11.2140218,11.1 L11.2140218,11.1"
                                    id="路径"
                                    stroke={color}
                                ></path>
                                <rect
                                    id="矩形"
                                    stroke={color}
                                    x="2.1"
                                    y="4.9"
                                    width="9"
                                    height="9"
                                    rx="2.5"
                                ></rect>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
