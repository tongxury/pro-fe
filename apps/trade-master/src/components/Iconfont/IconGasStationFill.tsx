/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconGasStationFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 810.666667V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667h384a42.666667 42.666667 0 0 1 42.666666 42.666667v341.333333h85.333334a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a42.666667 42.666667 0 0 0 85.333333 0v-298.666667h-85.333333a42.666667 42.666667 0 0 1-42.666667-42.666666V273.664l-70.698666-70.698667 60.330666-60.330666 211.2 211.2A42.538667 42.538667 0 0 1 938.666667 384v384a128 128 0 0 1-256 0v-170.666667h-85.333334v213.333334h42.666667v85.333333H85.333333v-85.333333h42.666667zM213.333333 213.333333v256h298.666667V213.333333H213.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconGasStationFill.defaultProps = {
  size: 18,
};

export default IconGasStationFill;
