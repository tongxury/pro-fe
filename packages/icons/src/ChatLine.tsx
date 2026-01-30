/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const ChatLine = ({ size = 18, color = "#333333", style: _style, ...rest }) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

    return (
        <svg
            viewBox="0 0 20 20"
            width={size + "px"}
            height={size + "px"}
            style={style}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g
                id="页面-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
            >
                <g
                    id="Homework-Help_详情页_文字问答_选取文本"
                    transform="translate(-325.000000, -851.000000)"
                >
                    <g id="中" transform="translate(315.000000, 154.000000)">
                        <g
                            transform="translate(0.000000, 20.000000)"
                            id="输入框_下"
                        >
                            <g transform="translate(0.000000, 664.000000)">
                                <g
                                    id="ask-follow-up_icon"
                                    transform="translate(10.000000, 13.000000)"
                                >
                                    <rect
                                        id="矩形"
                                        fill={color}
                                        opacity="0"
                                        x="0"
                                        y="0"
                                        width="20"
                                        height="20"
                                    ></rect>
                                    <g
                                        id="chat_icon"
                                        transform="translate(10.000000, 10.500000) scale(-1, 1) translate(-10.000000, -10.500000) translate(2.500000, 4.000000)"
                                    >
                                        <path
                                            d="M10.5,0.6 C11.5769553,0.6 12.5519553,1.03652237 13.2577164,1.74228355 C13.9634776,2.44804474 14.4,3.42304474 14.4,4.5 L14.4,8.5 C14.4,9.57695526 13.9634776,10.5519553 13.2577164,11.2577164 C12.5519553,11.9634776 11.5769553,12.4 10.5,12.4 L0.6,12.4 L0.6,4.5 C0.6,3.42304474 1.03652237,2.44804474 1.74228355,1.74228355 C2.44804474,1.03652237 3.42304474,0.6 4.5,0.6 Z"
                                            id="矩形"
                                            stroke={color}
                                            stroke-width="1.2"
                                        ></path>
                                        <path
                                            d="M5.25,7.7 C5.9127417,7.7 6.45,7.1627417 6.45,6.5 C6.45,5.8372583 5.9127417,5.3 5.25,5.3 C4.5872583,5.3 4.05,5.8372583 4.05,6.5 C4.05,7.1627417 4.5872583,7.7 5.25,7.7 Z M9.75,7.7 C10.4127417,7.7 10.95,7.1627417 10.95,6.5 C10.95,5.8372583 10.4127417,5.3 9.75,5.3 C9.0872583,5.3 8.55,5.8372583 8.55,6.5 C8.55,7.1627417 9.0872583,7.7 9.75,7.7 Z"
                                            id="形状结合"
                                            fill={color}
                                            fill-rule="nonzero"
                                        ></path>
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

export default ChatLine;
