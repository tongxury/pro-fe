/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Window = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1156 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M942.496 0h-728.23A215.152 215.152 0 0 0 0 213.42v597.122a215.152 215.152 0 0 0 214.267 213.42h728.229a215.152 215.152 0 0 0 214.266-213.42V213.42A215.152 215.152 0 0 0 942.496 0z m-728.23 85.122h728.23a129.03 129.03 0 0 1 128.798 128.298v85.122H86.7V213.42A127.952 127.952 0 0 1 214.267 85.122z m728.23 853.756h-728.23A129.03 129.03 0 0 1 85.469 810.58V383.663h984.595v426.879a126.99 126.99 0 0 1-127.567 128.413z"
        fill={getIconColor(color, 0, '#8A8A8A')}
      />
      <path
        d="M256.366 640.298a43.715 43.715 0 0 0-43.37 43.177v85.121a43.715 43.715 0 0 0 43.37 43.177 42.907 42.907 0 0 0 43.369-43.177v-85.121a42.907 42.907 0 0 0-43.37-43.177z m172.167 0a43.715 43.715 0 0 0-43.369 43.177v85.121a43.369 43.369 0 0 0 86.738 0v-85.121a44.6 44.6 0 0 0-43.407-43.177z m170.898 0a43.715 43.715 0 0 0-43.37 43.177v85.121a43.369 43.369 0 0 0 86.739 0v-85.121a42.907 42.907 0 0 0-43.37-43.177z"
        fill={getIconColor(color, 1, '#8A8A8A')}
      />
    </svg>
  );
};

Window.defaultProps = {
  size: 18,
};

export default Window;
