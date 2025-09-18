# News Chatbot Frontend

A modern React-based frontend for the RAG-powered news chatbot. Features a clean, responsive interface with real-time typing animations and session management.

## 🚀 Features

- **Modern Chat UI**: Clean, WhatsApp-style chat interface with message bubbles
- **Typing Animation**: Realistic typing effect for bot responses
- **Session Management**: Create, clear, and reset chat sessions
- **Real-time Status**: Connection status indicator and error handling
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Auto-scroll**: Messages automatically scroll to keep latest visible
- **Keyboard Support**: Send messages with Enter key

## 🛠 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: SCSS with modern CSS features
- **Icons**: Lucide React (lightweight icon library)
- **State Management**: React Context API
- **API Communication**: Fetch API with error handling

## ⚡ Quick Start

### Prerequisites

- Node.js 16+ installed
- Backend server running on port 8186

### Installation

```bash
# Clone and install
git clone <your-repo>
cd news-chatbot-frontend
npm install

# Setup environment
echo "VITE_API_BASE_URL=http://localhost:8186" > .env

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ChatScreen.jsx   # Main chat interface
│   ├── MessageBubble.jsx # Individual message display
│   └── TypingIndicator.jsx # Typing animation
├── context/
│   └── ChatContext.jsx  # Global state management
├── services/
│   └── apiService.js    # API communication
├── styles/              # SCSS stylesheets
│   ├── App.scss         # Global styles
│   ├── ChatScreen.scss  # Chat interface styles
│   ├── MessageBubble.scss # Message styling
│   └── TypingIndicator.scss # Typing animation
└── App.jsx            # App entry point
```

## 🎨 UI Components

### ChatScreen

Main chat interface with header, messages, and input area

- Connection status indicator
- Clear and reset session buttons
- Auto-scrolling message list
- Message input with send button

### MessageBubble

Individual message display component

- User and bot message styling
- Timestamp display
- Bullet point formatting
- Typing indicator integration

### TypingIndicator

Animated typing dots for bot responses

- Three bouncing dots animation
- Smooth CSS transitions

## 🔧 API Integration

### ApiService

Handles all backend communication:

```javascript
// Create new session
const session = await apiService.createSession();

// Send message
const response = await apiService.sendMessage(sessionId, query);

// Get chat history
const history = await apiService.getHistory(sessionId);

// Clear session messages
await apiService.clearSession(sessionId);

// Destroy session completely
await apiService.destroySession(sessionId);

// Check backend health
const status = await apiService.healthCheck();
```

### Error Handling

- Connection status monitoring
- Automatic retry logic
- User-friendly error messages
- Graceful degradation when offline

## 💎 Key Features

### Session Management

- **Auto-initialization**: Creates session on app load
- **Persistent state**: Maintains chat history during session
- **Clear option**: Remove messages while keeping session
- **Reset option**: Completely destroy and recreate session

### Message Flow

1. User types message and presses Enter or Send button
2. Message immediately appears in chat
3. Typing indicator shows while waiting for response
4. Bot response streams in with typing animation
5. Final message appears with timestamp

### Responsive Design

- **Desktop**: Full-width chat with sidebar space
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Full-screen chat experience with touch-friendly controls

## 🎛️ Configuration

### Environment Variables

```bash
# .env file
VITE_API_BASE_URL=http://localhost:8186  # Backend server URL
```

### Styling Variables

Main color scheme in SCSS:

```scss
$primary-color: #3b82f6; // Blue - user messages
$secondary-color: #14b8a6; // Teal - bot avatar
$accent-color: #f97316; // Orange - accents
$success-color: #10b981; // Green - success states
$error-color: #ef4444; // Red - error states
```

## 🔄 State Management

### ChatContext

Global state management using React Context:

```javascript
const {
  sessionId, // Current session ID
  messages, // Array of chat messages
  isLoading, // Loading state for requests
  isConnected, // Backend connection status
  error, // Error message if any
  sendMessage, // Function to send message
  clearSession, // Function to clear chat
  resetSession, // Function to reset session
} = useChat();
```

### Message Structure

```javascript
{
  id: "msg_timestamp_role",
  role: "user" | "bot",
  message: "message content",
  timestamp: "2024-01-01T12:00:00Z",
  isTyping: false  // Only for bot messages
}
```

## ✨ Animations & Interactions

### Typing Animation

- Realistic character-by-character typing
- 15ms delay between characters for natural feel
- Smooth message appearance and scrolling

### Button States

- Hover effects with subtle transforms
- Active states for better feedback
- Disabled states for loading/offline scenarios

### Message Transitions

- Slide-in animation for new messages
- Fade effects for typing indicators
- Smooth scrolling to latest messages

## 📱 Mobile Optimization

### Touch-Friendly

- Large tap targets (44px minimum)
- Optimized input area for mobile keyboards
- Proper viewport handling

## 🔍 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

## 🔧 Troubleshooting

### Common Issues

**Backend Connection Failed**

```bash
# Check if backend is running
curl http://localhost:8186/health

# Update API URL in .env
VITE_API_BASE_URL=http://localhost:8186
```

**Messages Not Appearing**

- Check browser console for JavaScript errors
- Verify sessionId is being created
- Test API endpoints directly

**Styling Issues**

- Clear browser cache
- Check SCSS compilation
- Verify CSS variables are loaded

### Debug Mode

Open browser dev tools to see:

- API request/response logs
- State changes in React DevTools
- Network connectivity issues

## 🔒 Security

### Input Validation

- Client-side input sanitization
- XSS protection through React's built-in escaping
- CORS handling for API requests

### Data Handling

- No sensitive data stored in localStorage
- Session-based authentication
- Secure API communication

---

**Live Demo**: [https://rag-news-chatbot.vercel.app/]
**Backend Repo**: [https://github.com/apoorv199-bit/RAG-News-Chatbot-backend]
**Development Server**: `http://localhost:5173`
