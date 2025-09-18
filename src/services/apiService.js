const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8186";

const baseUrl = API_BASE_URL;

async function request(endpoint, options = {}) {
  const url = `${baseUrl}/api${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API Request failed:", error);
    throw error;
  }
}

async function createSession() {
  return request("/chat/session", {
    method: "POST",
  });
}

async function sendMessage(sessionId, query) {
  return request("/chat/ask", {
    method: "POST",
    body: JSON.stringify({
      sessionId,
      query: query.trim(),
    }),
  });
}

async function getHistory(sessionId) {
  return request(`/chat/history/${sessionId}`, {
    method: "GET",
  });
}

async function clearSession(sessionId) {
  return request(`/chat/session/${sessionId}`, {
    method: "DELETE",
  });
}

async function destroySession(sessionId) {
  return request(`/chat/session/${sessionId}/destroy`, {
    method: "DELETE",
  });
}

async function healthCheck() {
  try {
    const response = await fetch(`${baseUrl}/health`);
    return await response.json();
  } catch (error) {
    throw new Error("Backend server is not reachable");
  }
}

const ApiService = {
  createSession,
  sendMessage,
  getHistory,
  clearSession,
  destroySession,
  healthCheck,
};

export default ApiService;
