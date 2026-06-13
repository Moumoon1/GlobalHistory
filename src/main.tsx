import ReactDOM from "react-dom/client";
import App from "./App";
import { RenderBoundary } from "./components/layout/RenderBoundary";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RenderBoundary>
    <App />
  </RenderBoundary>
);
