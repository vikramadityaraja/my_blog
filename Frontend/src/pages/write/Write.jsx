import './write.css'

function Write() {
  return (
    <div className='write'>
    <img 
    className='writeimg'
    src='https://th.bing.com/th/id/R.82d5239682e6fd0b52118d398cbeda17?rik=3UyFivgb%2bHOIfQ&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f01%2f98920-nature-mountain-trees.jpg&ehk=2w1K%2fPMdEjDkye7O%2fVWZlCGILuypz7i4RypTODTtCa0%3d&risl=&pid=ImgRaw&r=0'
    alt=''
    />
        <form className='writeform'>
            <div className='writeformgroup'>
                <label htmlFor='fileinput'>
                  <i class="writeicon fa-duotone fa-plus"></i>
                </label>
                <input type='file' id='fileinput'style={{display:"none"}}/>
                <input type='text' placeholder='Title' className='writeinput' autoFocus={true}/>
            </div>
            <div className='writeformgroup'>
              <textarea type="text" placeholder='tell your story....' className='writeinput writetext'>

              </textarea>
            </div>
              <button className='writesubmit'>Publish</button>
        </form>
    </div>
  )
}

export default Write