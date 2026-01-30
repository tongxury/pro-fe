/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Search = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M963.01713423 889.48736l-176.05720534-175.53938963A410.10972445 410.10972445 0 0 0 874.47071645 460.21846873a414.25224651 414.25224651 0 1 0-414.25224772 414.25224772 410.10972445 410.10972445 0 0 0 253.72950164-87.51078756l175.53938963 176.05720534a51.78153127 51.78153127 0 0 0 73.52977423 0 51.78153127 51.78153127 0 0 0 0-73.52977423zM149.52928355 460.21846873a310.68918518 310.68918518 0 1 1 310.68918518 310.68918519 310.68918518 310.68918518 0 0 1-310.68918518-310.68918519z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Search.defaultProps = {
  size: 18,
};

export default Search;
