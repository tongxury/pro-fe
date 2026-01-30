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
                d="M7.21652 9.06397C7.21652 7.72154 8.30839 6.63076 9.64991 6.63076H13.2998V5.41406H7.21652C6.54457 5.41406 6 5.95808 6 6.63076V16.3638C6 17.0352 6.54457 17.5805 7.21652 17.5805V9.06397Z"
                fill="url(#paint0_linear_18424_9319)"
            />
            <path
                d="M14.5154 7.84796L18.1653 11.4979H14.5154V7.84796Z"
                fill="url(#paint1_linear_18424_9319)"
            />
            <path
                d="M14.517 12.7146C13.845 12.7146 13.3004 12.1693 13.3004 11.4979V7.84796H9.65054C8.97859 7.84796 8.43384 8.39216 8.43384 9.06466V18.7977C8.43384 19.4691 8.97859 20.0144 9.65054 20.0144H16.9504C17.6216 20.0144 18.1669 19.4704 18.1669 18.7977V12.7146H14.517ZM10.2588 9.67292H12.0838V10.8896H10.2588V9.67292ZM10.2588 12.1063H12.0838V13.3228H10.2588V12.1063ZM16.3419 18.1894H10.2588V16.9727H16.3419V18.1894ZM16.3419 15.7562H10.2588V14.5395H16.3419V15.7562Z"
                fill="url(#paint2_linear_18424_9319)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_18424_9319"
                    x1="7.22518"
                    y1="-0.541551"
                    x2="13.8136"
                    y2="24.0375"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#FFDA15" />
                    <stop offset="1" stop-color="#FD1CE7" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_18424_9319"
                    x1="15.128"
                    y1="6.06129"
                    x2="16.367"
                    y2="13.7655"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#FFDA15" />
                    <stop offset="1" stop-color="#FD1CE7" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_18424_9319"
                    x1="10.0674"
                    y1="1.89235"
                    x2="15.1581"
                    y2="27.214"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#FFDA15" />
                    <stop offset="1" stop-color="#FD1CE7" />
                </linearGradient>
            </defs>
        </svg>
    );
};
