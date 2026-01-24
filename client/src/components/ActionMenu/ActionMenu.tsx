import classNames from 'classnames/bind';
import styles from './ActionMenu.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ActionItem from './components/ActionItem';

const cx = classNames.bind(styles);

function ActionMenu({ data = [] }) {
    // Quản lý lịch sử menu (mảng chứa các object data)
    const [history, setHistory] = useState([data]);
    const current = history[history.length - 1];
    const [currentTitle, setCurrentTitle] = useState('');

    const handleItemClick = (item) => {
        const isParent = !!item.children;

        if (isParent) {
            setHistory((prev) => [...prev, item.children]);
            setCurrentTitle(item.label);
        } else {
            item.handleClick && item.handleClick();
        }
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    return (
        <div className={cx('action-menu', 'wrapper')}>
            {/* Back Menu */}
            {history.length > 1 && (
                <div className={cx('header')} onClick={handleBack}>
                    <FontAwesomeIcon icon={faChevronLeft} className={cx('back-icon')} />
                    <span className={cx('header-title')}>{currentTitle}</span>
                </div>
            )}

            <div className={cx('menu-list', 'scrollbar')}>
                {current.map((item, index) => (
                    <div key={index}>
                        <ActionItem item={item} handleItemClick={handleItemClick} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActionMenu;
