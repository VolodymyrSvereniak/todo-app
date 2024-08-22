// import { useQuery } from "@tanstack/react-query";
// import { useGetAllTodos } from "../../services/todosService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeleteCompletedTodos } from "../../services/todosService";

const TodosControls: React.FC<Record<string, string>> = ({
  className: controls,
}) => {
  const queryClient = useQueryClient();

  // const { data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: useGetAllTodos,
  //   staleTime: Infinity,
  // });

  const { mutate } = useMutation({
    mutationFn: () => useDeleteCompletedTodos(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleClearing = () => {
    mutate();
  };

  return (
    <section className={controls}>
      <span>items left</span>
      <ul>
        <li>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>
      <button onClick={handleClearing}>Clear completed</button>
    </section>
  );
};

export default TodosControls;
