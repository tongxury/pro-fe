/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Summarize = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M352 64H160a96.107 96.107 0 0 0-96 96v192a96.107 96.107 0 0 0 96 96h192a96.107 96.107 0 0 0 96-96V160a96.107 96.107 0 0 0-96-96z m32 288a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32z m-32 224H160a96.107 96.107 0 0 0-96 96v192a96.107 96.107 0 0 0 96 96h192a96.107 96.107 0 0 0 96-96V672a96.107 96.107 0 0 0-96-96z m32 288a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V672a32 32 0 0 1 32-32h192a32 32 0 0 1 32 32z m160-704h384a32 32 0 0 0 0-64H544a32 32 0 0 0 0 64z m384 192H544a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64z m0 256H544a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64z m0 256H544a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Summarize.defaultProps = {
  size: 18,
};

export default Summarize;
