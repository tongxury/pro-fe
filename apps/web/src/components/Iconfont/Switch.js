/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Switch = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M809.472 369.51L614.656 174.694l50.688-50.688L982.528 441.19H128v-71.68h681.472z m-750.95 213.3H921.6v71.68H231.578l194.816 194.816-50.688 50.688L58.522 582.81z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Switch.defaultProps = {
  size: 18,
};

export default Switch;
