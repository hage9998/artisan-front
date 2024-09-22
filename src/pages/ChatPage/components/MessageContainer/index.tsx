import { Message } from "../../types/messages";
import { MessageList } from "./components/MessageList";

type MessageContainerProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  userId: string;
};

const MESSAGE_CONTAINER_STYLES = {
  height: "400px",
  overflowY: "scroll",
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
} as const;

export const MessageContainer = ({
  messages,
  userId,
  setMessages,
}: MessageContainerProps) => {
  return (
    <div style={{ ...MESSAGE_CONTAINER_STYLES }}>
      <MessageList
        setMessages={setMessages}
        messages={messages}
        userId={userId}
      />
    </div>
  );
};
