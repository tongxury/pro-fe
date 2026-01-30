/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const A14Cjietu = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M703.23125 626.384375h75.065625V320.76875c0-20.259375-7.44375-37.828125-22.340625-52.725-14.896875-14.896875-32.465625-22.340625-52.725-22.340625H397.615625v75.065625h305.615625v305.615625z m-382.4625 76.846875V92h-75.065625v153.703125H92v75.065625h153.703125v382.471875c0 20.25 7.44375 37.828125 22.340625 52.725 14.896875 14.896875 32.465625 22.340625 52.725 22.340625h382.471875V932h75.065625V778.296875H932v-75.065625H320.76875z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

A14Cjietu.defaultProps = {
  size: 18,
};

export default A14Cjietu;
