import { TippyProps } from '@tippyjs/react/headless';
import React from 'react';

export interface TippyMenuProps extends Omit<TippyProps, 'children' | 'render'> {
    children: React.ReactElement;
    renderMenu: React.ReactNode;
    placement?: TippyProps['placement'];
    offset?: [number, number];
}
