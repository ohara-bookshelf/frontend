import React, {useState, useEffect} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'



const View = () => {

  /*const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);*/

  const navigate = useNavigate();

  //const { postedBy, image, _id, destination } = View;

  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

 
    
  return(

    <div className = 'flex'>
        <h1>
            View Bookshelf
        </h1>
    </div>
  )
}

export default View