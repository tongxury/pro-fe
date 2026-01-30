/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const More = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M288 512c0 44.184-35.816 80-80 80s-80-35.816-80-80 35.816-80 80-80 80 35.816 80 80z m304 0c0 44.184-35.816 80-80 80s-80-35.816-80-80 35.816-80 80-80 80 35.816 80 80z m224 80c44.184 0 80-35.816 80-80s-35.816-80-80-80-80 35.816-80 80 35.816 80 80 80z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

More.defaultProps = {
  size: 18,
};

export default More;
