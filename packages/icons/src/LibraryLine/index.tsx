import { SvgProps } from "../types";

export default ({ color = "#84888C", size = 24 }: SvgProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Library_icon</title>
            <g
                id="页面-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
            >
                <g
                    id="Scholar-Search_默认状态备份"
                    transform="translate(-1324.000000, -139.000000)"
                >
                    <g id="中间" transform="translate(236.000000, 128.000000)">
                        <g
                            id="Library_icon"
                            transform="translate(1088.000000, 11.000000)"
                        >
                            <rect
                                id="矩形"
                                fill="#D8D8D8"
                                opacity="0"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                            ></rect>
                            <g
                                id="编组-2"
                                transform="translate(5.000000, 6.000000)"
                                stroke={color}
                                strokeLinejoin="round"
                                strokeWidth="1.1375"
                            >
                                <path
                                    d="M1.3125,0 L4.05263158,0 L4.05263158,0 C5.68042632,0 7,1.33034571 7,2.97142857 L7,13 C7,11.7691971 6.01031053,10.7714286 4.78947368,10.7714286 L1.3125,10.7714286 C0.587626266,10.7714286 -3.99703495e-16,10.1838023 0,9.45892857 L0,1.3125 C-8.87714298e-17,0.587626266 0.587626266,8.87714298e-17 1.3125,0 Z"
                                    id="路径"
                                ></path>
                                <path
                                    d="M13.125,0 L9.94736842,0 L9.94736842,0 C8.31957368,0 7,1.33034571 7,2.97142857 L7,13 C7,11.7691971 7.98968947,10.7714286 9.21052632,10.7714286 L13.125,10.7714286 C13.6082492,10.7714286 14,10.3796777 14,9.89642857 L14,0.875 C14,0.391750844 13.6082492,3.40440042e-16 13.125,0 Z"
                                    id="路径"
                                ></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
};
