import React, { useCallback, useEffect, useState } from "react";
import { MessageRole } from "./enums/MessageRole";
import { Conversations, Message, User } from "./types";
import { ChatUI } from "./components";
import { ChatHistory } from "./components/chat-history/ChatHistory";
import { Navabr } from "./components/Navabr";
import { generateUniqueConversationId } from "./hooks/generateUniqueConversationId";
import { convertNumberToWords } from "./hooks/convertNumberToWords";

const TEST_USER_INFO: User = { firstName: "Mohamed", lastName: "Enab" };

const App: React.FC = () => {
    const [isQuerying, setIsQuerying] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>();
    const [visible, setVisible] = useState<boolean>(false);
    const [chatConversations, setChatConversations] = useState<Conversations>([]);

    useEffect(() => {
        const storedConversationsString = localStorage.getItem("chatConversations");
        if (storedConversationsString) {
            setChatConversations(JSON.parse(storedConversationsString));
            setCurrentId(JSON.parse(storedConversationsString)[0].id);
        } else {
            const defaultConversationId = Math.floor(Math.random() * 100) + 2;
            const defaultConversation: Conversations = [{
                id: defaultConversationId,
                title: "First Conversation",
                messages: [{
                    id: "1",
                    role: MessageRole.ASSISTANT,
                    message: "How can I help you today?",
                }]
            }];
            setChatConversations(defaultConversation);
            setCurrentId(defaultConversationId);
            localStorage.setItem("chatConversations", JSON.stringify(defaultConversation));
        }
    }, []);

    const setNewMessage = useCallback((conversations: Conversations, role: MessageRole, message: string, userInfo?: User): Conversations => {
        return conversations.map((conversation) => {
            if (currentId !== conversation.id) {
                return conversation;
            }
            const newMessage: Message = {
                id: (conversation.messages.length + (role === MessageRole.ASSISTANT ? 2 : 1)).toString(),
                role: role,
                message: message,
                ...(userInfo && { userInfo: userInfo })
            };
            const updatedMessages = [...conversation.messages, newMessage];
            const updatedConversations = { ...conversation, messages: updatedMessages };
            localStorage.setItem("chatConversations", JSON.stringify(updatedConversations));
            return updatedConversations;
        });
    }, [currentId]);

    const handleSubmit = useCallback((value: string) => {
        setIsQuerying(true);
        setChatConversations((conversations) => {
            return setNewMessage(conversations, MessageRole.USER, value, TEST_USER_INFO);
        });

        setTimeout(() => {
            setChatConversations((conversations) => {
                return setNewMessage(conversations, MessageRole.ASSISTANT, "This is a mocked sample chat bot assistant response");
            });
            setIsQuerying(false);
        }, 1000);
    }, [setNewMessage]);

    const createNewConversation = () => {
        const newConversationId = generateUniqueConversationId(chatConversations);
        const title = convertNumberToWords(chatConversations.length + 1);

        setChatConversations((conversations) => [
            {
                id: newConversationId,
                title: title + ' Conversation',
                messages: [],
            },
            ...conversations,
        ]);
        setCurrentId(newConversationId);
    };

    const currentConversation = chatConversations.find((conversation) => conversation.id === currentId);

    return (
        <div className="flex flex-col lg:flex-row">
            <Navabr visible={visible} toggleVisible={() => setVisible(!visible)} />
            <ChatHistory
                currentId={currentId ?? 0}
                visible={visible}
                toggleVisible={() => setVisible(!visible)}
                createNewConversation={createNewConversation}
                selectConversation={setCurrentId}
                conversations={chatConversations}
            />
            <ChatUI
                isQuerying={isQuerying}
                onSubmit={handleSubmit}
                disabled={isQuerying}
                conversation={currentConversation!}
            />
        </div>
    );
}

export default App;
