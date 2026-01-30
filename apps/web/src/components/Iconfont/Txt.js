/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Txt = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M967.111 281.6v628.622c0 62.862-50.915 113.778-113.778 113.778H170.667c-62.863 0-113.778-50.916-113.778-113.778V113.778C56.889 50.916 107.804 0 170.667 0H685.51l281.6 281.6z"
        fill={getIconColor(color, 0, '#6D9FE5')}
      />
      <path
        d="M685.511 167.822V0l281.6 281.6H799.29c-62.862 0-113.778-50.916-113.778-113.778"
        fill={getIconColor(color, 1, '#4B80CB')}
      />
      <path
        d="M344.178 485.575h312.889v-58.908h-312.89zM471.154 770.02h58.908V485.575h-58.908z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

Txt.defaultProps = {
  size: 18,
};

export default Txt;
