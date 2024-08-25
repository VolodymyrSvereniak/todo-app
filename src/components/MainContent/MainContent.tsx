import Header from "../Header/Header";
import InputForm from "../Input/InputForm";
import TodosList from "../TodosList/TodosList";
import styled from "./MainContent.module.scss";

const MainContent = () => {
  return (
    <main className={styled.container}>
      <div className={styled.wrapper}>
        <Header />
        <InputForm />
        <TodosList />
      </div>
      <h5 className={styled.drag}>Drag and drop to reorder list</h5>
    </main>
  );
};

export default MainContent;
