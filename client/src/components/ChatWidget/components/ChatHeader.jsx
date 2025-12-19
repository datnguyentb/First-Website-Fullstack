import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import Img from '~/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function ChatHeader({ setIsOpenChatWidget, conversationInfo }) {
    return (
        <div className={cx('chat-header')}>
            {conversationInfo && (
                <div className={cx('chat-user-info')}>
                    <div className={cx('user-avatar')}>
                        <Img circle src={baseUrl(conversationInfo.avatar)} />
                        <div className={cx('online-indicator')}></div>
                    </div>
                    <div className={cx('chat-username')} title={conversationInfo.name}>
                        {conversationInfo.name}
                    </div>
                </div>
            )}
            <div className={cx('chat-actions')}>
                <button className={cx('chat-action-btn', 'call-audio')}>
                    <FontAwesomeIcon icon={faPhone} />
                </button>
                <button className={cx('chat-action-btn', 'call-video')}>
                    <FontAwesomeIcon icon={faVideo} />
                </button>
                <button className={cx('chat-action-btn', 'close')} onClick={() => setIsOpenChatWidget(false)}>
                    <FontAwesomeIcon icon={faClose} />
                </button>
            </div>
        </div>
    );
}

export default ChatHeader;
