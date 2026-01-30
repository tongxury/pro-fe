/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const ArrowBottom = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M760.455 393.191c-12.49-12.49-32.738-12.49-45.227 0L511.706 596.712l-203.521-203.52c-12.49-12.49-32.738-12.49-45.227 0-12.49 12.489-12.49 32.737 0 45.226l226.135 226.135c12.49 12.49 32.738 12.49 45.227 0l226.135-226.135c12.488-12.49 12.488-32.738 0-45.227z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

ArrowBottom.defaultProps = {
  size: 18,
};

export default ArrowBottom;
