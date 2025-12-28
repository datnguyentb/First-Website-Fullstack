import { PropsWithChildren } from 'react';
import './GlobalStyles.scss';

const GlobalStyles = ({ children }: PropsWithChildren) => {
    return <>{children}</>;
};

export default GlobalStyles;
