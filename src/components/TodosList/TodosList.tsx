import { useGetTodos, useDeleteTodo } from "../../services/todosService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "../TodoItem/TodoItem";

const TodosList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: useGetTodos,
    staleTime: Infinity,
  });

  console.log(data);

  const queryClient = useQueryClient();

  const { mutate: handleDeleteTodo } = useMutation({
    mutationFn: (id: string) => useDeleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <ul>
        {data?.map((todo) => (
          <TodoItem
            key={todo.id}
            handleDeleteTodo={() => handleDeleteTodo(todo.id)}
            todos={todo.title}
          />
        ))}
        <li>Config</li>
      </ul>
    </div>
  );
};

export default TodosList;
