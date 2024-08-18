import { useGetTodos } from "../../services/todosService";
import { useEffect } from "react";

const Header = () => {
  useEffect(() => {
    console.log(useGetTodos());
    // getTodos();
  }, []);

  return <div className="container">Header</div>;
};

export default Header;
