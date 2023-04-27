import { IBookshelf, IUser, Visibility } from 'src/shared/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  user: IUser;
  setUser: (payload: IUser) => void;
  setInitialUser: () => void;
  addUserBookshelf(payload: IBookshelf): void;
  updateUserBookshelves(payload: IBookshelf): void;
  deleteUserBookshelf(payload: string): void;
};

type GroupKey = 'public' | 'private';

export const initialUser: IUser = {
  id: '',
  firstName: '',
  lastName: '',
  profileImgUrl: '',
  totalForks: 0,
  forkedshelves: [],
  bookshelves: {
    private: [],
    public: [],
  },
};

export const useUserStore = create<UserStore>(
  // @ts-ignore
  devtools((set) => ({
    user: initialUser,
    setUser: (payload: IUser) => {
      set({
        user: payload,
      });
    },
    setInitialUser: () => {
      set({
        user: initialUser,
      });
    },
    addUserBookshelf: (payload: IBookshelf) => {
      const { bookshelves } = useUserStore.getState().user;
      const privateBookshelves = bookshelves?.private || [];
      const publicBookshelves = bookshelves?.public || [];

      payload.visible === Visibility.PUBLIC
        ? publicBookshelves.push(payload)
        : privateBookshelves.push(payload);

      const updatedUser = {
        ...useUserStore.getState().user,
        bookshelves: {
          private: privateBookshelves,
          public: publicBookshelves,
        },
      };
      set({
        user: updatedUser,
      });
    },
    updateUserBookshelves: (payload: IBookshelf) => {
      const { bookshelves } = useUserStore.getState().user;

      if (!bookshelves) return;

      const privateBookshelves = bookshelves?.private || [];
      const publicBookshelves = bookshelves?.public || [];

      const mergedBookshelves = [...privateBookshelves, ...publicBookshelves];

      // find the matching bookshelf
      const matchingBookshelf = mergedBookshelves.find(
        (bookshelf) => bookshelf.id === payload.id
      );

      if (!matchingBookshelf) return;

      // update the matching bookshelf
      // then group the bookshelves by visibility
      const updatedBookshelves = mergedBookshelves
        .map((bookshelf) => {
          if (bookshelf.id === payload.id) {
            return payload;
          }
          return bookshelf;
        })
        .reduce(
          (group: Record<GroupKey, any[]>, bookshelf) => {
            const { visible } = bookshelf;

            group[visible.toLowerCase() as GroupKey] =
              group[visible.toLowerCase() as GroupKey] ?? [];
            group[visible.toLowerCase() as GroupKey].push(bookshelf);
            return group;
          },
          {
            public: [],
            private: [],
          }
        );

      const updatedUser = {
        ...useUserStore.getState().user,
        bookshelves: updatedBookshelves,
      };
      set({
        user: updatedUser,
      });
    },
    deleteUserBookshelf: (payload: string) => {
      const { bookshelves } = useUserStore.getState().user;

      if (!bookshelves) return;

      const privateBookshelves = bookshelves?.private || [];
      const publicBookshelves = bookshelves?.public || [];

      const mergedBookshelves = [...privateBookshelves, ...publicBookshelves];

      // update the matching bookshelf
      // then group the bookshelves by visibility
      const updatedBookshelves = mergedBookshelves
        .filter((bookshelf) => bookshelf.id !== payload)
        .reduce(
          (group: Record<GroupKey, any[]>, bookshelf) => {
            const { visible } = bookshelf;

            group[visible.toLowerCase() as GroupKey] =
              group[visible.toLowerCase() as GroupKey] ?? [];
            group[visible.toLowerCase() as GroupKey].push(bookshelf);
            return group;
          },
          {
            public: [],
            private: [],
          }
        );

      const updatedUser = {
        ...useUserStore.getState().user,
        bookshelves: updatedBookshelves,
      };
      set({
        user: updatedUser,
      });
    },
  }))
);
