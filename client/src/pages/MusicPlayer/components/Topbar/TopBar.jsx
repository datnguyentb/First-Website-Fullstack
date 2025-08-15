import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './TopBar.module.scss';

import { Song } from '../../components';

const cx = classNames.bind(styles);

function TopBar({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-bar-song-list', 'row', 'gx-4', 'gy-3')}>
                {data.map((song, index) => {
                    if (index < 3) {
                        return (
                            <div key={index} className={cx('item', 'col-4')}>
                                {/* <Song shadow second_style data={song} /> */}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

TopBar.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default TopBar;
