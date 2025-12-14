import classNames from 'classnames/bind';
import styles from './ConversationItem.module.scss';
import { Img } from '~/components';
import useIsMe from '~/helper/useIsMe';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function ConversationItem({ data, active = false, setConversationsSelected, setConversationActive }) {
    const isMe = useIsMe();

    const otherUser = data.participants.find((user) => !isMe(user._id));

    const classes = cx('wrapper', { active });

    const handleClick = () => {
        setConversationsSelected(data);
        setConversationActive(data._id);
    };

    return (
        <div className={classes} onClick={handleClick}>
            <div className={cx('avatar')}>
                <Img src={baseUrl(otherUser?.avatarUrl)} />
            </div>

            <div className={cx('info')}>
                <div className={cx('name')}>
                    {otherUser ? `${otherUser.firstName} ${otherUser.lastName}` : 'Unknown'}
                </div>

                <div className={cx('last-message')}>{data.lastMessage?.content || 'Chưa có tin nhắn'}</div>
            </div>

            <div className={cx('timestamp')}>
                {data.lastMessage?.createdAt ? new Date(data.lastMessage.createdAt).toLocaleTimeString() : ''}
            </div>
        </div>
    );
}

export default ConversationItem;
