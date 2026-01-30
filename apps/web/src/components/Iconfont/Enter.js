/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Enter = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M900.181 385.792v-192a39.979 39.979 0 1 0-80 0v192a221.099 221.099 0 0 1-65.194 157.44 221.184 221.184 0 0 1-157.398 65.152H258.22l112.384-112.299a40.107 40.107 0 0 0-28.288-68.266 39.808 39.808 0 0 0-28.331 11.69L135.509 617.984a40.021 40.021 0 0 0 0 56.619L319.19 858.41a39.979 39.979 0 1 0 56.619-56.619L262.4 688.384h335.19a300.587 300.587 0 0 0 214.015-88.576 300.16 300.16 0 0 0 88.576-214.016z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Enter.defaultProps = {
  size: 18,
};

export default Enter;
