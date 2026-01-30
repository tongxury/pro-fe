/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Drag = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M967.111 426.667H56.89C25.486 426.667 0 401.18 0 369.777s25.486-56.888 56.889-56.888H967.11c31.403 0 56.889 25.486 56.889 56.889s-25.486 56.889-56.889 56.889z m0 284.444H56.89C25.486 711.111 0 685.625 0 654.222s25.486-56.889 56.889-56.889H967.11c31.403 0 56.889 25.487 56.889 56.89s-25.486 56.888-56.889 56.888z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Drag.defaultProps = {
  size: 18,
};

export default Drag;
