import React from 'react';

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    fallback?: string;
    className?: string;
    circle?: boolean;
    shadow?: boolean;
    bordered?: boolean;
    darkOverlay?: boolean;
}
