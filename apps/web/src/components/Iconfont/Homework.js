/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Homework = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M832 64H704c0-35.328-28.672-64-64-64H384c-35.328 0-64 28.672-64 64H192c-70.72 0-128 57.28-128 128v704c0 70.72 57.28 128 128 128h640c70.72 0 128-57.28 128-128V192c0-70.72-57.28-128-128-128zM320 768c-35.328 0-64-28.672-64-64s28.672-64 64-64h386c35.328 0 64 28.672 64 64s-28.672 64-64 64H320z m384-256H320c-35.328 0-64-28.672-64-64s28.672-64 64-64h384c35.328 0 64 28.672 64 64s-28.672 64-64 64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Homework.defaultProps = {
  size: 18,
};

export default Homework;
