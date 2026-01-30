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

const IconEditLine: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M273.664 682.666667L706.389333 249.941333l-60.330666-60.330666L213.333333 622.336V682.666667h60.330667z m35.370667 85.333333H128v-181.034667L615.893333 99.072a42.666667 42.666667 0 0 1 60.330667 0l120.704 120.704a42.666667 42.666667 0 0 1 0 60.330667L309.034667 768zM128 853.333333h768v85.333334H128v-85.333334z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconEditLine.defaultProps = {
  size: 18,
};

export default IconEditLine;
