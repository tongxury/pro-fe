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

const IconGroupLine: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M85.333 938.667a341.333 341.333 0 1 1 682.667 0h-85.333a256 256 0 1 0-512 0H85.333z m341.334-384c-141.44 0-256-114.56-256-256s114.56-256 256-256 256 114.56 256 256-114.56 256-256 256z m0-85.334c94.293 0 170.666-76.373 170.666-170.666S520.96 128 426.667 128 256 204.373 256 298.667s76.373 170.666 170.667 170.666z m353.45 157.995a341.419 341.419 0 0 1 201.216 311.339H896a256.043 256.043 0 0 0-150.912-233.515l34.987-77.824z m-29.354-481.707A234.667 234.667 0 0 1 896 362.667a234.624 234.624 0 0 1-213.333 233.728v-85.888a149.333 149.333 0 0 0 44.416-281.984l23.68-82.902z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconGroupLine.defaultProps = {
  size: 18,
};

export default IconGroupLine;
