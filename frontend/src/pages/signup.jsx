import login_graphic from '../assets/signup_graphic_whole.jpg';
import dribbble from '../assets/dribbbleLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [errorMsg, setErrorMsg] = useState('')

    const [userDetails, setUserDetails] = useState({ fullName: '', username: '', email: '', password: '', checked: false })
    const navigate = useNavigate()
    const handleChange = (e) => {
        // console.log(e.target.checked)
        console.log(e.target.name, e.target.value)
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!userDetails.checked) {
            return setErrorMsg('Please agree to the terms and conditions')
        }
        fetch('https://aeonaxy-8u8e.onrender.com/api/auth/signup', {
        // fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setErrorMsg(data.error)
                }
                else {
                    console.log(data)
                    alert('Account created successfully')
                    navigate('/signin')
                }
            })

        console.log(userDetails)
    }

    return (
        <div className='flex'>
            <img src={login_graphic} alt="" className='h-screen w-4/12 hidden lg:block' />
            <div className="w-full">
                <nav className='font-medium w-full flex justify-between md:justify-end px-3 py-4 lg:px-5 lg:py-6 text-sm md:text-base'>
                    <div className='md:hidden'>
                        <img src={dribbble} alt="" className='h-5' />
                    </div>
                    <div className=''>
                        Already a member<a href="/signin" className='text-[#5e51aa]'>? Sign In</a>
                    </div>
                </nav>
                <form onSubmit={handleSubmit} className='form w-4/5 lg:w-3/5 m-auto flex flex-col gap-5 md:gap-6 lg:gap-8 font-bold text-sm md:text-base lg:text-lg'>
                    <h1 className='text-2xl lg:text-3xl'>
                        Sign up to Dribbble
                    </h1>
                    <p id='msg' className='text-red-500 font-medium text-xs md:text-sm lg:text-base'>
                        {errorMsg}
                    </p>
                    <div className='flex flex-col md:grid md:grid-cols-2 w-full gap-4 md:gap-5 lg:gap-9'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className=''>Name</label>
                            <input type="text" id="name" name="fullName" placeholder="Your Name" onChange={handleChange} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" className=''>Username</label>
                            <input type="text" id="username" name="username" placeholder="Your Username" onChange={handleChange} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="email" className=''>Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" onChange={handleChange} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="password" className=''>Password</label>
                            <input type="password" id="password" name="password" placeholder="6+ characters" onChange={handleChange} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                        </div>

                        <div className='col-span-2 flex gap-2'>
                            <input type="checkbox" className='h-7' onClick={
                                () => setUserDetails({ ...userDetails, checked: !userDetails.checked })
                            } />
                            <label htmlFor="terms" className='font-medium text-xs md:text-sm lg:text-base'>
                                Creating an account means you're okay with our <a href="/terms" className='text-[#5e51aa]'>Terms of Service, Privacy Policy</a>, and our default <a href="/notification" className='text-[#5e51aa]'>Notification Settings</a>.
                            </label>
                        </div>

                    </div>
                    <button type='submit' className='bg-[#ea4b8b] rounded-lg p-3 text-white w-1/2'>
                        Create Account
                    </button>
                    <p className=' text-[#b1b1b1] font-medium text-xs md:text-sm lg:text-base'>
                        This site is protected by reCAPTCHA and the Google <a href="/privacy" className='text-[#5e51aa]'>Privacy Policy</a> and <a href="/terms" className='text-[#5e51aa]'>Terms of Service</a> apply.
                    </p>
                </form>
            </div>
        </div>
    )
}