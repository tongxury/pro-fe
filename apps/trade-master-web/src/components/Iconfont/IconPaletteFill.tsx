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

const IconPaletteFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 85.333333c235.605333 0 426.666667 169.728 426.666667 379.264a237.141333 237.141333 0 0 1-237.056 237.013334h-83.882667c-39.338667 0-71.125333 31.786667-71.125333 71.125333 0 18.005333 7.125333 34.602667 18.005333 46.933333 11.392 12.8 18.517333 29.397333 18.517333 47.872C583.125333 906.922667 550.4 938.666667 512 938.666667 276.394667 938.666667 85.333333 747.605333 85.333333 512S276.394667 85.333333 512 85.333333zM320 512a64 64 0 1 0 0-128 64 64 0 0 0 0 128z m384 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128zM512 384a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconPaletteFill.defaultProps = {
  size: 18,
};

export default IconPaletteFill;
