import { SvgProps } from "../types";

export default ({ color, size = 22 }: SvgProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="13.9832"
                y="3.15002"
                width="1.22562"
                height="15.3203"
                rx="0.612812"
                transform="rotate(45 13.9832 3.15002)"
                fill={color}
            ></rect>
            <rect
                x="3.15009"
                y="4.01685"
                width="1.22562"
                height="15.3203"
                rx="0.612812"
                transform="rotate(-45 3.15009 4.01685)"
                fill={color}
            ></rect>
        </svg>
    );
};
