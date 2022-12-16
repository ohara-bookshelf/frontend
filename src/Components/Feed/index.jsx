import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom'

import {Create, View, Detail} from '../Bookshelf/index'

import {Spinner, MasonryLayout, Search, Navbar} from '../index'

const Feed = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [bookshelves, setBookshelves] = useState();
  const [loading, setLoading] = useState(false);
  const { typeId } = useParams();

  
  //const user = useState(JSON.parse(localStorage.getItem('user')));

  //add dummy bookshelves
  /*const dummyBookshelves = [
    {

    }
    
  ];*/
    
  const bookCategory = typeId || 'new';
  if (loading) {
    return (
      <Spinner message={`We are adding ${bookCategory} categories to your feed!`} />
    );
  }
  return (
    <>
      <MasonryLayout  />
    </>
  );
};

export default Feed;