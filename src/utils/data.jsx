import React from 'react';
import { GoRepoForked } from 'react-icons/go';
import { RiGitRepositoryPrivateFill } from 'react-icons/ri';
import { MdOutlinePublic } from 'react-icons/md';

export const bookshelves = [
  {
    name: 'Private',
    icon: <RiGitRepositoryPrivateFill />,
  },
  {
    name: 'Public',
    icon: <MdOutlinePublic />,
  },
  {
    name: 'Forked',
    icon: <GoRepoForked />,
  },
];

export const visibility = bookshelves.map((bookshelve) => bookshelve.name);

// Path: frontend\src\Utils\data.js

export const bookshelfNames = [
  'Fantasy',
  'Science Fiction',
  'Humor',
  'Dystopian',
  'Adventure',
  'Romance',
  'Detective & Mystery',
  'Horror',
  'Thriller',
  'Historical Fiction',
  'Young Adult',
  'New adult',
  'Children Fiction',
  'Crime & Detective',
  'Contemporary Fiction',
  'Short Story',
  'Women fiction',
  'Self-Help',
  'Biography',
  'Memoir & Autobiography',
  'Motivation',
  'Religion & Spirituality',
  'Cooking',
  'Travel',
  'Art & Photography',
  'Health & Fitness',
  'History',
  'Crafts, Hobbies & Home',
  'Families & Relationships',
  'Humor & Entertainment',
  'Business & Money',
  'Law & Criminology',
  'Politics & Social Sciences',
  'Education & Teaching',
];
