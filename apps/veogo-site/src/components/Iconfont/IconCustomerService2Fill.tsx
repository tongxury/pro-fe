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

const IconCustomerService2Fill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M896 341.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v170.666666a85.333333 85.333333 0 0 1-85.333333 85.333334h-45.312A341.376 341.376 0 0 1 512 981.333333v-85.333333a256 256 0 0 0 256-256V384A256 256 0 1 0 256 384v298.666667H128a85.333333 85.333333 0 0 1-85.333333-85.333334v-170.666666a85.333333 85.333333 0 0 1 85.333333-85.333334h45.312a341.376 341.376 0 0 1 677.376 0H896zM331.093333 673.493333l45.226667-72.362666A254.805333 254.805333 0 0 0 512 640a254.805333 254.805333 0 0 0 135.68-38.869333l45.226667 72.362666A339.754667 339.754667 0 0 1 512 725.333333a339.754667 339.754667 0 0 1-180.906667-51.84z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconCustomerService2Fill.defaultProps = {
  size: 18,
};

export default IconCustomerService2Fill;
