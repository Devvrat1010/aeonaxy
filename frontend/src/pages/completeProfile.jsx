import dribbbleLogo from '../assets/dribbbleLogo.png';
import { MdCameraEnhance } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function completeProfile() {

    const [currUser, setCurrUser] = useState({ username: '' })
    const [profilePic, setProfilePic] = useState("https://res.cloudinary.com/dpscsgghc/image/upload/v1712816863/tdrabonedlh4fiyqckft.png")
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
            <nav className='font-medium w-full px-3 py-4 lg:px-5 lg:py-6 text-sm md:text-base'>
                <div className=''>
                    <img src={dribbbleLogo} alt="" className='h-5 lg:h-11' />
                </div>
            </nav>
            <div className='w-3/6 m-auto flex flex-col xl:gap-4 2xl:gap-14 '>
                <div className='flex flex-col xl:gap-5 2xl:gap-7'>
                    <h1 className='xl:text-4xl 2xl:text-5xl font-bold'>
                        Welcome! Let's Create your profile
                    </h1>
                    <p className='text-[#919191] text-base lg:text-lg font-medium'>
                        Let others get to know you better! You can do these later
                    </p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className='flex items-center gap-16'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='text-3xl font-bold'>
                                Add an avatar
                            </h2>
                            <div className='rounded-full w-64 h-64 border-dashed border-2 border-[#c4c4c4] flex justify-center items-center'>
                                {
                                    profilePic !== '' ? <img src={profilePic} alt="" className='rounded-full h-64 w-64' /> :
                                        <MdCameraEnhance size={35} color='#b1b1b1' />
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-8 '>
                            <button className='bg- h-fit w-fit'>
                                <input type="file" id="avatar" name='avatar' accept="image/*" onChange={uploadImage} className='' />
                            </button>
                            <button className='text-[#919191] text-lg font-medium w-fit'>
                                {'>'} Or Choose one of our defaults
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 w-full'>
                        <label htmlFor="location" className='font-bold text-3xl'> Add your location</label>

                        <div className=''>
                            <input type="text" id='location' name='location' placeholder='Enter a location' className='text-xl font-medium focus:outline-none mb-2 border-b-[2px] hover:border-[#ff9ec5] duration-100 focus:border-[#ff9ec5] w-1/2' onChange={
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