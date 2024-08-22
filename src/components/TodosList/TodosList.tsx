import styled from "./TodosList.module.scss";
import {
  useGetAllTodos,
  useDeleteTodo,
  setAsCompleted,
} from "../../services/todosDBService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TodoItem from "../TodoItem/TodoItem";
import TodosControls from "./TodosControls";
import { useState } from "react";

interface IUpdateTodoStatus {
  todoID: string;
  selectCompletedID: boolean;
  setNonActiveStatus: boolean;
}

const TodosList = () => {
  const [filterTodos, setFilterTodos] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: useGetAllTodos,
    staleTime: Infinity,
  });

  console.log(data);

  const filteredTodos = data?.filter((todo) => {
    if (filterTodos === "completed") return todo.isCompleted;
    if (filterTodos === "active") return todo.isActive;
    return true;
  });

  const queryClient = useQueryClient();

  const { mutate: handleDeleteTodo } = useMutation({
    mutationFn: (id: string) => useDeleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: handleAsCompleted } = useMutation({
    mutationFn: ({
      todoID,
      selectCompletedID,
      setNonActiveStatus,
    }: IUpdateTodoStatus) =>
      setAsCompleted(todoID, selectCompletedID, setNonActiveStatus),
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
        {filteredTodos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todoTitle={todo.title}
            handleDeleteTodo={() => handleDeleteTodo(todo.id)}
            handleAsCompleted={() =>
              handleAsCompleted({
                todoID: todo.id,
                selectCompletedID: !todo.isCompleted,
                setNonActiveStatus: !todo.isActive,
              })
            }
          />
        ))}
      </ul>
      <TodosControls
        className={styled.controls}
        setFilterTodos={setFilterTodos}
      />
    </div>
  );
};

export default TodosList;
