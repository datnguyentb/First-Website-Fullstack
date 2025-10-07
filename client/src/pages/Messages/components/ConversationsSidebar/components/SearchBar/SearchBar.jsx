import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
const cx = classNames.bind(styles);

function SearchBar() {
    return (
        <div className={cx('wrapper')}>
            <input className={cx('input')} placeholder="Search messages" />
        </div>
    );
}

export default SearchBar;
