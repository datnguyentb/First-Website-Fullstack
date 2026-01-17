// hooks/usePageTitle.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGE_TITLES, DEFAULT_TITLE } from '~/constants/pageTitles';

export const usePageTitle = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const title = PAGE_TITLES[pathname] || DEFAULT_TITLE;
        document.title = `Twirl | ${title}`;
    }, [pathname]);
};
