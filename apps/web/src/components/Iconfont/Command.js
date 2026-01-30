/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Command = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M106.666667 277.333333a170.666667 170.666667 0 1 1 341.333333 0v85.333334h128v-85.333334a170.666667 170.666667 0 1 1 170.666667 170.666667h-85.333334v128h85.333334a170.666667 170.666667 0 1 1-170.666667 170.666667v-85.333334h-128v85.333334a170.666667 170.666667 0 1 1-170.666667-170.666667h85.333334v-128h-85.333334a170.666667 170.666667 0 0 1-170.666666-170.666667z m256 85.333334v-85.333334a85.333333 85.333333 0 1 0-85.333334 85.333334h85.333334z m85.333333 85.333333v128h128v-128h-128z m-85.333333 213.333333h-85.333334a85.333333 85.333333 0 1 0 85.333334 85.333334v-85.333334z m298.666666 0v85.333334a85.333333 85.333333 0 1 0 85.333334-85.333334h-85.333334z m0-298.666666h85.333334a85.333333 85.333333 0 1 0-85.333334-85.333334v85.333334z"
        fill={getIconColor(color, 0, '#262C66')}
      />
    </svg>
  );
};

Command.defaultProps = {
  size: 18,
};

export default Command;
