import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: null }),
}));

export const useFileExplorerStore = create((set) => ({
  fileExplore: null,
  fileToOpen: null,

  setFileToOpen: (id) => set({ fileToOpen: id }),
  setFileExplorer: (data) => set({ fileExplore: data }),
}));
