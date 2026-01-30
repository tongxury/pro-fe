/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const PenNibFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M210.304 916.693l249.43-249.429a85.333 85.333 0 1 0-60.331-60.33l-249.43 249.429-45.226-45.227c120.618-140.8 165.888-296.704 226.218-558.165l271.531-30.166 241.365 241.366-30.165 271.53c-261.461 60.331-417.365 105.6-558.123 226.262l-45.269-45.227zM708.096 87.04l270.805 270.763a21.333 21.333 0 0 1-11.818 36.181l-62.891 9.813-241.323-241.322 9.046-63.36a21.333 21.333 0 0 1 36.181-12.075z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

PenNibFill.defaultProps = {
  size: 18,
};

export default PenNibFill;
