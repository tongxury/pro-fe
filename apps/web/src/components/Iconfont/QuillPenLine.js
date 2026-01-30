/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const QuillPenLine = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M296.107 598.87c-9.942 26.623-18.347 51.2-25.856 76.074 40.96-29.739 89.642-48.597 145.834-55.637 107.222-13.398 202.496-84.182 250.71-173.142l-62.123-62.08 60.288-60.373 42.667-42.71c18.346-18.346 39.04-52.223 60.928-101.034C529.92 216.96 383.787 363.093 296.064 598.869z m429.226-214.827L768 426.667c-42.667 128-170.667 256-341.333 277.333-113.878 14.25-185.003 92.459-213.419 234.667H128c42.667-256 128-853.334 768-853.334-42.667 127.872-85.248 213.163-127.872 255.872l-42.795 42.838z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

QuillPenLine.defaultProps = {
  size: 18,
};

export default QuillPenLine;
