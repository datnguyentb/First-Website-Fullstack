import classNames from 'classnames/bind';
import styles from './SuggestedList.module.scss';
import { Song } from '../../components';

const cx = classNames.bind(styles);

function SuggestedList({ data }) {
    return (
        <div className={cx('wrapper', 'row', 'gy-3', 'gx-3')}>
            {data.map((song, index) => {
                if (index < 9) {
                    return (
                        <div key={index} className="col-4">
                            <Song shadow data={song} />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default SuggestedList;
