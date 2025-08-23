import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      level: null,
      levelName: null,
      hasCompletedLevelTest: false,
      setLevel: (level, levelName) => set({ level, levelName, hasCompletedLevelTest: true }),
      reset: () => set({ level: null, levelName: null, hasCompletedLevelTest: false }),
    }),
    {
      name: 'user-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useUserStore;
