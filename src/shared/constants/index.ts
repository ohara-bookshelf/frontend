export const PAGE = {
  PROFILE: 'profile',
  MOOD_ASSISTANT: 'mood-assistant',
  USER_BOOKSHELF: 'bookshelves/:bookshelfId',
  USER_FORKSHELF: 'forkshelves/:forkshelfId',
  BOOKSHELVES: 'bookshelves',
  FORKSHELVES: 'forkshelves',
  BOOKS: 'books',
  USERS: 'users',
  USER: 'users/:userId',
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

  USERS: `/${PAGE.USERS}`,
  USER: (userId: string) => `/${PAGE.USERS}/${userId}`,
};

export const EMOTION_COLOR: { [key: string]: string } = {
  neutral: '#3e8e7e',
  happy: '#FFBF00',
  sad: '#4B5D67',
  angry: '#EB1D36',
  disgust: '#606C5D',
  fear: '#905E96',
  surprised: '#F07DEA',
};

export const EMOTION_LABELS: { [key: string]: string } = {
  neutral: '🙂',
  happy: '😁',
  sad: '😢',
  angry: '😠',
  disgust: '🤢',
  fear: '😨',
  surprised: '😮',
};
