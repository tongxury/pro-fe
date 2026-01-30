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

const IconDeleteBin6Line: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M298.666667 170.666667V85.333333h426.666666v85.333334h213.333334v85.333333h-85.333334v640a42.666667 42.666667 0 0 1-42.666666 42.666667H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V256H85.333333V170.666667h213.333334zM256 256v597.333333h512V256H256z m128 128h85.333333v341.333333H384V384z m170.666667 0h85.333333v341.333333h-85.333333V384z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconDeleteBin6Line.defaultProps = {
  size: 18,
};

export default IconDeleteBin6Line;
