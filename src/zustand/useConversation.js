import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";

const store = createStore((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

const useConversation = () => useStore(store);

export default useConversation;
