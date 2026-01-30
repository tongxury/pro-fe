/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const BookOpenLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M554.667 896v85.333h-85.334V896H128a42.667 42.667 0 0 1-42.667-42.667V170.667A42.667 42.667 0 0 1 128 128h256a170.24 170.24 0 0 1 128 57.77A170.24 170.24 0 0 1 640 128h256a42.667 42.667 0 0 1 42.667 42.667v682.666A42.667 42.667 0 0 1 896 896H554.667z m298.666-85.333V213.333H640a85.333 85.333 0 0 0-85.333 85.334v512h298.666z m-384 0v-512A85.333 85.333 0 0 0 384 213.333H170.667v597.334h298.666z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

BookOpenLine.defaultProps = {
  size: 18,
};

export default BookOpenLine;
