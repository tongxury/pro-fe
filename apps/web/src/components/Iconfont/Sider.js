/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Sider = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M810.667 938.667H213.333c-72.533 0-128-55.467-128-128V213.333c0-72.533 55.467-128 128-128h597.334c72.533 0 128 55.467 128 128v597.334c0 72.533-55.467 128-128 128z m-597.334-768c-25.6 0-42.666 17.066-42.666 42.666v597.334c0 25.6 17.066 42.666 42.666 42.666h597.334c25.6 0 42.666-17.066 42.666-42.666V213.333c0-25.6-17.066-42.666-42.666-42.666H213.333z"
        fill={getIconColor(color, 0, '#8A8A8A')}
      />
      <path
        d="M384 938.667c-25.6 0-42.667-17.067-42.667-42.667V128c0-25.6 17.067-42.667 42.667-42.667S426.667 102.4 426.667 128v768c0 25.6-17.067 42.667-42.667 42.667z"
        fill={getIconColor(color, 1, '#8A8A8A')}
      />
    </svg>
  );
};

Sider.defaultProps = {
  size: 18,
};

export default Sider;
