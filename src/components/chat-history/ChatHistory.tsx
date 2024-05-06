import {Drawer, Menu} from "react-daisyui";
import {Conversations} from "../../types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {Navabr} from "../Navabr.tsx";

export const ChatHistory = ({
                                currentId, conversations, createNewConversation, selectConversation, visible,
                                toggleVisible
                            }: {
    currentId: number,
    visible: boolean,
    toggleVisible: () => void,
    conversations: Conversations,
    createNewConversation: () => void,
    selectConversation: (value: number) => void
}) => {
    const baseClass = "lg:text-base text-lg";
    return <Drawer open={visible} onClickOverlay={toggleVisible} className="basis-1/5 lg:!block pr-20 lg:drawer-open"
                   sideClassName={'z-50 !w-full'}
                   contentClassName={'lg:hidden'}
                   side={<Menu className="p-4 w-full min-h-full bg-base-200 text-base-content gap-1">
                       <Menu.Item className={`${baseClass} + 'mb-5 lg:hidden'`}>
                           <Navabr visible={visible}
                                   toggleVisible={toggleVisible}
                           />
                       </Menu.Item>
                       <Menu.Item className={`${baseClass}`}>
                           <p className="flex gap-3" onClick={createNewConversation}><FontAwesomeIcon
                               icon={faPenToSquare}/> New Chat</p>
                       </Menu.Item>
                       {conversations.map((chatEntry) => (
                           <Menu.Item className={`${baseClass}`} onClick={() => selectConversation(chatEntry.id)}>
                               <p className={currentId === chatEntry.id ? "active" : ''}>{chatEntry.title}</p>
                           </Menu.Item>
                       ))}

                   </Menu>}>
    </Drawer>
};
