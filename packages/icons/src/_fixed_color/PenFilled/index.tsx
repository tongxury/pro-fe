import React from "react";

import { SvgProps } from "../../types";

export default ({ size = 22 }: SvgProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.90586 14.382C1.86564 14.6672 2.11092 14.911 2.39594 14.8691L4.85617 14.5072C4.88115 14.5036 4.90419 14.4916 4.92164 14.4734L12.8763 6.14968C13.5808 5.41253 13.5808 4.25163 12.8763 3.51448C12.1252 2.72852 10.87 2.72852 10.1189 3.51449L2.30476 11.6911C2.28982 11.7068 2.28016 11.7267 2.27715 11.7481L1.90586 14.382Z"
                fill="url(#paint0_linear_354_38090.5571121776004828)"
            ></path>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.49665 4.64546C8.7193 4.43268 9.0723 4.44068 9.28508 4.66334L11.8104 7.30579C12.0232 7.52845 12.0152 7.88144 11.7925 8.09422C11.5699 8.30701 11.2169 8.29901 11.0041 8.07635L8.47878 5.43389C8.26599 5.21124 8.274 4.85825 8.49665 4.64546Z"
                fill="white"
            ></path>
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.12317 14.5173C7.12317 14.2094 7.37284 13.9597 7.68082 13.9597H15.5409C15.8488 13.9597 16.0985 14.2094 16.0985 14.5173C16.0985 14.8253 15.8488 15.075 15.5409 15.075H7.68082C7.37284 15.075 7.12317 14.8253 7.12317 14.5173Z"
                fill="url(#paint1_linear_354_38090.5571121776004828)"
            ></path>
            <defs>
                <linearGradient
                    id="paint0_linear_354_38090.5571121776004828"
                    x1="1.39468"
                    y1="2.07238"
                    x2="1.39468"
                    y2="15.8622"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#14E99C"></stop>
                    <stop offset="1" stop-color="#00BFAF"></stop>
                    <stop offset="1" stop-color="#21A99E"></stop>
                </linearGradient>
                <linearGradient
                    id="paint1_linear_354_38090.5571121776004828"
                    x1="6.72771"
                    y1="13.8801"
                    x2="6.72771"
                    y2="15.1672"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#14E99C"></stop>
                    <stop offset="1" stop-color="#00BFAF"></stop>
                    <stop offset="1" stop-color="#21A99E"></stop>
                </linearGradient>
            </defs>
        </svg>
    );
};
