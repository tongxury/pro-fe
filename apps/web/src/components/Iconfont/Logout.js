/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Logout = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M768 469.333v-40.746a23.467 23.467 0 0 1 6.699-16.427 22.656 22.656 0 0 1 32.426 0l82.176 83.413c8.96 9.046 8.96 23.808 0 32.854l-82.176 83.413a22.741 22.741 0 0 1-16.213 6.827A23.083 23.083 0 0 1 768 595.413v-40.746H426.667a42.667 42.667 0 0 1 0-85.334H768zM896 256a42.667 42.667 0 0 1-85.333 0v-42.667H213.333v597.334h597.334V768A42.667 42.667 0 0 1 896 768v42.667A85.333 85.333 0 0 1 810.667 896H213.333A85.333 85.333 0 0 1 128 810.667V213.333A85.333 85.333 0 0 1 213.333 128h597.334A85.333 85.333 0 0 1 896 213.333V256z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Logout.defaultProps = {
  size: 18,
};

export default Logout;
