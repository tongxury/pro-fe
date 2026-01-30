/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Full = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M496.042667 128a40.021333 40.021333 0 0 0 0 80.042667h199.936c66.304 0 119.978667 53.76 119.978666 119.978666v200.021334a40.021333 40.021333 0 1 0 80.042667 0V328.021333A200.021333 200.021333 0 0 0 695.978667 128H495.957333z m32 768a40.021333 40.021333 0 0 0 0-80.042667H328.021333c-66.304 0-119.978667-53.76-119.978666-119.978666V495.957333a40.021333 40.021333 0 0 0-80.042667 0v200.021334A200.021333 200.021333 0 0 0 328.021333 896h200.021334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Full.defaultProps = {
  size: 18,
};

export default Full;
