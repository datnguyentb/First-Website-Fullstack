import classNames from 'classnames/bind';
import styles from './MusicSearch.module.scss';
import Search from '~/components/Layouts/Header/components/Search';

const cx = classNames.bind(styles);

function MusicSearch() {
    return (
        <div className={cx('wrapper')}>
            <Search />
        </div>
    );
}

export default MusicSearch;
