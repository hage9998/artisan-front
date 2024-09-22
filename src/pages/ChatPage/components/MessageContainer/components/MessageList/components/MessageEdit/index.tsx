import { CSSProperties, SetStateAction, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { SenderType } from "../../../../../../enums/senderType";
import messageService from "../../../../../../service/messageService";
import { Message } from "../../../../../../types/messages";

type MessageEditProps = {
  messageId: string;
  messageSender: SenderType;
  editingMessage: string | undefined;
  setEditingMessage: React.Dispatch<SetStateAction<string | undefined>>;
  messageContent: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
};

const MESSAGE_EDIT_STYLES: Record<string, CSSProperties> = {
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
    color: "#451e59",
  },
  inputConteiner: {
    display: "flex",
    alignItems: "center",
  },
  formContainer: {
    display: "flex",
  },
};

export const MessageEdit = ({
  messageId,
  messageSender,
  editingMessage,
  setEditingMessage,
  messages,
  setMessages,
  messageContent,
}: MessageEditProps) => {
  const [input, setInput] = useState<string>(messageContent);

  const handleOnEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await messageService.updateMessage(messageId, input);

    const editedMessages = messages.map((message) => {
      if (message.id === messageId) return { ...message, message: input };

      return message;
    });
    setMessages(editedMessages);
    setEditingMessage(undefined);
  };

  const isMessageBeenEdited = editingMessage && editingMessage === messageId;

  return (
    <>
      {isMessageBeenEdited && (
        <form onSubmit={handleOnEdit}>
          <div style={MESSAGE_EDIT_STYLES.formContainer}>
            <div style={MESSAGE_EDIT_STYLES.inputConteiner}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={MESSAGE_EDIT_STYLES.input}
              />
            </div>
            {messageSender === SenderType.USER && isMessageBeenEdited && (
              <button type="submit" style={MESSAGE_EDIT_STYLES.sendButton}>
                <FaCheck size={16} />
              </button>
            )}
            <button
              onClick={() => {
                setEditingMessage(undefined);
              }}
              type="button"
              style={MESSAGE_EDIT_STYLES.sendButton}
            >
              <MdClose size={24} />
            </button>
          </div>
        </form>
      )}
    </>
  );
};
