/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const RightLeft = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M200.96 242.475a42.667 42.667 0 0 0-60.288 60.33l178.432 178.432a42.667 42.667 0 0 1 0 60.331L140.501 720.171a42.667 42.667 0 1 0 60.331 60.33l208.64-208.64a85.333 85.333 0 0 0 0.043-120.661L201.003 242.475zM823.979 780.5a42.667 42.667 0 0 0 60.33-60.33L705.877 541.739a42.667 42.667 0 0 1 0-60.374l178.603-178.56a42.667 42.667 0 0 0-60.33-60.33l-208.64 208.64a85.333 85.333 0 0 0-0.086 120.661l208.555 208.725z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

RightLeft.defaultProps = {
  size: 18,
};

export default RightLeft;
