import {
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

export const CreateTaskForm: React.FC = () => {
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
                <form>
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
                                        Para fazer
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="doing">
                                        Em progresso
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="done">
                                        concluído
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
                                        Baixa
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="medium">
                                        Média
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="high">
                                        Alta
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
