/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Pin = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M912.92 400.92L615.96 103.96a32.012 32.012 0 0 0-53.662 14.873l-28.965 115.81-128 128-207.97 16.018c-27.257 2.096-39.496 35.206-20.162 54.54l186.05 186.05-213.333 213.334 41.497 41.497 213.333-213.334 164.718 164.718c19.334 19.334 52.419 7.07 54.54-20.163L640 597.333l128-128 125.806-13.97c26.697-2.974 38.083-35.474 19.114-54.443z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Pin.defaultProps = {
  size: 18,
};

export default Pin;
