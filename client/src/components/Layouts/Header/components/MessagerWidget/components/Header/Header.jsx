import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('chat-header')}>
            <div className={cx('header-top')}>
                <h2 className={cx('header-title')}>Đoạn chat</h2>
                <div className={cx('header-icons')}>
                    <i className="fas fa-ellipsis-h"></i>
                    <i className="fas fa-expand-alt"></i>
                    <i className="fas fa-edit"></i>
                </div>
            </div>
            <div className={cx('search-container')}>
                <i className="fas fa-search"></i>
                {/* Lưu ý: class là search-input, không phải class/className */}
                <input type="text" placeholder="Tìm kiếm trên Messenger" className={cx('search-input')} />
            </div>
        </div>
    );
}

export default Header;
