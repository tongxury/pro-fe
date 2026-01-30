/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const JtUp = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M837.827548 546.67265933L561.377788 823.12241933c-12.496698 12.496698-12.496698 32.758136 0 45.25483401 12.497405 12.497405 32.758136 12.496698 45.254834-1e-8l331.014362-331.014362c12.496698-12.496698 12.497405-32.757429 0-45.254834l-339.143969-341.795619c-12.496698-12.496698-32.758136-12.496698-45.254834 0-12.496698 12.496698-12.496698 32.758136 0 45.254834l284.454209 287.10586L98.273758 482.70565833c-17.673427 0-32.000117 14.32669-32.000117 32.000118 0.000707 17.67272 14.327398 31.99941 32.000117 32.000117l739.553083-0.032527z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

JtUp.defaultProps = {
  size: 18,
};

export default JtUp;
