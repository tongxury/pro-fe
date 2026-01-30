/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Gaixieyuqi = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 85.35A426.65 426.65 0 1 0 938.65 512 427.93 427.93 0 0 0 512 85.35z m0 781.056A354.406 354.406 0 1 1 866.406 512 355.43 355.43 0 0 1 512 866.406z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M584.294 444.57a54.22 54.22 0 1 0 54.221-54.221 54.22 54.22 0 0 0-54.22 54.22z m-253.03 0a54.22 54.22 0 1 0 54.22-54.221 54.22 54.22 0 0 0-54.22 54.22z m283.75 139.11A143.36 143.36 0 0 1 512 625.357a146.432 146.432 0 0 1-103.014-41.677 35.84 35.84 0 0 0-50.586 50.688 218.163 218.163 0 0 0 307.2 0 35.84 35.84 0 0 0-50.637-50.586z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

Gaixieyuqi.defaultProps = {
  size: 18,
};

export default Gaixieyuqi;
