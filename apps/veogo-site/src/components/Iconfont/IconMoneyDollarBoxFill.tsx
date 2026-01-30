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

const IconMoneyDollarBoxFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 128h768a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H128a42.666667 42.666667 0 0 1-42.666667-42.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z m234.666667 469.333333v85.333334H469.333333v85.333333h85.333334v-85.333333h42.666666a106.666667 106.666667 0 1 0 0-213.333334h-170.666666a21.333333 21.333333 0 1 1 0-42.666666h234.666666V341.333333H554.666667V256h-85.333334v85.333333h-42.666666a106.666667 106.666667 0 0 0 0 213.333334h170.666666a21.333333 21.333333 0 1 1 0 42.666666H362.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconMoneyDollarBoxFill.defaultProps = {
  size: 18,
};

export default IconMoneyDollarBoxFill;
