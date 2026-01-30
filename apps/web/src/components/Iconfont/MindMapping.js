/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const MindMapping = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M106.666667 213.333333a85.333333 85.333333 0 1 1 128 73.92V469.333333h64a42.666667 42.666667 0 1 1 0 85.333334h-64v213.333333h64a42.666667 42.666667 0 1 1 0 85.333333H192a42.666667 42.666667 0 0 1-42.666667-42.666666V287.253333A85.290667 85.290667 0 0 1 106.666667 213.333333z m810.666666 0a42.666667 42.666667 0 0 1-42.666666 42.666667H469.333333a42.666667 42.666667 0 1 1 0-85.333333h405.333334a42.666667 42.666667 0 0 1 42.666666 42.666666z m0 298.666667a42.666667 42.666667 0 0 1-42.666666 42.666667H469.333333a42.666667 42.666667 0 1 1 0-85.333334h405.333334a42.666667 42.666667 0 0 1 42.666666 42.666667z m0 298.666667a42.666667 42.666667 0 0 1-42.666666 42.666666H469.333333a42.666667 42.666667 0 1 1 0-85.333333h405.333334a42.666667 42.666667 0 0 1 42.666666 42.666667z"
        fill={getIconColor(color, 0, '#262C66')}
      />
    </svg>
  );
};

MindMapping.defaultProps = {
  size: 18,
};

export default MindMapping;
