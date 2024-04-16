import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import checkUser from "../functions/checkUser"
import HomeNavbar from "../components/homeNavbar"
import { IoMailUnread } from "react-icons/io5";
import Dribbble from "../assets/dribbbleLogo.png"
import { FaDribbble } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import basketball from "../assets/basketball.png"

export default function Home() {
    const [currUser, setCurrUser] = useState({})
    const navigate = useNavigate()


    const [changeEmail, setChangeEmail] = useState(false)
    const [newEmailAddress, setNewEmailAddress] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await checkUser();
            // console.log(result.error, "error")
            if (result.error === true) {
                // console.log(result.error, "error")
                navigate("/signin");
            } else {
                // console.log(result, "currUser")
                setCurrUser(result.user);
                // console.log(result.user, "currUser .user")
            }
        };
        fetchData();
    }, [])

    const sendConfirmationEmail = () => {
        // fetch('http://localhost:5000/api/auth/sendConfirmationEmail', {
        fetch('https://aeonaxy-8u8e.onrender.com/api/auth/sendConfirmationEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: currUser.username })
        })
            .then(res => res.json())
            // .then(data => {
                // console.log(data)
            // })
    }

    const changeEmailAddress = (newEmailAddress) => {
        fetch('http://localhost:5000/api/auth/changeEmailAddress', {
        // fetch('https://aeonaxy-8u8e.onrender.com/api/auth/changeEmailAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: currUser.username, email: newEmailAddress})
        })
        .then(res => res.json())
        .then(data => {
            setCurrUser.email = newEmailAddress
        })
        .catch(err => {
            console.log(err)
        })
        setChangeEmail(true)
        sendConfirmationEmail()
    }

    return (
        <div>
            <HomeNavbar username={currUser.username} avatar={currUser.avatar} />
            <hr className="mb-12 lg:mb-14 xl:mb-16 3xl:mb-20" />
            <div className="px-6 text-center sm:px-0 sm:w-8/12 lg:w-1/2 m-auto flex flex-col gap-5 sm:gap-5 lg:gap-6 xl:gap-3 3xl:gap-6">
                {
                    currUser.emailVerified === false &&
                    <>
                        <h1 className="text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold">
                            Please verify your email...
                        </h1>
                        <IoMailUnread className="m-auto" size={100} color="#959595" />
                        <p className="text-[#818181] text-xs sm:text-base lg:text-lg font-medium">
                            Please verify your email address. We've sent a confirmation email to:
                        </p>
                        <strong className="text-xs sm:text-base lg:text-lg">
                            account@refero.design
                        </strong>
                        <p className="text-[#818181] text-xs sm:text-base lg:text-lg font-medium">
                            Click the confirmation link in the email to begin using Dribbble.
                        </p>
                        <p className="text-[#818181] text-xs sm:text-base lg:text-lg font-medium">
                            Didn't receive the email? Check your spam folder, it may have been caught by a filter. If you still don't see it, you can
                            <span onClick={sendConfirmationEmail} className="text-[#df4784] font-bold">
                                {' '}resend the confirmation.
                            </span>
                        </p>
                        <div className="text-[#818181] text-xs sm:text-base lg:text-lg font-medium">
                            Wrong email address?
                            <span onClick={() => setChangeEmail(!changeEmail)} className="text-[#ea4b8b] font-bold" >
                                {' '}Change it.
                            </span>
                            <div className={`${changeEmail ? "block" : "hidden"} flex flex-col gap-1`}>
                                <label htmlFor="email" className=''>Email</label>
                                <input type="email" id="email" name="email" placeholder="New Email Address" onChange={(e)=>{
                                    setNewEmailAddress(e.target.value)
                                }} required className='bg-[#f1f1f1] p-2 px-4 rounded-lg font-normal md:font-medium focus:outline-[#ff9ec5]' />
                                <button className="bg-[#ea4b8b] hover:bg-[#e42c76] duration-150 rounded-lg p-1 sm:p-1 sm:px-2 lg:p-2 text-white w-fit" onClick={changeEmailAddress}>
                                    Change Email
                                </button>
                            </div>
                        </div>
                    </>
                }
                {
                    currUser.emailVerified === true &&
                    <div className="bg-white p-10 rounded-lg">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold mb-20">
                            Welcome To Dribbble
                        </h1>
                        <img src={basketball} alt="" className="m-auto animate-bounce h-20" />
                    </div>
                }
            </div>
            <footer className="bg-[#f7f7f7]">
                <div className="font-medium text-[#474747] grid grid-cols-1  sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 mt-20 gap-12 sm:gap-10 md:gap-12 lg:gap-16 3xl:gap-32 p-10 sm:p-14 md:p-16 lg:p-20 bg-[#f7f7f7]">
                    <div className="flex flex-col gap-6 w-fit sm:col-span-2">
                        <img src={Dribbble} alt="" className="h-10 w-fit" />
                        <p className="font-medium">
                            Dribble is the world's leading community for creatives to share, grow, and get hired.
                        </p>
                        <div className="flex gap-4">
                            <FaDribbble size={20} />
                            <FaTwitter size={20} />
                            <FaFacebookSquare size={20} />
                            <FaInstagram size={20} />
                            <FaPinterest size={20} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-fit">
                        <strong className="text-black">
                            For designers
                        </strong>
                        <p> Go Pro! </p>
                        <p> Explore design work </p>
                        <p> Design blog </p>
                        <p> Overtime podcast </p>
                        <p> Playoffs </p>
                        <p> Weekly Warm-Up </p>
                        <p> Refer a Friend </p>
                        <p> Code of Conduct </p>
                    </div>
                    <div className="flex flex-col gap-3 w-fit">
                        <strong className="text-black">
                            Hire designers
                        </strong>
                        <p> Post a job opening </p>
                        <p> Post a freelance project </p>
                        <p> Search for designers </p>

                        <strong> Brands </strong>
                        <p> Advertise with us </p>
                    </div>
                    <div className="flex flex-col gap-3 w-fit">
                        <strong className="text-black">
                            Company
                        </strong>
                        <p> About </p>
                        <p> Careers </p>
                        <p> Support </p>
                        <p> Media Kit </p>
                        <p> Testimonials </p>
                        <p> API </p>
                        <p> Terms of Service </p>
                        <p> Privacy Policy </p>
                        <p> Cookie Policy </p>
                    </div>
                    <div className="flex flex-col gap-3 w-fit">
                        <strong className="text-black">
                            Directories
                        </strong>
                        <p> Design jobs </p>
                        <p> Designers for hire </p>
                        <p> Freelance designers for hire </p>
                        <p> Tags </p>
                        <p> Places </p>
                        <strong> Design assets </strong>
                        <p> Dribbble Marketplace </p>
                        <p> Shop Creative Market </p>
                        <p> Fontspring </p>
                        <p> Font squirrel </p>
                    </div>
                    <div className="flex flex-col gap-3 w-fit">
                        <strong className="text-black">Design Resources</strong>
                        <p> Freelancing </p>
                        <p> Design Hiring </p>
                        <p> Design Portfolio </p>
                        <p> Design Education </p>
                        <p> Creative process </p>
                        <p> Design Industry Trends </p>
                    </div>
                </div>
                <div className="p-10">
                    <hr className="mb-10" />
                    <div className="text-center text-[#818181] text-xs sm:text-base lg:text-lg font-medium flex justify-between">
                        <p>
                            © 2023 Dribbble. All rights reserved.
                        </p>
                        <p className="flex gap-2">
                            20,501,853 shots dribbbles
                            <img src={basketball} alt="" className="h-7" />
                        </p>
                    </div>
                </div>

            </footer>

        </div>
    )
}