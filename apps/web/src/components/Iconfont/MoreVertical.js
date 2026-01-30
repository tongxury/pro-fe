/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const MoreVertical = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 85.333A85.333 85.333 0 1 0 512 256a85.333 85.333 0 0 0 0-170.667z m0 341.334a85.333 85.333 0 1 0 0 170.666 85.333 85.333 0 0 0 0-170.666zM512 768a85.333 85.333 0 1 0 0 170.667A85.333 85.333 0 0 0 512 768z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

MoreVertical.defaultProps = {
  size: 18,
};

export default MoreVertical;
