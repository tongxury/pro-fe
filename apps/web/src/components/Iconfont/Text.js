/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Text = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M736 128H288c-52.9 0-96 43.1-96 96v576c0 52.9 43.1 96 96 96h448c52.9 0 96-43.1 96-96V224c0-52.9-43.1-96-96-96z m32 672c0 17.6-14.4 32-32 32H288c-17.6 0-32-14.4-32-32V224c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v576z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M672 320H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h320c17.7 0 32-14.3 32-32s-14.3-32-32-32z m0 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h320c17.7 0 32-14.3 32-32s-14.3-32-32-32z m0 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h320c17.7 0 32-14.3 32-32s-14.3-32-32-32z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

Text.defaultProps = {
  size: 18,
};

export default Text;
