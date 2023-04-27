import { IBookshelf } from 'src/shared/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type BookshelfStore = {
  bookshelves: IBookshelf[];
  bookshelf: IBookshelf | null;
  setBookshelf: (payload: IBookshelf) => void;
};

export const useBookshelfStore = create<BookshelfStore>(
  // @ts-ignore
  devtools((set) => ({
    bookshelf: null,
    setBookshelf: (payload: IBookshelf) => {
      set({
        bookshelf: payload,
      });
    },
  }))
);
