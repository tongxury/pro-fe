/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconStarFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M749.226667 896a42.666667 42.666667 0 0 1-19.626667-4.693333L512 777.386667l-217.6 113.92a42.666667 42.666667 0 0 1-61.866667-45.226667l42.666667-240.213333-175.786667-170.666667a42.666667 42.666667 0 0 1-10.666666-42.666667 42.666667 42.666667 0 0 1 34.56-29.013333l243.2-35.413333 107.093333-218.88a42.666667 42.666667 0 0 1 76.8 0l108.373333 218.453333 243.2 35.413333a42.666667 42.666667 0 0 1 34.56 29.013334 42.666667 42.666667 0 0 1-10.666666 42.666666l-175.786667 170.666667 42.666667 240.213333a42.666667 42.666667 0 0 1-17.066667 42.666667 42.666667 42.666667 0 0 1-26.453333 7.68z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconStarFill.defaultProps = {
  size: 18,
};

export default IconStarFill;
