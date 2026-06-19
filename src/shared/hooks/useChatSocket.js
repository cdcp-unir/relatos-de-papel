import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const WS_URL =
  import.meta.env.VITE_COMMS_WS_URL || "http://localhost:8085/ws/chat";

export function useChatSocket(userId, token) {
  const clientRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!userId || !token) return;

    setConnecting(true);

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      onConnect: () => {
        console.log("WebSocket conectado");
        setConnected(true);
        setConnecting(false);

        client.subscribe("/topic/chat", (payload) => {
          const response = JSON.parse(payload.body);
          setMessages((prev) => [...prev, response]);
        });
      },

      onDisconnect: () => {
        setConnected(false);
        setConnecting(false);
      },

      onStompError: (frame) => {
        console.error("Error STOMP:", frame);
        setConnected(false);
        setConnecting(false);
      },

      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        setConnected(false);
        setConnecting(false);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
      setConnecting(false);
    };
  }, [userId, token]);

  const sendMessage = (text) => {
    if (!clientRef.current || !connected) {
      console.warn("WebSocket no conectado");
      return false;
    }

    const message = {
      userId,
      sender: "USER",
      message: text,
      type: "USER_MESSAGE",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);

    clientRef.current.publish({
      destination: "/app/chat/message",
      body: JSON.stringify(message),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    connected,
    connecting,
    sendMessage,
    clearMessages,
  };
}