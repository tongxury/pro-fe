/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const ArrowDownSLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 562.005l211.2-211.2 60.33 60.331L512 682.666l-271.53-271.53 60.33-60.33z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

ArrowDownSLine.defaultProps = {
  size: 18,
};

export default ArrowDownSLine;
