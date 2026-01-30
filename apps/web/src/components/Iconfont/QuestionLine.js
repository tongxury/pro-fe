/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const QuestionLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.667C276.352 938.667 85.333 747.648 85.333 512S276.352 85.333 512 85.333 938.667 276.352 938.667 512 747.648 938.667 512 938.667z m0-85.334a341.333 341.333 0 1 0 0-682.666 341.333 341.333 0 0 0 0 682.666zM469.333 640h85.334v85.333h-85.334V640z m85.334-70.187v27.52h-85.334v-64A42.667 42.667 0 0 1 512 490.667a64 64 0 1 0-62.763-76.544l-83.712-16.768a149.376 149.376 0 1 1 189.142 172.458z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

QuestionLine.defaultProps = {
  size: 18,
};

export default QuestionLine;
