import login_graphic from '../assets/signup_graphic_whole.jpg';
import { useState } from 'react';

export default function Signup() {
    const [errorMsg, setErrorMsg] = useState('* Username has alreqady been taken')
    return (
        <div className='flex'>
            <img src={login_graphic} alt="" className='h-screen w-4/12 hidden lg:block' />
            <div className="w-full">
                <nav className='font-medium w-full flex justify-end px-3 py-4 lg:px-5 lg:py-6 text-sm md:text-base'>
                    Already a member<a href="/signin" className='text-[#5e51aa]'>? Sign In</a>
                </nav>
                <div className='form w-4/5 lg:w-3/5 m-auto flex flex-col gap-5 md:gap-6 lg:gap-8 font-bold text-sm md:text-base lg:text-lg'>
                    <h1 className='text-2xl lg:text-3xl'>
                        Sign up to Dribbble
                    </h1>
                    <p id='msg' className='text-red-500 font-medium text-xs md:text-sm lg:text-base'>
                        {errorMsg}
                    </p>
                    <div className='flex flex-col md:grid md:grid-cols-2 w-full gap-4 md:gap-5 lg:gap-9'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className=''>Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium'/>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" className=''>Username</label>
                            <input type="text" id="username" name="username" placeholder="Your Username" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium'/>
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="email" className=''>Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium'/>
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="password" className=''>Password</label>
                            <input type="password" id="password" name="password" placeholder="6+ characters" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium'/>
                        </div>    

                        <div className='col-span-2 flex gap-2'>
                            <input type="checkbox" className='h-7'/>        
                            <label htmlFor="terms" className='font-medium text-xs md:text-sm lg:text-base'>
                                    Creating an account means you're okay with our <a href="/terms" className='text-[#5e51aa]'>Terms of Service, Privacy Policy</a>, and our default <a href="/notification" className='text-[#5e51aa]'>Notification Settings</a>.
                            </label>
                        </div>

                    </div>
                    <button className='bg-[#ea4b8b] rounded-lg p-3 text-white w-1/2'>
                        Create Account
                    </button>
                    <p className=' text-[#b1b1b1] font-medium text-xs md:text-sm lg:text-base'>
                        This site is protected by reCAPTCHA and the Google <a href="/privacy" className='text-[#5e51aa]'>Privacy Policy</a> and <a href="/terms" className='text-[#5e51aa]'>Terms of Service</a> apply.
                    </p>
                </div>
            </div>
        </div>
    )
}