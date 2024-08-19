import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface ITodos {
  id: string;
  title: string;
  isActive: boolean;
}

type TodosWithoutId = Omit<ITodos, "id">;

export const useGetTodos = async (): Promise<ITodos[]> => {
  const querySnapshot = await getDocs(collection(db, "todo"));
  const todos: ITodos[] = querySnapshot.docs.map((doc) => {
    const data: TodosWithoutId = doc.data() as TodosWithoutId;
    return {
      id: doc.id,
      ...data,
    };
  });
  return todos;
};

export const useAddTodo = async (
  e: React.FormEvent<HTMLFormElement>,
  inputValue: string
) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "todo"), {
      title: inputValue,
      isActive: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw Error("Something went wrong");
  }
};
