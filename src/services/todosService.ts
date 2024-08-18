import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Todo {
    id: string,
    title: string,
    isActive: boolean
}

type TodoWithoutId = Omit<Todo, 'id'>;


export const useGetTodos = async (): Promise<Todo[]> => {
    const querySnapshot = await getDocs(collection(db, "todo"));
    const todos: Todo[] = querySnapshot.docs.map((doc) => {
      const data: TodoWithoutId = doc.data() as TodoWithoutId;
      return {
        id: doc.id,
        ...data,
      };
    });
    return todos;
  };