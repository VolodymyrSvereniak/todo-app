import styles from "./InputForm.module.scss";
import { useInputStore } from "./useInputStore";
import { useAddTodo } from "../../services/todosService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const InputForm = () => {
  const { inputValue, setInputValue } = useInputStore();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (e: React.FormEvent<HTMLFormElement>) =>
      useAddTodo(e, inputValue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  console.log(inputValue);
  return (
    <form onSubmit={(e) => mutate(e)}>
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
