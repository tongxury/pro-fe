/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const CropLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M640 725.333v85.334H256A42.667 42.667 0 0 1 213.333 768V298.667h-128v-85.334h128v-128h85.334v640H640z m85.333 213.334v-640H384v-85.334h384A42.667 42.667 0 0 1 810.667 256v469.333h128v85.334h-128v128h-85.334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

CropLine.defaultProps = {
  size: 18,
};

export default CropLine;
