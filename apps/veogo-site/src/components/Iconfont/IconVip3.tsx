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

const IconVip3: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 2457 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M1092.3008 0l-519.168 922.0096c-43.6224 67.8912-83.6608 101.9904-120.2176 101.9904s-68.3008-34.5088-94.9248-103.2192L0 0.2048h291.2256l209.7152 570.6752L809.984 0h282.3168z m364.032 0L1228.8 1023.8976H1001.2672L1228.6976 0h227.6352z m692.224 0c97.28 0 177.8688 43.1104 235.9296 108.8512 60.1088 69.632 83.2512 159.9488 69.0176 271.36-13.9264 111.7184-60.0064 201.9328-137.9328 271.5648-69.4272 61.1328-193.7408 57.856-289.3824 57.1392h-376.1152l-71.0656 314.88h-213.7088l142.4384-551.2192h569.4464c30.4128 0 90.3168 12.288 113.8688-8.9088 23.8592-22.3232 38.7072-52.4288 41.7792-84.7872 4.4032-34.816-2.2528-62.7712-20.6848-83.0464-18.0224-20.48-33.4848-59.392-63.5904-59.392h-640.8192L1721.4464 0h427.1104z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};
// @ts-ignore
IconVip3.defaultProps = {
  size: 18,
};

export default IconVip3;
