/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Search1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M675.349333 252.970667c-116.650667-116.650667-305.749333-116.650667-422.4 0-116.629333 116.629333-116.629333 305.728 0 422.378666 116.650667 116.629333 305.749333 116.629333 422.4 0 116.629333-116.650667 116.629333-305.749333 0-422.4zM192.618667 192.618667C342.613333 42.666667 585.728 42.666667 735.68 192.64c139.754667 139.776 149.269333 360.469333 28.522667 511.232l122.325333 122.346667a42.666667 42.666667 0 1 1-60.330667 60.330666l-122.346666-122.325333c-150.762667 120.746667-371.477333 111.253333-511.232-28.522667C42.666667 585.706667 42.666667 342.613333 192.64 192.64z"
        fill={getIconColor(color, 0, '#262C66')}
      />
    </svg>
  );
};

Search1.defaultProps = {
  size: 18,
};

export default Search1;
