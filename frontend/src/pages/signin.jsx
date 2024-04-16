import login_graphic from '../assets/signup_graphic_whole.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [errorMsg, setErrorMsg] = useState('')

    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value)
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    }
    const setCookie = (cname, cvalue, exdays) => {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

        // fetch('http://localhost:5000/api/auth/signin', {
        fetch('https://aeonaxy-8u8e.onrender.com/api/auth/signin', {
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
                    setCookie('LOGIN_INFO', data.token, 3)
                    window.sessionStorage.setItem('user', JSON.stringify(data.user))
                    console.log(data, "data.user")
                    if (data.user.profileCompleted){
                        navigate('/')
                    }
                    else{
                        navigate('/completeProfile')
                    }
                }
            })

    }
    return (
        <div className='flex'>
            <img src={login_graphic} alt="" className='h-screen w-4/12 hidden lg:block' />
            <div className="w-full font-bold text-sm md:text-base lg:text-lg ">
                <nav className='font-medium w-full flex justify-end px-3 py-4 lg:px-5 lg:py-6 text-sm md:text-base'>
                    New here<a href="/signup" className='text-[#5e51aa]'>? Sign Up</a>
                </nav>
                <form onSubmit={handleSubmit} className='form w-4/5 lg:w-3/5 m-auto flex flex-col gap-5 md:gap-6 lg:gap-8 '>
                    <h1 className='text-2xl lg:text-3xl '>
                        Sign in to Dribbble
                    </h1>
                    <p id='msg' className='text-red-500 font-medium text-xs md:text-sm lg:text-base'>
                        {errorMsg}
                    </p>
                    <div className='flex flex-col md:grid md:grid-cols-2 w-full gap-4 md:gap-5 lg:gap-9 '>
                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="email" className=''>Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" onChange={handleChange} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="password" className=''>Password</label>
                            <input type="password" id="password" name="password" placeholder="6+ characters" onChange={handleChange} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                        </div>
                    </div>
                    <button type='submit' className='bg-[#ea4b8b] rounded-lg p-3 text-white w-1/2' >
                        Sign In
                    </button >
                    <p className=' text-[#b1b1b1] font-medium text-xs md:text-sm lg:text-base'>
                        This site is protected by reCAPTCHA and the Google <a href="/privacy" className='text-[#5e51aa]'>Privacy Policy</a> and <a href="/terms" className='text-[#5e51aa]'>Terms of Service</a> apply.
                    </p>
                </form>
            </div>
        </div>
    )
}