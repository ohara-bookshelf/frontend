export const PAGE = {
  PROFILE: 'profile',
  USER_BOOKSHELF: 'profile/:bookshelfId',
  USER_FORKSHELF: 'profile/:forkshelfId',
  MOOD_ASSISTANT: 'mood-assistant',
  BOOKSHELVES: 'bookshelves',
  BOOKS: 'books',
};
export const PAGE_PATH = {
  MAIN: '/',

  PROFILE: `/${PAGE.PROFILE}`,
  USER_BOOKSHELF: (bookshelfId: string) =>
    `/${PAGE.PROFILE}/${PAGE.BOOKSHELVES}/${bookshelfId}`,
  USER_ASSISTANT: `/${PAGE.PROFILE}/${PAGE.MOOD_ASSISTANT}`,

  BOOKSHELVES: `/${PAGE.BOOKSHELVES}`,
  BOOKSHELF: (bookshelfId: string) => `/${PAGE.BOOKSHELVES}/${bookshelfId}`,

  BOOKS: `/${PAGE.BOOKS}`,
  BOOK: (bookId: string) => `/${PAGE.BOOKS}/${bookId}`,
};
