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

const IconSettingsFill: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M424.704 94.293333a426.24 426.24 0 0 1 174.549333-0.085333A170.368 170.368 0 0 0 682.666667 216.32a170.368 170.368 0 0 0 147.498666 11.136A426.24 426.24 0 0 1 917.333333 378.709333 170.368 170.368 0 0 0 853.333333 512a170.24 170.24 0 0 0 64.085334 133.290667 428.501333 428.501333 0 0 1-87.296 151.168 170.368 170.368 0 0 0-147.456 11.136 170.368 170.368 0 0 0-83.370667 122.026666 426.24 426.24 0 0 1-174.549333 0.170667A170.368 170.368 0 0 0 341.333333 807.552a170.368 170.368 0 0 0-147.498666-11.093333A426.24 426.24 0 0 1 106.666667 645.162667 170.368 170.368 0 0 0 170.666667 511.957333a170.368 170.368 0 0 0-64.085334-133.290666 428.501333 428.501333 0 0 1 87.296-151.168A170.368 170.368 0 0 0 341.333333 216.362667a170.368 170.368 0 0 0 83.370667-122.026667zM512 640a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconSettingsFill.defaultProps = {
  size: 18,
};

export default IconSettingsFill;
