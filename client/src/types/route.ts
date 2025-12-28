import { ComponentType, ReactNode } from 'react';

export interface AppRoute {
    path?: string;
    component: ComponentType<any>;
    layout?: ComponentType<any>;
    index?: boolean;
    children?: AppRoute[];
}
