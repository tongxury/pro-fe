import React from "react";

import { SvgProps } from "../../types";

export default ({ size = 22 }: SvgProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 25 26"
            fill="none"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.62304 6.65493C4.22952 6.76789 3.17623 7.937 3.10839 9.37748C3.0525 10.5643 3 11.9301 3 12.8729C3 13.8265 3.05371 15.2128 3.11031 16.409C3.1776 17.8311 4.20678 18.9924 5.58088 19.1233C7.10198 19.2682 9.30284 19.4141 12 19.4141C14.6901 19.4141 16.8866 19.269 18.4072 19.1245C19.7867 18.9933 20.8179 17.8245 20.8843 16.3969C20.9428 15.1374 21 13.6964 21 12.8729C21 12.0583 20.944 10.6392 20.8861 9.38954C20.8192 7.94348 19.7642 6.76711 18.3653 6.65398C16.8681 6.53292 14.7085 6.41406 12 6.41406C9.28446 6.41406 7.12072 6.53354 5.62304 6.65493ZM10.2 10.1166L14.84 12.8729L10.2 15.6292V10.1166Z"
                fill="url(#paint0_linear_18424_9325)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_18424_9325"
                    x1="12.0383"
                    y1="19.4141"
                    x2="1.47213"
                    y2="12.695"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0.0260417" stop-color={"#FF0852"} />
                    <stop offset="0.979167" stop-color={"#FF9F0E"} />
                </linearGradient>
            </defs>
        </svg>
    );
};
