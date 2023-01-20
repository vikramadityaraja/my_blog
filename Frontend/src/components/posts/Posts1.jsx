import './posts.css'
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Post1 from '../post/Post1'

import { db } from "../../firebase";
import { AuthContext } from '../../authcontext';

function Posts1() {

  const User  = useContext(AuthContext);
 const [posts, setPosts] = useState([]);
  console.log(posts)

  useEffect(() => {
    const unSub = () => {onSnapshot(doc(db, "userPosts", User.uid), (doc) => {
      doc.exists() && setPosts(doc.data().posts);
    });

    return () => {
      unSub();
    }};

    User.uid && unSub();

  }, [User.uid]);

  console.log(posts) 
const Mappers = posts.map((post, index) => <Post1 key = {index} post= {post}/>)
  return (
    <div className='posts'>
      {Mappers}
    </div>
  )
}

export default Posts1