const TodosControls: React.FC<Record<string, string>> = ({
  className: controls,
}) => {
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