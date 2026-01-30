/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Expand = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M554.667 106.667h298.752a63.915 63.915 0 0 1 63.914 64v298.666H832V192H554.667v-85.333z m-448 746.666V554.667H192V832h277.333v85.333H170.581a63.936 63.936 0 0 1-63.914-64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Expand.defaultProps = {
  size: 18,
};

export default Expand;
