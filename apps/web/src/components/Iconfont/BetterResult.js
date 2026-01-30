/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const BetterResult = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M128 832V576H0v320c0 70.72 57.28 128 128 128h320V896H192c-35.328 0-64-28.672-64-64z m448-64V576h192V448H576V256H448v192H256v128h192v192h128zM128 192c0-35.328 28.672-64 64-64h256V0H128C57.28 0 0 57.28 0 128v320h128V192z m768 640c0 35.328-28.672 64-64 64H576v128h320c70.72 0 128-57.28 128-128V576H896v256z m0-832H576v128h256c35.328 0 64 28.672 64 64v256h128V128c0-70.72-57.28-128-128-128z"
        fill={getIconColor(color, 0, '#1296DB')}
      />
    </svg>
  );
};

BetterResult.defaultProps = {
  size: 18,
};

export default BetterResult;
