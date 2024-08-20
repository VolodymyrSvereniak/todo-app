import styles from "./TodoItems.module.scss";

interface TodoItemProps {
  todos: string;
  handleDeleteTodo: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todos, handleDeleteTodo }) => {
  return (
    <li>
      <button
        className={styles.submitButton}
        onClick={handleDeleteTodo}
      ></button>
      <span>{todos}</span>
    </li>
  );
};

export default TodoItem;
