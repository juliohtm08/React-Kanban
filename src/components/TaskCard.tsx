import { Badge, Button, Card, Flex, Heading } from "@radix-ui/themes";
import { Task, TaskPriority, TaskStatus } from "../entities/Task";
import { Text } from "@radix-ui/themes/dist/cjs/index.js";

interface TaskCardProps {
    task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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
                    <Button color={getActionColors(task.status)}>
                        {getActionText(task.status)}
                    </Button>
                )}
                <Button color="red">Excluir</Button>
            </Flex>
        </Card>
    );
};
