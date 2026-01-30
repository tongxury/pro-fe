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

const IconFunctionFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 128h341.333333v341.333333H128V128z m0 426.666667h341.333333v341.333333H128v-341.333333zM554.666667 128h341.333333v341.333333h-341.333333V128z m0 426.666667h341.333333v341.333333h-341.333333v-341.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconFunctionFill.defaultProps = {
  size: 18,
};

export default IconFunctionFill;
