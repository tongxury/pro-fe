/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Send = ({ size = 18, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path d="M913.963 241.877L774.016 801.664a150.57 150.57 0 0 1-148.053 115.627h-0.854a150.357 150.357 0 0 1-147.626-117.76l-36.694-155.734 229.547-229.546a42.667 42.667 0 1 0-60.587-60.587L380.203 583.211l-155.734-36.694a152.533 152.533 0 0 1-2.133-296.533l559.787-139.947a108.715 108.715 0 0 1 131.84 131.84z" fill={getIconColor(color, 0, '#707070')}/>
    </svg>
  );
};


export default Send;
