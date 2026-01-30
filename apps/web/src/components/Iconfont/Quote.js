/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Quote = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M788.288 458.635c-3.442 99.843-20.062 175.852-49.92 228.09-29.828 52.205-76.307 91.5-139.437 117.916l75.743 120.5c104.443-47.073 180.75-116.493 228.949-208.292 36.745-68.858 55.085-180.186 55.085-333.957V98.859H626.474v359.776h161.814z m-533.64 0c-3.443 99.843-20.063 175.852-49.922 228.09-29.827 52.205-76.306 91.5-139.435 117.916l75.743 120.5c104.442-47.073 180.748-116.494 228.948-208.292 36.745-68.858 55.086-180.186 55.086-333.957V98.859H92.833v359.776h161.814z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Quote.defaultProps = {
  size: 18,
};

export default Quote;
