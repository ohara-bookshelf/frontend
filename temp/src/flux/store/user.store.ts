import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IUserStore {}

export const useUserStore = create<IUserStore>(
  // @ts-ignore
  devtools((set) => ({}))
);
