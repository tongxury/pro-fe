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

const IconArrowUpSLine: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 461.994667l-211.2 211.2-60.330667-60.330667L512 341.333333l271.530667 271.530667-60.330667 60.330667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconArrowUpSLine.defaultProps = {
  size: 18,
};

export default IconArrowUpSLine;
