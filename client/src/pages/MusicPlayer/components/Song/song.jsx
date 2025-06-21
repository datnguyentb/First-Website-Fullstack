import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Song.module.scss';
import Img from '~/components/Img';
import { faEllipsis, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Song({ data, active = false, shadow, onClick, second_style, ...passProps }) {
    const props = {
        onClick,
        ...passProps,
    };
    const classes = cx('wrapper', 'd-flex', {
        active,
        second_style,
        shadow,
    });
    return (
        <div onClick={() => onClick(data.id)} className={classes} {...props}>
            <div className={cx('d-flex')}>
                <div className={cx('song-img')}>
                    <Img src={data.thumbnail} />
                    <div className={cx('hover-cover')}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
                <div className={cx('song-info', 'ms-3')}>
                    {second_style && <div className={cx('status')}>Nghe gần đây</div>}
                    <div className={cx('song-name')}>{data.title}</div>
                    <div className={cx('song-arti')}>{data.artist}</div>
                </div>
            </div>
            {!second_style && (
                <div className={cx('option', 'd-flex', 'ms-3')}>
                    <div className={cx('option-icon', 'like')}>
                        {data.isFavorite ? (
                            <FontAwesomeIcon icon={faHeart} />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className={cx('bi', 'bi-heart', 'liked')}
                                viewBox="0 0 16 16"
                            >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                        )}
                    </div>
                    <div className={cx('option-icon', 'more', 'ms-4')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Song;
