import React, { useState } from 'react';
import MasonryLayout from '../../MasonryLayout/index';

const Popular = () => {
  //useState for popular bookshelves
  const [popularBookshelves, setPopularBookshelves] = useState([
    {
      _id: '1',
      title: 'Bookshelf 1',
      description: 'This is a bookshelf',
      image:
        'https://images.unsplash.com/photo-1610398000003-8b2f2e1b2f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      createdBy: {
        _id: '1',
        username: 'user1',
        image:
          'https://images.unsplash.com/photo-1610398000003-8b2f2e1b2f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      },
    },
    {
      _id: '2',
      title: 'Bookshelf 2',
      description: 'This is a bookshelf',
      image:
        'https://images.unsplash.com/photo-1610398000003-8b2f2e1b2f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      createdBy: {
        _id: '2',
        username: 'user2',
        image:
          'https://images.unsplash.com/photo-1610398000003-8b2f2e1b2f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      },
    },
  ]);
  return (
    <div>
      {/**
       * Display the popular bookshelves here in a Masonry layout
       */}
      <p className="text-2xl font-bold">Popular Bookshelves</p>
      <MasonryLayout bookshelves={popularBookshelves} />
    </div>
  );
};

export default Popular;
