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

const IconMoneyDollarCircleFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m-149.333333-341.333334v85.333334H469.333333v85.333333h85.333334v-85.333333h42.666666a106.666667 106.666667 0 1 0 0-213.333334h-170.666666a21.333333 21.333333 0 1 1 0-42.666666h234.666666V341.333333H554.666667V256h-85.333334v85.333333h-42.666666a106.666667 106.666667 0 0 0 0 213.333334h170.666666a21.333333 21.333333 0 1 1 0 42.666666H362.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconMoneyDollarCircleFill.defaultProps = {
  size: 18,
};

export default IconMoneyDollarCircleFill;
