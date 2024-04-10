import login_graphic from '../assets/signup_graphic_whole.jpg';
import { useState } from 'react';

export default function Signup() {
    const [errorMsg, setErrorMsg] = useState('* Username has alreqady been taken')
    return (
        <div className='flex'>
            <img src={login_graphic} alt="" className='h-screen w-4/12' />
            <div className="w-full">
                <nav className='font-medium w-full flex justify-end px-5 py-6'>
                    Already a member<a href="/signin" className='text-[#5e51aa]'>? Sign In</a>
                </nav>
                <div className='form w-3/5 m-auto flex flex-col gap-6 font-bold'>
                    <h1 className=' text-3xl'>
                        Sign up to Dribbble
                    </h1>
                    <p id='msg' className='text-red-500 font-medium'>
                        {errorMsg}
                    </p>
                    <div className='grid grid-cols-2 w-full gap-9 text-lg'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="name" className=''>Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-medium'/>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label htmlFor="username" className=''>Username</label>
                            <input type="text" id="username" name="username" placeholder="Your Username" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-medium'/>
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="email" className=''>Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-medium'/>
                        </div>

                        <div className='flex flex-col gap-1 col-span-2'>
                            <label htmlFor="password" className=''>Password</label>
                            <input type="password" id="password" name="password" placeholder="6+ characters" required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-medium'/>
                        </div>    

                        <div className='col-span-2 flex gap-2'>
                            <input type="checkbox" className='h-7'/>        
                            <label htmlFor="terms" className='font-medium'>
                                    Creating an account means you're okay with our <a href="/terms" className='text-[#5e51aa]'>Terms of Service, Privacy Policy</a>, and our default <a href="/notification" className='text-[#5e51aa]'>Notification Settings</a>.
                            </label>
                        </div>

                        <button className='bg-[#ea4b8b] rounded-lg p-3 text-white m'>
                            Create Account
                        </button>
                    </div>
                    <p className=' text-[#b1b1b1] font-medium text-base'>
                        This site is protected by reCAPTCHA and the Google <a href="/privacy" className='text-[#5e51aa]'>Privacy Policy</a> and <a href="/terms" className='text-[#5e51aa]'>Terms of Service</a> apply.
                    </p>
                </div>
            </div>
        </div>
    )
}