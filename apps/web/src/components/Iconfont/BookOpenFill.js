/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const BookOpenFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M896 896H554.667V256a128 128 0 0 1 128-128H896a42.667 42.667 0 0 1 42.667 42.667v682.666A42.667 42.667 0 0 1 896 896z m-426.667 0H128a42.667 42.667 0 0 1-42.667-42.667V170.667A42.667 42.667 0 0 1 128 128h213.333a128 128 0 0 1 128 128v640z m0 0h85.334v85.333h-85.334V896z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

BookOpenFill.defaultProps = {
  size: 18,
};

export default BookOpenFill;
