/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Zongjie = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 83.734582L147.384856 286.9758l364.615144 213.433255 364.615144-213.433255z m0-83.734582l512 285.476971-512 299.665886L0 285.476971z m447.950039 469.233411l64.049961 35.672132-512 299.665886L0 504.905543l64.049961-35.672132L512 731.428571z m0 219.428572l64.049961 35.672131-512 299.665886L0 724.334114l64.049961-35.672131 447.950039 262.19516z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Zongjie.defaultProps = {
  size: 18,
};

export default Zongjie;
