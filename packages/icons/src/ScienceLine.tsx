/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const ScienceLine = ({
    size = 18,
    color = "#333333",
    style: _style,
    ...rest
}) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

    return (
        <svg
            viewBox="0 0 31 30"
            width={size + "px"}
            height={size + "px"}
            style={style}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/*@ts-ignore*/}
            <title>Science_icon</title>
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
                    transform="translate(-983.000000, -602.000000)"
                >
                    <g id="中间" transform="translate(236.000000, 128.000000)">
                        <g
                            id="功能介绍"
                            transform="translate(267.000000, 474.000000)"
                        >
                            <g
                                id="Science"
                                transform="translate(470.000000, 0.000000)"
                            >
                                <g
                                    id="Science_icon"
                                    transform="translate(10.500000, 0.000000)"
                                >
                                    <use
                                        id="矩形"
                                        fill-opacity="0"
                                        fill={color}
                                    ></use>
                                    <g id="编组-8" mask="url(#mask-2)">
                                        <g transform="translate(4.500000, 4.500000)">
                                            <path
                                                d="M6.0983878,9.0733597 C6.07108569,9.53976818 6.05697942,10.0160258 6.05697942,10.5 C6.05697942,16.2471976 8.04618749,20.9062218 10.5,20.9062218 C11.9043018,20.9062218 13.1564363,19.380297 13.970635,16.99776 M14.9120416,11.7353167 C14.9324988,11.3302161 14.9430206,10.917986 14.9430206,10.5 C14.9430206,4.75280239 12.9538125,0.093778179 10.5,0.093778179 C9.10033932,0.093778179 7.85184186,1.60963344 7.03745202,3.97864567"
                                                id="形状"
                                                stroke={color}
                                                stroke-width="1.5"
                                                fill="none"
                                                stroke-linecap="round"
                                                transform="translate(10.500000, 10.500000) rotate(-45.000000) translate(-10.500000, -10.500000) "
                                            ></path>
                                            <path
                                                d="M6.0816576,9.39665203 C6.06534405,9.75920978 6.05697942,10.127317 6.05697942,10.5 C6.05697942,16.2471976 8.04618749,20.9062218 10.5,20.9062218 C11.6582635,20.9062218 12.713009,19.8681511 13.503892,18.1675614 L13.8866161,17.2016106 M14.9101732,11.7717641 C14.9318578,11.3549499 14.9430206,10.9305282 14.9430206,10.5 C14.9430206,4.75280239 12.9538125,0.093778179 10.5,0.093778179 C9.13174899,0.093778179 7.90795283,1.54236247 7.09293162,3.82045371"
                                                id="形状"
                                                stroke={color}
                                                stroke-width="1.5"
                                                fill="none"
                                                stroke-linecap="round"
                                                transform="translate(10.500000, 10.500000) rotate(-315.000000) translate(-10.500000, -10.500000) "
                                            ></path>
                                            <circle
                                                id="椭圆形"
                                                stroke="none"
                                                fill={color}
                                                fill-rule="evenodd"
                                                cx="10.522236"
                                                cy="10.4960353"
                                                r="1.56354841"
                                            ></circle>
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

export default ScienceLine;
