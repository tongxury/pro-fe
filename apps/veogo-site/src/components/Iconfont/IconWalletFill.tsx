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

const IconWalletFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M682.666667 874.666667H298.666667a213.333333 213.333333 0 0 1-213.333334-213.333334v-298.666666a198.570667 198.570667 0 0 1 178.773334-210.773334A227.072 227.072 0 0 1 298.666667 149.333333h384a195.114667 195.114667 0 0 1 32 2.133334 196.266667 196.266667 0 0 1 180.053333 186.453333 20.949333 20.949333 0 0 1-21.333333 22.613333h-66.133334a146.858667 146.858667 0 0 0-106.24 43.946667 150.101333 150.101333 0 0 0-44.8 120.32 155.52 155.52 0 0 0 156.16 138.666667h61.013334a20.949333 20.949333 0 0 1 21.333333 22.613333A199.765333 199.765333 0 0 1 682.666667 874.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M938.666667 555.904a43.818667 43.818667 0 0 1-42.666667 43.52h-83.626667a90.965333 90.965333 0 0 1-92.16-79.786667 85.674667 85.674667 0 0 1 25.6-69.546666 85.034667 85.034667 0 0 1 61.44-25.6H896a43.818667 43.818667 0 0 1 42.666667 43.52z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconWalletFill.defaultProps = {
  size: 18,
};

export default IconWalletFill;
