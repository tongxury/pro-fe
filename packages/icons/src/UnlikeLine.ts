/* eslint-disable */

import { FunctionComponent, SVGAttributes } from "react";

interface Props extends Omit<SVGAttributes<SVGElement>, "color"> {
    size?: number;
    color?: string | string[];
}

declare const UnlikeLine: FunctionComponent<Props>;

export default UnlikeLine;
