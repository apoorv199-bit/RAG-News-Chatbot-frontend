import ChatScreen from "./components/ChatScreen";
import "./styles/App.scss";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ChatProvider>
      <div className="app">
        <ChatScreen />
      </div>
    </ChatProvider>
  );
}

export default App;
