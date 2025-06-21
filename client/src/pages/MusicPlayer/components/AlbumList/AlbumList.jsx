import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './AlbumList.module.scss';
import { Album } from '../../components';

const cx = classNames.bind(styles);

function AlbumList({ data, number, col }) {
    return (
        <div className={cx('wrapper', 'row', `row-cols-${col}`, 'gy-5', 'gx-5')}>
            {data.map((song, index) => {
                if (index < number) {
                    return (
                        <div key={index} className={cx('col')}>
                            <Album data={data} />
                        </div>
                    );
                }
            })}
        </div>
    );
}

AlbumList.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default AlbumList;
