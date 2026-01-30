/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const CustomerService = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M192.704 405.333333C203.669333 238.549333 342.442667 106.666667 512 106.666667s308.330667 131.882667 319.296 298.666666H853.333333a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64h-27.733333c-23.082667 113.706667-106.410667 205.44-215.146667 240.554667-31.061333 10.026667-64.170667 15.445333-98.453333 15.445333h-64a64 64 0 0 1-64-64v-42.666666a64 64 0 0 1 64-64h128c30.037333 0 55.253333 20.693333 62.144 48.597333A234.538667 234.538667 0 0 0 746.666667 597.333333v-170.666666c0-129.6-105.066667-234.666667-234.666667-234.666667s-234.666667 105.066667-234.666667 234.666667v234.666666H170.666667a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h22.037333z"
        fill={getIconColor(color, 0, '#262C66')}
      />
    </svg>
  );
};

CustomerService.defaultProps = {
  size: 18,
};

export default CustomerService;
