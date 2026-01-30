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

const IconCloseCircleFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-486.997334L391.338667 330.965333 330.965333 391.338667 451.669333 512l-120.704 120.661333 60.373334 60.373334L512 572.330667l120.661333 120.704 60.373334-60.373334L572.330667 512l120.704-120.661333-60.373334-60.373334L512 451.669333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconCloseCircleFill.defaultProps = {
  size: 18,
};

export default IconCloseCircleFill;
