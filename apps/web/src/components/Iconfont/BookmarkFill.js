/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const BookmarkFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M213.333 85.333h597.334A42.667 42.667 0 0 1 853.333 128v816.768a21.333 21.333 0 0 1-32.682 18.09L512 769.28 203.35 962.816a21.333 21.333 0 0 1-32.683-18.048V128a42.667 42.667 0 0 1 42.666-42.667z m128 298.667v85.333h341.334V384H341.333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

BookmarkFill.defaultProps = {
  size: 18,
};

export default BookmarkFill;
