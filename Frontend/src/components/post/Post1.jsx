import './post.css'
import { MdDelete } from "react-icons/md";
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useContext } from 'react';
import { AuthContext } from '../../authcontext';


function Post1( {post, deletepost}) {

  const postdate = post.formatdate;
  const arr = postdate.split(',')[1]
  console.log('in post:'+ post.postid)
  const User = useContext(AuthContext)
  
  const deletepostfromfirebase =async () => {

  deletepost(post.postid);
const userinforef = doc(db, "userPosts", User.uid);
//Remove the 'capital' field from the document
try {
  await updateDoc(userinforef,{
    posts: arrayRemove({
      date: post.date,
      desc:post.desc,
      formatdate:post.formatdate,
      img:post.img,
      postid:post.postid,
      tag:post.tag,
      title:post.title,
      userid:post.userid

    })
}); }
catch(error) {
  console.log(error.message)
}
  } 
  return (
    <div className='post'>
      <div className='postimage'>
        <img className='postimg' 
        src={post.img} 
        alt=''/>
        <MdDelete className='postdelete' onClick={deletepostfromfirebase}/>
      </div>  
        <div className='postinfo'>
          <span className='postcat'>{post.tag}</span>
          
        </div>
        <span className='posttitle'>
          {post.title}
        </span>
        <hr/>
        <span className='postdate'>{arr}</span>
        <p className='postdesc'>
          {post.desc}
        </p>
    </div>
  )
  }

export default Post1