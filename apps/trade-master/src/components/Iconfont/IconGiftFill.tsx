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

const IconGiftFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M640 85.333333a170.666667 170.666667 0 0 1 147.797333 256.042667L981.333333 341.333333v85.333334h-85.333333v426.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V426.666667H42.666667V341.333333l193.536 0.042667A170.666667 170.666667 0 0 1 512 143.146667 169.941333 169.941333 0 0 1 640 85.333333z m-85.333333 341.333334h-85.333334v426.666666h85.333334V426.666667zM384 170.666667a85.333333 85.333333 0 0 0-6.4 170.453333L384 341.333333h85.333333V256a85.333333 85.333333 0 0 0-72.405333-84.352l-6.570667-0.768L384 170.666667z m256 0a85.333333 85.333333 0 0 0-85.12 78.933333L554.666667 256v85.333333h85.333333a85.333333 85.333333 0 0 0 85.12-78.933333L725.333333 256a85.333333 85.333333 0 0 0-85.333333-85.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconGiftFill.defaultProps = {
  size: 18,
};

export default IconGiftFill;
