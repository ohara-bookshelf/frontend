export interface IAuth {
  isAuthenticated: boolean;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImgUrl: string;
  totalForks?: number;
  bookshelves?: {
    private: IBookshelf[];
    public: IBookshelf[];
  };
  forkedshelves?: IForkedshelf[];
  _count?: {
    bookshelves: number;
    forkedshelves: number;
  };
}

export interface IBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  year_of_publication: number;
  publisher: string;
  image_url_s: string;
  image_url_m: string;
  image_url_l: string;
  description: string;
  genres: string[];
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface IBookshelfBook {
  bookshelfId: string;
  bookId: string;
  assignedAt: Date;
  book: IBook;
}

export interface IBookshelf {
  id: string;
  name: string;
  description: string;
  visible: Visibility;
  createdAt: string;
  updatedAt: string;
  userId: string;
  books: IBookshelfBook[];
  _count: {
    books: number;
    userForks: number;
  };
  owner: IUser;
  userForks?: {
    reader: IUser;
  }[];
}

export interface IForkedshelf {
  id: string;
  readerId: string;
  bookshelfId: string;
  bookshelves?: IBookshelf[];
  bookshelf?: IBookshelf;
}

export interface IUserForkshelf {
  id: string;
  readerId: string;
  bookshelfId: string;
  bookshelf: IBookshelf;
}

export interface ICreateBookshelf {
  name: string;
  description: string;
  visible: Visibility;
  books?: (string | undefined)[] | null | undefined;
}

export interface IUpdateBookshelf {
  name?: string;
  description?: string;
  visible?: Visibility;
  books?: (string | undefined)[] | null | undefined;
}

export interface IFieldInputProps {
  name: string;
  label: string;
}

export interface IOption {
  value: string;
  label: string;
}

export interface IMeta {
  totalItems: number;
  currentPage: number;
  take: number;
  totalPages: number;
}
