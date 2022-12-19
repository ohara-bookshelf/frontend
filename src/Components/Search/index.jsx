import React, { useEffect, useState } from 'react';

import MasonryLayout from '../MasonryLayout/index';

import Spinner from '../Spinner/index';

const Search = ({ searchTerm }) => {
  const [bookshelves, setBookshelves] = useState('');
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && <Spinner message="Searching books" />}
      {bookshelves?.length !== 0 && <MasonryLayout bookshelves={bookshelves} />}
      {bookshelves?.bookshelves === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No books Found!</div>
      )}
    </div>
  );
};

export default Search;
