import { useCallback, useState } from 'react';
import { useUserStore } from 'src/flux/store';

export default function useIsbn(): [string | null, () => void] {
  const { user } = useUserStore();

  const [isbn, setIsbn] = useState<string | null>(null);

  const getIsbn = useCallback(() => {
    if (!user || !user.bookshelves) return null;

    const isbnList = Object.values(user.bookshelves)
      .flatMap((bs) =>
        bs?.flatMap((b) => b?.books?.map((book) => book?.book?.isbn || []))
      )
      .flat()
      .filter(Boolean);

    const randomIsbn = isbnList[Math.floor(Math.random() * isbnList.length)];

    setIsbn(randomIsbn);
  }, [user]);

  return [isbn, getIsbn];
}
