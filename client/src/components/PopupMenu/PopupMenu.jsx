// components/PopupMenu.jsx
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PopupMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PopupMenu({ items = [], visible }) {
    const [menu, setMenu] = useState([items]);

    const handleOnclickToChildren = (children) => {
        if (!children || !Array.isArray(children)) return;
        setMenu((prevMenu) => [...prevMenu, children]);
    };

    const handleItemClick = (e, item) => {
        e.preventDefault();

        if (typeof item.onClick === 'function') {
            item.onClick(e);
            return;
        }

        if (item.children) {
            handleOnclickToChildren(item.children);
        }
    };

    const handleGoBack = () => {
        setMenu((prev) => prev.slice(0, -1));
    };

    useEffect(() => {
        if (!visible) {
            setMenu([items]);
        }
    }, [visible, items]);

    const currentMenu = menu[menu.length - 1] || [];

    return (
        <div className={cx('wrapper')}>
            <ul>
                {menu.length > 1 && (
                    <>
                        <li className={cx('back')} onClick={handleGoBack}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </li>
                    </>
                )}
                {currentMenu.map((item, index) => {
                    const key = item.id ?? item._id ?? `${item.title ?? 'item'}-${index}`;

                    return (
                        <li
                            className={cx('item', item.no_click && 'disable')}
                            key={key}
                            onClick={(e) => handleItemClick(e, item)}
                        >
                            <div className={cx('title')}>
                                <div className={cx('me-3')}>{item.icon}</div>
                                <span>{item.title}</span>
                            </div>
                            {item.children && <FontAwesomeIcon className={cx('more')} icon={faChevronRight} />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default PopupMenu;
