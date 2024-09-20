import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "daily-driver",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useFileExplorerStore = create((set) => ({
  fileExplore: null,
  fileToOpen: null,

  setFileToOpen: (id) => set({ fileToOpen: id }),
  setFileExplorer: (data) => set({ fileExplore: data }),
}));

export const useProjectStore = create((set) => ({
  user: null,
  projectToOpen: null,
  setprojectToOpen: (id) => set({ projectToOpen: id }),
}));
