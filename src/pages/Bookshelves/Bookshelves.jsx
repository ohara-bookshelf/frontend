import React from 'react';
import { useQuery } from 'react-query';

import * as api from '../../api';

const Bookshelves = () => {
  const { isLoading, error } = useQuery('bookshelves', api.getAllBookshelf);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return <div>Bookshelves Explore</div>;
};

export default Bookshelves;
