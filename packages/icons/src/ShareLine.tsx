/* eslint-disable */

import React from 'react';

const DEFAULT_STYLE = {
    display: 'block',
};

const ShareLine  = ({ size = 18, color = '#333333', style: _style, ...rest }) => {
const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

return (
    <svg viewBox="0 0 30 30" width={size + 'px'} height={size + 'px'} style={style} {...rest}  xmlns="http://www.w3.org/2000/svg">
        {/* replace me */}
    </svg>
    );
};


export default ShareLine;
