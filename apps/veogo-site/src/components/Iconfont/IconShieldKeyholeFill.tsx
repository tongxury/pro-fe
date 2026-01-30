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

const IconShieldKeyholeFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 42.666667l350.592 77.909333a42.666667 42.666667 0 0 1 33.408 41.642667v426.112a256 256 0 0 1-114.005333 212.992L512 981.333333l-269.994667-180.010666A256 256 0 0 1 128 588.373333V162.218667a42.666667 42.666667 0 0 1 33.408-41.642667L512 42.666667z m0 256a85.333333 85.333333 0 0 0-42.666667 159.232V640h85.333334l0.042666-182.101333A85.333333 85.333333 0 0 0 512 298.666667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconShieldKeyholeFill.defaultProps = {
  size: 18,
};

export default IconShieldKeyholeFill;
