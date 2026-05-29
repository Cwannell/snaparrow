import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
    <HashRouter>
     <App />
    <ChatWidget />
    </HashRouter>
  </React.StrictMode>
);
