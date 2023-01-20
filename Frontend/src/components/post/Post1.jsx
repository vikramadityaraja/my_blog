import './post.css'


function Post1( {post}) {

  const postdate = post.formatdate;
  const arr = postdate.split(',')[1]
  console.log(post)
  return (
    <div className='post'>
        <img className='postimg' 
        src={post.img} 
        alt=''/>
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