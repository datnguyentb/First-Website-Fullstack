import { useContext } from 'react';
import { MessageCacheContext } from '../MessageCacheContext';
import { MessageCacheContextType } from '../MessageCacheContextType';

export const useMessageCacheContext = (): MessageCacheContextType => {
    const context = useContext(MessageCacheContext);

    if (!context) {
        throw new Error('useMessageCacheContext must be used within MessageCacheProvider');
    }

    return context;
};
