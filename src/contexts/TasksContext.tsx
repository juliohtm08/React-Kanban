import { createContext, ReactNode, useEffect, useState } from "react";
import { Task } from "../entities/Task";
import { tasksService } from "../services/api";

// Interface que define os dados e os métodos disponíveis no contexto das tarefas
export interface TasksContextData {
    tasks: Task[];
    createTask: (attributes: Omit<Task, "id">) => Promise<void>;
    updateTask: (
        id: string,
        attributes: Partial<Omit<Task, "id">>
    ) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
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

    // Função para atualizar o status de uma task
    const updateTask = async (
        id: string,
        attributes: Partial<Omit<Task, "id">>
    ) => {
        await tasksService.updateTask(id, attributes);

        setTasks((currentState) => {
            const updatedTasks = [...currentState]; //faz uma cópia da task

            const TaskIndex = updatedTasks.findIndex((task) => task.id === id); //encontra o id da task selecionada

            /* adicionar condição de não encontrar a task */

            Object.assign(updatedTasks[TaskIndex], attributes);

            return updatedTasks;
        });
    };

    // Função para Deletar uma task
    const deleteTask = async (id: string) => {
        await tasksService.deleteTask(id);
        setTasks((currentState) =>
            currentState.filter((task) => task.id !== id)
        );
    };

    // Provedor que disponibiliza os valores e funções do contexto para os componentes filhos.
    return (
        <TasksContext.Provider
            value={{ tasks, createTask, updateTask, deleteTask }}
        >
            {children}
        </TasksContext.Provider>
    );
};
