import { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/apiService";

const ChatContext = createContext();

const generateMessageId = () =>
  `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export function ChatProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeSession();
  }, []);

  const checkConnection = async () => {
    try {
      await apiService.healthCheck();
      setIsConnected(true);
      return true;
    } catch (error) {
      console.error("Backend connection failed:", error);
      setIsConnected(false);
      setError("Cannot connect to server. Please try again later.");
      return false;
    }
  };

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      const connected = await checkConnection();
      if (!connected) return;

      const response = await apiService.createSession();
      setSessionId(response.sessionId);

      const welcomeMessage = {
        id: generateMessageId(),
        role: "bot",
        message:
          "Hello! I'm your news chatbot. Ask me anything about recent news and current events.",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error("Failed to initialize session:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (id, updates) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  };

  const removeMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const simulateTyping = async (text) => {
    const botMessageId = generateMessageId();

    const cleanedText = text
      .replace(/\*\*\*/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "•")
      .replace(/•([^•]+):/g, "\n• $1:")
      .replace(/•([^•]+)/g, "\n• $1")
      .trim();

    addMessage({
      id: botMessageId,
      role: "bot",
      message: "",
      timestamp: new Date().toISOString(),
    });

    // Simulate typing
    for (let i = 1; i <= cleanedText.length; i++) {
      updateMessage(botMessageId, { message: cleanedText.substring(0, i) });
      if (i < cleanedText.length) {
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
    }
  };

  const sendMessage = async (query) => {
    if (!query.trim() || !sessionId || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      addMessage({
        id: generateMessageId(),
        role: "user",
        message: query.trim(),
        timestamp: new Date().toISOString(),
      });

      const typingId = `typing_${Date.now()}`;
      addMessage({
        id: typingId,
        role: "bot",
        message: "",
        timestamp: new Date().toISOString(),
        isTyping: true,
      });

      const response = await apiService.sendMessage(sessionId, query);

      removeMessage(typingId);
      await simulateTyping(response.answer);
    } catch (error) {
      console.error("Failed to send message:", error);
      removeMessage(`typing_${Date.now()}`);

      addMessage({
        id: generateMessageId(),
        role: "bot",
        message: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
      });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSession = async () => {
    if (!sessionId) return;

    try {
      setIsLoading(true);
      await apiService.clearSession(sessionId);

      const welcomeMessage = {
        id: generateMessageId(),
        role: "bot",
        message: "Session cleared! How can I help you today?",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error("Failed to clear session:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSession = async () => {
    if (sessionId) {
      try {
        await apiService.destroySession(sessionId);
      } catch (error) {
        console.warn("Failed to destroy previous session:", error);
      }
    }

    setSessionId(null);
    setMessages([]);
    setError(null);
    await initializeSession();
  };

  const value = {
    sessionId,
    messages,
    isLoading,
    isConnected,
    error,
    sendMessage,
    clearSession,
    resetSession,
    checkConnection,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
