/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Memo = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M172 176c0-48.6 39.4-88 88-88h504c48.6 0 88 39.4 88 88v671.06c0 65.096-68.224 107.66-126.692 79.04l-209.792-102.696a7.984 7.984 0 0 0-7.032 0l-209.792 102.696C240.224 954.72 172 912.156 172 847.06V176z m318 481.852c8.072 19.872 36.18 19.976 44.4 0.164l48.688-117.332a24 24 0 0 1 11.468-12.288l110.744-55.136c17.656-8.792 17.76-33.94 0.184-42.88l-111.104-56.492a24.008 24.008 0 0 1-11.26-12.12L534.368 245.4c-8.26-19.716-36.228-19.612-44.34 0.164l-47.6 116.04a24 24 0 0 1-11.408 12.328l-112.012 56.412c-17.688 8.908-17.58 34.2 0.184 42.96l111.648 55.06a24 24 0 0 1 11.62 12.488l47.54 117.004z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Memo.defaultProps = {
  size: 18,
};

export default Memo;
