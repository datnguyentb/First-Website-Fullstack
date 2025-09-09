// components/PopupMenu.jsx
import classNames from 'classnames/bind';
import styles from './PopupMenu.module.scss';

const cx = classNames.bind(styles);

function PopupMenu({ items = [] }) {
    return (
        <div className={cx('wrapper')}>
            <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={item.onClick}>
                        <div className={cx('me-3')}>{item.icon}</div>
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PopupMenu;
