/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Quanfuzadu = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M0 0h1024v1024H0z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M460.8 364.8l-51.2-51.2C371.2 275.2 320 256 262.4 256 134.4 256 32 358.4 32 486.4s102.4 230.4 230.4 230.4c51.2 0 102.4-19.2 140.8-51.2l281.6-288c25.6-19.2 51.2-32 83.2-32 76.8 0 140.8 64 140.8 140.8 0 76.8-64 140.8-140.8 140.8-25.6 0-57.6-6.4-76.8-25.6l-64 64c38.4 32 89.6 51.2 140.8 51.2 128 0 230.4-102.4 230.4-230.4S896 256 768 256c-57.6 0-108.8 19.2-147.2 57.6L339.2 601.6c-19.2 12.8-51.2 19.2-76.8 19.2-76.8 0-140.8-64-140.8-140.8 0-76.8 64-140.8 140.8-140.8 32 0 64 12.8 83.2 32l51.2 51.2 64-57.6z"
        fill={getIconColor(color, 1, '#444444')}
      />
      <path
        d="M588.8 716.8V563.2h153.6l-153.6 153.6z"
        fill={getIconColor(color, 2, '#444444')}
      />
    </svg>
  );
};

Quanfuzadu.defaultProps = {
  size: 18,
};

export default Quanfuzadu;
