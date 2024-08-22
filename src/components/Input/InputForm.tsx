import styles from "./InputForm.module.scss";
import { useInputStore } from "./useInputStore";
import { useAddTodo } from "../../services/todosDBService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const InputForm = () => {
  const { inputValue, setInputValue, clearInputValue } = useInputStore();
  console.log(inputValue);

  const queryClient = useQueryClient();

  const { mutate: handleAddTodo } = useMutation({
    mutationFn: (e: React.FormEvent<HTMLFormElement>) =>
      useAddTodo(e, inputValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      clearInputValue();
    },
  });

  return (
    <form onSubmit={(e) => handleAddTodo(e)}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className={styles.submitButton} />
    </form>
  );
};

export default InputForm;
