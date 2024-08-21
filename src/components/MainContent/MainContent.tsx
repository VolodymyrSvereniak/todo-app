import Header from "../Header/Header";
import InputForm from "../Input/InputForm";
import TodosList from "../TodosList/TodosList";
import styles from "./MainContent.module.scss";

const MainContent = () => {
  return (
    <main className={styles.container}>
      <div>
        <Header />
        <InputForm />
        <TodosList />
      </div>
      <h5>Drag and drop to reorder list</h5>
    </main>
  );
};

export default MainContent;
