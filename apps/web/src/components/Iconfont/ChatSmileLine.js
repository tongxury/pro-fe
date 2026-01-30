/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const ChatSmileLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M311.083 888.49l-225.75 50.177 50.176-225.75A424.79 424.79 0 0 1 85.333 512C85.333 276.352 276.352 85.333 512 85.333S938.667 276.352 938.667 512 747.648 938.667 512 938.667a424.79 424.79 0 0 1-200.917-50.176z m12.373-90.154l27.861 14.933A339.413 339.413 0 0 0 512 853.333 341.333 341.333 0 1 0 170.667 512c0 56.917 13.866 111.701 40.106 160.683l14.891 27.861-27.947 125.739 125.739-27.947zM298.666 512H384a128 128 0 0 0 256 0h85.333a213.333 213.333 0 0 1-426.666 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

ChatSmileLine.defaultProps = {
  size: 18,
};

export default ChatSmileLine;
