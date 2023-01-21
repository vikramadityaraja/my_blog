import './post.css'
import { MdDelete } from "react-icons/md";

function Post1( {post}) {

  const postdate = post.formatdate;
  const arr = postdate.split(',')[1]
  console.log(post)
  return (
    <div className='post'>
      <div className='postimage'>
        <img className='postimg' 
        src={post.img} 
        alt=''/>
        <MdDelete className='postdelete'/>
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