/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const ChatSmileFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M311.083 888.49l-225.75 50.177 50.176-225.75A424.79 424.79 0 0 1 85.333 512C85.333 276.352 276.352 85.333 512 85.333S938.667 276.352 938.667 512 747.648 938.667 512 938.667a424.79 424.79 0 0 1-200.917-50.176zM298.667 512a213.333 213.333 0 0 0 426.666 0H640a128 128 0 0 1-256 0h-85.333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

ChatSmileFill.defaultProps = {
  size: 18,
};

export default ChatSmileFill;
