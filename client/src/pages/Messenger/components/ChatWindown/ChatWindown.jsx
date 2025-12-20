import classNames from 'classnames/bind';
import styles from './ChatWindown.module.scss';
import { ChatInput, ChatWindownHeader, MessagesArea } from './components';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import useGetMessages from '~/hooks/chat/useGetMessages';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
import useGetConversationDetail from '~/hooks/conversation/useGetConversationDetail';
const cx = classNames.bind(styles);

function ChatWindown({ conversationId }) {
    const { messages, loading } = useGetMessages(conversationId);
    const { getDetail, loading: LoadingGetDetail } = useGetConversationDetail();

    //useState quản lý conversation
    const [conversationInfo, setConversationInfo] = useState({});

    useEffect(() => {
        const fetData = async () => {
            const result = await getDetail(conversationId);
            setConversationInfo(result?.data);
        };

        fetData();
    }, [conversationId]);

    useJoinConversation(conversationId);

    return (
        <>
            {!conversationId || !conversationInfo ? (
                <div className={cx('no-conversation-selected')}>
                    <FontAwesomeIcon icon={faCommentDots} />
                    <h2>No Conversation Selected</h2>
                </div>
            ) : (
                <div className={cx('wrapper')}>
                    <ChatWindownHeader conversationInfo={conversationInfo} />
                    <MessagesArea messages={messages} loadingData={loading} />
                    <ChatInput conversationId={conversationInfo?._id} />
                </div>
            )}
        </>
    );
}

export default ChatWindown;
