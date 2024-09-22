import {
  CSSProperties,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaUser } from "react-icons/fa";
import { SenderType } from "../../../../enums/senderType";
import { Message } from "../../../../types/messages";
import { MessageEdit } from "./components/MessageEdit";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import messageService from "../../../../service/messageService";

type MessageListProps = {
  messages: Message[];
  userId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const MESSAGE_LIST_STYLES: Record<string, CSSProperties> = {
  messageBubble: {
    maxWidth: "60%",
    padding: "10px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
  },
  myMessage: {
    backgroundColor: "#e0b3ff",
    color: "#4a0072",
    alignSelf: "flex-end",
    borderRadius: "20px 20px 0 20px",
    overflowWrap: "anywhere",
  },
  otherMessage: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    alignSelf: "flex-start",
    borderRadius: "20px 20px 20px 0",
    gap: "5px",
  },
};

export const MessageList = ({ messages, setMessages }: MessageListProps) => {
  const [editingMessage, setEditingMessage] = useState<string>();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setEditingMessage(undefined);
  }, [messages]);

  const handleOnDelete = async (messageId: string) => {
    await messageService.deleteMessage(messageId);
    const filteredMessages = messages.filter(
      (message) => message.id !== messageId
    );

    setMessages(filteredMessages);
  };

  return (
    <>
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            ...MESSAGE_LIST_STYLES.messageBubble,
            ...(msg.sender === SenderType.USER
              ? MESSAGE_LIST_STYLES.myMessage
              : MESSAGE_LIST_STYLES.otherMessage),
          }}
        >
          {msg.sender !== SenderType.USER && <FaUser />}
          {!editingMessage && msg.id !== editingMessage && (
            <span>{msg.message}</span>
          )}
          {msg.sender === SenderType.USER && !editingMessage && (
            <MdModeEdit
              style={{ minWidth: "20px", cursor: "pointer" }}
              onClick={() => {
                setEditingMessage(msg.id);
              }}
            />
          )}
          <MessageEdit
            messageId={msg.id}
            messageSender={msg.sender}
            editingMessage={editingMessage}
            setEditingMessage={setEditingMessage}
            messageContent={msg.message}
            setMessages={setMessages}
            messages={messages}
          />
          {msg.sender === SenderType.USER && !editingMessage && (
            <MdDelete
              style={{ cursor: "pointer" }}
              onClick={() => handleOnDelete(msg.id)}
            />
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};
