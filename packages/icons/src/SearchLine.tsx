/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const SearchLine = ({
    size = 18,
    color = "#333333",
    style: _style,
    ...rest
}) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

    return (
        <svg
            viewBox="-3 -3 19 19"
            width={size + "px"}
            height={size + "px"}
            style={style}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>search_icon</title>
            <g
                id="页面-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
            >
                <g
                    id="Homework-Help_结果页_无答案"
                    transform="translate(-328, -112)"
                    stroke={color}
                >
                    <g id="上" transform="translate(210, -91)">
                        <g id="输入框_上" transform="translate(105, 0)">
                            <g
                                id="Homework-Help_search_icon"
                                transform="translate(10, 200)"
                            >
                                <g
                                    id="search_icon"
                                    transform="translate(3.5, 3.5)"
                                >
                                    <circle
                                        id="椭圆形"
                                        stroke-width="1.2"
                                        cx="5.8"
                                        cy="5.8"
                                        r="5.2"
                                    ></circle>
                                    <line
                                        x1="9.68745057"
                                        y1="9.69508249"
                                        x2="12"
                                        y2="12"
                                        id="路径"
                                        stroke-width="1.8"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></line>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default SearchLine;
