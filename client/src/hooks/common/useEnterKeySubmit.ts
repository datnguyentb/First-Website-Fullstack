import { useEffect, RefObject } from 'react';

/**
 * Custom hook giúp tự động kích hoạt sự kiện click của một nút khi nhấn phím Enter
 * @param buttonRef - Ref của nút bấm cần kích hoạt
 */
export const useEnterKeySubmit = (buttonRef: RefObject<HTMLButtonElement | HTMLElement | null>): void => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (buttonRef.current) {
                    buttonRef.current.click();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [buttonRef]);
};
