import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dribbble from '../assets/dribbbleLogoBlack.png';
import { IoSearch } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

export default function HomeNavbar(props) {

    const [avatar, setAvatar] = useState(props.avatar);

    const [dropDown, setDropDown] = useState(false);

    const [profile, setProfile] = useState(false);

    const [logout, setLogout] = useState(false);
    const navigate = useNavigate();

    const handleDropDown = () => {
        setDropDown(!dropDown);
    }

    console.log(props, "props")

    const styles = {
        link: "w-full p-2 rounded-lg sm:p-0 sm:w-fit text-white text-opacity-90 text-sm sm:text-xs md:text-xs lg:text-lg sm:text-[#818181] font-semibold hover:text-black bg-pink-900 sm:bg-transparent cursor-pointer "
    }

    const handleProfileClick = () => {
        setProfile(!profile);
    }

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        navigate('/signin');
        document.cookie = "LOGIN_INFO=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <nav className='font-medium flex justify-between items-center px-2 py-3 lg:px-3 lg:py-4 3xl:p-5 text-sm md:text-base  '>
            <div className={`flex gap-2 w-full`}>
                <img src={dribbble} alt="" className={` md:block h-8 sm:h-8 lg:h-10 2xl:h-12`} />
                <div className='justify-between md:items-center w-full'>
                    <div className={`${dropDown ? "flex flex-col bg-pink-700 p-2 absolute top-0 left-0 duration-500 rounded-br-lg z-10" : "hidden"}  md:flex justify-left md:items-center gap-3 sm:gap-6 lg:gap-8 sm:w-full`}>
                        <div className={`${dropDown ? "flex flex-col w-full " : "hidden"} md:flex md:flex-row gap-3 sm:gap-5 justify-start text-lg md:w-full`}>
                        {
                                dropDown === true &&
                                <>
                                    <img src={props.avatar} alt="" className='rounded-full w-8 h-8'
                                        onClick={() => { setLogout(!logout) }}
                                    />
                                    <button className={`${logout ? "block" : "hidden" } bg-pink-900 hover:bg-[#e42c76] duration-150 rounded-lg p-2  text-white w-full text-sm`} onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            }
                            <div href="/inspiration" className={styles.link}>
                                Inspiration
                            </div>
                            <div href="/findWork" className={styles.link}>
                                Find Work
                            </div>
                            <div href="/learnDesign" className={styles.link}>
                                Learn Design
                            </div>
                            <div href="/goPro" className={styles.link}>
                                Go Pro
                            </div>
                            <div href="/hireDesigners" className={styles.link}>
                                Hire Designers
                            </div>
                        </div>
                        <div className={`flex ${dropDown ? "flex-col" : "flex-row"} gap-4 justify-end md:items-center h-fit w-fit md:w-auto`}>
                            <div className='flex items-center bg-[#a1a1a1] md:bg-[#f1f1f1] p-2 lg:px-4 gap-2 rounded-lg focus-within:outline-[#ff9ec5] focus-within:outline-dotted'>
                                <label htmlFor="search" className='w-fit md:opacity-40'>
                                    <IoSearch />
                                </label>
                                <input type="text" name="search" id="search" placeholder="Search" className='bg-[#a1a1a1] md:bg-[#f1f1f1] font-normal md:font-medium focus:outline-none w-2/3' />
                            </div>
                            <FaBriefcase size={40} color='#a1a1a1a' className=' opacity-45' />
                            {
                                dropDown === false &&
                                <div className=''>
                                    <div className='sm:h-6 sm:w-6 lg:h-8 lg:w-8'>
                                        <img src={props.avatar} alt="" className='rounded-full sm:w-6 sm:h-6 lg:h-8 lg:w-8 cursor-pointer' onClick={handleProfileClick} />
                                    </div>
                                    <div className={`${profile ? "absolute -translate-x-full translate-y-10  bg-[#ea4b8b] rounded-lg p-1 sm:p-1 sm:px-2 lg:p-2 text-white w-fit flex flex-col gap-2" : "hidden"} text-center`}>
                                        <p className='bg-pink-700 hover:bg-pink-800 duration-150 rounded-lg p-1 sm:p-1 sm:px-2 lg:p-2 text-black w-full cursor-pointer'>
                                            {props.username}
                                        </p>
                                        <p className='bg-pink-700 hover:bg-pink-800 duration-150 rounded-lg p-1 sm:p-1 sm:px-2 lg:p-2 text-black w-full cursor-pointer'>
                                            {props.email}
                                        </p>
                                        <button className={`bg-pink-700 hover:bg-pink-800 duration-150 rounded-lg p-1 sm:p-1 sm:px-2 lg:p-2 text-black w-full cursor-pointer`} onClick={handleLogout}>
                                            Logout    
                                        </button>
                                    </div>
                                </div>
                            }
                            <button type='submit' className='bg-pink-900 sm:bg-[#ea4b8b] hover:bg-[#e42c76] duration-150 rounded-lg p-2 sm:p-1 sm:px-2 lg:p-2 text-white md:w-fit w-full' >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
                {/* } */}
                <div className='md:hidden' onClick={handleDropDown}>
                    {
                        dropDown === true ? <IoIosArrowDropupCircle size={30} /> : <IoIosArrowDropdownCircle size={30} />
                    }
                    {/* <IoIosArrowDropdownCircle size={30} /> */}
                </div>
            </div>
        </nav>
    )
}