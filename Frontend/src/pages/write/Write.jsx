import { useState, useContext } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import defaultblogpic from '../../pic/defaultblogpic.jpg';
import './write.css'
import { app } from '../../firebase';
import { AuthContext } from '../../authcontext';
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {convert} from 'html-to-text'
/*https://th.bing.com/th/id/R.82d5239682e6fd0b52118d398cbeda17?rik=3UyFivgb%2bHOIfQ&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f98920-nature-mountain-trees.jpg&ehk=2w1K%2fPMdEjDkye7O%2fVWZlCGILuypz7i4RypTODTtCa0%3d&risl=&pid=ImgRaw&r=0*/


function Write() {
  const [file, setFile] = useState('');
  const [value, setValue] = useState('');

  console.log('value:' + value)
  const text = convert(value, {
    wordwrap: 130
  });
  console.log('text:' + text)  

  const [option, setOption] = useState('');
  const [title, setTitle] = useState('');
  const User = useContext(AuthContext);
  const formatDate = Moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  console.log(formatDate)
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();

    const storage = getStorage(app);
    
      const date = new Date().getTime();

      if (file) {
        const storageRef = ref(storage, `${file + date}`);
  
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          (error) => {
            console.log(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "userPosts", User.uid), {
                posts: arrayUnion({
                  postid: uuid(),
                  desc:text,
                  userid: User.uid,
                  title,
                  tag:option,
                  date: Timestamp.now(),
                  formatdate: formatDate,
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        const storageRef = ref(storage, `${defaultblogpic + date}`);
  
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          (error) => {
            console.log(error.message)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await updateDoc(doc(db, "userPosts", User.uid), {
          posts: arrayUnion({
            postid: uuid(),
            desc:text,
            userid: User.uid,
            title,
            tag:option,
            date: Timestamp.now(),
            formatdate: formatDate,
            img:downloadURL,
          }),
        });
      })
      }
        )};
      
      

 /*     uploadTask.on('state_changed', 
        (snapshot) => {
    
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('image uploading default')
          }
        }, 
        (error) => {
          console.log(error.message)
        }, 
       () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);

          });
        })  */
        setFile('');
        setOption('');
        setTitle('');
        setValue('');
        navigate('/');

  }
  return (
    <>
    <div className='write'>
    <div className='left'>
    {file && <img 
    className='writeimg'
    src={URL.createObjectURL(file)}
    alt=''
    />}
        <div className='writeform '>
            
                <label htmlFor='fileinput'>
                  <i className="writeicon fa-duotone fa-plus"></i>
                </label>
                <input type='file' id='fileinput'style={{display:"none"}} onChange= {(e)=> setFile(e.target.files[0])}/> 
                
                <input type='text' placeholder='Title' className='writeinput' autoFocus={true} onChange={(e) => setTitle(e.target.value)}/>
            
            
              {/* <textarea type="text" placeholder='tell your story....' className='writeinput writetext'>

              </textarea> */}
          
              <div className='editorcontainer'>
                  <ReactQuill className='quill' theme="snow" value={value} onChange={(text) => setValue(text)} />
                  <div dangerouslySetInnerHTML={{ __html: value }}></div> 
              </div>
        </div>
        </div>
              <div className='right' >
             
                <div className='menu2'>
                  <h1>Category</h1>
                  <span>
                  <input type='radio' name='cat' value='drawing' id='drawing' onChange={(e) => setOption(e.target.value)} />
                  <label htmlFor='drawing'>Drawing</label>
                  </span>

                  <span>
                  <input type='radio' name='cat' value='science' id='science'onChange={(e) => setOption(e.target.value)} />
                  <label htmlFor='science'>Science</label>
                  </span>

                  <span>
                  <input type='radio' name='cat' value='technology' id='art' onChange={(e) => setOption(e.target.value)}/>
                  <label htmlFor='art'>Technology</label>
                  </span>

                  <span>
                  <input type='radio' name='cat' value='travel' id='travel' onChange={(e) => setOption(e.target.value)} />
                  <label htmlFor='travel'>Travel</label>
                  </span>

                  <span>
                  <input type='radio' name='cat' value='movie' id='movie' onChange={(e) => setOption(e.target.value)} />
                  <label htmlFor='movie'>Movie</label>
                  </span>

                  <span>
                  <input type='radio' name='cat' value='comics' id='comics' onChange={(e) => setOption(e.target.value)}/>
                  <label htmlFor='comics'>Comics</label>
                  </span>
                </div>
              <button className='writesubmit' onClick={handleSubmit}>Publish</button>
      </div>
            </div>
          
      
    </>
   
  )}
export default Write;