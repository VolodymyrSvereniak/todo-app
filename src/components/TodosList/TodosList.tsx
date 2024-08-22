import styled from "./TodosList.module.scss";
import {
  useGetAllTodos,
  useDeleteTodo,
  setAsCompleted,
} from "../../services/todosService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "../TodoItem/TodoItem";
import TodosControls from "./TodosControls";

interface IUpdateTodoStatus {
  todoID: string;
  selectCompletedID: boolean;
}

const TodosList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: useGetAllTodos,
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

  const { mutate: handleAsCompleted } = useMutation({
    mutationFn: ({ todoID, selectCompletedID }: IUpdateTodoStatus) =>
      setAsCompleted(todoID, selectCompletedID),
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
            todoTitle={todo.title}
            handleDeleteTodo={() => handleDeleteTodo(todo.id)}
            handleAsCompleted={() =>
              handleAsCompleted({
                todoID: todo.id,
                selectCompletedID: !todo.isCompleted,
              })
            }
          />
        ))}
      </ul>
      <TodosControls className={styled.controls} />
    </div>
  );
};

export default TodosList;
