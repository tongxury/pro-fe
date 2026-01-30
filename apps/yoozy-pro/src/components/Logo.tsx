import React from 'react';
import logoImg from '@/assets/icon.png';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: number | string;
}

const Logo: React.FC<LogoProps> = ({ size = 60, style, className, ...props }) => {
    return (
        <img
            src={logoImg}
            width={size}
            height={size}
            alt="Logo"
            className={className}
            style={{
                borderRadius: typeof size === 'number' ? (size as number) * 0.25 : '15px',
                objectFit: 'contain',
                ...style
            }}
            {...props}
        />
    );
};

export default Logo;
