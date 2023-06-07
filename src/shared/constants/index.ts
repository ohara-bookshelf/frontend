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
  happy: '#FFD700',
  sad: '#87CEEB',
  angry: '#FF0000',
  neutral: '#808080',
  confused: '#0000FF',
  disgusted: '#008000',
  surprised: '#FF1493',
};

export const EMOTION_LABELS: { [key: string]: string } = {
  angry: '😠',
  disgust: '🤢',
  fear: '😨',
  happy: '😃',
  neutral: '😐',
  sad: '😢',
  surprised: '😮',
};
