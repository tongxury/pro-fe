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

const IconAccountCircleFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 85.333333c235.52 0 426.666667 191.146667 426.666667 426.666667s-191.146667 426.666667-426.666667 426.666667S85.333333 747.52 85.333333 512 276.48 85.333333 512 85.333333zM256.981333 657.749333C319.616 751.189333 413.653333 810.666667 518.826667 810.666667c105.130667 0 199.210667-59.434667 261.802666-152.917334A382.634667 382.634667 0 0 0 518.826667 554.666667a382.634667 382.634667 0 0 0-261.845334 103.082666zM512 469.333333a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconAccountCircleFill.defaultProps = {
  size: 18,
};

export default IconAccountCircleFill;
