import React    from "react";
import ReactDOM from "react-dom/client";
import App      from "./Components/tarefas/TarefasComponent.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import Tarefas  from "./Components/tarefas/TarefasComponent.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Tarefas />
  </React.StrictMode>
);
