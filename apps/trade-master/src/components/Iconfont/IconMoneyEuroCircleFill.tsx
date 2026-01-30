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

const IconMoneyEuroCircleFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m-83.2-469.333334a106.666667 106.666667 0 0 1 173.397333-60.16l72.576-48.341333A192 192 0 0 0 342.528 469.333333H298.666667v85.333334h43.818666a192 192 0 0 0 332.288 108.501333l-72.576-48.384A106.666667 106.666667 0 0 1 428.8 554.666667l211.2 0.042666v-85.333333h-211.2z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconMoneyEuroCircleFill.defaultProps = {
  size: 18,
};

export default IconMoneyEuroCircleFill;
