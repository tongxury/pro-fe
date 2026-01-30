/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const LikeLine = ({ size = 18, color = "#333333", style: _style, ...rest }) => {
    const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

    return (
        <svg
            viewBox="0 0 16 16"
            width={size + "px"}
            height={size + "px"}
            style={style}
            {...rest}
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Helpful_icon</title>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Scholar-Search_Reference"
                    transform="translate(-853.000000, -359.000000)"
                >
                    <g id="中" transform="translate(236.000000, 174.000000)">
                        <g
                            id="功能图标"
                            transform="translate(30.000000, 176.000000)"
                        >
                            <g
                                id="Helpful_icon"
                                transform="translate(578.000000, 0.000000)"
                            >
                                <g transform="translate(9.000000, 9.000000)">
                                    <rect
                                        id="矩形"
                                        fillOpacity="0"
                                        fill={color}
                                        x="0"
                                        y="0"
                                        width="16"
                                        height="16"
                                    ></rect>
                                    <path
                                        d="M9.19391348,5.70239833 L9.19391348,3.30103357 C9.19391348,2.30634493 8.38758856,1.5 7.39288991,1.5 L4.99152515,6.90308071 L4.99152515,13.5069117 L11.9674898,13.5069117 C12.5661967,13.5136043 13.0784211,13.0782235 13.1681722,12.4862538 L13.996643,7.08318307 C14.0495064,6.73488512 13.946748,6.38095064 13.7156166,6.1151329 C13.4844519,5.84931516 13.1482275,5.69839606 12.7959606,5.70239833 L9.19391348,5.70239833 Z"
                                        id="路径"
                                        stroke={color}
                                        strokeWidth="0.923198004"
                                        strokeLinejoin="round"
                                    ></path>
                                    <path
                                        d="M4.99145845,6.83647619 L3.38854747,6.83647619 C2.68525444,6.82403579 2.08403942,7.40660021 1.9897525,8.10362968 L1.9897525,12.306018 C2.08403942,13.0030808 2.68525444,13.5191408 3.38854747,13.5067004 L4.99145845,13.5067004 L4.99145845,6.83647619 Z"
                                        id="路径"
                                        stroke={color}
                                        strokeWidth="0.923198004"
                                        strokeLinejoin="round"
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

export default LikeLine;
