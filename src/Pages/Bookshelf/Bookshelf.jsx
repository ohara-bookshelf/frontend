import React from 'react';
import { useParams } from 'react-router-dom';

const Bookshelf = () => {
  const { bookshelfId } = useParams();
  return <div>Bookshelf {bookshelfId}</div>;
};

export default Bookshelf;
