/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const RightEnd = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M213.333 793.6l302.934-302.933-302.934-302.934L273.067 128l362.666 362.667-362.666 362.666-59.734-59.733zM742.4 128h85.333v725.333H742.4V128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

RightEnd.defaultProps = {
  size: 18,
};

export default RightEnd;
