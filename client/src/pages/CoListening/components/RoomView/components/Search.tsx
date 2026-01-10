import classNames from 'classnames/bind';
import styles from '../RoomView.module.scss';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <h2 className={cx('search-title')}>Danh sách Bài hát & Tìm kiếm</h2>
            <input type="text" placeholder="Tìm kiếm bài hát để thêm vào playlist..." className={cx('search-input')} />
        </div>
    );
}

export default Search;
