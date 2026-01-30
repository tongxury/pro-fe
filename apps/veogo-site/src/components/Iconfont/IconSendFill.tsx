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

const IconSendFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M899.925333 172.080762a48.761905 48.761905 0 0 1 0 28.525714l-207.969523 679.448381a48.761905 48.761905 0 0 1-81.115429 20.187429l-150.552381-150.552381-96.304762 96.329143a24.380952 24.380952 0 0 1-41.593905-17.237334v-214.966857l275.821715-243.370667-355.57181 161.596953-103.253333-103.228953a48.761905 48.761905 0 0 1 20.23619-81.091047L838.997333 139.702857a48.761905 48.761905 0 0 1 60.903619 32.353524z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconSendFill.defaultProps = {
  size: 18,
};

export default IconSendFill;
