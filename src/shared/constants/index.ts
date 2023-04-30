export const PAGE = {
  PROFILE: 'profile',
  MOOD_ASSISTANT: 'mood-assistant',
  USER_BOOKSHELF: 'bookshelves/:bookshelfId',
  USER_FORKSHELF: 'forkshelves/:forkshelfId',
  BOOKSHELVES: 'bookshelves',
  FORKSHELVES: 'forkshelves',
  BOOKS: 'books',
};
export const PAGE_PATH = {
  MAIN: '/',

  PROFILE: `/${PAGE.PROFILE}`,
  USER_BOOKSHELF: (bookshelfId: string) =>
    `/${PAGE.PROFILE}/bookshelves/${bookshelfId}`,
  USER_ASSISTANT: `/${PAGE.PROFILE}/${PAGE.MOOD_ASSISTANT}`,
  USER_FORKSHELF: (forkshelfId: string) =>
    `/${PAGE.PROFILE}/forkshelves/${forkshelfId}`,

  BOOKSHELVES: `/${PAGE.BOOKSHELVES}`,
  BOOKSHELF: (bookshelfId: string) => `/${PAGE.BOOKSHELVES}/${bookshelfId}`,

  BOOKS: `/${PAGE.BOOKS}`,
  BOOK: (bookId: string) => `/${PAGE.BOOKS}/${bookId}`,
};
