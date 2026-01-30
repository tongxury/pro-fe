/* eslint-disable */

import React from "react";

const DEFAULT_STYLE = {
    display: "block"
};

const ArchLine = ({ size = 18, color = "#333333", style: _style, ...rest }) => {
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
            <title>Architecture_icon</title>
            <defs>
                <rect id="path-1" x="0" y="0" width="30" height="30"></rect>
            </defs>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                opacity="0.8"
            >
                <g
                    id="Homework-Help_默认状态"
                    transform="translate(-527.000000, -602.000000)"
                >
                    <g id="中间" transform="translate(236.000000, 128.000000)">
                        <g
                            id="功能介绍"
                            transform="translate(267.000000, 474.000000)"
                        >
                            <g
                                id="Architecture_icon"
                                transform="translate(24.000000, 0.000000)"
                            >
                                <use
                                    id="矩形"
                                    fillOpacity="0"
                                    fill={color}
                                ></use>
                                <path
                                    d="M20.4827104,4.1357101 C20.81684,4.04907742 21.1544525,4.10607904 21.4301907,4.26827123 C21.7059289,4.43046343 21.9197928,4.6978462 22.0064255,5.03197583 C22.0597716,5.23772399 22.0597716,5.45367706 22.0064255,5.65942522 L19.9885888,13.4419273 C19.8177353,14.1008845 19.4750146,14.687657 19.010268,15.1524036 C18.5455214,15.6171502 17.9587489,15.9598709 17.2997916,16.1307244 L9.51728959,18.1485611 C9.18315996,18.2351938 8.84554753,18.1781922 8.56980933,18.016 C8.29407113,17.8538078 8.08020716,17.586425 7.99357448,17.2522954 C7.94022837,17.0465473 7.94022837,16.8305942 7.99357448,16.624846 L10.0114112,8.84234398 C10.1822647,8.18338676 10.5249854,7.59661423 10.989732,7.13186763 C11.4544786,6.66712103 12.0412511,6.32440035 12.7002084,6.1535468 Z"
                                    id="矩形"
                                    stroke={color}
                                    stroke-width="1.5"
                                    mask="url(#mask-2)"
                                    transform="translate(15.000000, 11.142136) rotate(-315.000000) translate(-15.000000, -11.142136) "
                                ></path>
                                <path
                                    d="M21.5857864,9.41421356 L19.6176993,17.6561249 C19.2675289,19.1225605 18.1225605,20.2675289 16.6561249,20.6176993 L8.41421356,22.5857864 L8.41421356,22.5857864"
                                    id="路径"
                                    stroke={color}
                                    strokeWidth="1.5"
                                    stroke-linecap="round"
                                    mask="url(#mask-2)"
                                    transform="translate(15.000000, 16.000000) rotate(-315.000000) translate(-15.000000, -16.000000) "
                                ></path>
                                <path
                                    d="M21.5857864,13.4142136 L19.6176993,21.6561249 C19.2675289,23.1225605 18.1225605,24.2675289 16.6561249,24.6176993 L8.41421356,26.5857864 L8.41421356,26.5857864"
                                    id="路径备份-4"
                                    stroke={color}
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    mask="url(#mask-2)"
                                    transform="translate(15.000000, 20.000000) rotate(-315.000000) translate(-15.000000, -20.000000) "
                                ></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default ArchLine;
