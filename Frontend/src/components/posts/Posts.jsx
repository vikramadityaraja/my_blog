import { AuthContext } from "../../authcontext";
import React, { useContext, useEffect, useState } from "react";
import Post from '../post/Post'
import './posts.css'
import mapper from '../../mapper';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

function Posts() {

    const User  = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    console.log(User)

      useEffect( () => { 
        const unsub = ( ) => { onSnapshot(doc(db, "userPosts", User.uid), (doc) => {
         doc.exists() && setPosts(doc.data().posts);
      });

        
        return () => unsub()}
      User.uid && unsub();
    }, [User?.uid])
    
    
   
     console.log(posts) 
  
    const Mappers = mapper.map((img, index) => <Post key = {index} img= {img}/>)
    console.log(Mappers)
  return (
    <div className='posts'>
      {Mappers}
    </div>
  )
}

export default Posts