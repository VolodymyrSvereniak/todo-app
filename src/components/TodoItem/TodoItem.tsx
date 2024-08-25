import styled from "./TodoItem.module.scss";
import checkMark from "../../assets/icon-check.svg";
import deleteMark from "../../assets/icon-cross.svg";

interface TodoItemProps {
  isCompletedMark: boolean;
  todoTitle: string;
  handleDeleteTodo: () => void;
  handleAsCompleted: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  isCompletedMark,
  todoTitle,
  handleDeleteTodo,
  handleAsCompleted,
}) => {
  return (
    <li className={styled.itemWrapper}>
      <button className={styled.deleteButton} onClick={handleDeleteTodo}>
        <img src={deleteMark} alt="delete" />
      </button>
      <button
        className={`${styled.submitButton} ${
          isCompletedMark && styled.markedSubmitButton
        }`}
        onClick={handleAsCompleted}
      >
        {isCompletedMark && <img src={checkMark} alt="checkMark" />}
      </button>
      <span className={isCompletedMark ? styled.title : ""}>{todoTitle}</span>
    </li>
  );
};

export default TodoItem;
