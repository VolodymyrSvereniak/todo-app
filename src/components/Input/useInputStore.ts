import { create } from "zustand";

interface IInputStore {
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const useInputStore = create<IInputStore>((set) => ({
  inputValue: "",
  setInputValue: (value) => set({ inputValue: value }),
}));
