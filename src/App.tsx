import {useEffect, useState, useCallback} from "react";
import {MessageRole} from "./enums/MessageRole";
import {Conversations} from "./types";
import {ChatUI} from "./components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMailReply} from "@fortawesome/free-solid-svg-icons";
import {ChatHistory} from "./components/chat-history/ChatHistory.tsx";
import {Navabr} from "./components/Navabr.tsx";

const TEST_USER_INFO = {firstName: "Mohamed", lastName: "Enab"};

function App() {
    const storedConversationsString = localStorage.getItem("chatConversations");
    const storedConversations = storedConversationsString ? JSON.parse(storedConversationsString) : [];
    const [isQuerying, setIsQuerying] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>();
    const [visible, setVisible] = useState(false);
    const toggleVisible = useCallback(() => {
        setVisible(visible => !visible);
    }, []);
    const [chatConversations, setChatConversations] = useState<Conversations>(
        storedConversations.length > 0 ? storedConversations : []
    );

    useEffect(() => {
        const storedConversationsString = localStorage.getItem("chatConversations");
        console.log(storedConversationsString);
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

    const handleSubmit = useCallback(
        (value: string) => {
            setIsQuerying(true);
            setChatConversations((conversations) => {
                const updatedConversations = conversations.map((conversation) => {
                    if (currentId === conversation.id) {
                        const updatedMessages = [
                            ...conversation.messages,
                            {
                                userInfo: TEST_USER_INFO,
                                id: (conversation.messages.length + 1).toString(),
                                role: MessageRole.USER,
                                message: value,
                            },
                        ];
                        return {
                            ...conversation,
                            messages: updatedMessages,
                        };
                    }
                    return conversation;
                });
                localStorage.setItem("chatConversations", JSON.stringify(updatedConversations));
                return updatedConversations;
            });

            setTimeout(() => {
                setChatConversations((conversations) => {
                    const updatedConversations = conversations.map((conversation) => {
                        if (currentId === conversation.id) {
                            // Add the assistant message after the timeout
                            const updatedMessages = [
                                ...conversation.messages,
                                {
                                    id: (conversation.messages.length + 2).toString(),
                                    role: MessageRole.ASSISTANT,
                                    message: "This is a mocked sample chat bot assistant response",
                                },
                            ];
                            return {
                                ...conversation,
                                messages: updatedMessages,
                            };
                        }
                        return conversation;
                    });
                    localStorage.setItem("chatConversations", JSON.stringify(updatedConversations));
                    setIsQuerying(false);
                    return updatedConversations;
                });
            }, 1000);
        },
        [currentId]
    );
    const createNewConversation = () => {
        const newConversationId = generateUniqueConversationId();
        const title = convertNumberToWords(chatConversations.length + 1);

        setChatConversations((conversations) => [
            {
                id: newConversationId,
                title: title,
                messages: [],
            },
            ...conversations,
        ]);
        setCurrentId(newConversationId);
    };
    const generateUniqueConversationId = (): number => {
        let newId = Math.floor(Math.random() * 100) + 2; // Generate a random ID
        while (chatConversations.some(conversation => conversation.id === newId)) {
            newId = Math.floor(Math.random() * 100) + 2; // Generate a new ID
        }
        return newId;
    };
    const convertNumberToWords = (num: number): string => {
        const ordinalNumbers = ["", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth"];
        const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        const teens = ["", "Eleventh", "Twelfth", "Thirteenth", "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", "Nineteenth"];

        if (num === 0) return "Zero";
        if (num < 10) return ordinalNumbers[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) return tens[Math.floor(num / 10)] + " " + ordinalNumbers[num % 10];
        if (num < 1000) return ordinalNumbers[Math.floor(num / 100)] + " Hundred " + convertNumberToWords(num % 100);
        return "";
    };

    const currentConversation = chatConversations.find((conversation) => conversation.id === currentId);

    return (
        <div className="flex flex-col lg:flex-row">
            <Navabr visible={visible}
                    toggleVisible={toggleVisible}
            />
            <ChatHistory
                currentId={currentId ?? 0}
                visible={visible}
                toggleVisible={toggleVisible}
                newConversation={createNewConversation}
                selectConversation={setCurrentId}
                conversations={chatConversations}/>
            <ChatUI
                isQuerying={isQuerying}
                onSubmit={handleSubmit}
                placeholder="Type here to interact with this demo"
                disabled={isQuerying}
                conversation={currentConversation!}
                customSubmitIcon={<FontAwesomeIcon icon={faMailReply}/>}
            />
        </div>
    );
}

export default App;
