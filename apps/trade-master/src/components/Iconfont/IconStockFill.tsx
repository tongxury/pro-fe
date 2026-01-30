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

const IconStockFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M341.333333 213.333333h128v384H341.333333v128H256v-128H128V213.333333h128V85.333333h85.333333v128z m426.666667 213.333334h128v384h-128v128h-85.333333v-128h-128v-384h128V298.666667h85.333333v128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconStockFill.defaultProps = {
  size: 18,
};

export default IconStockFill;
