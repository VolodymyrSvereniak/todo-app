// import { useQuery } from "@tanstack/react-query";
// import { useGetAllTodos } from "../../services/todosService";

const TodosControls: React.FC<Record<string, string>> = ({
  className: controls,
}) => {

  // const { data } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: useGetAllTodos,
  //   staleTime: Infinity,
  // });

  return (
    <section className={controls}>
      <span>items left</span>
      <ul>
        <li>All</li>
        <li>Active</li>
        <li>Completed</li>
      </ul>
      <button>Clear completed</button>
    </section>
  );
};

export default TodosControls;
