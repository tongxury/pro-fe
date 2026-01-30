/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const PenNibLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M708.096 44.373l270.805 270.763a21.333 21.333 0 0 1-11.818 36.181l-62.891 9.814-241.323-241.323 9.046-63.36a21.333 21.333 0 0 1 36.181-12.075z m-512.043 815.36c158.806-142.122 341.12-184.661 539.435-235.52l19.03-171.434-183.34-183.339-171.434 19.03c-50.859 198.314-93.397 380.586-235.52 539.434l-59.52-59.477c120.661-140.8 165.973-296.662 226.261-558.123l271.531-30.165 241.365 241.365-30.165 271.53c-261.461 60.331-417.365 105.6-558.123 226.262l-59.52-59.563z m225.451-257.28a85.333 85.333 0 1 1 120.661-120.661 85.333 85.333 0 0 1-120.618 120.661z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

PenNibLine.defaultProps = {
  size: 18,
};

export default PenNibLine;
