import React, { useEffect, useState } from 'react';

import { Spinner, MasonryLayout } from '../../index';

const Detail = () => {
  const [bookshelves, setBookshelves] = useState();
  const [bookshelfDetail, setBookshelfDetail] = useState();
  //const [comment, setComment] = useState('');
  //const [addingComment, setAddingComment] = useState(false);

  /*const fetchDetails = () => {
    const query = DetailQuery(bookshelfId);
  };*/

  /*const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(bookshelfId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };*/

  useEffect(() => {
    setBookshelves([]);
    setBookshelfDetail([]);
  }, []);

  if (!bookshelfDetail) {
    return <Spinner message="Showing bookshelf" />;
  }

  return (
    <>
      {bookshelves ? (
        <MasonryLayout bookshelves={bookshelves} />
      ) : (
        <Spinner message="Loading more bookshelves" />
      )}
    </>
  );
};

export default Detail;
