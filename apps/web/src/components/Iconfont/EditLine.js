/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const EditLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M273.664 682.667L706.389 249.94l-60.33-60.33-432.726 432.725v60.33h60.331zM309.034 768H128V586.965L615.893 99.072a42.667 42.667 0 0 1 60.331 0l120.704 120.704a42.667 42.667 0 0 1 0 60.33L309.035 768zM128 853.333h768v85.334H128v-85.334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

EditLine.defaultProps = {
  size: 18,
};

export default EditLine;
