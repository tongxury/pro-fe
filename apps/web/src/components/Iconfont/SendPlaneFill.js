/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const SendPlaneFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M83.03 397.44c-22.273-7.424-22.486-19.413 0.426-27.05L897.835 98.943c22.57-7.51 35.498 5.12 29.184 27.221L694.315 940.501c-6.4 22.571-19.414 23.339-28.971 1.92L512 597.333 768 256 426.667 512 83.029 397.44z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

SendPlaneFill.defaultProps = {
  size: 18,
};

export default SendPlaneFill;
