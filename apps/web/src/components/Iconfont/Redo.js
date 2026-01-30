/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Redo = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M936.74 411.867H686.812a25.015 25.015 0 0 1-25.014-24.941v-14.483a24.503 24.503 0 0 1 7.533-17.993l88.942-88.941a346.405 346.405 0 0 0-246.418-103.424 349.842 349.842 0 1 0 349.915 373.248c0.732-13.24 11.703-23.552 24.942-23.552h50.03a26.039 26.039 0 0 1 17.993 8.045c4.535 4.974 6.948 11.703 6.436 18.432a449.755 449.755 0 0 1-869.449 133.56 449.61 449.61 0 0 1 175.982-537.381 449.902 449.902 0 0 1 562.468 59.611l74.46-74.46a24.503 24.503 0 0 1 17.554-7.46h14.482a25.015 25.015 0 0 1 24.942 24.942v249.856a25.015 25.015 0 0 1-24.942 24.941z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Redo.defaultProps = {
  size: 18,
};

export default Redo;
