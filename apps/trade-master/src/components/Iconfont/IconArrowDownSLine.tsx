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

const IconArrowDownSLine: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 562.005333l211.2-211.2 60.330667 60.330667L512 682.666667 240.469333 411.136 300.8 350.805333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconArrowDownSLine.defaultProps = {
  size: 18,
};

export default IconArrowDownSLine;
