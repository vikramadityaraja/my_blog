import './singlepost.css'
import LoremIpsum from 'react-lorem-ipsum'

function Singlepost() {
  return (
    <div className='singlepost'>
        <div className='singlepostwrapper'>
            <img
            className="singlepostimg"
            src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            />
            <h1 className='singleposttitle'>
                Lorem ipsum vikky ardewertttt.
            </h1>
            <div className='singlepostedit'>
                <i class=" singleposticon fa-regular fa-pen-to-square"></i>
                <i class="singleposticon fa-solid fa-trash"></i>
            </div>
            <div className='singlepostinfo'>
                <span className='singlepostauthor'>
                    Author:<b>Vikram</b>
                </span>
                <span className='singlepostdate'>
                    1 hour ago
                </span>
                </div>
                <p className='singlepostdesc'>
                    <LoremIpsum p={3}/>
                </p>

        </div>
    </div>
  )
}

export default Singlepost