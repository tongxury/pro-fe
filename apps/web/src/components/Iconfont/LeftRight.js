/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const LeftRight = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M688.47 780.501a42.667 42.667 0 0 0 60.33 0l208.512-208.725a85.333 85.333 0 0 0 0-120.661l-208.64-208.64a42.667 42.667 0 1 0-60.373 60.33L866.9 481.365a42.667 42.667 0 0 1 0 60.374L688.47 720.17a42.667 42.667 0 0 0 0 60.33zM336.511 242.432a42.667 42.667 0 0 0-60.33 0L67.626 451.2a85.333 85.333 0 0 0 0 120.619l208.682 208.64a42.667 42.667 0 0 0 60.331-60.246L158.08 541.611a42.667 42.667 0 0 1 0-60.331l178.432-178.432a42.667 42.667 0 0 0 0-60.373z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

LeftRight.defaultProps = {
  size: 18,
};

export default LeftRight;
