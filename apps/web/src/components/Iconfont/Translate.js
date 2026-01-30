/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Translate = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M549.12 642.987L440.747 535.893l1.28-1.28A747.52 747.52 0 0 0 600.32 256h125.013v-85.333H426.667V85.333h-85.334v85.334H42.667V256h476.586C490.667 337.92 445.44 416 384 484.267c-39.68-43.947-72.533-92.16-98.56-142.934h-85.333c31.146 69.547 73.813 135.254 127.146 194.56L110.08 750.08l60.587 60.587L384 597.333l132.693 132.694 32.427-87.04m240.213-216.32H704l-192 512h85.333l47.787-128h202.667l48.213 128h85.333l-192-512M677.547 725.333l69.12-184.746 69.12 184.746h-138.24z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Translate.defaultProps = {
  size: 18,
};

export default Translate;
