import { IUser } from '../interfaces';

export const randomIndex = (arrLength: number): number => {
  return Math.floor(Math.random() * arrLength);
};

export const randomIsbn = (user: IUser): string | null => {
  if (!user || !user.bookshelves) return null;

  const isbnList = Object.values(user.bookshelves)
    .flatMap((bs) =>
      bs?.flatMap((b) => b?.books?.map((book) => book?.book?.isbn || []))
    )
    .flat()
    .filter(Boolean);

  return isbnList[randomIndex(isbnList.length)] || null;
};
