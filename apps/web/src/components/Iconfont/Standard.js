/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Standard = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M434.907429 577.462857H284.16a28.086857 28.086857 0 0 1-26.331429-38.034286l149.942858-393.362285a28.086857 28.086857 0 0 1 26.185142-18.066286H686.811429c19.968 0 33.499429 20.187429 26.038857 38.692571L625.590857 380.854857h164.205714c24.137143 0 37.083429 28.452571 21.138286 46.592L408.137143 886.272c-19.529143 22.308571-55.808 2.998857-48.274286-25.673143l74.971429-283.062857z"
        fill={getIconColor(color, 0, '#00C514')}
      />
    </svg>
  );
};

Standard.defaultProps = {
  size: 18,
};

export default Standard;
