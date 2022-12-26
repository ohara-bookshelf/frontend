import React from 'react';
import Masonry from 'react-masonry-css';
//import { bookshelves } from '../../Utils/data'
import { View } from '../Bookshelf/index';

//breakpoints for the masonry layout

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
const MasonryLayout = ({ bookshelves }) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex animate-slide-fwd"
    >
      {bookshelves?.map((bookshelf) => (
        <View key={bookshelf._id} bookshelf={bookshelf} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
