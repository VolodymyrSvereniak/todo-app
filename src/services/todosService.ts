import {
  collection,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

interface ITodos {
  id: string;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

type TodosWithoutId = Omit<ITodos, "id">;

export const useGetAllTodos = async (): Promise<ITodos[]> => {
  const q = query(collection(db, "todo"), orderBy("createdAt"));

  try {
    const querySnapshot = await getDocs(q);
    const todos: ITodos[] = querySnapshot.docs.map((doc) => {
      const data: TodosWithoutId = doc.data() as TodosWithoutId;
      return {
        id: doc.id,
        ...data,
      };
    });
    return todos;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw Error("Something went wrong");
  }
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
      isCompleted: false,
      createdAt: serverTimestamp(),
    } as TodosWithoutId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw Error("Something went wrong");
  }
};

export const useDeleteTodo = async (id: string) => {
  try {
    await deleteDoc(doc(db, "todo", id));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw Error("Something went wrong");
  }
};

export const setAsCompleted = async (id: string, completedStatus: boolean) => {
  const todoRef = doc(db, "todo", id);

  try {
    await updateDoc(todoRef, {
      isCompleted: completedStatus,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw Error("Something went wrong");
  }
};

// export const setAsActive;