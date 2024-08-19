import { useGetTodos } from "../../services/todosService";
import { useQuery } from "@tanstack/react-query";

const TodosList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: useGetTodos,
  });

  console.log(data);
  
  if(isLoading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <p>Todos</p>
      <span>{data?.map((todo) => todo.title)}</span>
    </div>
  );
};

export default TodosList;
