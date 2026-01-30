/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const LeftEnd = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M772.267 853.333L409.6 490.667 772.267 128 832 187.733 529.067 490.667 832 793.6l-59.733 59.733zM213.333 128h85.334v725.333h-85.334V128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

LeftEnd.defaultProps = {
  size: 18,
};

export default LeftEnd;
