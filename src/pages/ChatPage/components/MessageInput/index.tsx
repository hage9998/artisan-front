import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { Message } from "../../types/messages";

type MessageInputProps = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  userId: string;
};

const styles = {
  form: {
    borderTop: "1px solid #ccc",
    paddingTop: "10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
    borderRadius: "8px",
  },
  sendButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "10px",
  },
};

const INPUT_PLACEHOLDER = "Your question";

export const MessageInput = ({ setMessages, userId }: MessageInputProps) => {
  const [input, setInput] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input && socketRef.current) {
      const message = input;
      socketRef.current.send(message);
      setInput("");
    }
  };

  useEffect(() => {
    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/messages/ws/chat/${userId}`
    );

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [setMessages, userId]);

  return (
    <form onSubmit={sendMessage} style={styles.form}>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={INPUT_PLACEHOLDER}
          style={styles.input}
        />
        <button type="submit" style={styles.sendButton}>
          <FiSend size={24} />
        </button>
      </div>
    </form>
  );
};
