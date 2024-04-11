import dribbbleLogo from '../assets/dribbbleLogo.png';
import { MdCameraEnhance } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function completeProfile() {

    const [currUser, setCurrUser] = useState({})
    const [profilePic, setProfilePic] = useState("https://res.cloudinary.com/dpscsgghc/image/upload/v1712827678/dkaj8fqwkilnrdzsjwry.jpg")
    // const [profilePic, setProfilePic] = useState("")
    const navigate = useNavigate()
    const [location, setLocation] = useState('')

    useEffect(() => {
        const currUser = JSON.parse(sessionStorage.getItem('user'))
        if (!currUser) {
            navigate("/")
        }
        else {
            setCurrUser(currUser)
        }
        console.log(currUser, 'user')
    }, [])

    const uploadImage = (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'wtbh2yyu')

        fetch('https://api.cloudinary.com/v1_1/dpscsgghc/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            setProfilePic(data.secure_url)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(profilePic, 'pp')
        console.log(location, 'loc')
        console.log(currUser.message.username, 'user')
        fetch('http://localhost:5000/api/uploadImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar: profilePic, location: location, username: currUser.message.username })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate('/')
        })
    }


    return (
        <div>
            <nav className='font-medium flex justify-between items-center w-full px-2 py-3 lg:px-3 lg:py-4 3xl:px-5 3xl:py-6 text-sm md:text-base'>
                <div className=''>
                    <img src={dribbbleLogo} alt="" className='h-8 sm:h-10 lg:h-10 2xl:h-12' />
                </div>
                <h1 className='text-2xl mb-2'>
                    {currUser.message && currUser.message.username}
                </h1>
            </nav>
            <div className='px-2 sm:w-8/12 lg:w-7/12 m-auto flex flex-col gap-5 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-11'>
                <div className='flex flex-col gap-1 sm:gap-2 lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-7'>
                    <h1 className='text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold'>
                        Welcome! Let's Create your profile
                    </h1>
                    <p className='text-[#919191] text-xs sm:text-base lg:text-lg font-medium'>
                        Let others get to know you better! You can do these later
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className='w-full flex flex-col text-left gap-7 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-11'>
                    <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8 lg:gap-12 2xl:gap-16 w-full'>
                        <div className='flex flex-col gap-3 sm:gap-5 lg:gap-7 2xl:gap-12 w-full sm:w-auto'>
                            <h2 className='sm:text-xl lg:text-2xl 2xl:text-3xl font-bold text-cente text-left '>
                                Add an avatar
                            </h2>
                            <div className='rounded-full sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-56 xl:h-56 flex justify-center items-center'>
                                {
                                    profilePic !== '' ? <img src={profilePic} alt="" className='rounded-full w-40 h-40 sm:w-44 sm:h-44 lg:h-48 lg:w-48 xl:w-56 xl:h-56 object-cover border-dashed border-2 border-[#c4c4c4]' /> :
                                        <MdCameraEnhance size={35} color='#b1b1b1' />
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 sm:gap-6 lg:gap-7 xl:gap-8'>
                            <button className='w-fit px-4 p-2 border-2 rounded-lg font-bold m-auto sm:m-none'>
                                <label htmlFor="avatar" className=''>Choose image</label>
                                <input type="file" id="avatar" name='avatar' accept="image/*" onChange={uploadImage} className='hidden' />
                            </button>
                            <button className='text-[#919191] text-sm sm:text-base lg:text-lg font-medium w-fit'>
                                {'>'} Or Choose one of our defaults
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 lg:gap-4 2xl:gap-6 w-full'>
                        <label htmlFor="location" className='sm:text-xl lg:text-2xl 2xl:text-3xl font-bold'> Add your location</label>
                        <div className=''>
                            <input type="text" id='location' name='location' placeholder='Enter a location' className='text-lg lg:text-lg 2xl:text-xl font-medium focus:outline-none mb-2 border-b-[2px] hover:border-[#ff9ec5] duration-100 focus:border-[#ff9ec5] w-full sm:w-1/2 ' onChange={
                                (e) => {
                                    setLocation(e.target.value)
                                }
                            } />
                        </div>

                    </div>
                    <button className='bg-[#ea4b8b] hover:bg-[#e42c76] duration-150 rounded-lg p-3 text-white w-1/2'>
                        Next
                    </button>
                </form>

            </div>
        </div>
    )
}