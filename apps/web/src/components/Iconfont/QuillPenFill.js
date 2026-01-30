/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const QuillPenFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M896 85.333c-640 0-725.333 597.334-768 853.334h85.248C241.664 796.459 312.789 718.25 426.667 704 597.333 682.667 725.333 533.333 768 405.333l-64-42.666L746.667 320C789.333 277.333 832.17 213.333 896 85.333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

QuillPenFill.defaultProps = {
  size: 18,
};

export default QuillPenFill;
