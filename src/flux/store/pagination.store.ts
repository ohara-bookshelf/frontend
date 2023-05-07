import { IMeta } from 'src/shared/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PaginationState extends IMeta {
  setTake: (take: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalItems: (totalItems: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const usePaginationStore = create<PaginationState>()(
  devtools((set) => ({
    take: 25,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
    setTake: (take) => set(() => ({ take })),
    setCurrentPage: (currentPage) => set(() => ({ currentPage })),
    setTotalItems: (totalItems) => set(() => ({ totalItems })),
    setTotalPages: (totalPages) => set(() => ({ totalPages })),
  }))
);
