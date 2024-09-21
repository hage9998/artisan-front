import { FaUser } from "react-icons/fa";

const MESSAGE_HEADER_STYLES = {
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    justifyContent: "center",
    gap: "5px",
  },
  title: {
    fontSize: "24px",
    margin: 0,
  },
};

export const MessageHeader = () => {
  return (
    <div style={MESSAGE_HEADER_STYLES.header}>
      <FaUser />
      <h2 style={MESSAGE_HEADER_STYLES.title}>Chat Bot</h2>
    </div>
  );
};
