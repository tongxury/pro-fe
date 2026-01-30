/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const BookOpenLine = ({
    size = 18,
    color = "#333333",
    style: _style,
    ...rest
}) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

    return (
        <svg
            viewBox="0 0 30 30"
            width={size + "px"}
            height={size + "px"}
            style={style}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/*@ts-ignore*/}
            <title>Education_icon</title>
            <defs>
                <rect id="path-1" x="0" y="0" width="30" height="30"></rect>
            </defs>
            <g
                id="页面-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
            >
                <g
                    id="Homework-Help_默认状态"
                    transform="translate(-1096.000000, -602.000000)"
                >
                    <g id="中间" transform="translate(236.000000, 128.000000)">
                        <g
                            id="功能介绍"
                            transform="translate(267.000000, 474.000000)"
                        >
                            <g
                                id="Education"
                                transform="translate(576.000000, 0.000000)"
                            >
                                <g
                                    id="Education_icon"
                                    transform="translate(17.000000, 0.000000)"
                                >
                                    <use
                                        id="矩形"
                                        fill-opacity="0"
                                        fill={color}
                                    ></use>
                                    <g
                                        id="编组"
                                        opacity="0.8"
                                        mask="url(#mask-2)"
                                        stroke={color}
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.3"
                                    >
                                        <g
                                            transform="translate(5.000000, 7.081778)"
                                            id="形状"
                                        >
                                            <path d="M10,1.39197778 L10,15.8364444 M10,1.39197778 C8.70233333,0.529844444 6.94054444,0 5,0 C3.05945556,0 1.29765556,0.529844444 0,1.39197778 L0,15.8364444 C1.29765556,14.9743333 3.05945556,14.4444444 5,14.4444444 C6.94054444,14.4444444 8.70233333,14.9743333 10,15.8364444 M10,1.39197778 C11.2976667,0.529844444 13.0594444,0 15,0 C16.9405556,0 18.7023333,0.529844444 20,1.39197778 L20,15.8364444 C18.7023333,14.9743333 16.9405556,14.4444444 15,14.4444444 C13.0594444,14.4444444 11.2976667,14.9743333 10,15.8364444"></path>
                                        </g>
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

export default BookOpenLine;
