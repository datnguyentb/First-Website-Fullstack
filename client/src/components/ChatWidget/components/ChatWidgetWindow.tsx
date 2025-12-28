import classNames from 'classnames/bind';
import styles from '../ChatWidget.module.scss';
import { ChatHeader, ChatMessages, ChatInput, NoChatSelected } from '.';
import useGetMessages from '~/hooks/chat/useGetMessages';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
import useGetConversationDetail from '~/hooks/conversation/useGetConversationDetail';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import { ChatWidgetProps } from '../ChatWidgetTypes';
import { ConversationInfo } from '@/types/conversation';

const cx = classNames.bind(styles);

const ChatWidgetWindow: React.FC<ChatWidgetProps> = ({ setIsOpenChatWidget, conversationId }) => {
    const { messages, loading } = useGetMessages(conversationId);
    const { getDetail, loading: LoadingGetDetail } = useGetConversationDetail();

    //useState quản lý conversation
    const [conversationInfo, setConversationInfo] = useState<ConversationInfo | null>(null);

    useEffect(() => {
        const fetData = async () => {
            const result = await getDetail(conversationId);
            setConversationInfo(result.data);
        };

        fetData();
    }, [conversationId]);

    useJoinConversation(conversationId);

    if (!conversationId) return <NoChatSelected onClose={setIsOpenChatWidget} />;
    if (LoadingGetDetail) return <Loading />;

    return (
        <div className={cx('chat-window-inner')}>
            <ChatHeader conversationInfo={conversationInfo} setIsOpenChatWidget={setIsOpenChatWidget} />

            <ChatMessages messages={messages} loadingData={loading} />

            <ChatInput conversationId={conversationInfo?._id} />
        </div>
    );
};

export default ChatWidgetWindow;
