import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client"; // We'll install this next
import "./ChatWidget.css"; // This is the CSS you already have!
import logo from "./img/sa.png";
export default function ChatWidget() {
  // --- STATE ---
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Starts closed (change to true to test)
  const socketRef = useRef(null);
  const endRef = useRef(null);

  // --- SOCKET SETUP (points to your backend later) ---
  useEffect(() => {
    // In Vite dev, connect to localhost:3000 (your backend)
    // In production, connect to same origin (no args)
    const socketUrl =
      import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : undefined;

    socketRef.current = io(socketUrl, { transports: ["websocket"] });
    const socket = socketRef.current;

    socket.on("connect", () => console.log("Socket connected"));
    socket.on("chat message", (data) => {
      if (data.type === "bot") {
        setMessages((prev) => [...prev, { type: "bot", text: data.text }]);
      }
    });

    return () => socket.disconnect();
  }, []);

  // --- SEND MESSAGE ---
  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { type: "user", text }]);
    setInput("");
    socketRef.current?.emit("chat message", { type: "user", text });
  };

  // --- AUTO-SCROLL ---
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- TOGGLE CHAT ---
  const toggleChat = () => setIsOpen(!isOpen);

  // --- RENDER ---
  return (
    <div className="chat-widget-wrapper">
      {/* Toggle Button */}
      <button
        className="chat-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >  <img src={logo} alt="SnapArrow logo" />
      </button>

      {/* Chat Panel */}
      <div className={`chat-pane ${isOpen ? "open" : ""}`}>
        <div className="chat-header">Support Chat</div>
        <div className="chat-log" ref={endRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          <div ref={endRef} /> {/* For scrolling */}
        </div>
        <form className="chat-input" onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}