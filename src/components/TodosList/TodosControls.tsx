import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeleteCompletedTodos } from "../../services/todosDBService";

interface ITodosControlsProps {
  className: string;
  setFilterTodos: React.Dispatch<React.SetStateAction<string>>;
}

const TodosControls: React.FC<ITodosControlsProps> = ({
  className: controls,
  setFilterTodos
}) => {
  const queryClient = useQueryClient();

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
        <li onClick={() => setFilterTodos('all')}>All</li>
        <li onClick={() => setFilterTodos('active')}>Active</li>
        <li onClick={() => setFilterTodos('completed')}>Completed</li>
      </ul>
      <button onClick={handleClearing}>Clear completed</button>
    </section>
  );
};

export default TodosControls;
