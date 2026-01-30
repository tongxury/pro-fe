/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Send1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M207.11034627 224.45370658l27.06448057 108.42362186a55.23363335 55.23363335 0 0 1-107.15324874 26.8435456l-55.23363206-220.93453212a55.23363335 55.23363335 0 0 1 76.9404498-63.518677l828.50449382 386.63542959a55.23363335 55.23363335 0 0 1 0 100.13857692l-828.50449382 386.63543087a55.23363335 55.23363335 0 0 1-76.49858117-65.17568727l110.46726543-386.63543088A55.23363335 55.23363335 0 0 1 235.83183582 456.76636665h220.93453083a55.23363335 55.23363335 0 0 1 0 110.4672667H277.47799419l-65.72802276 230.15854839L823.24152195 512 207.11034627 224.45370658z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Send1.defaultProps = {
  size: 18,
};

export default Send1;
