import { useEffect, useState } from 'react';
import { useMessageCacheContext } from '~/contexts';
import useGetMessages from '~/hooks/chat/useGetMessages';
import useReceiveMessage from '~/hooks/chat/useReceiveMessage';
import useJoinConversation from '~/socket/hook/conversation/useJoinConversation';
import useSendMessage from '~/socket/hook/messages/useSendMessange';

export default function useChatMessages(conversationInfo) {
    const [messages, setMessages] = useState([]);

    const { loading: loadingFetchMessage, fetchMessages } = useGetMessages();
    const { messageCache, setMessagesForConversation, addMessageToConversation } = useMessageCacheContext();

    const { sendMessage } = useSendMessage();
    const lastMessage = useReceiveMessage();

    // join socket room
    useJoinConversation(conversationInfo?._id);

    // load messages
    useEffect(() => {
        if (!conversationInfo?._id) return;

        const id = conversationInfo._id;

        // ✅ ưu tiên cache
        if (messageCache[id]) {
            setMessages(messageCache[id]);
            return;
        }

        const load = async () => {
            const msgs = await fetchMessages(id);
            setMessages(msgs);
            setMessagesForConversation(id, msgs);
        };

        load();
    }, [conversationInfo?._id]);

    // receive socket message
    useEffect(() => {
        if (!lastMessage) return;
        if (lastMessage.conversation !== conversationInfo?._id) return;

        setMessages((prev) => [lastMessage, ...prev]);
        addMessageToConversation(conversationInfo._id, lastMessage);
    }, [lastMessage]);

    const handleSendMessage = (content) => {
        if (!content?.trim()) return;

        sendMessage(conversationInfo._id, {
            content,
            attachments: [],
            replyTo: null,
        });
    };

    return {
        messages,
        loadingFetchMessage,
        handleSendMessage,
    };
}
