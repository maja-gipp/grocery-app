import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./state/store";
import { Provider } from "react-redux";

import reportWebVitals from "./reportWebVitals";
import "./styles.css";

import { App } from "./components/App";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Missing root element - React has no place to work on");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
