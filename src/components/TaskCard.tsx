import { Badge, Button, Card, Flex, Heading } from "@radix-ui/themes";
import { Task, TaskPriority, TaskStatus } from "../entities/Task";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";
import { useTasks } from "../hooks/UseTasks";

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { deleteTask, updateTask } = useTasks();

    const getActionText = (status: TaskStatus) => {
        const actionTexts = {
            todo: "Iniciar",
            doing: "Concluir",
            done: "Arquivar",
        };
        return actionTexts[status];
    };

    const getActionColors = (status: TaskStatus) => {
        const actionsColors: { [key: string]: "indigo" | "green" | "bronze" } =
            {
                todo: "indigo",
                doing: "green",
                done: "bronze",
            };
        return actionsColors[status];
    };

    const getPriorityColor = (priority: TaskPriority) => {
        const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
            low: "sky",
            medium: "amber",
            high: "tomato",
        };
        return priorityColors[priority];
    };

    const handleDelete = (id: string) => {
        const confirmation = confirm(
            "Tem certeza que deseja excluir esta tarefa?"
        );
        if (confirmation) {
            deleteTask(id);
        }
    };

    // Função para atualizar o status da task
    const handleUpdate = () => {
        if (task.status === "todo") {
            updateTask(task.id, { status: "doing" });
        } else if (task.status === "doing") {
            updateTask(task.id, { status: "done" });
        }
    };

    return (
        <Card>
            <Flex align="center" gap="4">
                <Heading as="h3" size="3">
                    {task.title}
                </Heading>
                <Badge color={getPriorityColor(task.priority)}>
                    {task.priority}
                </Badge>
            </Flex>
            <Text as="p" my="4">
                {task.description}
            </Text>

            <Flex gap="2">
                {task.status !== "done" && (
                    <Button
                        color={getActionColors(task.status)}
                        onClick={handleUpdate}
                    >
                        {getActionText(task.status)}
                    </Button>
                )}
                <Button color="red" onClick={() => handleDelete(task.id)}>
                    Excluir
                </Button>
            </Flex>
        </Card>
    );
};
