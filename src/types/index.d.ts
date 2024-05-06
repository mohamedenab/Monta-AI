import {RefObject} from "react";

/** defining data types **/

export type User = {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
};

export type Message = {
    id: string;
    role: MessageRole;
    message: string;
    userInfo?: User;
};
export type Conversation = {
    messages: Array<Message> | [],
    title: string;
    id: number
}
export type Conversations = Array<Conversation>;

/** defining component interfaces **/

export interface IChatUIProps {
    isQuerying: boolean;
    onSubmit: (value) => void;
    disabled: boolean;
    conversation: Conversation;
}

export interface IChatInputProps {
    disabled: boolean;
    onSubmit: (value) => void;
}

export interface IChatConversationsProps {
    conversations: Conversation;
    isQuerying: boolean;
    chatConversationsContainerRef: RefObject<HTMLDivElement>;
}

export interface IChatMessageProps {
    message: Message;
}
