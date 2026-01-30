/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconChat = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M693.333 505.6c-14.933-17.067-42.666-19.2-59.733-4.267-83.2 72.534-160 72.534-243.2 0-17.067-14.933-44.8-12.8-59.733 4.267-14.934 17.067-12.8 44.8 4.266 59.733 115.2 98.134 238.934 98.134 354.134 0 17.066-14.933 19.2-42.666 4.266-59.733zM512 64c247.467 0 448 200.533 448 448S759.467 960 512 960c-83.2 0-160-21.333-226.133-59.733l-153.6 42.666c-21.334 6.4-44.8-6.4-49.067-27.733-2.133-6.4-2.133-14.933 0-21.333l42.667-153.6C85.333 672 64 595.2 64 512 64 264.533 264.533 64 512 64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconChat.defaultProps = {
  size: 18,
};

export default IconChat;
