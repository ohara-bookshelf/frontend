import { IUser } from 'src/shared/interfaces';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  user: IUser;
  setUser: (payload: IUser) => void;
  setInitialUser: () => void;
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
  }))
);
