import { Box, Flex, Heading } from "@radix-ui/themes";
import { CreateTaskForm } from "./components/CreateTaskForm";
import { TaskBoard } from "./components/TaskBoard";
import { TaskContextProvider } from "./contexts/TasksContext";

function App() {
    return (
        <TaskContextProvider>
            <Box maxHeight="80rem" mx="auto">
                <Box height="4rem">
                    <Flex align="center" gap="4" height="100%">
                        <Heading size="8" weight="light">
                            react kanban
                        </Heading>
                        <CreateTaskForm />
                    </Flex>
                </Box>
                <Box>
                    <Heading as="h2" mb="4">
                        quadro de seções
                    </Heading>
                    <TaskBoard />
                </Box>
            </Box>
        </TaskContextProvider>
    );
}

export default App;
