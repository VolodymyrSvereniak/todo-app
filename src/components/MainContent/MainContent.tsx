import InputForm from "../Input/InputForm";
import TodosList from "../TodosList/TodosList";
import styles from "./MainContent.module.scss";

const MainContent = () => {
  return (
    <div className={styles.container}>
      <h1>TODO</h1>
      <InputForm/>
      <TodosList/>
    </div>
  );
};

export default MainContent;
