import { IBookshelf, IUser, Visibility } from 'src/shared/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  user: IUser;
  setUser: (payload: IUser) => void;
  setInitialUser: () => void;
  addUserBookshelf(payload: IBookshelf): void;
  updateUserBookshelves(payload: IBookshelf): void;
};

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
      const privateBookshelves = bookshelves?.private || [];
      const publicBookshelves = bookshelves?.public || [];

      const updatedBookshelves = {
        private: privateBookshelves.map((bookshelf) => {
          if (bookshelf.id === payload.id) {
            // add payload to the books array of the matching bookshelf
            return payload;
          } else {
            // return the bookshelf unmodified
            return bookshelf;
          }
        }),
        public: publicBookshelves.map((bookshelf) => {
          if (bookshelf.id === payload.id) {
            // add payload to the books array of the matching bookshelf
            return payload;
          } else {
            // return the bookshelf unmodified
            return bookshelf;
          }
        }),
      };

      console.log(updatedBookshelves);

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
