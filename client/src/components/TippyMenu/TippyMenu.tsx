import HeadlessTippy from '@tippyjs/react/headless';
import PopperWrapper from '../PopperWrapper';
import { TippyMenuProps } from './TippyMenu.types';

function TippyMenu({
    children,
    renderMenu,
    placement = 'bottom-start',
    offset = [0, 0],
    ...passProps
}: TippyMenuProps) {
    const props: any = {
        placement,
        offset,
        ...passProps,
    };
    return (
        <HeadlessTippy
            interactive
            placement={placement}
            offset={offset}
            render={(attrs) => (
                <div tabIndex={-1} {...attrs}>
                    <PopperWrapper>{renderMenu}</PopperWrapper>
                </div>
            )}
            {...props}
        >
            {children}
        </HeadlessTippy>
    );
}

export default TippyMenu;
