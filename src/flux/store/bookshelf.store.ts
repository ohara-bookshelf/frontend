import { IBookshelf } from 'src/shared/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BookshelfStore {
  bookshelf: IBookshelf | null;
  setBookshelf: (payload: IBookshelf) => void;
}

export const useBookshelfStore = create<BookshelfStore>()(
  devtools((set) => ({
    bookshelf: null,
    setBookshelf: (payload) => set(() => ({ bookshelf: payload })),
  }))
);
