import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import BackgroundAnimation from "./components/backgroundAnimation/backgroundAnimation";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://videogames-pi-1.onrender.com";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <BackgroundAnimation />
      <App />
    </BrowserRouter>
  </Provider>
);
