import {
    Badge,
    Box,
    Button,
    Dialog,
    Flex,
    RadioGroup,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { FormEventHandler } from "react";
import { z } from "zod";

/* esquema dos dados */
const CreateTaskSchemma = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"]),
});

export const CreateTaskForm: React.FC = () => {
    /* submit dos dados */
    const handleSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
        ev.preventDefault();

        /* aqui captura os dados do formulário */
        const formData = new FormData(ev.currentTarget);

        /* aqui extrai os valores de cada componente a partir da name */
        const title = formData.get("title");
        const description = formData.get("description");
        const status = formData.get("status");
        const priority = formData.get("priority");

        ev.currentTarget.reset(); /* Aqui reseta o formulário */

        /* Validação dos dados */
        /* o '.parse' vai verificar se os dados obtidos correspondem aos critérios do Schemma*/
        const taskData = CreateTaskSchemma.parse({
            title,
            description,
            status,
            priority,
        });

        alert(JSON.stringify(taskData));
    };

    return (
        <Dialog.Root>
            {/* botão para abrir o modal */}
            <Dialog.Trigger>
                <Button>
                    <PlusIcon /> nova tarefa
                </Button>
            </Dialog.Trigger>
            {/* modal */}
            <Dialog.Content maxWidth="32rem">
                <Dialog.Title>Nova Tarefa</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Adicione novas tarefas ao quadro
                </Dialog.Description>

                {/* formulário */}
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">
                        <Box maxWidth="32rem">
                            {/* Título */}
                            <Box mb="2">
                                <Text as="label" htmlFor="title">
                                    título
                                </Text>
                            </Box>
                            {/* Componente TextField */}
                            <TextField.Root
                                placeholder="Defina um título"
                                name="title"
                                id="title"
                                autoFocus
                                required
                            />
                        </Box>
                        <Box maxWidth="32rem">
                            {/* Descrição */}
                            <Box mb="2">
                                <Text as="label" htmlFor="description">
                                    Descrição
                                </Text>
                            </Box>
                            {/* Componente TextArea */}
                            <TextArea
                                placeholder="Descreva a tarefa"
                                name="description"
                                id="description"
                            />
                        </Box>

                        <Flex gap="8">
                            <Box>
                                <Text as="div" mb="2">
                                    Situação
                                </Text>
                                <RadioGroup.Root
                                    name="status"
                                    defaultValue="todo"
                                >
                                    <RadioGroup.Item value="todo">
                                        <Badge color="gray">Para fazer</Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="doing">
                                        <Badge color="yellow">
                                            Em progresso
                                        </Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="done">
                                        <Badge color="green">Concluído</Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                            <Box>
                                <Text as="div" mb="2">
                                    Prioridade
                                </Text>
                                <RadioGroup.Root
                                    name="priority"
                                    defaultValue="low"
                                >
                                    <RadioGroup.Item value="low">
                                        <Badge color="sky">Baixa</Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="medium">
                                        <Badge color="amber">Média</Badge>
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="high">
                                        <Badge color="tomato">Alta</Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                        </Flex>
                        {/* Botões de cancelar e submit*/}
                        <Flex gap="2" justify="end">
                            <Dialog.Close>
                                <Button color="gray" variant="soft">
                                    Cancelar
                                </Button>
                            </Dialog.Close>
                            <Button type="submit">Criar Tarefa</Button>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};
