import { User, Bot } from "lucide-react";
import "../styles/MessageBubble.scss";
import TypingIndicator from "./TypingIndicator";

const MessageBubble = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatText = (text) => {
    if (!text) return "";

    return text
      .split("\n")
      .map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        return (
          <div
            key={index}
            className={trimmed.startsWith("• ") ? "bullet-point" : "text-line"}
          >
            {trimmed}
          </div>
        );
      })
      .filter(Boolean);
  };

  return (
    <div className={`message-bubble ${message.role}`}>
      <div className="message-avatar">
        {message.role === "user" ? <User size={18} /> : <Bot size={18} />}
      </div>

      <div className="message-content">
        <div className="message-text">
          {message.isTyping ? <TypingIndicator /> : formatText(message.message)}
        </div>
        {!message.isTyping && (
          <div className="message-time">{formatTime(message.timestamp)}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
