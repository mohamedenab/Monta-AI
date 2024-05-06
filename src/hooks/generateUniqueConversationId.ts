import {Conversations} from "../types";

export  const generateUniqueConversationId = (chatConversations:Conversations): number => {
    let newId = Math.floor(Math.random() * 100) + 2; // Generate a random ID
    while (chatConversations.some(conversation => conversation.id === newId)) {
        newId = Math.floor(Math.random() * 100) + 2; // Generate a new ID
    }
    return newId;
};
