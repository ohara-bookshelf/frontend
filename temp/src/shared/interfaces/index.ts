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
}

export interface IForkedshelf {
  id: string;
  readerId: string;
  bookshelfId: string;
  bookshelves?: IBookshelf[];
  bookshelf?: IBookshelf;
}
