/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const SummarizeLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M235.827 929.792A184.832 184.832 0 0 1 51.2 745.165V235.878A184.832 184.832 0 0 1 235.827 51.2h552.346A184.832 184.832 0 0 1 972.8 235.827v509.287A184.832 184.832 0 0 1 788.173 929.74zM124.723 235.827v509.338a111.206 111.206 0 0 0 111.104 111.104h552.346a111.206 111.206 0 0 0 111.104-111.104V235.878a111.206 111.206 0 0 0-111.104-111.104H235.827a111.206 111.206 0 0 0-111.104 111.053z m148.48 408.371v-73.574h267.571v73.574z m0-194.56v-73.523h477.235v73.523z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

SummarizeLine.defaultProps = {
  size: 18,
};

export default SummarizeLine;
