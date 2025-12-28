// src/constants/menu.ts
import { AdminMenuItem } from '../types/adminNavigation';

export const ADMIN_MENU: AdminMenuItem[] = [
    { id: 1, title: 'Dashboard', to: '/admin/dashboard' },
    { id: 2, title: 'Users', to: '/admin/users' },
    { id: 3, title: 'Posts', to: '/admin/posts' },
    { id: 4, title: 'Music Manage', to: '/admin/music' },
    { id: 5, title: 'Settings', to: '/admin/setting' },
];
