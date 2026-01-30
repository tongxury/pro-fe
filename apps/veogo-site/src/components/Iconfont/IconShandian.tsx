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

const IconShandian: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M527.34 837.67l239.92-359.88c9.42-14.14 5.6-33.25-8.55-42.67a30.702 30.702 0 0 0-17.05-5.16H553.02V203.4c0-16.99-13.77-30.77-30.76-30.77-10.29 0-19.89 5.14-25.6 13.7L256.74 546.21c-9.42 14.14-5.6 33.24 8.54 42.67a30.744 30.744 0 0 0 17.06 5.17h188.64V820.6c0 16.99 13.77 30.77 30.76 30.77 10.29 0 19.9-5.14 25.6-13.7z"
        fill={getIconColor(color, 0, '#2E3133')}
      />
    </svg>
  );
};
// @ts-ignore
IconShandian.defaultProps = {
  size: 18,
};

export default IconShandian;
