import {GoRepoForked} from 'react-icons/go'
import {RiGitRepositoryPrivateFill} from "react-icons/ri";
import {MdOutlinePublic} from "react-icons/md";



export const bookshelves = [
    {
      name: 'Private',
      icon: <RiGitRepositoryPrivateFill  />,
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
  