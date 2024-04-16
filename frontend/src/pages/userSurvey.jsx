import Navbar from "../components/navbar"
import { useEffect, useState } from "react"
import surveyEye from '../assets/surveyEye.png'
import surveyMixer from '../assets/surveyMixer.png'
import surveyPot from '../assets/surveyPot.png'
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom"
import checkUser from "../functions/checkUser"

export default function userSurvey() {
    const [currUser, setCurrUser] = useState({})

    const styles = ""
    const navigate = useNavigate()

    const [survey, setClick] = useState({ surveyEye: false, surveyMixer: false, surveyPot: false })

    const surveyDetails = {
        surveyPot: "I'm a designer looking to share my work",
        surveyMixer: "I'm looking to hire a designer",
        surveyEye: "I'm looking for design inspiration"
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await checkUser();
            console.log(result.user, 'user thisssss');
    
            if (result.error === true) {
                navigate("/signin");
            }
            else if (result.user.profileCompleted === true) {
                navigate('/')
            } 
            else {  
                setCurrUser(result.user);
            }
        };
        fetchData();
    }, [])

    const handleClick = (e) => {
        setClick({ ...survey, [e.target.id]: !survey[e.target.id] })
    }

    const sendConfirmationEmail = () => {
        fetch('http://localhost:5000/api/auth/sendConfirmationEmail', {
        // fetch('https://aeonaxy-8u8e.onrender.com/api/auth/sendConfirmationEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: currUser.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(currUser, "`currUser`")
        const finalSurvey = Object.keys(survey).filter(key => survey[key]).map(key => surveyDetails[key])
        console.log(finalSurvey, "finalSurvey")
        // fetch('https://aeonaxy-8u8e.onrender.com/api/completeProfile/survey', {
        fetch('http://localhost:5000/api/completeProfile/survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({survey: finalSurvey, username: currUser.username})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data, "user fginal survey")
            let tempUser = window.sessionStorage.getItem('user', JSON.stringify(data))
            tempUser = JSON.parse(tempUser)
            console.log(tempUser, "tempUser")
            tempUser.user = data.user

            window.sessionStorage.setItem('user', JSON.stringify(data.user))
            
            console.log(JSON.parse(window.sessionStorage.getItem('user')), "This is the Final user")

            sendConfirmationEmail()
            navigate('/')
        })
    }


    return (
        <div>
            <Navbar
                back={true}
                backLink='/completeProfile'
                username={currUser.username}
            />
            <div className="px-6 sm:px-0 sm:w-8/12 lg:w-8/12 m-auto flex flex-col gap-5 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-11">
                <div className='flex flex-col gap-1 sm:gap-2 lg:gap-2 xl:gap-3 2xl:gap-4 3xl:gap-7 text-center'>
                    <h1 className='text-xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold'>
                        What brings you to Dribbble?
                    </h1>
                    <p className='text-[#919191] text-xs sm:text-base lg:text-lg font-medium'>
                        Select the options that best describe you. Don't worry, you can explore other options later.
                    </p>
                </div>
                <form action="" className="w-full flex flex-col gap-4 sm:gap-2 lg:gap-5 3xl:gap-6">

                    <div onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row justify-center xl:py-8 3xl:py-16 text-left gap-7 sm:gap-5 lg:gap-6 xl:gap-8 3xl:gap-11">

                        <div className={` border-2 rounded-xl h-64 md:h-64 lg:h-72 3xl:h-80 p-3 md:p-2 lg:p-6 text-center ${survey.surveyPot === true ? "border-pink-500" : "border-[#f1f1f1]"}`}>
                            <div className={` ${survey.surveyPot && "-translate-y-12 sm:-translate-y-12 lg:-translate-y-20  "}`}>
                                <img src={surveyPot} alt="" className="w-48 md:w-32 lg:w-48 3xl:w-56 m-auto mb-7 duration" />
                                <h1 className="font-bold text-sm sm:text-base lg:text-xl w-full sm:w-64 mb-4 lg:mb-2 ">
                                    I'm a designer looking to share my work
                                </h1>
                                {
                                    survey.surveyPot && <p className="w-fit sm:w-64 text-xs lg:text-sm text-[#818181] font-medium">
                                        With over 7 million shots from a vast community of designers, Dribbble is the world leading source for design inspiration.
                                    </p>
                                }
                                <div className={`h-9 w-9 border-[#b1b1b1] border-2 m-auto rounded-full ${survey.surveyPot ? "bg-[#000000]" : "bg-[#ffffff]"}`} onClick={handleClick} id="surveyPot">
                                    <TiTick className={`m-auto ${!survey.surveyPot && "hidden"}`} onClick={handleClick} id="surveyPot" color="#ffffff" size={30} />
                                </div>
                            </div>
                        </div>
                        
                        <div className={` border-2 rounded-xl h-64 md:h-64 lg:h-72 3xl:h-80 p-3 md:p-2 lg:p-6 text-center ${survey.surveyMixer === true ? "border-pink-500" : "border-[#f1f1f1]"}`}>
                            <div className={`${survey.surveyMixer && "-translate-y-12 sm:-translate-y-12 lg:-translate-y-20  "}`}>
                                <img src={surveyMixer} alt="" className="w-48 md:w-32 lg:w-48 3xl:w-56 m-auto mb-7 duration" />
                                <h1 className="font-bold text-sm sm:text-base lg:text-xl w-full sm:w-64 mb-4 lg:mb-2 ">
                                    I'm a designer looking to share my work
                                </h1>
                                {
                                    survey.surveyMixer && <p className="w-fit sm:w-64 text-xs lg:text-sm text-[#818181] font-medium">
                                        With over 7 million shots from a vast community of designers, Dribbble is the world leading source for design inspiration.
                                    </p>
                                }
                                <div className={`h-9 w-9 border-[#b1b1b1] border-2 m-auto rounded-full ${survey.surveyMixer ? "bg-[#000000]" : "bg-[#ffffff]"}`} onClick={handleClick} id="surveyMixer">
                                    <TiTick className={`m-auto ${!survey.surveyMixer && "hidden"}`} onClick={handleClick} id="surveyMixer" color="#ffffff" size={30} />
                                </div>
                            </div>
                        </div>

                        <div className={` border-2 rounded-xl h-64 md:h-64 lg:h-72 3xl:h-80 p-3 md:p-2 lg:p-6 text-center ${survey.surveyEye === true ? "border-pink-500" : "border-[#f1f1f1]"}`}>
                            <div className={`${survey.surveyEye && "-translate-y-12 sm:-translate-y-12 lg:-translate-y-20  "}`}>
                                <img src={surveyEye} alt="" className="w-48 md:w-32 lg:w-48 3xl:w-56 m-auto mb-7 duration" />
                                <h1 className="font-bold text-sm sm:text-base lg:text-xl w-full sm:w-64 mb-4 lg:mb-2 ">
                                    I'm looking for design inspiration
                                </h1>
                                {
                                    survey.surveyEye && <p className="w-fit sm:w-64 text-xs lg:text-sm text-[#818181] font-medium">
                                        With over 7 million shots from a vast community of designers, Dribbble is the world leading source for design inspiration.
                                    </p>
                                }
                                <div className={`h-9 w-9 border-[#b1b1b1] border-2 m-auto rounded-full ${survey.surveyEye ? "bg-[#000000]" : "bg-[#ffffff]"}`} onClick={handleClick} id="surveyEye">
                                    <TiTick className={`m-auto ${!survey.surveyEye && "hidden"}`} onClick={handleClick} id="surveyEye" color="#ffffff" size={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="m-auto w-fit text-xs sm:text-base lg:text-lg font-medium">
                        Anything else? You can select multiple
                    </p>
                    <button className='bg-[#ea4b8b] w-1/2 sm:w-1/5 m-auto hover:bg-[#e42c76] duration-150 rounded-lg p-3 text-white focus:outline-none font-semibold' onClick={handleSubmit}>
                        Finish
                    </button>
                    <p className="text-[#919191] m-auto w-fit text-xs sm:text-base lg:text-lg font-medium">
                        or Press Return 
                    </p>

                </form>

            </div>
        </div>
    )
}