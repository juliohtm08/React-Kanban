import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../entities/Task";
import { tasksService } from "../services/api";

// Interface que define os dados e os métodos disponíveis no contexto das tarefas
export interface TasksContextData {
    tasks: Task[];
    createTask: (attributes: Omit<Task, "id">) => Promise<void>;
    updateTask: (
        id: number,
        attributes: Partial<Omit<Task, "id">>
    ) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
}

// Cria o contexto de tarefas com valores iniciais.
export const TasksContext = createContext({} as TasksContextData);

// Define as propriedades que o provedor do contexto de tarefas pode receber.
interface TasksContextProviderProps {
    children: ReactNode; //O ReactNode faz a tipagem de qualquer item disponível no react
}

// Provedor do contexto que gerencia as tarefas.
export const TaskContextProvider: React.FC<TasksContextProviderProps> = ({
    children,
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        tasksService.fechTasks().then((data) => setTasks(data)); // Busca as tarefas da API e atualiza o estado.
    }, []);

    // Função para criar uma nova task.
    const createTask = async (attributes: Omit<Task, "id">) => {
        const newTask = await tasksService.createTask(attributes); // Cria uma nova task usando o serviço da API.

        // Atualiza o estado das tasks adicionando a nova task criada.
        setTasks((currentState) => [...currentState, newTask]);
    };

    // Função para atualizar uma task
    const updateTask = async (
        id: number,
        attributes: Partial<Omit<Task, "id">>
    ) => {};

    // Função para Deletar uma task
    const deleteTask = async (id: number) => {};

    // Provedor que disponibiliza os valores e funções do contexto para os componentes filhos.
    return (
        <TasksContext.Provider
            value={{ tasks, createTask, updateTask, deleteTask }}
        >
            {children}
        </TasksContext.Provider>
    );
};
