import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Spinner, MasonryLayout } from '../index';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const { typeId } = useParams();

  //const user = useState(JSON.parse(localStorage.getItem('user')));

  //add dummy bookshelves
  /*const dummyBookshelves = [
    {

    }
    
  ];*/

  useEffect(() => {
    setLoading(false);
  }, []);

  const bookCategory = typeId || 'new';
  if (loading) {
    return (
      <Spinner
        message={`We are adding ${bookCategory} categories to your feed!`}
      />
    );
  }
  return (
    <>
      <MasonryLayout />
    </>
  );
};

export default Feed;
