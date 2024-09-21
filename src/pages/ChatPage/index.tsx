import React, { useEffect, useState } from "react";
import { MessageContainer } from "./components/MessageContainer";
import { MessageHeader } from "./components/MessageHeader";
import { MessageInput } from "./components/MessageInput";
import { Message } from "./types/messages";
import messageService from "./service/messageService";

type ChatProps = {
  userId: string;
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
};

const ChatPage: React.FC<ChatProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    messageService
      .getAllMessagesByUserId(userId)
      .then((messages) => setMessages(messages));
  }, [userId]);

  return (
    <div style={styles.container}>
      <MessageHeader />
      <MessageContainer messages={messages} userId={userId} />
      <MessageInput setMessages={setMessages} userId={userId} />
    </div>
  );
};

export default ChatPage;
