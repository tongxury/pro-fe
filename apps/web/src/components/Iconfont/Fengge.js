/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Fengge = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M852 884H572a32 32 0 0 1-32-32V572a32 32 0 0 1 32-32h280a32 32 0 0 1 32 32v280a32 32 0 0 1-32 32z m-248-64h216V604H604zM477.89 884H146.11a16 16 0 0 1-14.31-23.16l165.89-331.77a16 16 0 0 1 28.62 0L492.2 860.84A16 16 0 0 1 477.89 884z m-254.11-64h176.44L312 643.55zM712 484c-94.84 0-172-77.16-172-172s77.16-172 172-172 172 77.16 172 172-77.16 172-172 172z m0-280a108 108 0 1 0 108 108 108.12 108.12 0 0 0-108-108zM484 484H140V140h344z m-280-64h216V204H204z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Fengge.defaultProps = {
  size: 18,
};

export default Fengge;
