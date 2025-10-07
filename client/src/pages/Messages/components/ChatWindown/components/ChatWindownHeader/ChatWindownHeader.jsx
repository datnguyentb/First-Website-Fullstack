import classNames from 'classnames/bind';
import styles from './ChatWindownHeader.module.scss';
import { Img } from '~/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ChatWindownHeader() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('avatar')}>
                    <Img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Pby8ldddH3g0oh3pBr21TtVUiLd-_ZIiow&s" />
                </div>
                <div className={cx('user-status')}>
                    <div className={cx('name')}>Nguyễn Tiến Đạt</div>
                    <div className={cx('status')}>Online</div>
                </div>
            </div>
            <div className={cx('actions')}>
                <button className={cx('action-btn')} title="call">
                    <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className={cx('action-btn')} title="video call">
                    <FontAwesomeIcon icon={faVideo} />
                </button>
                <button className={cx('action-btn')} title="info">
                    <FontAwesomeIcon icon={faInfo} />
                </button>
            </div>
        </div>
    );
}

export default ChatWindownHeader;
