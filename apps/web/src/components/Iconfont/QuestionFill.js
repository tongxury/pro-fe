/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const QuestionFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.667C276.352 938.667 85.333 747.648 85.333 512S276.352 85.333 512 85.333 938.667 276.352 938.667 512 747.648 938.667 512 938.667zM469.333 640v85.333h85.334V640h-85.334z m85.334-70.187A149.419 149.419 0 0 0 512 277.333a149.376 149.376 0 0 0-146.475 120.022l83.712 16.768A64 64 0 1 1 512 490.667a42.667 42.667 0 0 0-42.667 42.666v64h85.334v-27.52z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

QuestionFill.defaultProps = {
  size: 18,
};

export default QuestionFill;
