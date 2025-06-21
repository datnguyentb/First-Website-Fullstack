import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Album.module.scss';
import { Img } from '~/components';

const cx = classNames.bind(styles);

function Album({ data }) {
    // Shuffle ngẫu nhiên và lấy 4 phần tử đầu tiên
    const randomSongs = [...data].sort(() => 0.5 - Math.random()).slice(0, 4);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('album-img', 'row', 'gx-0', 'gy-0')}>
                {randomSongs.map((song, index) => (
                    <div key={index} className={cx('img-part', 'col-6')}>
                        <Img src={song.thumbnail} />
                    </div>
                ))}
            </div>
            <h3 className={cx('title', 'mt-2')}>V-Pop nhẹ nhàng như những tia nắng mỏng manh của ngày nè</h3>
        </div>
    );
}

Album.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Album;
