import { useEffect, useRef } from "react";
import { SenderType } from "../../../../enums/senderType";
import { Message } from "../../../../types/messages";
import { FaUser } from "react-icons/fa";

type MessageListProps = {
  messages: Message[];
  userId: string;
};

const MESSAGE_LIST_STYLES = {
  messageBubble: {
    maxWidth: "80%",
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
  },
  otherMessage: {
    backgroundColor: "#f0f0f0",
    color: "#333",
    alignSelf: "flex-start",
    borderRadius: "20px 20px 20px 0",
    gap: "5px",
  },
};

export const MessageList = ({ messages, userId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          <span>{msg.message}</span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};
