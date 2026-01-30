/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const LawLine = ({ size = 18, color = "#333333", style: _style, ...rest }) => {
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
            <title>Law_icon</title>
            <defs>
                <rect id="path-1" x="0" y="0" width="30" height="30"></rect>
            </defs>
            <g
                id="页面-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
                opacity="0.8"
            >
                <g
                    id="Homework-Help_默认状态"
                    transform="translate(-890.000000, -602.000000)"
                >
                    <g id="中间" transform="translate(236.000000, 128.000000)">
                        <g
                            id="功能介绍"
                            transform="translate(267.000000, 474.000000)"
                        >
                            <g
                                id="Law_icon"
                                transform="translate(387.000000, 0.000000)"
                            >
                                <use
                                    id="矩形"
                                    fill-opacity="0"
                                    fill={color}
                                ></use>
                                <line
                                    x1="17.0227966"
                                    y1="6.04543819"
                                    x2="9.54559325"
                                    y2="13.5226416"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></line>
                                <line
                                    x1="13.2841949"
                                    y1="17.2612432"
                                    x2="20.7613983"
                                    y2="9.78403987"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></line>
                                <line
                                    x1="17.0227966"
                                    y1="13.5226416"
                                    x2="24.5"
                                    y2="20.9998449"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></line>
                                <line
                                    x1="14.2188454"
                                    y1="18.1958937"
                                    x2="8.61094283"
                                    y2="12.5879911"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></line>
                                <line
                                    x1="21.6960487"
                                    y1="10.7186903"
                                    x2="16.0881462"
                                    y2="5.11078776"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></line>
                                <path
                                    d="M16.0227966,24.3892122 L16.0227966,23.1016701 C16.0227966,21.9394708 15.080648,20.9973222 13.9184488,20.9973222 L10.272651,20.9973222 C9.1104518,20.9973222 8.16830317,21.9394708 8.16830317,23.1016701 L8.16830317,24.3892122 L8.16830317,24.3892122"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></path>
                                <line
                                    x1="5.5"
                                    y1="24.3892122"
                                    x2="18.6910998"
                                    y2="24.3892122"
                                    id="路径"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    mask="url(#mask-2)"
                                ></line>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default LawLine;
