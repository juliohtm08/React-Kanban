import { Task } from "../entities/Task";

export const tasksService = {
    // Método para buscar todas as tarefas.
    async fechTasks(): Promise<Task[]> {
        // Faz uma requisição GET para a API para obter a lista de tarefas.
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
        const data = await response.json();
        return data;
    },

    // Método para criar uma nova tarefa.
    async createTask(attributes: Omit<Task, "id">): Promise<Task> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: "POST",
            // Define o tipo do conteúdo como JSON.
            headers: {
                "Content-Type": "application/json",
            },
            // Converte os atributos da nova tarefa para uma string JSON.
            body: JSON.stringify(attributes),
        });
        // Converte a resposta da API para uma tarefa do tipo 'Task'.
        const newTask: Task = await response.json();
        return newTask;
    },
};