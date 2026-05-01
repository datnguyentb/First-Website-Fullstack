import classNames from 'classnames/bind';
import styles from './ChatWidgetWindow.module.scss';
import useGetMessages from '~/hooks/chat/useGetMessages';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
import useGetConversationDetail from '~/hooks/conversation/useGetConversationDetail';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import { ChatWidgetProps } from '../../ChatWidgetTypes';
import { ConversationInfo } from '@/types/conversation';
import NoChatSelected from './NoChatSelected';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const cx = classNames.bind(styles);

const ChatWidgetWindow: React.FC<ChatWidgetProps> = ({ setIsOpenChatWidget, conversationId }) => {
    const { messages, loading } = useGetMessages(conversationId);
    const { getDetail, loading: LoadingGetDetail } = useGetConversationDetail();

    //useState quản lý conversation
    const [conversationInfo, setConversationInfo] = useState<ConversationInfo | null>(null);

    useEffect(() => {
        const fetData = async () => {
            const result = await getDetail(conversationId);
            if (result?.success) {
                setConversationInfo(result.data);
            } else {
                setConversationInfo({});
            }
        };

        fetData();
    }, [conversationId]);

    useJoinConversation(conversationId);

    if (!conversationId)
        return (
            <div className={cx('chat-window-inner')}>
                <NoChatSelected onClose={setIsOpenChatWidget} />
            </div>
        );
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
