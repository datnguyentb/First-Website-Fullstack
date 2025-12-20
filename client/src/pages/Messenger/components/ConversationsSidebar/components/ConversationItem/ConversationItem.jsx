import classNames from 'classnames/bind';
import styles from './ConversationItem.module.scss';
import { Img } from '~/components';
import useIsMe from '~/helper/useIsMe';
import baseUrl from '~/helper/baseUrl';

const cx = classNames.bind(styles);

function ConversationItem({ data, active = false, setConversationsSelected, setConversationActive }) {
    const isMe = useIsMe();

    const classes = cx('wrapper', { active });

    const handleClick = () => {
        setConversationsSelected(data);
        setConversationActive(data._id);
    };

    return (
        <div className={classes} onClick={handleClick}>
            <div className={cx('avatar')}>
                <Img src={baseUrl(data.avatar)} />
            </div>

            <div className={cx('info')}>
                <div className={cx('name')}>{data.name}</div>

                <div
                    className={cx('last-message')}
                >{`${isMe(data.lastMessage?.sender._id) ? 'You: ' : ''}${data.lastMessage?.content || 'No messages yet'}`}</div>
            </div>

            <div className={cx('timestamp')}>
                {data.lastMessage?.createdAt ? new Date(data.lastMessage.createdAt).toLocaleTimeString() : ''}
            </div>
        </div>
    );
}

export default ConversationItem;
