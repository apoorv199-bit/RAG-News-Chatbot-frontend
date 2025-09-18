import { useState, useRef, useEffect } from "react";
import { Send, RefreshCw, AlertCircle, Wifi, WifiOff } from "lucide-react";
import MessageBubble from "./MessageBubble";
import { useChat } from "../context/ChatContext";
import "../styles/ChatScreen.scss";

const ChatScreen = () => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    isLoading,
    isConnected,
    error,
    sendMessage,
    clearSession,
    resetSession,
  } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || !isConnected) return;

    const message = inputText.trim();
    setInputText("");
    await sendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAction = (action, confirmMessage) => {
    if (window.confirm(confirmMessage)) {
      action();
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-header">
        <div className="chat-title">
          <h1>RAG News Chatbot</h1>
          <div className="connection-status">
            {isConnected ? (
              <>
                <Wifi size={16} /> Connected
              </>
            ) : (
              <>
                <WifiOff size={16} /> Offline
              </>
            )}
          </div>
        </div>

        <div className="header-actions">
          <button
            className="action-button"
            onClick={() => handleAction(clearSession, "Clear chat history?")}
            disabled={isLoading || messages.length === 0}
          >
            Clear
          </button>
          <button
            className="action-button"
            onClick={() =>
              handleAction(
                resetSession,
                "Reset session? This will clear all messages."
              )
            }
            disabled={isLoading}
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="messages-container">
        <div className="message-list">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isConnected ? "Ask me about recent news..." : "Connecting..."
            }
            rows={1}
            disabled={isLoading || !isConnected}
            className="message-input"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading || !isConnected}
            className="send-button"
          >
            <Send size={20} />
          </button>
        </div>
        {isLoading && <div className="status-text">Thinking...</div>}
      </div>
    </div>
  );
};

export default ChatScreen;
