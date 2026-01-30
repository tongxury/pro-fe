/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Edit = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M934.4 981.312H89.6a46.08 46.08 0 0 1-46.912-46.848V156.672A46.08 46.08 0 0 1 89.6 109.824h367.616a46.08 46.08 0 0 1 46.976 46.848 46.08 46.08 0 0 1-46.976 46.848h-320.64v684.16h750.912V515.904a46.08 46.08 0 0 1 46.912-46.848 46.08 46.08 0 0 1 46.912 46.848v418.56a47.04 47.04 0 0 1-46.912 46.848z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M330.496 739.2a42.624 42.624 0 0 1-32.832-14.016 44.928 44.928 0 0 1-14.08-32.768V504.96c0-12.48 4.672-24.96 14.08-32.768L713.792 56.704a42.624 42.624 0 0 1 32.896-14.08c12.48 0 24.96 4.736 32.832 14.08L967.232 244.16c18.816 18.752 18.816 48.384 0 65.6L551.104 725.12a45.056 45.056 0 0 1-32.832 14.08H330.496z m46.976-215.488v120.32H497.92l369.216-367.104-120.448-121.792-369.28 368.576z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

Edit.defaultProps = {
  size: 18,
};

export default Edit;
