import styles from "./TodoItems.module.scss";

interface TodoItemProps {
  todoTitle: string;
  handleDeleteTodo: () => void;
  handleAsCompleted: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todoTitle,
  handleDeleteTodo,
  handleAsCompleted,
}) => {
  return (
    <li>
      <button className={styles.submitButton} onClick={handleDeleteTodo}>
        &times;
      </button>
      <button
        className={styles.submitButton}
        onClick={handleAsCompleted}
      ></button>
      <span>{todoTitle}</span>
    </li>
  );
};

export default TodoItem;
