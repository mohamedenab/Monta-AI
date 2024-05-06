import {useRef, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button } from "react-daisyui";
import { IChatMessageProps } from "../../types";
import { MessageRole } from "../../enums/MessageRole";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export const ChatMessage = ({ message, isLastIndex  }: IChatMessageProps & { isLastIndex : boolean  }) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const [, copy] = useCopyToClipboard();
    const [isHovered, setIsHovered] = useState(false);

    const isBot = message.role !== MessageRole.USER;

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div className={`mt-4 ${isLastIndex ? 'last-message' : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flex items-center">
                <Avatar shape="circle" className="mr-4 z-10">
                    <div className="bg-neutral text-neutral-content h-10 w-10">
                        {isBot ? (
                            <img alt="bot" src="/assets/images/logo.png"/>
                        ) : message.userInfo?.firstName && message.userInfo?.lastName ? (
                            <span>{`${message.userInfo.firstName.charAt(
                                0
                            )}${message.userInfo.lastName.charAt(0)}`}</span>
                        ) : (
                            <FontAwesomeIcon icon={faUser}/>
                        )}
                    </div>
                </Avatar>
                <h4 className="font-semibold select-none">{isBot ? "Monta" : "You"}</h4>
            </div>
            <div className="ml-16 mt-4">
                <div ref={messageRef}>{message.message}</div>
                {isBot && (isLastIndex || isHovered) && (
                    <div className="mt-4">
                        <Button size="sm" shape="square" color="ghost">
                            <FontAwesomeIcon
                                icon={faClipboard}
                                onClick={() => copy(messageRef?.current?.innerHTML || "")}
                            />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

