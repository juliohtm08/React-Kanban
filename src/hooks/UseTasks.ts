import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

// Hook personalizado para consumir o contexto de tarefas.
export const useTasks = () => {
    // Usa o hook `useContext` para acessar o contexto de tarefas.
    return useContext(TasksContext);
};
