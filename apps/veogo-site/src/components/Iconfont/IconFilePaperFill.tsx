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

const IconFilePaperFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 640V128a42.666667 42.666667 0 0 1 42.666667-42.666667h682.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v682.666667a128 128 0 0 1-128 128H170.666667a128 128 0 0 1-128-128v-85.333334h682.666666v85.333334a42.666667 42.666667 0 0 0 85.333334 0v-170.666667H128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconFilePaperFill.defaultProps = {
  size: 18,
};

export default IconFilePaperFill;
